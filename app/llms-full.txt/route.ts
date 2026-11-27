import { ALBUM, CREDITS, TRACKS } from "@/data/album";
import { CORRECTIONS, FACTS } from "@/data/facts";
import { BIOS, MEMBERS, PRINCIPLES, SITE, TIMELINE } from "@/data/site";
import { DISCOGRAPHY } from "@/data/discography";
import { SHOW_DETAILS, SHOWS } from "@/data/shows";

/**
 * /llms-full.txt — the single-file version, in the shape llmstxt.org suggests
 * for agents that want the whole document rather than the index. Generated
 * from `data/` so it cannot drift from the pages.
 */
export const dynamic = "force-static";

export function GET() {
  const base = SITE.url;
  const show = SHOWS.find((s) => s.featured)!;

  const sections: string[] = [];

  sections.push(`# ${SITE.name} (${SITE.nameEn}) — EPK 전문

${BIOS.ko.long}

---

## English

${BIOS.en.long}
`);

  sections.push(`## 앨범 《${ALBUM.title}》

- ${ALBUM.type} · ${ALBUM.releaseLabel} · ${ALBUM.label} · ${ALBUM.runtime} · ${ALBUM.trackCount}트랙
- 장르: ${ALBUM.genre}
- ${ALBUM.melon}

${TRACKS.map(
  (track) => `### ${track.no}. ${track.title} (${track.titleEn}) — ${track.duration}

${track.note}

재료: ${track.ingredient} / 조리: ${track.method}

${track.lyrics.length ? `가사:\n\n${track.lyrics.join("\n")}` : "(연주곡)"}

크레딧: ${track.creditsKo.join(" · ")}
`,
).join("\n")}`);

  sections.push(`## 크레딧

${CREDITS.map((group) => `### ${group.group}\n\n${group.ko.join("\n")}`).join("\n\n")}`);

  sections.push(`## 밴드

${MEMBERS.map((m) => `- ${m.name} (${m.nameEn}) — ${m.role}${m.note ? ` · ${m.note}` : ""}`).join("\n")}

## 소개 전문

${BIOS.ko.long}`);

  sections.push(`## 방식

${TIMELINE.map((entry) => `- ${entry.year} — ${entry.ko}`).join("\n")}

## 원칙

${PRINCIPLES.map((p) => `- ${p.title.ko}: ${p.body.ko}`).join("\n")}`);

  sections.push(`## 디스코그래피

${DISCOGRAPHY.map(
  (release) => `- ${release.date} 《${release.title}》 (${release.titleEn}) — ${release.type}, ${release.role}. ${release.note}`,
).join("\n")}`);

  sections.push(`## 공연

### ${show.title} — ${show.dateLabel}

- ${show.venue}, ${FACTS.show.addressKo}
- ${show.time}
- ${show.note}
- 예매: ${SITE.showUrl}

티켓: ${SHOW_DETAILS.prices.map((p) => `${p.label} ${p.price} (${p.state})`).join(" / ")}

출연진:
${SHOW_DETAILS.castKo.map((line) => `- ${line}`).join("\n")}

지난 공연:
${SHOWS.filter((s) => !s.featured)
  .map((s) => `- ${s.dateLabel} ${s.title}, ${s.venue} (${s.city})`)
  .join("\n")}`);

  sections.push(`## 롱플레이어

- ${FACTS.longPlayer.nameKo} (${FACTS.longPlayer.nameEn}), ${FACTS.longPlayer.opened} 개점
- ${FACTS.longPlayer.addressKo}
- ${FACTS.longPlayer.hoursKo} · ${FACTS.longPlayer.phone}
- ${SITE.longPlayer.naver}`);

  sections.push(`## 문의

- 스튜디오 놀 — ${SITE.email} · ${SITE.phone}
- 인스타그램 — ${SITE.instagramHandle}
- 프레스킷 — ${base}/ko/press`);

  sections.push(`## 정정 사항

자료를 인용할 때 아래 사실을 확인해 주세요.

${CORRECTIONS.ko.map((line) => `- ${line}`).join("\n")}

English:

${CORRECTIONS.en.map((line) => `- ${line}`).join("\n")}`);

  sections.push(`## 페이지

${[
  ["홈", "/ko"],
  ["앨범", "/ko/album"],
  ["소개", "/ko/about"],
  ["공연", "/ko/live"],
  ["프레스", "/ko/press"],
  ["사진", "/ko/gallery"],
  ["문의", "/ko/contact"],
]
  .map(([label, path]) => `- ${label}: ${base}${path}`)
  .join("\n")}`);

  return new Response(sections.join("\n\n---\n\n"), {
    headers: { "content-type": "text/plain; charset=utf-8" },
  });
}
