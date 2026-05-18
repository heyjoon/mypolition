import Link from "next/link";
import { notFound } from "next/navigation";
import { getMemberBills, getMemberById, getMemberFindings, getMemberVotes, publicOfficials } from "@/lib/mock-data";

export function generateStaticParams() {
  return publicOfficials.map((member) => ({ id: member.id }));
}

export default function MemberDetailPage({ params }: { params: { id: string } }) {
  const member = getMemberById(params.id);
  if (!member) notFound();
  const memberBills = getMemberBills(member.id);
  const memberVotes = getMemberVotes(member.id);
  const findings = getMemberFindings(member.id);
  const tags = Array.from(new Set([...memberBills.flatMap((bill) => bill.issueTags), ...memberVotes.flatMap((vote) => vote.issueTags)]));
  return (
    <div className="space-y-6">
      <section className="rounded-lg border border-civic-line bg-white p-6">
        <p className="text-sm font-semibold text-civic-teal">{member.officeType}</p>
        <h1 className="mt-2 text-3xl font-bold">{member.name}</h1>
        <p className="mt-2 text-sm text-civic-muted">{member.party} · {member.district} · {member.committee}</p>
        <p className="mt-4 text-sm leading-6 text-civic-muted">{member.profileSummary}</p>
      </section>
      <div className="grid gap-4 md:grid-cols-4">
        <Metric label="대표발의" value={memberBills.filter((bill) => bill.role === "대표발의").length} />
        <Metric label="공동발의" value={memberBills.filter((bill) => bill.role === "공동발의").length} />
        <Metric label="표결" value={memberVotes.length} />
        <Metric label="불참" value={memberVotes.filter((vote) => vote.voteResult === "불참").length} />
      </div>
      <div className="flex gap-2"><Link className="rounded bg-civic-blue px-4 py-2 text-sm font-semibold text-white" href={`/members/${member.id}/bills`}>법안 보기</Link><Link className="rounded border border-civic-line bg-white px-4 py-2 text-sm font-semibold" href={`/members/${member.id}/votes`}>표결 보기</Link></div>
      <section className="rounded-lg border border-civic-line bg-white p-5"><h2 className="text-xl font-bold">의제 태그</h2><div className="mt-4 flex flex-wrap gap-2">{tags.map((tag) => <span key={tag} className="rounded border border-civic-line px-2.5 py-1 text-xs">{tag}</span>)}</div></section>
      <section className="space-y-4"><h2 className="text-xl font-bold">중립 분석 Findings</h2>{findings.map((finding) => <article key={finding.id} className="rounded-lg border border-civic-line bg-white p-5"><div className="flex gap-2"><span className="rounded border border-civic-amber px-2.5 py-1 text-xs font-semibold text-civic-amber">{finding.rebuttalStatus}</span><span className="rounded border border-civic-teal px-2.5 py-1 text-xs font-semibold text-civic-teal">사람 검토 필요</span></div><h3 className="mt-4 text-lg font-bold">{finding.title}</h3><p className="mt-2 text-sm leading-6 text-civic-muted">{finding.summary}</p><p className="mt-4 text-xs text-civic-muted">검토 상태: {finding.reviewStatus} · 생성일: {finding.createdAt}</p></article>)}</section>
      <section className="rounded-lg border border-civic-line bg-white p-5"><h2 className="text-lg font-bold">안전 안내</h2><p className="mt-2 text-sm leading-6 text-civic-muted">이 분석은 공개 기록 기반 자동 탐지 결과이며 최종 판단이 아닙니다. 맥락 확인과 반론 검토가 필요할 수 있습니다.</p></section>
    </div>
  );
}

function Metric({ label, value }: { label: string; value: number }) {
  return <div className="rounded-lg border border-civic-line bg-white p-4"><p className="text-sm text-civic-muted">{label}</p><p className="mt-2 text-3xl font-bold">{value}</p></div>;
}
