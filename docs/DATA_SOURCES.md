# DATA_SOURCES.md

## MVP status
The MVP uses deterministic mock data only.

No scraping, no real politician names, and no live external API calls are allowed in the MVP.

## Planned source categories

### Evidence grade A
Official or statutory sources:

- National Assembly bill data
- National Assembly meeting minutes
- National Assembly vote records
- National Election Commission data
- Local government records
- Local council minutes
- Laws, budgets, and official proceedings

### Evidence grade B
Official owned channels:

- Official homepage
- Press release
- Official SNS
- Official YouTube

### Evidence grade C
Media sources:

- News interview
- Broadcast interview
- Article
- YouTube interview

### Evidence grade D
User-submitted or contextual material:

- User report
- Screenshot
- Community material

### Evidence grade E
Unknown or weak context:

- Unknown source
- Edited copy
- Context unclear

## Adapter boundary
Future public-data integrations must stay behind typed adapters under `lib/open-assembly/`.

The current adapter functions return empty values by design:

- `fetchMemberBills(memberName: string)`
- `fetchMemberVotes(memberName: string)`
- `fetchBillVoteStatus(billId: string)`

## Prohibited ingestion
- Do not scrape news, YouTube, SNS, or community sites.
- Do not store full news article text.
- Do not ingest private or leaked materials.
- Do not infer facts without evidence grade and review status.
