import Link from "next/link";
import { MemberPortrait } from "@/components/MemberPortrait";
import { PageHeader } from "@/components/PageHeader";
import { SafetyNotice } from "@/components/SafetyNotice";
import { calculateInconsistencySignalRate, calculateVoteAttendanceRate } from "@/lib/member-metrics";
import {
  getMemberBills,
  getMemberFindings,
  getMemberStatements,
  getMemberVotes,
  publicOfficials
} from "@/lib/mock-data";

function getComparisonRows() {
  return publicOfficials.map((member) => {
    const memberBills = getMemberBills(member.id);
    const memberVotes = getMemberVotes(member.id);
    const findings = getMemberFindings(member.id);
    const statements = getMemberStatements(member.id);
    const attendanceRate = calculateVoteAttendanceRate(memberVotes);
    const inconsistencySignalRate = calculateInconsistencySignalRate({ findings, statements });
    const issueTags = Array.from(
      new Set([...memberBills.flatMap((bill) => bill.issueTags), ...memberVotes.flatMap((vote) => vote.issueTags)])
    );

    return {
      member,
      representativeBillCount: memberBills.filter((bill) => bill.role === "대표발의").length,
      coSponsoredBillCount: memberBills.filter((bill) => bill.role === "공동발의").length,
      voteCount: memberVotes.length,
      absenceCount: memberVotes.filter((vote) => vote.voteResult === "불참").length,
      attendanceRate,
      inconsistencySignalRate,
      pendingReviewCount: findings.filter((finding) => finding.reviewStatus === "HUMAN_REVIEW_PENDING").length,
      issueTags
    };
  });
}

export default function ComparePage() {
  const rows = getComparisonRows();
  const maxRepresentativeBills = Math.max(...rows.map((row) => row.representativeBillCount), 1);
  const maxVotes = Math.max(...rows.map((row) => row.voteCount), 1);

  return (
    <div className="space-y-8">
      <PageHeader
        eyebrow="공식 기록 기준"
        title="공개 기록 비교"
        description="국회의원별 공개 기록을 같은 기준으로 나란히 확인합니다. 이 화면은 순위, 점수, 우열 판단이 아니라 기록 항목의 차이를 보여주는 비교 도구입니다."
      />

      <section className="rounded-lg border border-civic-line bg-white p-5">
        <h2 className="text-xl font-bold tracking-[0]">비교 원칙</h2>
        <p className="mt-2 text-sm leading-6 text-civic-muted">
          수치가 높거나 낮다는 이유만으로 긍정 또는 부정 판단을 하지 않습니다. 상임위, 지역 의제, 회의 일정,
          법안 성격이 다를 수 있으므로 각 항목은 공개 기록 확인을 위한 출발점으로만 봐야 합니다.
        </p>
      </section>

      <section className="grid gap-4 lg:grid-cols-3">
        {rows.map((row) => (
          <article key={row.member.id} className="rounded-lg border border-civic-line bg-white p-5">
            <div className="flex gap-4">
              <MemberPortrait member={row.member} size="sm" />
              <div>
                <p className="text-sm font-semibold text-civic-teal">{row.member.officeType}</p>
                <h2 className="mt-1 text-xl font-bold tracking-[0]">{row.member.name}</h2>
                <p className="mt-1 text-sm text-civic-muted">{row.member.party}</p>
                <p className="mt-1 text-sm text-civic-muted">{row.member.district}</p>
              </div>
            </div>

            <dl className="mt-5 grid gap-3 text-sm">
              <MetricBar label="대표발의" value={row.representativeBillCount} max={maxRepresentativeBills} />
              <MetricBar label="공동발의" value={row.coSponsoredBillCount} max={maxRepresentativeBills} />
              <MetricBar label="표결 기록" value={row.voteCount} max={maxVotes} />
              <MetricBar label="불참 기록" value={row.absenceCount} max={maxVotes} muted />
              <MetricBar label="투표 참석률" value={row.attendanceRate.percentage ?? 0} max={100} suffix="%" />
              <MetricBar
                label="불일치 가능성"
                value={row.inconsistencySignalRate.percentage ?? 0}
                max={100}
                suffix="%"
                muted
              />
            </dl>

            <div className="mt-5">
              <p className="text-xs font-semibold text-civic-muted">주요 의제</p>
              <div className="mt-2 flex flex-wrap gap-2">
                {row.issueTags.slice(0, 5).map((tag) => (
                  <span key={tag} className="rounded border border-civic-line px-2 py-1 text-xs text-civic-muted">
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <Link
              className="focus-ring mt-5 inline-flex rounded border border-civic-line px-4 py-2 text-sm font-semibold hover:border-civic-blue"
              href={`/members/${row.member.id}`}
            >
              상세 기록 보기
            </Link>
          </article>
        ))}
      </section>

      <section className="overflow-hidden rounded-lg border border-civic-line bg-white">
        <div className="border-b border-civic-line p-5">
          <h2 className="text-xl font-bold tracking-[0]">항목별 비교 표</h2>
          <p className="mt-2 text-sm text-civic-muted">모든 값은 현재 목업 공개 기록 기준입니다.</p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[760px] border-collapse text-left text-sm">
            <thead className="bg-civic-panel text-civic-muted">
              <tr>
                <th className="border-b border-civic-line px-5 py-3 font-semibold">이름</th>
                <th className="border-b border-civic-line px-5 py-3 font-semibold">정당</th>
                <th className="border-b border-civic-line px-5 py-3 font-semibold">지역구</th>
                <th className="border-b border-civic-line px-5 py-3 font-semibold">상임위</th>
                <th className="border-b border-civic-line px-5 py-3 font-semibold">대표발의</th>
                <th className="border-b border-civic-line px-5 py-3 font-semibold">공동발의</th>
                <th className="border-b border-civic-line px-5 py-3 font-semibold">표결</th>
                <th className="border-b border-civic-line px-5 py-3 font-semibold">불참</th>
                <th className="border-b border-civic-line px-5 py-3 font-semibold">투표 참석률</th>
                <th className="border-b border-civic-line px-5 py-3 font-semibold">불일치 가능성</th>
                <th className="border-b border-civic-line px-5 py-3 font-semibold">사람 검토 필요</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr key={row.member.id} className="border-b border-civic-line last:border-b-0">
                  <td className="px-5 py-4 font-semibold text-civic-ink">{row.member.name}</td>
                  <td className="px-5 py-4 text-civic-muted">{row.member.party}</td>
                  <td className="px-5 py-4 text-civic-muted">{row.member.district}</td>
                  <td className="px-5 py-4 text-civic-muted">{row.member.committee}</td>
                  <td className="px-5 py-4">{row.representativeBillCount}</td>
                  <td className="px-5 py-4">{row.coSponsoredBillCount}</td>
                  <td className="px-5 py-4">{row.voteCount}</td>
                  <td className="px-5 py-4">{row.absenceCount}</td>
                  <td className="px-5 py-4">{row.attendanceRate.display}</td>
                  <td className="px-5 py-4">{row.inconsistencySignalRate.display}</td>
                  <td className="px-5 py-4">{row.pendingReviewCount}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <SafetyNotice />
    </div>
  );
}

function MetricBar({
  label,
  value,
  max,
  suffix = "",
  muted = false
}: {
  label: string;
  value: number;
  max: number;
  suffix?: string;
  muted?: boolean;
}) {
  const width = `${Math.max((value / max) * 100, 8)}%`;

  return (
    <div>
      <div className="flex items-center justify-between">
        <dt className="font-medium text-civic-muted">{label}</dt>
        <dd className="font-bold text-civic-ink">
          {value}
          {suffix}
        </dd>
      </div>
      <div className="mt-2 h-2 rounded bg-civic-panel">
        <div className={`h-2 rounded ${muted ? "bg-civic-muted" : "bg-civic-blue"}`} style={{ width }} />
      </div>
    </div>
  );
}
