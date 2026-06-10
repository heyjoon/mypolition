---
name: korean-legislation-app
description: Work on the Korean civic public-record dashboard with neutral wording, deterministic mock data, no scraping, and required safety checks.
---

# Korean Legislation App Skill

Use this skill for repeated work on Public Office Watch.

## Product safety
- Use evidence-based Korean wording only.
- Do not add defamatory labels.
- Do not add ranking, scoreboards, trust scores, comment threads, or shaming features.
- Treat comparison views as neutral public-record comparison.
- Frame AI-like findings as possible signals, not final judgments.

## Development workflow
1. Read `AGENTS.md`.
2. Check `docs/APP_SPEC.md`, `docs/DATA_SOURCES.md`, and `docs/TEST_STRATEGY.md`.
3. Keep data adapters separate from UI.
4. Keep mock data deterministic.
5. Add or update tests for safety-sensitive changes.
6. Run `npm run check` before completion.

## Data rules
- No real politician names in mock data.
- No live API calls in MVP.
- No scraping.
- Use `lib/open-assembly/client.ts` as the only future National Assembly API boundary.

## UI wording
Prefer:

- 공식 기록 기준
- 공개 기록 비교
- 근거 미확인
- 불일치 가능성
- 판단 보류
- 사람 검토 필요
- 맥락 확인과 반론 검토가 필요할 수 있습니다

Avoid:

- 랭킹
- 점수
- 신뢰도 점수
- 비난성 표현
