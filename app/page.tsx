import Link from "next/link";
import { bills, evidenceRecords, publicOfficials, statements, votes } from "@/lib/mock-data";

export default function HomePage() {
  const featuredMember = publicOfficials[0];
  const evidenceItems = [...bills, ...votes, ...statements, ...evidenceRecords];
  const officialEvidenceCount = evidenceItems.filter((item) => item.evidenceGrade === "A" || item.evidenceGrade === "B").length;
  const officialEvidenceRatio = Math.round((officialEvidenceCount / evidenceItems.length) * 100);

  return (
    <div className="space-y-10">
      <section className="grid gap-8 py-6 md:grid-cols-[240px_1.2fr_0.8fr] md:items-center">
        <aside>
          <div className="relative flex h-64 w-full items-center justify-center overflow-hidden rounded-lg border border-civic-line bg-gradient-to-br from-sky-100 to-teal-50 text-civic-blue md:h-80" aria-label={`${featuredMember.name} 국회의원 사진 자리`}>
            <div className="absolute left-1/2 top-1/3 h-16 w-16 -translate-x-1/2 rounded-full border border-white/70 bg-white/60" />
            <div className="absolute bottom-[-18%] left-1/2 h-32 w-36 -translate-x-1/2 rounded-t-full border border-white/70 bg-white/55" />
            <span className="relative z-10 text-4xl font-bold">{featuredMember.name.slice(0, 1)}</span>
            <span className="absolute bottom-3 left-3 right-3 rounded bg-white/80 px-2 py-1 text-center text-xs font-semibold text-civic-muted">국회의원 사진 자리</span>
          </div>
          <p className="mt-3 text-xs leading-5 text-civic-muted">MVP에서는 실제 인물 사진 대신 목업 프로필 영역을 표시합니다.</p>
        </aside>
        <div>
          <p className="mb-2 text-sm font-semibold text-civic-teal">공식 기록 기준</p>
          <h1 className="text-3xl font-bold leading-tight md:text-4xl">공직자 기록 대시보드</h1>
          <p className="mt-3 max-w-3xl text-base leading-7 text-civic-muted">선출직 공직자의 공개 발언과 공식 행동을 근거 기반으로 추적합니다. MVP는 국회의원 공개 기록을 중심으로 시작합니다.</p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link className="rounded bg-civic-blue px-5 py-3 text-sm font-semibold text-white" href="/members">국회의원 기록 보기</Link>
            <Link className="rounded border border-civic-line bg-white px-5 py-3 text-sm font-semibold" href="/issues">의제별 보기</Link>
            <Link className="rounded border border-civic-line bg-white px-5 py-3 text-sm font-semibold" href="/compare">기록 비교</Link>
          </div>
        </div>
        <div className="rounded-lg border border-civic-line bg-white p-5">
          <label className="text-sm font-semibold" htmlFor="member-search">지역구 또는 의원 검색</label>
          <input id="member-search" className="mt-3 w-full rounded border border-civic-line px-4 py-3 text-sm" placeholder="예: 서울 한빛구, 김도현" type="search" />
          <p className="mt-3 text-xs leading-5 text-civic-muted">현재는 목업 검색 입력입니다. 실제 검색과 외부 데이터 연동은 이후 단계에서 추가됩니다.</p>
        </div>
      </section>
      <section className="grid gap-4 md:grid-cols-3">
        <div className="rounded-lg border border-civic-line bg-white p-5"><p className="text-2xl font-bold">{publicOfficials.length}</p><p className="mt-1 text-sm text-civic-muted">목업 국회의원</p></div>
        <div className="rounded-lg border border-civic-line bg-white p-5"><div className="flex items-end justify-between gap-3"><div><p className="text-2xl font-bold">{officialEvidenceRatio}%</p><p className="mt-1 text-sm text-civic-muted">공식 근거 비율</p></div><p className="text-xs font-semibold text-civic-blue">A·B 등급</p></div><div className="mt-4 h-2 rounded bg-civic-panel"><div className="h-2 rounded bg-civic-blue" style={{ width: `${officialEvidenceRatio}%` }} /></div><p className="mt-3 text-xs leading-5 text-civic-muted">전체 목업 기록 {evidenceItems.length}건 중 공식·준공식 출처 기준입니다.</p></div>
        <div className="rounded-lg border border-civic-line bg-white p-5"><p className="text-2xl font-bold">판단 보류</p><p className="mt-1 text-sm text-civic-muted">자동 탐지는 최종 판단으로 표시하지 않습니다.</p></div>
      </section>
      <section className="rounded-lg border border-civic-line bg-white p-5"><div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between"><div><h2 className="text-xl font-bold">공개 기록 비교</h2><p className="mt-2 text-sm leading-6 text-civic-muted">여러 의원의 법안, 표결, 불참, 검토 상태를 같은 기준으로 나란히 확인합니다. 비교 화면은 순위나 점수가 아니라 공개 기록 항목의 차이를 보여줍니다.</p></div><Link className="inline-flex rounded bg-civic-blue px-4 py-2 text-sm font-semibold text-white" href="/compare">비교 페이지 열기</Link></div></section>
      <section className="rounded-lg border border-civic-line bg-white p-5"><h2 className="text-lg font-bold">안전 안내</h2><p className="mt-2 text-sm leading-6 text-civic-muted">이 분석은 공개 기록 기반 자동 탐지 결과이며 최종 판단이 아닙니다. 맥락 확인과 반론 검토가 필요할 수 있습니다.</p></section>
    </div>
  );
}
