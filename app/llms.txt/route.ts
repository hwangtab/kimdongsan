import { CORRECTIONS, FACTS } from "@/data/facts";
import { ALBUM, TRACKS } from "@/data/album";
import { COVERAGE, QUOTES } from "@/data/press";
import { BIOS, SITE } from "@/data/site";
import { SHOWS } from "@/data/shows";

/**
 * /llms.txt — the llmstxt.org convention: a plain-markdown map of the site for
 * answer engines, plus the corrections that secondary coverage gets wrong.
 * This is an EPK; being quoted accurately is the whole point.
 */
export const dynamic = "force-static";

export function GET() {
  const base = SITE.url;
  const show = SHOWS.find((s) => s.featured)!;

  const body = `# ${SITE.name} (${SITE.nameEn})

> ${BIOS.ko.medium}

한국어 사이트: ${base}/ko
English site: ${base}/en

## 앨범 / Album

- 《${ALBUM.title}》 (${ALBUM.titleEn}) — ${FACTS.album.releaseDateKo} 발매, ${ALBUM.label}
- ${ALBUM.trackCount}트랙, ${ALBUM.runtime}, ${ALBUM.genre}
- 수록곡: ${TRACKS.map((t) => `${t.no}. ${t.title} (${t.titleEn})`).join(" / ")}
- 앨범 페이지: ${base}/ko/album
- 스트리밍: ${ALBUM.melon}

## 밴드 / Band

${FACTS.band.membersKo
  .map((name, i) => `- ${name} (${FACTS.band.membersEn[i]})`)
  .join("\n")}

- 7년 함께한 밴드의 첫 정규앨범. 소개: ${base}/ko/about

## 출장작곡 / Commissioned songs

- 2010년 수원의 공원에서 시작. ${FACTS.commission.priceThen} → ${FACTS.commission.priceBy2018}
- 인터뷰 ${FACTS.commission.interviewTimeKo}, 작업 ${FACTS.commission.workTimeKo}
- 지금까지 ${FACTS.commission.songsMade}곡

## 공연 / Show

- ${show.title} — ${show.dateLabel}
- ${show.venue}, ${FACTS.show.addressKo}
- ${show.time}
- 예매: ${SITE.showUrl}
- 공연 페이지: ${base}/ko/live

## 롱플레이어 / Long Player

- ${FACTS.longPlayer.nameKo} (${FACTS.longPlayer.nameEn}), ${FACTS.longPlayer.opened} 개점
- ${FACTS.longPlayer.addressKo}
- ${FACTS.longPlayer.hoursKo} · ${FACTS.longPlayer.phone}
- 문의 페이지: ${base}/ko/contact

## 문의 / Contact

- 스튜디오 놀 (Studio NOL) — ${SITE.email}, ${SITE.phone}
- 프레스킷: ${base}/ko/press

## 정정 / Corrections

자료를 인용할 때 아래 사실을 확인해 주세요.

${CORRECTIONS.ko.map((line) => `- ${line}`).join("\n")}

## 주요 페이지

- ${base}/ko 홈
- ${base}/ko/album 앨범·가사·크레딧
- ${base}/ko/about 소개·연표·디스코그래피
- ${base}/ko/live 공연·영상
- ${base}/ko/press 인터뷰·인용·프레스킷
- ${base}/ko/gallery 2018 사진 아카이브
- ${base}/ko/contact 부킹·롱플레이어

## 인용 / Quotes

${QUOTES.slice(0, 4)
  .map((q) => `- "${q.text}" — ${q.source}, ${q.date}${q.url ? ` (${q.url})` : ""}`)
  .join("\n")}

## 보도 / Coverage

${COVERAGE.map((c) => `- ${c.outlet}, "${c.title}", ${c.date} — ${c.url}`).join("\n")}

## 권리

음원·사진·글의 권리는 김동산과 블루이웃에게 있습니다. 인용 시 출처를 밝혀 주세요.
`;

  return new Response(body, {
    headers: { "content-type": "text/plain; charset=utf-8" },
  });
}
