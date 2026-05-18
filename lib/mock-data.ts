import type { EvidenceGrade, FindingType, ReviewStatus } from "./analysis-labels";

export type VoteResult = "찬성" | "반대" | "기권" | "불참";

export interface PublicOfficial {
  id: string;
  name: string;
  officeType: string;
  party: string;
  district: string;
  committee: string;
  termStart: string;
  termEnd: string;
  profileSummary: string;
}

export interface Bill {
  id: string;
  publicOfficialId: string;
  title: string;
  role: "대표발의" | "공동발의";
  status: string;
  proposedAt: string;
  issueTags: string[];
  sourceName: string;
  sourceUrl: string;
  evidenceGrade: EvidenceGrade;
}

export interface Vote {
  id: string;
  publicOfficialId: string;
  billTitle: string;
  voteResult: VoteResult;
  votedAt: string;
  issueTags: string[];
  sourceName: string;
  sourceUrl: string;
  evidenceGrade: EvidenceGrade;
}

export interface AnalysisFinding {
  id: string;
  publicOfficialId: string;
  findingType: FindingType;
  title: string;
  summary: string;
  issueTags: string[];
  evidenceIds: string[];
  confidenceLevel: "낮음" | "보통" | "높음";
  reviewStatus: ReviewStatus;
  rebuttalStatus: "공식 답변 대기" | "반론 요청 필요" | "검증 대기" | "판단 보류";
  createdAt: string;
}

export const issueTags = ["주거", "노동", "복지", "세금", "지역개발", "교육", "보건의료", "환경", "산업규제", "사법개혁"] as const;

export const publicOfficials: PublicOfficial[] = [
  { id: "member-01", name: "김도현", officeType: "국회의원", party: "시민개혁당", district: "서울 한빛구 갑", committee: "국토교통위원회", termStart: "2024-05-30", termEnd: "2028-05-29", profileSummary: "주거, 지역개발, 교통 접근성 관련 공개 기록을 중심으로 확인 중인 국회의원입니다." },
  { id: "member-02", name: "박서연", officeType: "국회의원", party: "공공미래당", district: "부산 바다구 을", committee: "보건복지위원회", termStart: "2024-05-30", termEnd: "2028-05-29", profileSummary: "복지, 보건의료, 교육 분야 발언과 표결 기록을 함께 정리하고 있습니다." },
  { id: "member-03", name: "이준호", officeType: "국회의원", party: "국민생활당", district: "대전 새뜰구", committee: "환경노동위원회", termStart: "2024-05-30", termEnd: "2028-05-29", profileSummary: "노동, 환경, 산업규제 의제에서 공개 발언과 공식 행동의 근거를 추적합니다." }
];

export const bills: Bill[] = [
  { id: "bill-01", publicOfficialId: "member-01", title: "공공임대주택 정보공개 강화법안", role: "대표발의", status: "위원회 심사", proposedAt: "2025-02-12", issueTags: ["주거"], sourceName: "국회 의안정보시스템", sourceUrl: "https://example.local/bills/01", evidenceGrade: "A" },
  { id: "bill-02", publicOfficialId: "member-01", title: "지역 교통 접근성 개선 특별법안", role: "대표발의", status: "본회의 계류", proposedAt: "2025-04-18", issueTags: ["지역개발"], sourceName: "국회 의안정보시스템", sourceUrl: "https://example.local/bills/02", evidenceGrade: "A" },
  { id: "bill-03", publicOfficialId: "member-01", title: "청년 전월세 상담 지원법안", role: "공동발의", status: "대안반영", proposedAt: "2025-08-07", issueTags: ["주거", "복지"], sourceName: "국회 의안정보시스템", sourceUrl: "https://example.local/bills/03", evidenceGrade: "A" },
  { id: "bill-04", publicOfficialId: "member-02", title: "지역 필수의료 지원법안", role: "대표발의", status: "위원회 심사", proposedAt: "2025-03-03", issueTags: ["보건의료"], sourceName: "국회 의안정보시스템", sourceUrl: "https://example.local/bills/04", evidenceGrade: "A" },
  { id: "bill-05", publicOfficialId: "member-02", title: "돌봄서비스 공공성 강화법안", role: "대표발의", status: "수정가결", proposedAt: "2025-05-21", issueTags: ["복지"], sourceName: "국회 의안정보시스템", sourceUrl: "https://example.local/bills/05", evidenceGrade: "A" },
  { id: "bill-06", publicOfficialId: "member-02", title: "학교 안전 예산 투명화법안", role: "공동발의", status: "위원회 심사", proposedAt: "2025-10-10", issueTags: ["교육"], sourceName: "국회 의안정보시스템", sourceUrl: "https://example.local/bills/06", evidenceGrade: "A" },
  { id: "bill-07", publicOfficialId: "member-03", title: "산업단지 배출정보 공개법안", role: "대표발의", status: "위원회 심사", proposedAt: "2025-01-24", issueTags: ["환경", "산업규제"], sourceName: "국회 의안정보시스템", sourceUrl: "https://example.local/bills/07", evidenceGrade: "A" },
  { id: "bill-08", publicOfficialId: "member-03", title: "플랫폼 노동 안전망 법안", role: "대표발의", status: "본회의 부의", proposedAt: "2025-06-15", issueTags: ["노동"], sourceName: "국회 의안정보시스템", sourceUrl: "https://example.local/bills/08", evidenceGrade: "A" },
  { id: "bill-09", publicOfficialId: "member-03", title: "행정심판 절차 접근성 개선법안", role: "공동발의", status: "위원회 심사", proposedAt: "2025-09-29", issueTags: ["사법개혁"], sourceName: "국회 의안정보시스템", sourceUrl: "https://example.local/bills/09", evidenceGrade: "A" },
  { id: "bill-10", publicOfficialId: "member-01", title: "생활밀착형 세제 안내 개선법안", role: "공동발의", status: "철회", proposedAt: "2025-11-12", issueTags: ["세금"], sourceName: "국회 의안정보시스템", sourceUrl: "https://example.local/bills/10", evidenceGrade: "A" }
];

export const votes: Vote[] = Array.from({ length: 15 }, (_, index) => {
  const memberId = index < 5 ? "member-01" : index < 10 ? "member-02" : "member-03";
  const results: VoteResult[] = ["찬성", "반대", "기권", "불참"];
  const tag = issueTags[index % issueTags.length];
  return { id: `vote-${String(index + 1).padStart(2, "0")}`, publicOfficialId: memberId, billTitle: `${tag} 공개 기록 관련 표결안`, voteResult: results[index % results.length], votedAt: `2025-${String((index % 9) + 1).padStart(2, "0")}-20`, issueTags: [tag], sourceName: "국회 본회의 회의록", sourceUrl: `https://example.local/votes/${index + 1}`, evidenceGrade: "A" };
});

export const statements = Array.from({ length: 8 }, (_, index) => ({ id: `statement-${index + 1}`, publicOfficialId: publicOfficials[index % 3].id, statementText: "공개 기록과 공식 행동을 함께 확인하겠습니다.", statementType: "공개 발언", sourceType: "회의록", sourceName: "공식 회의록", sourceUrl: `https://example.local/statements/${index + 1}`, publishedAt: "2025-01-15", issueTags: [issueTags[index % issueTags.length]], evidenceGrade: "A" as EvidenceGrade }));
export const evidenceRecords = Array.from({ length: 8 }, (_, index) => ({ id: `evidence-${index + 1}`, publicOfficialId: publicOfficials[index % 3].id, evidenceType: "공식 기록", sourceName: "공식 회의록", sourceUrl: `https://example.local/evidence/${index + 1}`, capturedAt: "2026-01-05", publishedAt: "2025-01-15", evidenceGrade: "A" as EvidenceGrade, reviewStatus: "HUMAN_REVIEW_PENDING" as ReviewStatus }));

export const analysisFindings: AnalysisFinding[] = [
  { id: "finding-01", publicOfficialId: "member-01", findingType: "ACTION_FOUND", title: "주거 정보공개 관련 공식 행동 확인", summary: "공개 발언 이후 관련 대표발의 기록이 확인되었습니다.", issueTags: ["주거"], evidenceIds: ["evidence-1"], confidenceLevel: "높음", reviewStatus: "HUMAN_REVIEW_PENDING", rebuttalStatus: "검증 대기", createdAt: "2026-02-01" },
  { id: "finding-02", publicOfficialId: "member-01", findingType: "ACTION_NOT_FOUND", title: "세금 의제 후속 행동 근거 미확인", summary: "공개 기록 기준으로 관련 근거가 아직 확인되지 않았습니다.", issueTags: ["세금"], evidenceIds: [], confidenceLevel: "낮음", reviewStatus: "AI_DETECTED", rebuttalStatus: "판단 보류", createdAt: "2026-02-03" },
  { id: "finding-03", publicOfficialId: "member-02", findingType: "POTENTIAL_INCONSISTENCY", title: "환경 절차 표결과 이전 발언 사이 불일치 가능성", summary: "맥락 확인과 반론 검토가 필요할 수 있습니다.", issueTags: ["환경"], evidenceIds: ["evidence-4"], confidenceLevel: "보통", reviewStatus: "HUMAN_REVIEW_PENDING", rebuttalStatus: "반론 요청 필요", createdAt: "2026-02-05" },
  { id: "finding-04", publicOfficialId: "member-03", findingType: "POSITION_CHANGE_DETECTED", title: "산업규제 표현의 입장 변화 감지", summary: "세부 조항 비교와 사람 검토가 필요합니다.", issueTags: ["산업규제"], evidenceIds: ["evidence-7"], confidenceLevel: "보통", reviewStatus: "REBUTTAL_REQUESTED", rebuttalStatus: "공식 답변 대기", createdAt: "2026-02-07" },
  { id: "finding-05", publicOfficialId: "member-03", findingType: "NEEDS_HUMAN_REVIEW", title: "노동 안전 관련 회의 불참 기록 검토 필요", summary: "일정 사유와 회의 맥락 검토가 필요합니다.", issueTags: ["노동"], evidenceIds: ["evidence-6"], confidenceLevel: "낮음", reviewStatus: "HUMAN_REVIEW_PENDING", rebuttalStatus: "검증 대기", createdAt: "2026-02-09" }
];

export const getMemberById = (id: string) => publicOfficials.find((member) => member.id === id);
export const getMemberBills = (id: string) => bills.filter((bill) => bill.publicOfficialId === id);
export const getMemberVotes = (id: string) => votes.filter((vote) => vote.publicOfficialId === id);
export const getMemberEvidence = (id: string) => evidenceRecords.filter((item) => item.publicOfficialId === id);
export const getMemberFindings = (id: string) => analysisFindings.filter((item) => item.publicOfficialId === id);
