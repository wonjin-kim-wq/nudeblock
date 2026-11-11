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

- 공개 사이트: https://nudeblock-store.vercel.app
- 이전 주소 https://nudeblock.vercel.app 는 새 주소로 리디렉션
- Vercel 프로젝트: https://vercel.com/konw7377-1627s-projects/nudeblock-store
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
assets/product/ 상품 사진 (흰색 상품의 앞·뒤 사진은 rolling-thunder-white/와 hit-the-ball-white/)
assets/space/   NASA 공개 우주 이미지 (carina, sunrise, pillars, andromeda)
outputs/instagram/ 인스타그램용 제품 소개 영상(MP4), 커버·미리보기 이미지 (로컬 산출물)
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

상품별 모델명(`model`), 색상(`color`), 레터링 설명(`lettering`)은 `PRODUCTS`에서 관리합니다. 공통 소재·사이즈표·케어·배송·고시정보는 `product.html`을 함께 사용합니다.

## 현재 상태

- 상품 3개 (모두 SOLD OUT, S / M / L / XL):
  - **Cover Me Tee_Black**: 앞 “나한테 올려” / 뒤 “커버해”, **790,000원**
  - **Rolling Thunder Tee_White**: 앞 “일단 / 올려놨어” 두 줄 / 뒤 “롤링썬더” 한 줄, 검정 레터링, **650,000원**
  - **Hit the Ball Tee_White**: 앞 윗줄 “캐치 안좋으면”, 아랫줄 “언더로 함” 가운데 정렬 / 뒤 “Hit the ball”, 검정 레터링, **790,000원**
- 흰색 상품 사진은 내장 ImageGen으로 제작한 시안입니다. `assets/product/rolling-thunder-white/`와 `assets/product/hit-the-ball-white/`에 있습니다.
- **임시값(실제 정보로 교체 필요):** 상품명, 사이즈표 수치, 상품 설명, 푸터 사업자 정보·전화번호·이메일·계좌
- **미구현:** 로그인, 마이페이지, 결제, 재입고 알림, 리뷰 작성, 이용약관/개인정보 페이지 → 누르면 "준비 중" 토스트만 뜸
- 장바구니는 서버 없이 브라우저 localStorage에만 저장

## 남은 할 일

- [ ] 실제 상품명·사이즈표·사업자 정보 반영
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

### 2026-11-11 — Codex
- Hit the Ball Tee_White 추가. 앞면 윗줄 “캐치 안좋으면”과 아랫줄 “언더로 함”은 가운데 정렬, 뒷면은 “Hit the ball” 한 줄. 가격은 790,000원.
- 기존 흰색 티셔츠 사진을 참고해 내장 ImageGen으로 앞뒤 시안을 제작하고 상품 목록, 갤러리, 상세 사진에 연결.
- 재고 정보가 없어 기존 상품과 같이 S / M / L / XL 품절로 설정.
- Chrome에서 카테고리 목록, 한글·영문 검색, 상세 가격·품절 표시, 앞뒤 사진 전환과 모바일 390px 화면을 확인.
- 사용자 요청에 따라 README와 상품 변경을 같은 커밋에 포함해 `main` 푸시로 Vercel 자동 배포를 진행.

### 2026-11-10 — Codex
- 흰색 Rolling Thunder Tee_White 추가: 앞면 “일단 / 올려놨어” 두 줄, 뒷면 “롤링썬더” 한 줄 검정 레터링, 가격 650,000원
- 기존 핏·소재·사이즈·배송 안내·품절 상태 유지. 검정 상품 가격은 790,000원 유지
- 내장 ImageGen으로 생성한 앞뒤 상품 사진을 WebP로 저장하고 목록·호버·갤러리·하단 상세 사진에 연결
- 상품별 모델명·색상·레터링 설명을 PRODUCTS로 분리하여 잘못된 검정 상품 설명이 노출되지 않도록 수정
- 검증: JavaScript 구문, 두 상품 가격·이미지 경로, 로컬 인앱 목록·흰색 상세·갤러리 전환·색상 및 브라우저 오류 없음 확인
- 사용자 요청에 따라 README 포함 커밋·main 푸시 및 자동 배포 진행. 기존 미구현 기능은 남은 할 일 참조

### 2026-11-05 — Codex
- 사용자 요청으로 Cover Me Tee_Black 가격을 790,000원으로 변경 (공통 PRODUCTS 데이터 사용으로 목록·상세·장바구니에 동일 적용)
- 가격 및 작업 기록을 포함해 main에 반영하여 Vercel 자동 배포 진행

### 2026-11-05 — Codex
- 사용자 요청으로 Vercel 프로젝트명을 nudeblock-store로 변경하고 프로덕션 도메인을 https://nudeblock-store.vercel.app 으로 변경
- 새 주소 정상 접속 및 기존 nudeblock.vercel.app의 새 주소 리디렉션 확인. 동일 GitHub main 소스로 재배포 요청 후 이메일 재인증 완료
- 코드 변경 없이 Vercel 설정 변경. 기존 영상 속 이전 주소도 리디렉션을 통해 접속 가능

### 2026-11-05 — Codex
- 제품 사진을 참고한 실제 3D 반팔 모델 제작: 앞뒤 몸판과 연결 면, 열린 목·소매·밑단, 넥밴드, 밑단 스티치 및 원단 주름 구성
- `outputs/instagram/3d/`에 수정 가능한 텍스처 포함 Blender 원본, 생성 코드, 10초 회전·부유 애니메이션, 인스타그램용 세로 영상과 커버 저장
- 영상 문구를 제품 프린트와 겹치지 않도록 배치. NEW DROP, 제품명, 브랜드 소개 문구와 사이트 주소 포함
- 참고: 생산용 의류 패턴이 아닌 사진 기반 시각화 모델. 무음 영상이며 업로드 시 음악 선택 가능
- 남은 일: 사용자 결과 확인. 커밋·푸시 및 인스타그램 업로드 없음

### 2026-11-05 — Codex
- 사용자 제공 인스타그램 참고 영상(약 10초)의 어두운 스튜디오·공중 부유·회전·중앙 NEW DROP 구성을 참고해 제품 소개 영상 제작
- `outputs/instagram/nudeblock-new-drop-reel.mp4`: 1080×1920, 30fps, 12초, H.264, 무음. 실제 앞뒤 제품 사진에 원근 회전·부유 연출 및 정확한 텍스트 합성
- 문구: NEW DROP, COVER ME, nudeblock, 26FW / DROP 01, 제품명·소재, “말 한마디, 레터링 하나로 충분한 옷.”, 사이트 주소
- 커버 `outputs/instagram/cover.jpg` 함께 제공. 인스타그램 업로드·영상 파일 커밋·푸시는 하지 않음
- 앞선 사이트 변경 커밋 `23f8290` main 푸시 완료 및 공개 ABOUT 새 문구 반영 확인
- 남은 일: 업로드 시 원하는 인스타그램 음악 선택 가능. 사이트 기능의 기존 남은 할 일은 위 목록 참조

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
