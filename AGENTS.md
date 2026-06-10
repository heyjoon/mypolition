# AGENTS.md

## Product
This repository builds a Korean civic accountability app for tracking public records of elected officials.

The product is an evidence-based public-record dashboard. It is not a defamation app, attack app, ranking app, trust-score app, liar list, or political shaming platform.

## Non-negotiable rules
- Never use defamatory labels.
- Never call a person a liar, fraud, traitor, criminal, corrupt, or untrustworthy.
- Use neutral evidence-based Korean labels only.
- All AI-like analysis must be framed as a possibility, not a final judgment.
- Every finding should point to source, date, evidence grade, and review status.
- Use fake names in development seed data.
- Do not scrape news, YouTube, SNS, or community sites in this MVP.
- Do not store full news article text.
- Do not implement comments, public shaming, ranking, scoreboards, or trust scores in the MVP.
- Do not present comparison views as rankings. Use "공개 기록 비교" and show source-backed counts only.

## Allowed Korean analysis labels
- 공식 기록 기준
- 근거 미확인
- 불일치 가능성
- 입장 변화 감지
- 판단 보류
- 검증 대기
- 반론 요청 필요
- 사람 검토 필요
- 공식 답변 대기

## Engineering
- Use TypeScript strictly.
- Prefer small, typed modules.
- Keep data adapters separate from UI.
- Keep mock data deterministic.
- No authentication unless explicitly requested.
- No scraping and no live external API calls in MVP.
- Use `lib/open-assembly/client.ts` only as a typed placeholder until real public-data integration is approved.

## Required checks
Before finishing code changes, run:

```bash
npm run check
```

If the change only touches documentation, still run at least:

```bash
npm run test
```

## Documentation map
- Product spec: `docs/APP_SPEC.md`
- Data-source plan: `docs/DATA_SOURCES.md`
- Test strategy: `docs/TEST_STRATEGY.md`
- Branch protection setup: `docs/BRANCH_PROTECTION.md`
- Repeated workflow skill: `skills/korean-legislation-app/SKILL.md`

## MVP scope
Build and maintain:
- landing page
- member list
- member detail dashboard
- bills list
- votes list
- issue tags
- evidence badges
- neutral analysis labels
- public-record comparison page
- safety notice
