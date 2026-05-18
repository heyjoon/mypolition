import Link from "next/link";
import { notFound } from "next/navigation";
import { getMemberBills, getMemberById, publicOfficials } from "@/lib/mock-data";

export function generateStaticParams() {
  return publicOfficials.map((member) => ({ id: member.id }));
}

export default function MemberBillsPage({ params }: { params: { id: string } }) {
  const member = getMemberById(params.id);
  if (!member) notFound();
  const memberBills = getMemberBills(member.id);
  return (
    <div>
      <p className="mb-2 text-sm font-semibold text-civic-teal">{member.name} 공개 기록</p>
      <h1 className="text-3xl font-bold">법안 목록</h1>
      <p className="mt-3 text-civic-muted">대표발의와 공동발의 법안을 구분해 표시합니다.</p>
      <Link className="mt-5 inline-flex rounded border border-civic-line bg-white px-4 py-2 text-sm font-semibold" href={`/members/${member.id}`}>대시보드로 돌아가기</Link>
      <div className="mt-5 grid gap-4">{memberBills.map((bill) => <article key={bill.id} className="rounded-lg border border-civic-line bg-white p-5"><p className="text-sm font-semibold text-civic-teal">{bill.role}</p><h2 className="mt-1 text-lg font-bold">{bill.title}</h2><p className="mt-2 text-sm text-civic-muted">{bill.status} · {bill.proposedAt}</p><p className="mt-4 text-xs text-civic-muted">출처: {bill.sourceName} · 근거 {bill.evidenceGrade}</p></article>)}</div>
    </div>
  );
}
