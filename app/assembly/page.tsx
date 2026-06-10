import Link from "next/link";
import Image from "next/image";
import { EmptyState } from "@/components/EmptyState";
import { PageHeader } from "@/components/PageHeader";
import { SafetyNotice } from "@/components/SafetyNotice";
import { fetchAssemblyMembers } from "@/lib/open-assembly/client";

export const dynamic = "force-dynamic";

export default async function AssemblyMembersPage() {
  const result = await getAssemblyMembers();

  return (
    <div className="space-y-8">
      <PageHeader
        eyebrow="공식 API 연결"
        title="실제 국회 데이터"
        description="국회 Open API에서 받은 제22대 국회의원 기본 정보입니다. 이 화면은 인물 평가나 순위가 아니라 공식 공개 데이터 연결 상태를 확인하기 위한 페이지입니다."
      />

      {result.ok ? (
        <>
          <section className="grid gap-4 md:grid-cols-3">
            <div className="rounded-lg border border-civic-line bg-white p-5">
              <p className="text-2xl font-bold">{result.members.length}</p>
              <p className="mt-1 text-sm text-civic-muted">제22대 국회의원 API 기록</p>
            </div>
            <div className="rounded-lg border border-civic-line bg-white p-5">
              <p className="text-2xl font-bold">A</p>
              <p className="mt-1 text-sm text-civic-muted">국회 Open API 공식 출처</p>
            </div>
            <div className="rounded-lg border border-civic-line bg-white p-5">
              <p className="text-2xl font-bold">판단 보류</p>
              <p className="mt-1 text-sm text-civic-muted">기본 정보만 표시하며 평가하지 않습니다.</p>
            </div>
          </section>

          <section className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {result.members.slice(0, 30).map((member) => (
              <article key={member.id} className="rounded-lg border border-civic-line bg-white p-5">
                <div className="flex gap-4">
                  {member.profileImageUrl ? (
                    <Image
                      alt={`${member.name} 공식 프로필`}
                      className="h-20 w-16 rounded border border-civic-line object-cover"
                      height={80}
                      src={member.profileImageUrl}
                      width={64}
                    />
                  ) : (
                    <div className="flex h-20 w-16 items-center justify-center rounded border border-civic-line bg-civic-panel text-sm font-bold text-civic-blue">
                      사진
                    </div>
                  )}
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-civic-teal">국회의원</p>
                    <h2 className="mt-1 text-xl font-bold tracking-[0]">{member.name}</h2>
                    <p className="mt-1 text-sm text-civic-muted">{member.party ?? "정당 정보 없음"}</p>
                  </div>
                </div>
                <dl className="mt-4 grid gap-2 text-sm text-civic-muted">
                  <InfoRow label="선거구" value={member.district ?? member.electionType ?? "정보 없음"} />
                  <InfoRow label="상임위" value={member.committee ?? "정보 없음"} />
                  <InfoRow label="임기" value={member.term ?? "정보 없음"} />
                </dl>
                <p className="mt-4 text-xs leading-5 text-civic-muted">
                  출처: {member.sourceName}. 법안, 표결, 발언 분석은 다음 단계에서 별도 공식 API로 연결합니다.
                </p>
              </article>
            ))}
          </section>
        </>
      ) : (
        <EmptyState title="국회 Open API 연결이 필요합니다" description={result.message} />
      )}

      <section className="rounded-lg border border-civic-line bg-white p-5">
        <h2 className="text-xl font-bold tracking-[0]">다음 연결 대상</h2>
        <p className="mt-2 text-sm leading-6 text-civic-muted">
          현재는 국회의원 기본 정보만 공식 API로 연결했습니다. 법안, 표결, 회의록은 공식 API 서비스명과 필수
          파라미터를 확인한 뒤 같은 어댑터 계층에 추가합니다.
        </p>
        <Link className="focus-ring mt-4 inline-flex rounded bg-civic-blue px-4 py-2 text-sm font-semibold text-white" href="/members">
          목업 분석 화면 보기
        </Link>
      </section>

      <SafetyNotice />
    </div>
  );
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between gap-3">
      <dt>{label}</dt>
      <dd className="text-right font-medium text-civic-ink">{value}</dd>
    </div>
  );
}

async function getAssemblyMembers() {
  try {
    const members = await fetchAssemblyMembers();

    return { ok: true as const, members };
  } catch (error) {
    return {
      ok: false as const,
      message: error instanceof Error ? error.message : "공식 API 응답을 확인하지 못했습니다."
    };
  }
}
