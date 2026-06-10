import type { Bill, PublicOfficial, Vote } from "./types";

export interface MemberDirectoryRecord {
  member: PublicOfficial;
  issueTags: string[];
  representativeBillCount: number;
  coSponsoredBillCount: number;
  voteCount: number;
  absenceCount: number;
}

export interface MemberDirectoryFilters {
  query?: string;
  party?: string;
  committee?: string;
  issueTag?: string;
}

export function createMemberDirectoryRecords({
  members,
  bills,
  votes
}: {
  members: PublicOfficial[];
  bills: Bill[];
  votes: Vote[];
}): MemberDirectoryRecord[] {
  return members.map((member) => {
    const memberBills = bills.filter((bill) => bill.publicOfficialId === member.id);
    const memberVotes = votes.filter((vote) => vote.publicOfficialId === member.id);
    const issueTags = Array.from(
      new Set([...memberBills.flatMap((bill) => bill.issueTags), ...memberVotes.flatMap((vote) => vote.issueTags)])
    ).sort((a, b) => a.localeCompare(b, "ko"));

    return {
      member,
      issueTags,
      representativeBillCount: memberBills.filter((bill) => bill.role === "대표발의").length,
      coSponsoredBillCount: memberBills.filter((bill) => bill.role === "공동발의").length,
      voteCount: memberVotes.length,
      absenceCount: memberVotes.filter((vote) => vote.voteResult === "불참").length
    };
  });
}

export function filterMemberDirectory(
  records: MemberDirectoryRecord[],
  filters: MemberDirectoryFilters
): MemberDirectoryRecord[] {
  const query = normalize(filters.query);
  const party = filters.party?.trim();
  const committee = filters.committee?.trim();
  const issueTag = filters.issueTag?.trim();

  return records.filter((record) => {
    const searchableText = normalize(
      [
        record.member.name,
        record.member.officeType,
        record.member.party,
        record.member.district,
        record.member.committee,
        record.member.profileSummary,
        ...record.issueTags
      ].join(" ")
    );

    return (
      (!query || searchableText.includes(query)) &&
      (!party || record.member.party === party) &&
      (!committee || record.member.committee === committee) &&
      (!issueTag || record.issueTags.includes(issueTag))
    );
  });
}

export function getDirectoryOptions(records: MemberDirectoryRecord[]) {
  return {
    parties: uniqueSorted(records.map((record) => record.member.party)),
    committees: uniqueSorted(records.map((record) => record.member.committee)),
    issueTags: uniqueSorted(records.flatMap((record) => record.issueTags))
  };
}

function uniqueSorted(values: string[]) {
  return Array.from(new Set(values)).sort((a, b) => a.localeCompare(b, "ko"));
}

function normalize(value = "") {
  return value.trim().toLocaleLowerCase("ko-KR");
}
