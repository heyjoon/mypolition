// Official-only ingestion; never import mock data here.
export type Row = Record<string, unknown>;
export type Page = { total: number; rows: Row[] };
export const base = "https://open.assembly.go.kr/portal/openapi/";
export const services = {
  members: "ALLNAMEMBER",
  bills: "nzmimeepazxkubdpn",
  tallies: "ncocpgfiaoituanbr",
  votes: "nojepdqqaweusdfbi"
} as const;
export const str = (value: unknown) => typeof value === "string" || typeof value === "number" ? String(value).trim() : "";
const object = (v: unknown): Row => {
  if (!v || typeof v !== "object" || Array.isArray(v)) throw new Error("Invalid API object");
  return v as Row;
};
export function parsePage(payload: unknown, service: string): Page {
  const data = object(payload);
  const sections = data[service];
  if (!Array.isArray(sections)) {
    const result = data.RESULT ? object(data.RESULT) : {};
    if (result.CODE === "INFO-200") return { total: 0, rows: [] };
    throw new Error("API response error: " + (str(result.CODE) || "unknown"));
  }
  const head = sections.flatMap(s => { const h = object(s).head; return Array.isArray(h) ? h : []; }).map(object);
  const result = head.find(h => h.RESULT)?.RESULT;
  if (!result || object(result).CODE !== "INFO-000") throw new Error("API result not successful");
  const count = head.find(h => "list_total_count" in h)?.list_total_count;
  const total = Number(count);
  if (count == null || !Number.isSafeInteger(total) || total < 0) throw new Error("Invalid total");
  const rows = sections.flatMap(s => { const r = object(s).row; return Array.isArray(r) ? r : []; }).map(object);
  return { total, rows };
}
export async function allPages(load: (page: number, size: number) => Promise<Page>, key: (row: Row) => string, size = 100): Promise<Row[]> {
  if (!Number.isInteger(size) || size < 1) throw new Error("Invalid page size");
  const seen = new Map<string, Row>();
  let total = -1;
  for (let page = 1; page <= 10000; page++) {
    const result = await load(page, size);
    if (total < 0) total = result.total;
    if (result.total !== total || result.rows.length !== Math.min(size, Math.max(0, total - (page - 1) * size))) throw new Error("Pagination changed or incomplete");
    for (const row of result.rows) {
      const id = key(row);
      if (!id || seen.has(id)) throw new Error("Missing or duplicate record identity");
      seen.set(id, row);
    }
    if (seen.size === total) return [...seen.values()];
  }
  throw new Error("Page limit exceeded");
}
const sleep = (ms: number) => new Promise<void>(resolve => setTimeout(resolve, ms));
export function officialClient(apiKey: string, fetcher: typeof fetch = fetch) {
  if (!apiKey.trim()) throw new Error("OPEN_ASSEMBLY_API_KEY is required");
  return async (service: string, filters: Record<string, string>, key: (row: Row) => string) => allPages(async (page, size) => {
    const url = new URL(service, base);
    for (const [k, v] of Object.entries(filters)) url.searchParams.set(k, v);
    url.searchParams.set("KEY", apiKey);
    url.searchParams.set("Type", "json");
    url.searchParams.set("pIndex", String(page));
    url.searchParams.set("pSize", String(size));
    for (let attempt = 0; attempt < 4; attempt++) {
      await sleep(200);
      try {
        const res = await fetcher(url, { signal: AbortSignal.timeout(30000), redirect: "error" });
        if (!res.ok) {
          if (res.status !== 429 && res.status < 500) throw new Error("nonretryable");
          throw new Error("retryable");
        }
        return parsePage(await res.json(), service);
      } catch (error) {
        if ((error instanceof Error && error.message === "nonretryable") || attempt === 3) throw new Error("Official API request failed: " + service + " page " + page);
        await sleep(1000 * 2 ** attempt);
      }
    }
    throw new Error("Unreachable");
  }, key);
}
export function voteKey(row: Row): string {
  const person = str(row.MONA_CD) || str(row.MEMBER_NO) || [str(row.HG_NM), str(row.HJ_NM)].filter(Boolean).join("/");
  const date = str(row.VOTE_DATE);
  return person && date ? person + "|" + date : "";
}
export function uniqueNameIndex(rows: Row[]): Map<string, string> {
  const ids = new Map<string, Set<string>>();
  for (const row of rows) {
    const name = str(row.NAAS_NM), id = str(row.NAAS_CD);
    if (!name || !id) continue;
    const set = ids.get(name) || new Set<string>(); set.add(id); ids.set(name, set);
  }
  return new Map([...ids].filter(([, set]) => set.size === 1).map(([name, set]) => [name, [...set][0]]));
}
export function normalizeBills(rows: Row[], members: Row[]) {
  const index = uniqueNameIndex(members);
  return rows.map(row => {
    const id = str(row.BILL_ID), title = str(row.BILL_NAME), date = str(row.PROPOSE_DT);
    if (!id || !title || !date) throw new Error("Incomplete bill record");
    const lead = str(row.RST_PROPOSER).split(",").map(s => s.trim()).filter(Boolean);
    const joint = str(row.PUBL_PROPOSER).split(",").map(s => s.trim()).filter(Boolean);
    const authors = [...new Set([...lead, ...joint])].map(name => ({
      name, memberId: index.get(name) || null, role: lead.includes(name) ? "대표발의" : "공동발의"
    }));
    return { id, title, date, number: str(row.BILL_NO), status: str(row.PROC_RESULT) || null, committee: str(row.COMMITTEE) || null, authors, sourceUrl: str(row.DETAIL_LINK) || base + services.bills, evidenceGrade: "A" as const, reviewStatus: "원자료 수집" };
  });
}
