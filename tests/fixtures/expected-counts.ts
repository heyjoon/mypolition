export const expectedSeedCounts = {
  publicOfficials: 3,
  bills: 10,
  votes: 15,
  statements: 8,
  evidenceRecords: 8,
  analysisFindings: 5
} as const;

export const expectedRoutes = [
  "/",
  "/members",
  "/members/[id]",
  "/members/[id]/bills",
  "/members/[id]/votes",
  "/issues",
  "/compare"
] as const;
