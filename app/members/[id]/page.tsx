import Link from "next/link";
import { notFound } from "next/navigation";
import { AnalysisFindingCard } from "@/components/AnalysisFindingCard";
import { EvidenceBadge } from "@/components/EvidenceBadge";
import { IssueTag } from "@/components/IssueTag";
import { MemberProfileHeader } from "@/components/MemberProfileHeader";
import { SafetyNotice } from "@/components/SafetyNotice";
import { SummaryMetricCard } from "@/components/SummaryMetricCard";
import { calculateInconsistencySignalRate, calculateVoteAttendanceRate } from "@/lib/member-metrics";
import {
  getMemberBills,
  getMemberById,
  getMemberEvidence,
  getMemberFindings,
  getMemberStatements,
  getMemberVotes,
  publicOfficials
} from "@/lib/mock-data";

export function generateStaticParams() {
  return publicOfficials.map((member) => ({ id: member.id }));
}

export default function MemberDetailPage({ params }: { params: { id: string } }) {
  const member = getMemberById(params.id);

  if (!member) {
    notFound();
  }

  const memberBills = getMemberBills(member.id);
  const memberVotes = getMemberVotes(member.id);
  const evidence = getMemberEvidence(member.id);
  const findings = getMemberFindings(member.id);
  const statements = getMemberStatements(member.id);
  const attendanceRate = calculateVoteAttendanceRate(memberVotes);
  const inconsistencySignalRate = calculateInconsistencySignalRate({ findings, statements });
  const issueTags = Array.from(new Set([...memberBills.flatMap((bill) => bill.issueTags), ...memberVotes.flatMap((vote) => vote.issueTags)]));

  return (
    <div className="space-y-6">
      <MemberProfileHeader member={member} />

      <div className="grid gap-4 md:grid-cols-3 xl:grid-cols-6">
        <SummaryMetricCard label="대표발의" value={memberBills.filter((bill) => bill.role === "대표발의").length} />
        <SummaryMetricCard label="공동발의" value={memberBills.filter((bill) => bill.role === "공동발의").length} />
        <SummaryMetricCard label="표결" value={memberVotes.length} />
        <SummaryMetricCard label="불참" value={memberVotes.filter((vote) => vote.voteResult === "불참").length} />
        <SummaryMetricCard
          label="국회투표 참석률"
          value={attendanceRate.display}
          hint={`${attendanceRate.numerator}/${attendanceRate.denominator}건 참석 기준`}
        />
        <SummaryMetricCard
          label="불일치 가능성 비율"
          value={inconsistencySignalRate.display}
          hint={`${inconsistencySignalRate.numerator}/${inconsistencySignalRate.denominator}건 공개 발언 기준`}
        />
      </div>

      <section className="rounded-lg border border-civic-line bg-white p-5">
        <h2 className="text-xl font-bold tracking-[0]">비율 해석 안내</h2>
        <p className="mt-2 text-sm leading-6 text-civic-muted">
          국회투표 참석률은 현재 확보된 표결 기록 중 불참을 제외한 비율입니다. 불일치 가능성 비율은 과거 공개
          발언과 공식 행동 사이의 자동 탐지 신호를 공개 발언 수 기준으로 나눈 값이며, 최종 판단이 아닙니다.
          맥락 확인과 반론 검토가 필요할 수 있습니다.
        </p>
      </section>

      <section className="rounded-lg border border-civic-line bg-white p-5">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-xl font-bold tracking-[0]">기록 탐색</h2>
            <p className="mt-1 text-sm text-civic-muted">법안과 표결 기록을 분리해서 확인할 수 있습니다.</p>
          </div>
          <div className="flex gap-2">
            <Link className="focus-ring rounded bg-civic-blue px-4 py-2 text-sm font-semibold text-white" href={`/members/${member.id}/bills`}>
              법안 보기
            </Link>
            <Link className="focus-ring rounded border border-civic-line px-4 py-2 text-sm font-semibold" href={`/members/${member.id}/votes`}>
              표결 보기
            </Link>
          </div>
        </div>
      </section>

      <section className="grid gap-6 md:grid-cols-[0.8fr_1.2fr]">
        <div className="rounded-lg border border-civic-line bg-white p-5">
          <h2 className="text-xl font-bold tracking-[0]">의제 태그</h2>
          <div className="mt-4 flex flex-wrap gap-2">
            {issueTags.map((tag) => (
              <IssueTag key={tag} label={tag} />
            ))}
          </div>
          <h2 className="mt-6 text-xl font-bold tracking-[0]">근거 배지</h2>
          <div className="mt-4 flex flex-wrap gap-2">
            {Array.from(new Set(evidence.map((item) => item.evidenceGrade))).map((grade) => (
              <EvidenceBadge key={grade} grade={grade} />
            ))}
          </div>
        </div>

        <section className="space-y-4">
          <h2 className="text-xl font-bold tracking-[0]">중립 분석 Findings</h2>
          {findings.map((finding) => (
            <AnalysisFindingCard key={finding.id} finding={finding} evidence={evidence} />
          ))}
        </section>
      </section>

      <SafetyNotice />
    </div>
  );
}
