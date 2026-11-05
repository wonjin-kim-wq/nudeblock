# nudeblock

의류 판매 사이트. 빌드 도구 없이 HTML / CSS / JS만으로 만든 정적 사이트입니다.

- 저장소: https://github.com/wonjin-kim-wq/nudeblock (브랜치 `main`)
- 디자인 시안: https://artifacts.co.kr/ (UI 배열, 폰트, 크기를 따라감) + 우주 테마(검정 배경, NASA 공개 이미지)

---

## ⚠️ 이 프로젝트에서 작업하는 AI에게 (필수 규칙)

1. **작업 시작 전에 이 README 전체를 읽고** 현재 상태와 아래 작업 기록을 확인하세요.
2. **작업이 끝나면 항상 이 README를 업데이트하세요.**
   - 맨 아래 `작업 기록`에 날짜(YYYY-MM-DD), 작업자(어떤 AI/사람), 변경 내용, 남은 일을 한 항목으로 추가합니다. 최신 항목이 위로 갑니다.
   - 파일 구조, 상품 데이터, 실행 방법, 남은 할 일이 바뀌었으면 해당 섹션도 고칩니다.
3. 커밋·푸시는 사용자가 요청할 때만 합니다. 커밋할 때는 README 업데이트도 같은 커밋에 포함합니다.
4. 레퍼런스 사이트의 브랜드명·로고는 쓰지 않습니다. 사이트 이름은 **nudeblock**입니다.

---

## 로컬 실행

```bash
cd ~/Desktop/바탕화면/nudeblock && python3 -m http.server 5173
```

→ http://localhost:5173

## 배포

- 공개 사이트: https://nudeblock.vercel.app
- Vercel 프로젝트: https://vercel.com/konw7377-1627s-projects/nudeblock
- GitHub `wonjin-kim-wq/nudeblock`의 `main` 브랜치 연결. `main`에 푸시하면 프로덕션 자동 배포
- 설정: Application Preset `Other`, Root Directory `./`, 별도 빌드 명령·환경변수 없음
- 최초 배포 커밋: `de7e5ad00cd9ead0379197a07d6746dca3b31ba2`

(Claude 데스크톱 앱의 미리보기 실행기는 바탕화면 폴더 접근 권한 문제로 서버를 띄우지 못해서, 터미널에서 직접 실행합니다.)

## 파일 구조

```
index.html      메인: 전체화면 우주 이미지 슬라이더 + 신상품 소개
shop.html       상품 목록 (3열 그리드). ?cate=new|26fw|outer|top|bottom|acc|sale, ?q=검색어
product.html    상품 상세 (?id=상품ID). 갤러리, 옵션, 사이즈 가이드, 큰 상세 사진, 고시정보, 리뷰
cart.html       장바구니 (localStorage, 브라우저에만 저장)
about.html      ABOUT / STOCKIST / COMMUNITY
css/style.css   전체 스타일. 색상은 :root 변수, 반응형 기준 860px
js/main.js      상품 데이터(PRODUCTS), 헤더/푸터 렌더링, 각 페이지 로직
assets/product/ 상품 사진 (원본 webp 2장 + 잘라낸 jpg 6장)
assets/space/   NASA 공개 우주 이미지 (carina, sunrise, pillars, andromeda)
```

- 헤더·푸터·모바일 메뉴·검색창은 `js/main.js`의 `renderHeader()` / `renderFooter()`가 모든 페이지에 넣습니다. 메뉴를 바꾸려면 여기만 고치면 됩니다.
- 폰트: Noto Sans + 나눔바른고딕(본문), Libre Baskerville(로고). 메뉴 13px.

## 상품 관리

상품은 `js/main.js` 맨 위 `PRODUCTS` 배열에 있습니다.

| 필드 | 설명 |
|---|---|
| `id` | URL에 쓰는 ID (`product.html?id=...`) |
| `name`, `sub` | 상품명, 부제 |
| `price` | 가격 (원) |
| `cate` | 속한 카테고리 키 배열 |
| `soldOut` | `true`면 목록에 SOLD OUT, 상세에서 옵션 [품절]·구매 불가 |
| `badge` | 판매 중일 때 목록에 표시할 뱃지 (예: `"NEW"`) |
| `sizes` | 옵션 사이즈 |
| `images`, `hoverImage` | 갤러리 이미지, 목록 마우스오버 이미지 |
| `detailImages` | 상세 하단 사진 배열 (`src`, `alt`, 원본 `width`, `height`). 비율을 유지해 세로 배치 |

상세 페이지의 설명·사이즈표·고시정보는 현재 `product.html`에 직접 적혀 있습니다(상품이 하나라서). 상품이 늘어나면 `PRODUCTS` 데이터로 옮겨야 합니다.

## 현재 상태

- 상품 1개: **Cover Me Tee_Black** (앞 "나한테 올려" / 뒤 "커버해"), **SOLD OUT**
- **임시값(실제 정보로 교체 필요):** 가격 39,000원, 상품명, 사이즈표 수치, 상품 설명, 푸터 사업자 정보·전화번호·이메일·계좌
- **미구현:** 로그인, 마이페이지, 결제, 재입고 알림, 리뷰 작성, 이용약관/개인정보 페이지 → 누르면 "준비 중" 토스트만 뜸
- 장바구니는 서버 없이 브라우저 localStorage에만 저장

## 남은 할 일

- [ ] 실제 가격·상품명·사이즈표·사업자 정보 반영
- [ ] 결제 / 주문 연동 (PG사 또는 쇼핑몰 플랫폼)
- [ ] 이용약관, 개인정보처리방침 페이지
- [ ] 인스타그램 링크 연결
- [x] Vercel 배포 및 GitHub main 자동 배포 연결

---

## 작업 기록

<!-- 새 항목은 이 줄 바로 아래, 맨 위에 추가하세요. 형식:
### YYYY-MM-DD — 작업자
- 변경 내용
- 남은 일 / 주의사항
-->

### 2026-11-05 — Codex
- 첨부한 레퍼런스의 비율에 맞춰 상품 목록 폭 70.6%, 3열 간격 3.7vw 및 상단 여백 조정. 모바일은 좌우 16px 여백의 2열 유지
- 상품 상세 상단을 가운데 정렬하고, 하단에 앞뒤 전체·디테일 원본 사진을 폭 88.4%로 세로 배치. 사진 사이와 상단 여백, 모바일 사진 너비 조정
- ABOUT 소개를 “말 한마디, 레터링 하나로 충분한 옷을 만듭니다.”로 간결하게 수정
- 검증: JavaScript 구문 검사, 인앱 데스크톱 2048px·모바일 390px 화면에서 목록·상세 사진·ABOUT 문구 및 가로 넘침 없음 확인
- 사용자 요청에 따라 README 포함 커밋·main 푸시 진행. 남은 일은 기존 할 일 참조

### 2026-11-05 — Codex
- 인앱 브라우저에서 GitHub `wonjin-kim-wq/nudeblock`의 `main`을 Vercel 프로젝트 `nudeblock`에 연결하고 프로덕션 배포 완료 (상태 `Ready`)
- 공개 주소 https://nudeblock.vercel.app, 루트 `./`, 프리셋 `Other`, 배포 커밋 `de7e5ad`
- 실제 배포 사이트의 메인·상품 상세·품절 표시·갤러리 다음 이미지 전환 확인. Vercel의 main 푸시 시 프로덕션 배포 안내 확인
- 남은 일: 실제 상품·사업자 정보, 결제·주문, 약관, 인스타그램 연결은 기존 할 일 참조
- 커밋·푸시 없음

### 2026-11-05 — Codex
- 작업 준비: README 전체와 현재 파일 구조, 공통 스크립트의 상품·장바구니 데이터 및 페이지 연결 확인
- 기능·디자인 변경 없음. 후속 작업 시 README 갱신, 사용자 요청 시에만 커밋·푸시하는 규칙 확인
- 남은 일: 아래 기존 할 일 기준으로 사용자 후속 작업 지시 대기

### 2026-11-05 — Claude (Claude Code)
- 작업 기록용 README.md 작성 (AI 협업 규칙, 구조, 상품 관리 방법, 상태 정리)

### 2026-11-05 — Claude (Claude Code)
- artifacts.co.kr 레이아웃·폰트를 참고해 사이트 첫 버전 제작: 메인, 목록, 상세, 장바구니, ABOUT
- 우주 테마: 검정 배경 + NASA 공개 이미지 (메인 슬라이더에 출처 표기)
- 사용자가 준 상품 사진 2장을 6컷으로 잘라 갤러리 구성
- 사이트명 nudeblock 적용, 상품 SOLD OUT 처리
- GitHub 저장소 연결 후 첫 커밋 푸시 (`de7e5ad`)
- 주의: macOS `sips`의 `--cropOffset`은 무시되고 가운데 기준으로 잘림. 이미지를 자를 땐 다른 도구 사용
