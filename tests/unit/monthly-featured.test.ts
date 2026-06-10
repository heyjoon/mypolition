import { describe, expect, it } from "vitest";
import { selectMonthlyFeaturedOfficial } from "../../lib/monthly-featured";
import { analysisFindings, bills, evidenceRecords, publicOfficials, statements, votes } from "../../lib/mock-data";

describe("monthly featured official", () => {
  it("selects one featured official using deterministic public-record criteria", () => {
    const featured = selectMonthlyFeaturedOfficial({
      members: publicOfficials,
      bills,
      votes,
      statements,
      evidenceRecords,
      findings: analysisFindings,
      monthLabel: "2026년 6월"
    });

    expect(featured.member.id).toBe("member-02");
    expect(featured.attendanceRate.display).toBe("100%");
    expect(featured.basis).toContain("투표 참석률 100%");
  });
});
