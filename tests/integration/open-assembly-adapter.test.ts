import { describe, expect, it } from "vitest";
import {
  fetchBillVoteStatus,
  fetchMemberBills,
  fetchMemberVotes
} from "../../lib/open-assembly/client";

describe("open assembly adapter placeholder", () => {
  it("does not make live calls for member bills in MVP", async () => {
    await expect(fetchMemberBills("가상 의원")).resolves.toEqual([]);
  });

  it("does not make live calls for member votes in MVP", async () => {
    await expect(fetchMemberVotes("가상 의원")).resolves.toEqual([]);
  });

  it("returns a safe placeholder for bill vote status", async () => {
    await expect(fetchBillVoteStatus("bill-001")).resolves.toEqual({
      billId: "bill-001",
      billTitle: "",
      votes: []
    });
  });
});
