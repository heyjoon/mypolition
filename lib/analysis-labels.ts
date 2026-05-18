export const allowedAnalysisLabels = [
  "공식 기록 기준",
  "근거 미확인",
  "불일치 가능성",
  "입장 변화 감지",
  "판단 보류",
  "검증 대기",
  "반론 요청 필요",
  "사람 검토 필요",
  "공식 답변 대기"
] as const;

export const bannedTerms = [
  "거짓말쟁이",
  "사기꾼",
  "배신자",
  "부패",
  "범죄자",
  "쓰레기",
  "기만",
  "조작",
  "위선자",
  "매국",
  "빨갱이",
  "친일",
  "적폐",
  "무능",
  "탄핵감",
  "박제",
  "조리돌림"
] as const;

export const allowedFindingTypes = [
  "ACTION_FOUND",
  "ACTION_NOT_FOUND",
  "POTENTIAL_INCONSISTENCY",
  "POSITION_CHANGE_DETECTED",
  "NEEDS_HUMAN_REVIEW"
] as const;

export const allowedReviewStatuses = [
  "AI_DETECTED",
  "HUMAN_REVIEW_PENDING",
  "HUMAN_REVIEWED",
  "REBUTTAL_REQUESTED",
  "REBUTTAL_RECEIVED",
  "CORRECTED"
] as const;

export const evidenceGradeDescriptions = {
  A: "국회, 선관위, 지자체, 지방의회, 법령, 예산서, 공식 회의록",
  B: "공식 홈페이지, 보도자료, 공식 SNS, 공식 유튜브",
  C: "언론 인터뷰, 방송, 기사, 유튜브 인터뷰",
  D: "사용자 제보, 캡처, 커뮤니티 자료",
  E: "출처 불명, 편집본, 맥락 불명 자료"
} as const;

export type AnalysisLabel = (typeof allowedAnalysisLabels)[number];
export type FindingType = (typeof allowedFindingTypes)[number];
export type ReviewStatus = (typeof allowedReviewStatuses)[number];
export type EvidenceGrade = keyof typeof evidenceGradeDescriptions;

export function assertNoBannedTerms(text: string) {
  const found = bannedTerms.filter((term) => text.includes(term));
  if (found.length > 0) throw new Error(`Banned terms found: ${found.join(", ")}`);
}
