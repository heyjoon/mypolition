import { describe, expect, it } from "vitest";
import {
  buildOpenAssemblyUrl,
  fetchBillVoteStatus,
  fetchAssemblyMembers,
  fetchMemberBills,
  fetchMemberVotes
} from "../../lib/open-assembly/client";

describe("open assembly adapter", () => {
  it("builds official API URLs without leaking into UI code", () => {
    process.env.OPEN_ASSEMBLY_API_KEY = "test-key";
    process.env.OPEN_ASSEMBLY_BASE_URL = "https://open.assembly.go.kr/portal/openapi";

    const url = buildOpenAssemblyUrl("ALLNAMEMBER", { pIndex: "1", pSize: "3" });

    expect(url).toContain("/ALLNAMEMBER?");
    expect(url).toContain("KEY=test-key");
    expect(url).toContain("Type=json");
  });

  it("requires an API key for live member calls", async () => {
    const originalKey = process.env.OPEN_ASSEMBLY_API_KEY;

    delete process.env.OPEN_ASSEMBLY_API_KEY;

    await expect(fetchAssemblyMembers()).rejects.toThrow("OPEN_ASSEMBLY_API_KEY");

    if (originalKey) {
      process.env.OPEN_ASSEMBLY_API_KEY = originalKey;
    } else {
      delete process.env.OPEN_ASSEMBLY_API_KEY;
    }
  });

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
