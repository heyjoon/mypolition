# AGENTS.md

## Product
This repository builds a Korean civic accountability app for tracking public records of elected officials.

## Non-negotiable rules
- Never use defamatory labels.
- Never call a person a liar, fraud, traitor, criminal, corrupt, or untrustworthy.
- Use neutral evidence-based Korean labels only.
- All AI-like analysis must be framed as a possibility, not a final judgment.
- Every finding should point to source, date, evidence grade, and review status.
- Use fake names in development seed data.
- Do not scrape news, YouTube, SNS, or community sites in this MVP.
- Do not store full news article text.
- Do not implement comments, public shaming, ranking, or scoreboards in the MVP.
- Do not add trust scores in the MVP.

## Engineering
- Use TypeScript strictly.
- Prefer small, typed modules.
- Keep data adapters separate from UI.
- Write tests for safety labels and banned terms.
- Keep mock data deterministic.
- Do not add authentication unless explicitly requested.

## MVP scope
Build landing page, member list, member detail dashboard, bills list, votes list, issue tags, evidence badges, neutral analysis labels, and safety notice.
