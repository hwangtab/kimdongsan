# 김동산과 블루이웃 — EPK

정규 1집 《김동산과 블루이웃》(2026.11.17, 애프터눈) 발매와 12.04 쇼케이스를 위한
국문·영문 EPK 사이트입니다.

- 프레임워크: Next.js 16 (App Router, Turbopack) · React 19 · TypeScript
- 스타일: Tailwind CSS 4 (`@theme` 토큰은 `app/globals.css`)
- 배포: Vercel (환경변수 없음)

## 실행

```bash
npm install
npm run dev      # http://localhost:3000 → /ko
npm run build
npm run lint
```

## 구조

```
app/[locale]/               ko · en
  page.tsx                  홈
  album/                    앨범 (8트랙 아코디언)
  about/                    소개 · 연표 · 밴드 · 롱플레이어
  live/                     12.04 쇼케이스 · 지난 공연 · 테크라이더
  press/                    바이오 복사 · 인용 · 보도 · 프레스킷
  press/one-sheet/          인쇄용 원시트
  contact/                  부킹 · 아티스트 · 롱플레이어
components/                 헤더 · 푸터 · 오디오 플레이어 · 트랙리스트 · 복사 버튼
data/                       콘텐츠 원본 (아래 표)
messages/                   UI 문자열 ko / en
media-src/                  음원 마스터와 원본 이미지 (git 제외)
public/                     웹용 이미지·오디오·폰트
scripts/                    자산 재생성 스크립트
```

| 파일 | 내용 |
| --- | --- |
| `data/album.ts` | 8트랙, 가사, 곡 노트, 크레딧, 발췌 구간 |
| `data/site.ts` | 바이오, 연표, 멤버, 연락처, 롱플레이어 |
| `data/shows.ts` | 공연 목록, 티켓 가격, 출연진 |
| `data/press.ts` | 인용, 보도, 프레스킷 파일 |
| `data/discography.ts` | 발매 목록 (현재 페이지에는 미연결) |
| `data/waveforms.json` | 파형 96개 값 × 8트랙 |

## 자산

원본은 `media-src/`에 있고 저장소에는 포함하지 않습니다.

```bash
npm run assets:audio      # 60초 발췌 → public/audio/preview/*.m4a
npm run assets:waveforms  # 파형 → data/waveforms.json
npm run assets:images     # 커버·포스터·라이브·멤버 → public/images
npm run assets:og         # 1200×630 소셜 카드 (uv + Pillow)
```

발췌 시작점은 `scripts/prepare-audio.sh`의 `STARTS` 배열에서 바꿉니다.
현재 값은 에너지 스캔으로 고른 후보이므로, 김동산 쪽에서 한 번 들어보고
마디를 지정해 주는 것이 좋습니다.

## 사실 표기 원칙

- 앨범은 **2026.11.17 발매 완료**. "발매 예정"으로 쓰지 않습니다.
- 2017 한국대중음악상 선정위원회 특별상은 《젠트리피케이션》 참여 음악인 **공동 수상**입니다.
- 2019 한국대중음악상은 최우수 포크 음반 **후보**입니다.
- "한국의 우디 거스리"는 별명으로만 씁니다.
- 밴드 7년째·첫 정규는 류준철의 공개 글(2026.11.15)에 근거합니다.
- 12.04 얼리버드 20,000원은 **매진**, 사전예매 30,000원·할인권 20,000원은 판매 중입니다.
- 예매 CTA는 스튜디오 놀 공연 페이지(`#book`)로 보냅니다.

## 남은 자료

- 멤버 개별 고해상도 사진 (현재는 스튜디오 포스터 4컷을 240px로 크롭)
- 인쇄용 커버 원본 (현재 2000px 크롭)
- 부킹 전용 이메일 (현재 스튜디오 놀 주소를 창구로 사용)
- 테크라이더·스테이지 플롯 상세
- 류준철 인용과 프레스 사진 사용 허락

## 배포

- 저장소: https://github.com/hwangtab/kimdongsan (public)
- 프로덕션: https://kimdongsan.vercel.app
- `main`에 푸시하면 Vercel이 자동 배포하고, PR은 프리뷰 배포를 만듭니다.
- `data/site.ts`의 `SITE.url`이 canonical·sitemap·OG에 쓰입니다. 도메인을 바꾸면 이 값을 함께 고칩니다.

## 권리

음원·사진·글의 권리는 김동산과 블루이웃에게 있습니다. 이 저장소의 코드는 참고용이며,
음원과 이미지를 재사용하려면 당사자의 허락이 필요합니다.

## 폰트

3단 층위로 씁니다. 세 폰트 모두 단일 무게라서 굵기 대신 질감·크기·색으로 위계를 만듭니다.

| 층 | 폰트 | 쓰는 곳 | 라이선스 / 처리 |
| --- | --- | --- | --- |
| 브랜드 | **온글잎 재건사** (온글잎) | 밴드명, 출장작곡가 김동산, 헤더·푸터, 앨범 h1, 원시트 | 웹·BI/CI 허용, 수정·재배포 금지 → **PNG 이미지**로 렌더링. 원본은 `media-src/`에만 |
| 에디토리얼 | **미원체** (대상) | 섹션 제목, 큰 날짜 | 웹 허용, **임베딩·BI/CI 금지** → **PNG 이미지**. 원본은 `media-src/`에만 |
| 인터페이스 | **둥근모꼴+ Fixedsys** (길형진) | 내비, 라벨, 짧은 글, 버튼, 티커, 트랙리스트 | 퍼블릭 도메인 → 12KB 서브셋을 셀프호스팅 |
| 읽기 | Pretendard · Gowun Batang | 긴 바이오, 곡 노트, 크레딧, 가사, 인용 | OFL. 가독성용 |

```bash
npm run assets:brand       # 온글잎 브랜드 PNG 8장
npm run assets:miwon       # 미원체 제목 PNG 22장
npm run assets:pixel-font  # 둥근모꼴 서브셋 (약 12KB)
```

브랜드·제목 이미지는 `data/brand-titles.json`, `data/miwon-titles.json`의 크기 값을 사용합니다.
온글잎과 미원체 폰트 파일은 라이선스상 저장소에 커밋하지 않습니다.
