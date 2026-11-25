# 공식 국회 데이터 수집 (22대, 별도 실데이터 단계)

사용자 요청에 따른 공식 공개 API 수집 단계. 기존 MVP 목업 화면과 분리하며 뉴스·SNS·유튜브 스크래핑, 점수화, 단정적 평가 등은 기존대로 금지한다.

## 실행
Node.js 22.13 이상, 열린국회정보 인증키 필요. 키는 환경변수 OPEN_ASSEMBLY_API_KEY에만 설정하고 GitHub에 커밋하지 않는다.

```bash
node --experimental-strip-types scripts/check-collector.mjs
node --env-file=.env --experimental-strip-types scripts/collect-assembly.mjs
```

공식 API: ALLNAMEMBER (전체 명부에서 22대 이력 필터링), nzmimeepazxkubdpn (AGE=22), ncocpgfiaoituanbr (AGE=22), nojepdqqaweusdfbi (AGE=22, BILL_ID별). 참고: https://open.assembly.go.kr/portal/mainPage.do

결과는 .assembly-data/runs 아래 JSON으로 저장. latest.json은 전체 성공 시에만 갱신한다. 매회 전수 재수집하므로 시간이 오래 걸릴 수 있다. 실패한 실행은 최신으로 지정되지 않는다. 동시 실행은 피한다. 명부는 현역 전용이 아니며 22대 이력 기준이다. 동명이인 발의자는 연결하지 않는다. 표결 원문은 의원 ID·이름을 임의 매칭하지 않고 그대로 보존한다. 표결 기록 누락·빈 응답은 불참으로 해석하지 않는다. 대표·공동 발의 이름은 API 필드에 기재된 범위이며 발의자 전체 여부는 별도 상세 API 검증이 필요하다.

## 남은 작업
실제 인증키로 API 계약 확인, 전수 수집 실행 및 결과 교차 검증, 의원별 화면 연결, 회의록·공약·발언 공식 원문 수집. 기존 앱 전체 CI 및 브라우저 테스트 완료 전 main 병합 금지. 
