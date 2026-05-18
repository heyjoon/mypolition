import Link from "next/link";
import { bills, publicOfficials, votes } from "@/lib/mock-data";

export default function MembersPage() {
  return (
    <div>
      <p className="mb-2 text-sm font-semibold text-civic-teal">국회의원 공개 기록</p>
      <h1 className="text-3xl font-bold">국회의원 목록</h1>
      <p className="mt-3 text-civic-muted">목업 데이터로 구성된 국회의원 공개 기록입니다.</p>
      <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {publicOfficials.map((member) => {
          const memberBills = bills.filter((bill) => bill.publicOfficialId === member.id);
          const memberVotes = votes.filter((vote) => vote.publicOfficialId === member.id);
          return (
            <article key={member.id} className="rounded-lg border border-civic-line bg-white p-5">
              <div className="flex gap-4">
                <div className="relative flex h-20 w-20 shrink-0 items-center justify-center overflow-hidden rounded-lg border border-civic-line bg-gradient-to-br from-sky-100 to-teal-50 text-civic-blue" aria-label={`${member.name} 프로필 사진 자리`}>
                  <div className="absolute left-1/2 top-5 h-7 w-7 -translate-x-1/2 rounded-full bg-white/65" />
                  <div className="absolute bottom-[-18px] left-1/2 h-16 w-20 -translate-x-1/2 rounded-t-full bg-white/55" />
                  <span className="relative z-10 text-2xl font-bold">{member.name.slice(0, 1)}</span>
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-semibold text-civic-teal">{member.officeType}</p>
                  <h2 className="mt-1 text-xl font-bold">{member.name}</h2>
                  <p className="mt-2 text-sm text-civic-muted">{member.party} · {member.district}</p>
                  <p className="mt-1 text-sm text-civic-muted">{member.committee}</p>
                </div>
              </div>
              <div className="mt-5 grid grid-cols-3 gap-2 text-center text-sm">
                <div className="rounded bg-civic-panel p-2"><b>{memberBills.filter((bill) => bill.role === "대표발의").length}</b><p className="text-xs text-civic-muted">대표발의</p></div>
                <div className="rounded bg-civic-panel p-2"><b>{memberBills.filter((bill) => bill.role === "공동발의").length}</b><p className="text-xs text-civic-muted">공동발의</p></div>
                <div className="rounded bg-civic-panel p-2"><b>{memberVotes.length}</b><p className="text-xs text-civic-muted">표결</p></div>
              </div>
              <Link className="mt-5 inline-flex rounded bg-civic-blue px-4 py-2 text-sm font-semibold text-white" href={`/members/${member.id}`}>기록 보기</Link>
            </article>
          );
        })}
      </div>
    </div>
  );
}
