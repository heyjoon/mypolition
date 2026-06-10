import Link from "next/link";
import { EvidenceBadge } from "@/components/EvidenceBadge";
import { MemberPortrait } from "@/components/MemberPortrait";
import { PageHeader } from "@/components/PageHeader";
import { SafetyNotice } from "@/components/SafetyNotice";
import { selectMonthlyFeaturedOfficial } from "@/lib/monthly-featured";
import { analysisFindings, bills, evidenceRecords, publicOfficials, statements, votes } from "@/lib/mock-data";

export default function HomePage() {
  const featuredMember = publicOfficials[0];
  const monthlyFeatured = selectMonthlyFeaturedOfficial({
    members: publicOfficials,
    bills,
    votes,
    statements,
    evidenceRecords,
    findings: analysisFindings,
    monthLabel: "2026년 6월"
  });
  const evidenceItems = [...bills, ...votes, ...statements, ...evidenceRecords];
  const officialEvidenceCount = evidenceItems.filter((item) => item.evidenceGrade === "A" || item.evidenceGrade === "B").length;
  const officialEvidenceRatio = Math.round((officialEvidenceCount / evidenceItems.length) * 100);

  return (
    <div className="space-y-10">
      <section className="grid gap-8 py-6 md:grid-cols-[240px_1.2fr_0.8fr] md:items-center">
        <aside className="max-w-xs">
          <MemberPortrait member={featuredMember} size="lg" label="국회의원 사진 자리" />
          <p className="mt-3 text-xs leading-5 text-civic-muted">
            MVP에서는 실제 인물 사진 대신 목업 프로필 영역을 표시합니다.
          </p>
        </aside>

        <div>
          <PageHeader
            eyebrow="공식 기록 기준"
            title="공직자 기록 대시보드"
            description="선출직 공직자의 공개 발언과 공식 행동을 근거 기반으로 추적합니다. MVP는 국회의원 공개 기록을 중심으로 시작하며, 이후 지방자치단체장과 지방의회 의원까지 확장할 수 있는 구조를 지향합니다."
          />
          <div className="flex flex-wrap gap-3">
            <Link className="focus-ring rounded bg-civic-blue px-5 py-3 text-sm font-semibold text-white hover:bg-civic-teal" href="/members">
              국회의원 기록 보기
            </Link>
            <Link className="focus-ring rounded border border-civic-line bg-white px-5 py-3 text-sm font-semibold text-civic-ink hover:border-civic-blue" href="/issues">
              의제별 보기
            </Link>
            <Link className="focus-ring rounded border border-civic-line bg-white px-5 py-3 text-sm font-semibold text-civic-ink hover:border-civic-blue" href="/compare">
              기록 비교
            </Link>
            <Link className="focus-ring rounded border border-civic-line bg-white px-5 py-3 text-sm font-semibold text-civic-ink hover:border-civic-blue" href="/assembly">
              실제 국회 데이터
            </Link>
          </div>
        </div>

        <div className="rounded-lg border border-civic-line bg-white p-5">
          <label className="text-sm font-semibold text-civic-ink" htmlFor="member-search">
            지역구 또는 의원 검색
          </label>
          <input
            id="member-search"
            className="mt-3 w-full rounded border border-civic-line px-4 py-3 text-sm outline-none focus:border-civic-blue"
            placeholder="예: 서울 한빛구, 김도현"
            type="search"
          />
          <p className="mt-3 text-xs leading-5 text-civic-muted">
            현재는 목업 검색 입력입니다. 실제 검색과 외부 데이터 연동은 이후 단계에서 추가됩니다.
          </p>
        </div>
      </section>

      <section className="rounded-lg border border-civic-line bg-white p-5">
        <div className="grid gap-6 lg:grid-cols-[260px_1fr_280px] lg:items-center">
          <MemberPortrait member={monthlyFeatured.member} size="md" label="이번 달 공개 기록 주목 공직자" />
          <div>
            <p className="text-sm font-semibold text-civic-teal">{monthlyFeatured.monthLabel} 공식 기록 기준</p>
            <h2 className="mt-2 text-2xl font-bold tracking-[0]">이번 달 공개 기록 주목 공직자</h2>
            <p className="mt-2 text-sm leading-6 text-civic-muted">
              요청하신 월간 대표 공직자 영역입니다. 다만 이 앱은 순위나 인물 평가를 제공하지 않으므로, 선정은
              공개 기록 활동을 보여주는 하이라이트로만 표시합니다.
            </p>
            <div className="mt-4 flex flex-wrap items-center gap-2">
              <span className="text-xl font-bold">{monthlyFeatured.member.name}</span>
              <span className="rounded border border-civic-line px-2.5 py-1 text-xs font-medium text-civic-muted">
                {monthlyFeatured.member.party}
              </span>
              <span className="rounded border border-civic-line px-2.5 py-1 text-xs font-medium text-civic-muted">
                {monthlyFeatured.member.district}
              </span>
              <EvidenceBadge grade="A" />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-2 text-sm">
            <FeaturedMetric label="투표 참석률" value={monthlyFeatured.attendanceRate.display} />
            <FeaturedMetric label="대표발의" value={`${monthlyFeatured.representativeBillCount}건`} />
            <FeaturedMetric label="공식 근거" value={`${monthlyFeatured.officialEvidenceCount}건`} />
            <FeaturedMetric label="불일치 가능성" value={monthlyFeatured.inconsistencySignalRate.display} />
          </div>
        </div>

        <div className="mt-5 rounded bg-civic-panel p-4">
          <p className="text-sm font-semibold text-civic-ink">선정 기준</p>
          <ul className="mt-2 grid gap-2 text-sm text-civic-muted md:grid-cols-2">
            {monthlyFeatured.basis.map((basis) => (
              <li key={basis}>{basis}</li>
            ))}
          </ul>
          <p className="mt-3 text-xs leading-5 text-civic-muted">
            이 영역은 공개 기록 기반 자동 선정 결과이며 최종 판단이 아닙니다. 맥락 확인과 반론 검토가 필요할 수 있습니다.
          </p>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        <div className="rounded-lg border border-civic-line bg-white p-5">
          <p className="text-2xl font-bold">{publicOfficials.length}</p>
          <p className="mt-1 text-sm text-civic-muted">목업 국회의원</p>
        </div>
        <div className="rounded-lg border border-civic-line bg-white p-5">
          <div className="flex items-end justify-between gap-3">
            <div>
              <p className="text-2xl font-bold">{officialEvidenceRatio}%</p>
              <p className="mt-1 text-sm text-civic-muted">공식 근거 비율</p>
            </div>
            <p className="text-xs font-semibold text-civic-blue">A·B 등급</p>
          </div>
          <div className="mt-4 h-2 rounded bg-civic-panel">
            <div className="h-2 rounded bg-civic-blue" style={{ width: `${officialEvidenceRatio}%` }} />
          </div>
          <p className="mt-3 text-xs leading-5 text-civic-muted">
            전체 목업 기록 {evidenceItems.length}건 중 공식·준공식 출처 기준입니다.
          </p>
        </div>
        <div className="rounded-lg border border-civic-line bg-white p-5">
          <p className="text-2xl font-bold">판단 보류</p>
          <p className="mt-1 text-sm text-civic-muted">자동 탐지는 최종 판단으로 표시하지 않습니다.</p>
        </div>
      </section>

      <section className="rounded-lg border border-civic-line bg-white p-5">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-xl font-bold tracking-[0]">공개 기록 비교</h2>
            <p className="mt-2 max-w-3xl text-sm leading-6 text-civic-muted">
              여러 의원의 법안, 표결, 불참, 검토 상태를 같은 기준으로 나란히 확인합니다. 비교 화면은 순위나
              점수가 아니라 공개 기록 항목의 차이를 보여줍니다.
            </p>
          </div>
          <Link className="focus-ring inline-flex rounded bg-civic-blue px-4 py-2 text-sm font-semibold text-white" href="/compare">
            비교 페이지 열기
          </Link>
        </div>
      </section>

      <SafetyNotice />
    </div>
  );
}

function FeaturedMetric({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded bg-civic-panel p-3">
      <p className="text-xs font-semibold text-civic-muted">{label}</p>
      <p className="mt-1 text-xl font-bold tracking-[0]">{value}</p>
    </div>
  );
}
