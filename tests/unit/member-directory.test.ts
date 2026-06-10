import { describe, expect, it } from "vitest";
import { createMemberDirectoryRecords, filterMemberDirectory, getDirectoryOptions } from "../../lib/member-directory";
import { bills, publicOfficials, votes } from "../../lib/mock-data";

const records = createMemberDirectoryRecords({ members: publicOfficials, bills, votes });

describe("member directory", () => {
  it("builds searchable summary records for every public official", () => {
    expect(records).toHaveLength(publicOfficials.length);
    expect(records[0]).toMatchObject({
      representativeBillCount: 2,
      coSponsoredBillCount: 2,
      voteCount: 5,
      absenceCount: 1
    });
  });

  it("filters by Korean search text across profile fields and issue tags", () => {
    expect(filterMemberDirectory(records, { query: "한빛구" }).map((record) => record.member.id)).toEqual([
      "member-01"
    ]);
    expect(filterMemberDirectory(records, { query: "보건의료" }).map((record) => record.member.id)).toEqual([
      "member-02"
    ]);
  });

  it("combines party, committee, and issue filters", () => {
    const filtered = filterMemberDirectory(records, {
      party: "국민생활당",
      committee: "환경노동위원회",
      issueTag: "노동"
    });

    expect(filtered.map((record) => record.member.id)).toEqual(["member-03"]);
  });

  it("returns deterministic filter options", () => {
    expect(getDirectoryOptions(records).parties).toEqual(["공공미래당", "국민생활당", "시민개혁당"]);
  });
});
