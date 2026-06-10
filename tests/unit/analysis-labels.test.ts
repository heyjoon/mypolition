import { describe, expect, it } from "vitest";
import {
  allowedAnalysisLabels,
  assertNoBannedTerms,
  bannedTerms,
  evidenceGradeDescriptions
} from "../../lib/analysis-labels";

describe("analysis labels", () => {
  it("allowed labels do not include banned terms", () => {
    for (const label of allowedAnalysisLabels) {
      expect(() => assertNoBannedTerms(label)).not.toThrow();
    }
  });

  it("detects banned terms when they appear", () => {
    expect(() => assertNoBannedTerms(`금지 표현: ${bannedTerms[0]}`)).toThrow();
  });

  it("defines all evidence grade descriptions", () => {
    expect(Object.keys(evidenceGradeDescriptions)).toEqual(["A", "B", "C", "D", "E"]);
  });
});
