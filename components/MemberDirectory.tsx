"use client";

import { useMemo, useState } from "react";
import { EmptyState } from "@/components/EmptyState";
import { MemberCard } from "@/components/MemberCard";
import { filterMemberDirectory, type MemberDirectoryRecord } from "@/lib/member-directory";

interface MemberDirectoryProps {
  records: MemberDirectoryRecord[];
  parties: string[];
  committees: string[];
  issueTags: string[];
}

export function MemberDirectory({ records, parties, committees, issueTags }: MemberDirectoryProps) {
  const [query, setQuery] = useState("");
  const [party, setParty] = useState("");
  const [committee, setCommittee] = useState("");
  const [issueTag, setIssueTag] = useState("");

  const filteredRecords = useMemo(
    () => filterMemberDirectory(records, { query, party, committee, issueTag }),
    [records, query, party, committee, issueTag]
  );

  const hasActiveFilter = Boolean(query || party || committee || issueTag);

  return (
    <div className="space-y-5">
      <section className="rounded-lg border border-civic-line bg-white p-5">
        <div className="grid gap-3 lg:grid-cols-[1.4fr_1fr_1fr_1fr_auto]">
          <label className="block">
            <span className="text-xs font-semibold text-civic-muted">검색</span>
            <input
              className="focus-ring mt-2 w-full rounded border border-civic-line px-3 py-2 text-sm"
              placeholder="이름, 지역구, 상임위, 의제"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
            />
          </label>

          <FilterSelect label="정당" value={party} options={parties} onChange={setParty} />
          <FilterSelect label="상임위" value={committee} options={committees} onChange={setCommittee} />
          <FilterSelect label="의제" value={issueTag} options={issueTags} onChange={setIssueTag} />

          <button
            className="focus-ring self-end rounded border border-civic-line px-4 py-2 text-sm font-semibold text-civic-ink hover:border-civic-blue disabled:cursor-not-allowed disabled:opacity-40"
            type="button"
            disabled={!hasActiveFilter}
            onClick={() => {
              setQuery("");
              setParty("");
              setCommittee("");
              setIssueTag("");
            }}
          >
            초기화
          </button>
        </div>

        <div className="mt-4 flex flex-wrap items-center gap-2 text-sm text-civic-muted">
          <span className="font-semibold text-civic-ink">{filteredRecords.length}</span>
          <span>명 표시</span>
          <span className="text-civic-line">/</span>
          <span>전체 {records.length}명</span>
          <span className="text-civic-line">/</span>
          <span>공식 기록 기준</span>
        </div>
      </section>

      {filteredRecords.length > 0 ? (
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {filteredRecords.map((record) => (
            <MemberCard key={record.member.id} member={record.member} />
          ))}
        </div>
      ) : (
        <EmptyState
          title="조건에 맞는 공개 기록이 없습니다"
          description="검색어 또는 필터를 조정해 다시 확인할 수 있습니다. 결과 없음은 평가나 판단을 의미하지 않습니다."
        />
      )}
    </div>
  );
}

function FilterSelect({
  label,
  value,
  options,
  onChange
}: {
  label: string;
  value: string;
  options: string[];
  onChange: (value: string) => void;
}) {
  return (
    <label className="block">
      <span className="text-xs font-semibold text-civic-muted">{label}</span>
      <select
        className="focus-ring mt-2 w-full rounded border border-civic-line bg-white px-3 py-2 text-sm"
        value={value}
        onChange={(event) => onChange(event.target.value)}
      >
        <option value="">전체</option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </label>
  );
}
