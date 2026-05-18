import type { Bill, Vote } from "@/lib/mock-data";

export interface AssemblyBillVoteStatus {
  billId: string;
  billTitle: string;
  votes: Vote[];
}

// Placeholder adapter for future National Assembly public-data integration.
// The MVP intentionally makes no live external API calls and uses deterministic mock data only.
export async function fetchMemberBills(memberName: string): Promise<Bill[]> {
  void memberName;
  return [];
}

export async function fetchMemberVotes(memberName: string): Promise<Vote[]> {
  void memberName;
  return [];
}

export async function fetchBillVoteStatus(billId: string): Promise<AssemblyBillVoteStatus> {
  return { billId, billTitle: "", votes: [] };
}
