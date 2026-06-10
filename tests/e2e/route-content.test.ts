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

  it("links to official Assembly API data from landing and navigation", () => {
    const homePage = readFileSync(join(process.cwd(), "app", "page.tsx"), "utf8");
    const layout = readFileSync(join(process.cwd(), "app", "layout.tsx"), "utf8");

    expect(homePage).toContain('href="/assembly"');
    expect(layout).toContain('href="/assembly"');
  });

  it("shows a neutral monthly featured official area on the landing page", () => {
    const homePage = readFileSync(join(process.cwd(), "app", "page.tsx"), "utf8");

    expect(homePage).toContain("이번 달 공개 기록 주목 공직자");
    expect(homePage).toContain("최종 판단이 아닙니다");
    expect(homePage).not.toContain("이번달의 가장 훌륭한 정치인");
  });
});
