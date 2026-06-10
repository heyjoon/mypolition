import type { Bill, Vote } from "@/lib/types";

export interface AssemblyBillVoteStatus {
  billId: string;
  billTitle: string;
  votes: Vote[];
}

export interface OpenAssemblyMember {
  id: string;
  name: string;
  party: string | null;
  district: string | null;
  electionType: string | null;
  committee: string | null;
  role: string | null;
  term: string | null;
  gender: string | null;
  profileImageUrl: string | null;
  sourceName: string;
  sourceUrl: string;
}

interface AllNaMemberRow {
  NAAS_CD?: string;
  NAAS_NM?: string;
  PLPT_NM?: string;
  ELECD_NM?: string;
  ELECD_DIV_NM?: string;
  BLNG_CMIT_NM?: string;
  DTY_NM?: string;
  GTELT_ERACO?: string;
  NTR_DIV?: string;
  NAAS_PIC?: string;
}

interface OpenAssemblyListResponse<T> {
  [serviceName: string]: Array<{ head: unknown[] } | { row: T[] }>;
}

const defaultBaseUrl = "https://open.assembly.go.kr/portal/openapi";

export async function fetchAssemblyMembers({
  era = "제22대",
  pageSize = 500
}: {
  era?: string;
  pageSize?: number;
} = {}): Promise<OpenAssemblyMember[]> {
  const requestUrl = buildOpenAssemblyUrl("ALLNAMEMBER", {
    pIndex: "1",
    pSize: String(pageSize)
  });
  const sourceUrl = `${(process.env.OPEN_ASSEMBLY_BASE_URL || defaultBaseUrl).replace(/\/$/, "")}/ALLNAMEMBER`;
  const response = await fetch(requestUrl, { next: { revalidate: 60 * 60 } });

  if (!response.ok) {
    throw new Error(`국회 Open API 요청이 실패했습니다. status=${response.status}`);
  }

  const json = (await response.json()) as OpenAssemblyListResponse<AllNaMemberRow>;
  const rows = extractRows(json, "ALLNAMEMBER");

  return rows
    .filter((row) => row.GTELT_ERACO?.includes(era))
    .map((row) => ({
      id: row.NAAS_CD ?? row.NAAS_NM ?? "",
      name: row.NAAS_NM ?? "이름 미확인",
      party: row.PLPT_NM ?? null,
      district: row.ELECD_NM ?? null,
      electionType: row.ELECD_DIV_NM ?? null,
      committee: row.BLNG_CMIT_NM ?? null,
      role: row.DTY_NM ?? null,
      term: row.GTELT_ERACO ?? null,
      gender: row.NTR_DIV ?? null,
      profileImageUrl: row.NAAS_PIC ?? null,
      sourceName: "국회 Open API 국회의원 현황",
      sourceUrl
    }))
    .filter((member) => member.id.length > 0);
}

export function buildOpenAssemblyUrl(serviceName: string, params: Record<string, string> = {}) {
  const apiKey = process.env.OPEN_ASSEMBLY_API_KEY;
  const baseUrl = process.env.OPEN_ASSEMBLY_BASE_URL || defaultBaseUrl;

  if (!apiKey) {
    throw new Error("OPEN_ASSEMBLY_API_KEY가 설정되어 있지 않습니다.");
  }

  const url = new URL(`${baseUrl.replace(/\/$/, "")}/${serviceName}`);
  url.searchParams.set("KEY", apiKey);
  url.searchParams.set("Type", "json");

  for (const [key, value] of Object.entries(params)) {
    url.searchParams.set(key, value);
  }

  return url.toString();
}

function extractRows<T>(json: OpenAssemblyListResponse<T>, serviceName: string): T[] {
  const sections = json[serviceName] ?? [];
  const rowSection = sections.find((section): section is { row: T[] } => "row" in section);

  return rowSection?.row ?? [];
}

// Placeholder adapter for future bill integration. Keep live calls behind this file only.
export async function fetchMemberBills(memberName: string): Promise<Bill[]> {
  void memberName;
  return [];
}

// Placeholder adapter for future vote integration. Keep live calls behind this file only.
export async function fetchMemberVotes(memberName: string): Promise<Vote[]> {
  void memberName;
  return [];
}

// Placeholder adapter for future bill vote status integration. Keep live calls behind this file only.
export async function fetchBillVoteStatus(billId: string): Promise<AssemblyBillVoteStatus> {
  return {
    billId,
    billTitle: "",
    votes: []
  };
}
