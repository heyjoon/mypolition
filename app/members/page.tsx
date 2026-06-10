import { MemberDirectory } from "@/components/MemberDirectory";
import { PageHeader } from "@/components/PageHeader";
import { bills, publicOfficials, votes } from "@/lib/mock-data";
import { createMemberDirectoryRecords, getDirectoryOptions } from "@/lib/member-directory";

export default function MembersPage() {
  const records = createMemberDirectoryRecords({ members: publicOfficials, bills, votes });
  const options = getDirectoryOptions(records);

  return (
    <div>
      <PageHeader
        eyebrow="국회의원 공개 기록"
        title="국회의원 목록"
        description="목업 데이터로 구성된 국회의원 공개 기록입니다. 정당, 지역구, 상임위, 법안과 표결 요약을 함께 확인할 수 있습니다."
      />
      <MemberDirectory
        records={records}
        parties={options.parties}
        committees={options.committees}
        issueTags={options.issueTags}
      />
    </div>
  );
}
