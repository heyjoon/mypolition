import Link from "next/link";
import { analysisFindings, bills, publicOfficials, votes } from "@/lib/mock-data";

function rows() {
  return publicOfficials.map((member) => {
    const memberBills = bills.filter((bill) => bill.publicOfficialId === member.id);
    const memberVotes = votes.filter((vote) => vote.publicOfficialId === member.id);
    const memberFindings = analysisFindings.filter((finding) => finding.publicOfficialId === member.id);
    const issueTags = Array.from(new Set([...memberBills.flatMap((bill) => bill.issueTags), ...memberVotes.flatMap((vote) => vote.issueTags)]));
    return {
      member,
      representativeBillCount: memberBills.filter((bill) => bill.role === "대표발의").length,
      coSponsoredBillCount: memberBills.filter((bill) => bill.role === "공동발의").length,
      voteCount: memberVotes.length,
      absenceCount: memberVotes.filter((vote) => vote.voteResult === "불참").length,
      reviewCount: memberFindings.filter((finding) => finding.reviewStatus === "HUMAN_REVIEW_PENDING").length,
      issueTags
    };
  });
}

export default function ComparePage() {
  const comparisonRows = rows();
  const maxBills = Math.max(...comparisonRows.map((row) => row.representativeBillCount), 1);
  const maxVotes = Math.max(...comparisonRows.map((row) => row.voteCount), 1);

  return (
    <div className="space-y-8">
      <section>
        <p className="mb-2 text-sm font-semibold text-civic-teal">공식 기록 기준</p>
        <h1 className="text-3xl font-bold">공개 기록 비교</h1>
        <p className="mt-3 max-w-3xl text-sm leading-6 text-civic-muted">국회의원별 공개 기록을 같은 기준으로 나란히 확인합니다. 이 화면은 순위, 점수, 우열 판단이 아니라 기록 항목의 차이를 보여주는 비교 도구입니다.</p>
      </section>
      <section className="rounded-lg border border-civic-line bg-white p-5"><h2 className="text-xl font-bold">비교 원칙</h2><p className="mt-2 text-sm leading-6 text-civic-muted">수치가 높거나 낮다는 이유만으로 긍정 또는 부정 판단을 하지 않습니다. 각 항목은 공개 기록 확인을 위한 출발점으로만 봐야 합니다.</p></section>
      <section className="grid gap-4 lg:grid-cols-3">
        {comparisonRows.map((row) => (
          <article key={row.member.id} className="rounded-lg border border-civic-line bg-white p-5">
            <p className="text-sm font-semibold text-civic-teal">{row.member.officeType}</p><h2 className="mt-1 text-xl font-bold">{row.member.name}</h2><p className="mt-1 text-sm text-civic-muted">{row.member.party} · {row.member.district}</p>
            <div className="mt-5 space-y-3"><Metric label="대표발의" value={row.representativeBillCount} max={maxBills} /><Metric label="공동발의" value={row.coSponsoredBillCount} max={maxBills} /><Metric label="표결 기록" value={row.voteCount} max={maxVotes} /><Metric label="불참 기록" value={row.absenceCount} max={maxVotes} muted /></div>
            <div className="mt-5 flex flex-wrap gap-2">{row.issueTags.slice(0, 5).map((tag) => <span key={tag} className="rounded border border-civic-line px-2 py-1 text-xs text-civic-muted">{tag}</span>)}</div>
            <Link className="mt-5 inline-flex rounded border border-civic-line px-4 py-2 text-sm font-semibold" href={`/members/${row.member.id}`}>상세 기록 보기</Link>
          </article>
        ))}
      </section>
      <section className="overflow-hidden rounded-lg border border-civic-line bg-white"><div className="border-b border-civic-line p-5"><h2 className="text-xl font-bold">항목별 비교 표</h2><p className="mt-2 text-sm text-civic-muted">모든 값은 현재 목업 공개 기록 기준입니다.</p></div><div className="overflow-x-auto"><table className="w-full min-w-[760px] text-left text-sm"><thead className="bg-civic-panel text-civic-muted"><tr><th className="px-5 py-3">이름</th><th className="px-5 py-3">정당</th><th className="px-5 py-3">지역구</th><th className="px-5 py-3">대표발의</th><th className="px-5 py-3">공동발의</th><th className="px-5 py-3">표결</th><th className="px-5 py-3">불참</th><th className="px-5 py-3">사람 검토 필요</th></tr></thead><tbody>{comparisonRows.map((row) => <tr key={row.member.id} className="border-t border-civic-line"><td className="px-5 py-4 font-semibold">{row.member.name}</td><td className="px-5 py-4 text-civic-muted">{row.member.party}</td><td className="px-5 py-4 text-civic-muted">{row.member.district}</td><td className="px-5 py-4">{row.representativeBillCount}</td><td className="px-5 py-4">{row.coSponsoredBillCount}</td><td className="px-5 py-4">{row.voteCount}</td><td className="px-5 py-4">{row.absenceCount}</td><td className="px-5 py-4">{row.reviewCount}</td></tr>)}</tbody></table></div></section>
      <section className="rounded-lg border border-civic-line bg-white p-5"><h2 className="text-lg font-bold">안전 안내</h2><p className="mt-2 text-sm leading-6 text-civic-muted">이 분석은 공개 기록 기반 자동 탐지 결과이며 최종 판단이 아닙니다. 맥락 확인과 반론 검토가 필요할 수 있습니다.</p></section>
    </div>
  );
}

function Metric({ label, value, max, muted = false }: { label: string; value: number; max: number; muted?: boolean }) {
  const width = `${Math.max((value / max) * 100, 8)}%`;
  return <div><div className="flex justify-between"><span className="text-civic-muted">{label}</span><b>{value}</b></div><div className="mt-2 h-2 rounded bg-civic-panel"><div className={`h-2 rounded ${muted ? "bg-civic-muted" : "bg-civic-blue"}`} style={{ width }} /></div></div>;
}
