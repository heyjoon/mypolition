import { describe, expect, it } from "vitest";
import { calculateInconsistencySignalRate, calculateVoteAttendanceRate } from "../../lib/member-metrics";
import { getMemberFindings, getMemberStatements, getMemberVotes } from "../../lib/mock-data";

describe("member metrics", () => {
  it("calculates National Assembly vote attendance from non-absence votes", () => {
    const metric = calculateVoteAttendanceRate(getMemberVotes("member-01"));

    expect(metric).toEqual({
      numerator: 4,
      denominator: 5,
      percentage: 80,
      display: "80%"
    });
  });

  it("calculates potential inconsistency signal rate from neutral finding types", () => {
    const metric = calculateInconsistencySignalRate({
      findings: getMemberFindings("member-03"),
      statements: getMemberStatements("member-03")
    });

    expect(metric).toEqual({
      numerator: 1,
      denominator: 3,
      percentage: 33,
      display: "33%"
    });
  });

  it("keeps unavailable ratios in review-pending wording", () => {
    expect(calculateVoteAttendanceRate([]).display).toBe("검증 대기");
  });
});
