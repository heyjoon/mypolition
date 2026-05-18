import { bills, issueTags, votes } from "@/lib/mock-data";

export default function IssuesPage() {
  return (
    <div>
      <p className="mb-2 text-sm font-semibold text-civic-teal">의제 태그</p>
      <h1 className="text-3xl font-bold">의제별 공개 기록 색인</h1>
      <p className="mt-3 text-civic-muted">주요 정책 의제별로 법안과 표결 기록을 찾아볼 수 있도록 준비한 MVP 색인입니다.</p>
      <div className="mt-8 grid gap-4 md:grid-cols-2">
        {issueTags.map((tag) => (
          <article key={tag} className="rounded-lg border border-civic-line bg-white p-5">
            <span className="rounded border border-civic-line px-2.5 py-1 text-sm font-semibold">{tag}</span>
            <dl className="mt-4 grid grid-cols-2 gap-3 text-sm">
              <div className="rounded bg-civic-panel p-3"><dt className="text-civic-muted">법안</dt><dd className="mt-1 text-xl font-bold">{bills.filter((bill) => bill.issueTags.includes(tag)).length}</dd></div>
              <div className="rounded bg-civic-panel p-3"><dt className="text-civic-muted">표결</dt><dd className="mt-1 text-xl font-bold">{votes.filter((vote) => vote.issueTags.includes(tag)).length}</dd></div>
            </dl>
          </article>
        ))}
      </div>
    </div>
  );
}
