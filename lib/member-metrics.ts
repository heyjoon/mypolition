import type { AnalysisFinding, Statement, Vote } from "./types";

const inconsistencyFindingTypes = new Set(["POTENTIAL_INCONSISTENCY", "POSITION_CHANGE_DETECTED"]);

export interface RatioMetric {
  numerator: number;
  denominator: number;
  percentage: number | null;
  display: string;
}

export function calculateVoteAttendanceRate(votes: Vote[]): RatioMetric {
  const denominator = votes.length;
  const numerator = votes.filter((vote) => vote.voteResult !== "불참").length;

  return createRatioMetric(numerator, denominator);
}

export function calculateInconsistencySignalRate({
  findings,
  statements
}: {
  findings: AnalysisFinding[];
  statements: Statement[];
}): RatioMetric {
  const numerator = findings.filter((finding) => inconsistencyFindingTypes.has(finding.findingType)).length;

  return createRatioMetric(numerator, statements.length);
}

export function createRatioMetric(numerator: number, denominator: number): RatioMetric {
  if (denominator === 0) {
    return {
      numerator,
      denominator,
      percentage: null,
      display: "검증 대기"
    };
  }

  const percentage = Math.round((numerator / denominator) * 100);

  return {
    numerator,
    denominator,
    percentage,
    display: `${percentage}%`
  };
}
