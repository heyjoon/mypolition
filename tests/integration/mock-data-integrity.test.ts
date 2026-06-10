import { describe, expect, it } from "vitest";
import { allowedFindingTypes, allowedReviewStatuses, assertNoBannedTerms } from "../../lib/analysis-labels";
import {
  analysisFindings,
  bills,
  evidenceRecords,
  publicOfficials,
  statements,
  votes
} from "../../lib/mock-data";
import { expectedSeedCounts } from "../fixtures/expected-counts";

describe("mock data integrity", () => {
  it("keeps deterministic seed counts", () => {
    expect(publicOfficials).toHaveLength(expectedSeedCounts.publicOfficials);
    expect(bills).toHaveLength(expectedSeedCounts.bills);
    expect(votes).toHaveLength(expectedSeedCounts.votes);
    expect(statements).toHaveLength(expectedSeedCounts.statements);
    expect(evidenceRecords).toHaveLength(expectedSeedCounts.evidenceRecords);
    expect(analysisFindings).toHaveLength(expectedSeedCounts.analysisFindings);
  });

  it("keeps records attached to fake public officials", () => {
    const memberIds = new Set(publicOfficials.map((member) => member.id));

    for (const bill of bills) {
      expect(memberIds.has(bill.publicOfficialId)).toBe(true);
    }

    for (const vote of votes) {
      expect(memberIds.has(vote.publicOfficialId)).toBe(true);
    }

    for (const finding of analysisFindings) {
      expect(memberIds.has(finding.publicOfficialId)).toBe(true);
    }
  });

  it("uses allowed finding and review statuses", () => {
    const findingTypes = new Set(allowedFindingTypes);
    const reviewStatuses = new Set(allowedReviewStatuses);

    for (const finding of analysisFindings) {
      expect(findingTypes.has(finding.findingType)).toBe(true);
      expect(reviewStatuses.has(finding.reviewStatus)).toBe(true);
    }
  });

  it("keeps analysis findings free from banned terms", () => {
    for (const finding of analysisFindings) {
      expect(() => assertNoBannedTerms(`${finding.title} ${finding.summary}`)).not.toThrow();
    }
  });
});
