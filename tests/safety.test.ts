import { describe, expect, it } from "vitest";
import { allowedAnalysisLabels, allowedFindingTypes, allowedReviewStatuses, assertNoBannedTerms, bannedTerms } from "../lib/analysis-labels";
import { analysisFindings, bills, evidenceRecords, publicOfficials, statements, votes } from "../lib/mock-data";

describe("safety wording", () => {
  it("allowed labels do not contain banned defamatory words", () => {
    for (const label of allowedAnalysisLabels) expect(() => assertNoBannedTerms(label)).not.toThrow();
  });

  it("analysis finding seed data does not contain banned defamatory words", () => {
    for (const finding of analysisFindings) expect(() => assertNoBannedTerms(`${finding.title} ${finding.summary}`)).not.toThrow();
  });

  it("visible Korean UI guardrail terms remain banned", () => {
    expect(bannedTerms).toContain("거짓말쟁이");
    expect(bannedTerms).toContain("조리돌림");
  });
});

describe("mock data integrity", () => {
  it("has deterministic MVP seed counts", () => {
    expect(publicOfficials).toHaveLength(3);
    expect(bills).toHaveLength(10);
    expect(votes).toHaveLength(15);
    expect(statements).toHaveLength(8);
    expect(evidenceRecords).toHaveLength(8);
    expect(analysisFindings).toHaveLength(5);
  });

  it("uses allowed finding types and review statuses", () => {
    const findingTypes = new Set(allowedFindingTypes);
    const reviewStatuses = new Set(allowedReviewStatuses);
    for (const finding of analysisFindings) {
      expect(findingTypes.has(finding.findingType)).toBe(true);
      expect(reviewStatuses.has(finding.reviewStatus)).toBe(true);
    }
  });
});
