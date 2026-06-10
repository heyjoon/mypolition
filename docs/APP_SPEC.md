# APP_SPEC.md

## Goal
Public Office Watch is a Korean civic public-record dashboard that helps citizens compare elected officials' public statements with official actions.

The MVP focuses on Korean National Assembly members with deterministic fake data. The architecture should later support mayors, governors, district heads, city council members, and other elected officials.

## Product principles
- Evidence first.
- Neutral Korean wording only.
- No defamatory labels.
- No ranking, scoreboards, trust scores, or public shaming.
- AI-like findings are not final judgment.
- Every finding should be backed by source, date, evidence grade, and review status.

## Current routes
- `/`: landing page with search placeholder and public-record summary.
- `/members`: fake National Assembly member list.
- `/members/[id]`: member dashboard.
- `/members/[id]/bills`: representative and co-sponsored bill list.
- `/members/[id]/votes`: vote list.
- `/issues`: issue tag index.
- `/compare`: neutral public-record comparison view.

## Core UI
- Member cards and profile headers.
- Evidence grade badges.
- Issue tags.
- Metric cards.
- Bill and vote cards.
- Analysis finding cards.
- Safety notice.
- Public-record comparison table.

## Comparison policy
Comparison pages must never imply that one person is "better" or "worse." Use counts and official-record categories only. Prefer wording such as:

- 공개 기록 비교
- 항목별 비교
- 공식 기록 기준
- 수치만으로 긍정 또는 부정 판단을 하지 않습니다

Avoid:

- 랭킹
- 점수
- 순위
- 신뢰도
- 우열

## Future roadmap
- Real National Assembly Open API adapter.
- Human review workflow.
- Rebuttal request and response tracking.
- Search and filters.
- PWA packaging.
- Desktop/mobile wrapper only after the web MVP is stable.
