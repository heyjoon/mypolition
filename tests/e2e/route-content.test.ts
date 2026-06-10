import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

describe("route content guardrails", () => {
  it("exposes a neutral comparison route", () => {
    const comparePage = readFileSync(join(process.cwd(), "app", "compare", "page.tsx"), "utf8");

    expect(comparePage).toContain("공개 기록 비교");
    expect(comparePage).toContain("순위, 점수, 우열 판단이 아니라");
  });

  it("links to the comparison route from landing and navigation", () => {
    const homePage = readFileSync(join(process.cwd(), "app", "page.tsx"), "utf8");
    const layout = readFileSync(join(process.cwd(), "app", "layout.tsx"), "utf8");

    expect(homePage).toContain('href="/compare"');
    expect(layout).toContain('href="/compare"');
  });
});
