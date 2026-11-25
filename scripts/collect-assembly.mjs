import { mkdir, writeFile, rename } from "node:fs/promises";
import { resolve, join } from "node:path";
import { officialClient, services, str, voteKey, normalizeBills, base } from "../lib/open-assembly/collector.ts";

const age = "22";
const out = resolve(process.env.ASSEMBLY_DATA_DIR || ".assembly-data");
const collect = officialClient(process.env.OPEN_ASSEMBLY_API_KEY || "");
const capturedAt = new Date().toISOString();
const membersAll = await collect(services.members, {}, r => str(r.NAAS_CD));
const members = membersAll.filter(r => str(r.GTELT_ERACO).includes("제22대"));
if (members.length < 250) throw new Error("Member coverage too low; snapshot not published");
const bills = await collect(services.bills, { AGE: age }, r => str(r.BILL_ID));
if (!bills.length) throw new Error("No bill records");
const tallies = await collect(services.tallies, { AGE: age }, r => str(r.BILL_ID));
if (!tallies.length) throw new Error("No vote agenda records");
const normalized = normalizeBills(bills, members);
const batch = join(out, "runs", capturedAt.replace(/[:.]/g, "-"));
await mkdir(batch, { recursive: true });
const save = async (name, data) => writeFile(join(batch, name + ".json"), JSON.stringify(data));
await save("members", members);
await save("bills-raw", bills);
await save("bills", normalized);
await save("tallies", tallies);
let voteRecords = 0, emptyVotes = 0;
const voteDir = join(batch, "votes");
await mkdir(voteDir);
for (const [i, tally] of tallies.entries()) {
  const id = str(tally.BILL_ID);
  if (!/^[a-zA-Z0-9_-]+$/.test(id)) throw new Error("Invalid bill ID");
  const rows = await collect(services.votes, { AGE: age, BILL_ID: id }, voteKey);
  if (rows.some(r => str(r.AGE) !== age || (str(r.BILL_ID) && str(r.BILL_ID) !== id))) throw new Error("Vote identity mismatch");
  if (!rows.length) emptyVotes++;
  voteRecords += rows.length;
  await writeFile(join(voteDir, id + ".json"), JSON.stringify({ billId: id, sourceUrl: base + services.votes, capturedAt: new Date().toISOString(), rows }));
  if ((i + 1) % 25 === 0) console.log("Vote agendas collected: " + (i + 1) + "/" + tallies.length);
}
if (!voteRecords) throw new Error("No individual vote records; snapshot not published");
const manifest = { age, capturedAt, completedAt: new Date().toISOString(), members: members.length, bills: bills.length, tallies: tallies.length, voteRecords, emptyVotes, unresolvedAuthors: normalized.reduce((n, bill) => n + bill.authors.filter(a => !a.memberId).length, 0), source: base, batch };
await save("manifest", manifest);
// Never replace the pointer with a failed/partial run.
const pending = join(out, "latest-" + process.pid + ".tmp");
await writeFile(pending, JSON.stringify(manifest));
await rename(pending, join(out, "latest.json"));
console.log(JSON.stringify(manifest, null, 2));
