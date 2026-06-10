import { calculateInconsistencySignalRate, calculateVoteAttendanceRate } from "./member-metrics";
import type { AnalysisFinding, Bill, Evidence, PublicOfficial, Statement, Vote } from "./types";

export interface MonthlyFeaturedRecord {
  member: PublicOfficial;
  monthLabel: string;
  attendanceRate: ReturnType<typeof calculateVoteAttendanceRate>;
  inconsistencySignalRate: ReturnType<typeof calculateInconsistencySignalRate>;
  representativeBillCount: number;
  officialEvidenceCount: number;
  pendingReviewCount: number;
  basis: string[];
}

export function selectMonthlyFeaturedOfficial({
  members,
  bills,
  votes,
  statements,
  evidenceRecords,
  findings,
  monthLabel
}: {
  members: PublicOfficial[];
  bills: Bill[];
  votes: Vote[];
  statements: Statement[];
  evidenceRecords: Evidence[];
  findings: AnalysisFinding[];
  monthLabel: string;
}): MonthlyFeaturedRecord {
  const records = members.map((member) => {
    const memberBills = bills.filter((bill) => bill.publicOfficialId === member.id);
    const memberVotes = votes.filter((vote) => vote.publicOfficialId === member.id);
    const memberStatements = statements.filter((statement) => statement.publicOfficialId === member.id);
    const memberFindings = findings.filter((finding) => finding.publicOfficialId === member.id);
    const memberEvidence = evidenceRecords.filter((evidence) => evidence.publicOfficialId === member.id);
    const attendanceRate = calculateVoteAttendanceRate(memberVotes);
    const inconsistencySignalRate = calculateInconsistencySignalRate({
      findings: memberFindings,
      statements: memberStatements
    });
    const representativeBillCount = memberBills.filter((bill) => bill.role === "대표발의").length;
    const officialEvidenceCount = memberEvidence.filter(
      (evidence) => evidence.evidenceGrade === "A" || evidence.evidenceGrade === "B"
    ).length;
    const pendingReviewCount = memberFindings.filter((finding) => finding.reviewStatus === "HUMAN_REVIEW_PENDING").length;

    return {
      member,
      monthLabel,
      attendanceRate,
      inconsistencySignalRate,
      representativeBillCount,
      officialEvidenceCount,
      pendingReviewCount,
      basis: [
        `투표 참석률 ${attendanceRate.display}`,
        `대표발의 ${representativeBillCount}건`,
        `A·B 등급 근거 ${officialEvidenceCount}건`,
        `불일치 가능성 비율 ${inconsistencySignalRate.display}`
      ]
    };
  });

  return records.sort(compareFeaturedRecords)[0];
}

function compareFeaturedRecords(a: MonthlyFeaturedRecord, b: MonthlyFeaturedRecord) {
  return (
    (b.attendanceRate.percentage ?? -1) - (a.attendanceRate.percentage ?? -1) ||
    b.representativeBillCount - a.representativeBillCount ||
    b.officialEvidenceCount - a.officialEvidenceCount ||
    a.pendingReviewCount - b.pendingReviewCount ||
    a.member.name.localeCompare(b.member.name, "ko")
  );
}
