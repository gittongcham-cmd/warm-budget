# Warm Budget MVP

개인용 모바일 우선 가계부 웹앱 MVP입니다. 이번 달 수입, 목표 지출액, 현재 지출액, 남은 예산, 카테고리별 지출과 예산 상태를 한 화면에서 확인하고, 지출 추가와 예산 설정 데이터를 `localStorage`에 저장합니다.

## 실행 방법

```bash
npm install
npm run dev
```

브라우저에서 `http://localhost:3000`을 열면 됩니다.

## 폴더 구조

```text
src/
  app/
    globals.css
    layout.tsx
    page.tsx
  components/
    AddExpense.tsx
    AppShell.tsx
    BudgetSettings.tsx
    Charts.tsx
    Dashboard.tsx
    Transactions.tsx
    ui.tsx
  data/
    mockData.ts
  hooks/
    useBudgetStore.ts
  types/
    budget.ts
  utils/
    budget.ts
```

## 주요 컴포넌트

- `AppShell`: 홈, 지출 추가, 거래 내역, 예산 설정 탭을 관리하는 모바일 앱 셸입니다.
- `Dashboard`: 월 수입, 목표 지출액, 현재 지출액, 남은 예산, 진행률, 하루 사용 가능 금액, 예상 저축액, 차트, 카테고리별 예산 상태, 최근 내역을 보여줍니다.
- `AddExpense`: 금액, 카테고리, 날짜, 메모, 결제수단을 입력하고 저장합니다.
- `Transactions`: 이번 달 거래 내역을 최신순으로 보여줍니다.
- `BudgetSettings`: 월 수입, 목표 지출액, 카테고리별 예산 배분을 저장합니다.
- `Charts`: Recharts 기반 TOP 5 가로 막대 그래프와 도넛 차트를 담당합니다.
- `useBudgetStore`: mock data 초기화, `localStorage` 저장/불러오기, 지출 추가, 예산 저장을 담당합니다.
- `utils/budget.ts`: 총 지출액, 남은 예산, 사용률, 하루 사용 가능 금액, 예상 저축액, 카테고리별 합계, 예산 사용률, 상태 계산 로직을 분리했습니다.

## 상태 기준

- `70% 미만`: 안정
- `70% 이상 90% 미만`: 주의
- `90% 이상 100% 미만`: 위험
- `100% 이상`: 초과

## 다음 개발 단계

- 거래 삭제/수정 기능 추가
- 월 선택 및 이전 달 리포트 추가
- 수입/고정비/변동비 분리
- 카테고리 직접 추가 기능
- CSV 내보내기와 백업/복원
- 실제 인증과 서버 저장소 연동
