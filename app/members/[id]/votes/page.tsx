import Link from "next/link";
import { notFound } from "next/navigation";
import { getMemberById, getMemberVotes, publicOfficials } from "@/lib/mock-data";

export function generateStaticParams() {
  return publicOfficials.map((member) => ({ id: member.id }));
}

export default function MemberVotesPage({ params }: { params: { id: string } }) {
  const member = getMemberById(params.id);
  if (!member) notFound();
  const memberVotes = getMemberVotes(member.id);
  return (
    <div>
      <p className="mb-2 text-sm font-semibold text-civic-teal">{member.name} 공개 기록</p>
      <h1 className="text-3xl font-bold">표결 목록</h1>
      <p className="mt-3 text-civic-muted">찬성, 반대, 기권, 불참 표결을 공개 기록 기준으로 표시합니다.</p>
      <Link className="mt-5 inline-flex rounded border border-civic-line bg-white px-4 py-2 text-sm font-semibold" href={`/members/${member.id}`}>대시보드로 돌아가기</Link>
      <div className="mt-5 grid gap-4">{memberVotes.map((vote) => <article key={vote.id} className="rounded-lg border border-civic-line bg-white p-5"><span className="rounded bg-civic-blue px-2.5 py-1 text-xs font-bold text-white">{vote.voteResult}</span><h2 className="mt-3 text-lg font-bold">{vote.billTitle}</h2><p className="mt-2 text-sm text-civic-muted">{vote.votedAt}</p><p className="mt-4 text-xs text-civic-muted">출처: {vote.sourceName} · 근거 {vote.evidenceGrade}</p></article>)}</div>
    </div>
  );
}
