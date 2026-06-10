import Link from "next/link";
import { calculateInconsistencySignalRate, calculateVoteAttendanceRate } from "@/lib/member-metrics";
import { getMemberBills, getMemberFindings, getMemberStatements, getMemberVotes } from "@/lib/mock-data";
import type { PublicOfficial } from "@/lib/types";
import { IssueTag } from "./IssueTag";
import { MemberPortrait } from "./MemberPortrait";

export function MemberCard({ member }: { member: PublicOfficial }) {
  const memberBills = getMemberBills(member.id);
  const memberVotes = getMemberVotes(member.id);
  const findings = getMemberFindings(member.id);
  const statements = getMemberStatements(member.id);
  const attendanceRate = calculateVoteAttendanceRate(memberVotes);
  const inconsistencySignalRate = calculateInconsistencySignalRate({ findings, statements });
  const tags = Array.from(new Set(memberBills.flatMap((bill) => bill.issueTags))).slice(0, 3);

  return (
    <article className="rounded-lg border border-civic-line bg-white p-5">
      <div className="flex items-start gap-4">
        <MemberPortrait member={member} size="sm" />
        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="text-sm font-semibold text-civic-teal">{member.officeType}</p>
              <h2 className="mt-1 text-xl font-bold tracking-[0]">{member.name}</h2>
            </div>
            <span className="rounded border border-civic-line px-2.5 py-1 text-xs font-medium text-civic-muted">
              {member.party}
            </span>
          </div>
          <dl className="mt-4 grid gap-2 text-sm text-civic-muted">
            <div className="flex justify-between gap-3">
              <dt>지역구</dt>
              <dd className="font-medium text-civic-ink">{member.district}</dd>
            </div>
            <div className="flex justify-between gap-3">
              <dt>상임위</dt>
              <dd className="font-medium text-civic-ink">{member.committee}</dd>
            </div>
          </dl>
        </div>
      </div>
      <div className="mt-4 flex flex-wrap gap-2">
        {tags.map((tag) => (
          <IssueTag key={tag} label={tag} />
        ))}
      </div>
      <div className="mt-5 grid grid-cols-2 gap-2 text-center text-sm lg:grid-cols-5">
        <div className="rounded bg-civic-panel p-2">
          <p className="font-bold">{memberBills.filter((bill) => bill.role === "대표발의").length}</p>
          <p className="text-xs text-civic-muted">대표발의</p>
        </div>
        <div className="rounded bg-civic-panel p-2">
          <p className="font-bold">{memberBills.filter((bill) => bill.role === "공동발의").length}</p>
          <p className="text-xs text-civic-muted">공동발의</p>
        </div>
        <div className="rounded bg-civic-panel p-2">
          <p className="font-bold">{memberVotes.length}</p>
          <p className="text-xs text-civic-muted">표결</p>
        </div>
        <div className="rounded bg-civic-panel p-2">
          <p className="font-bold">{attendanceRate.display}</p>
          <p className="text-xs text-civic-muted">투표 참석률</p>
        </div>
        <div className="rounded bg-civic-panel p-2">
          <p className="font-bold">{inconsistencySignalRate.display}</p>
          <p className="text-xs text-civic-muted">불일치 가능성</p>
        </div>
      </div>
      <Link
        className="focus-ring mt-5 inline-flex rounded bg-civic-blue px-4 py-2 text-sm font-semibold text-white hover:bg-civic-teal"
        href={`/members/${member.id}`}
      >
        기록 보기
      </Link>
    </article>
  );
}
