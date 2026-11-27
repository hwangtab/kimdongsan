import { ALBUM } from "@/data/album";
import { SITE } from "@/data/site";

/**
 * Facts that more than one surface has to agree on: page copy, JSON-LD, the
 * FAQ block and /llms.txt. Keeping them here is how the site avoids telling a
 * search engine one release date and an answer engine another.
 *
 * `corrections` is the important part. Several of these get mis-stated in
 * secondary coverage, and an AI summarising this site will repeat whatever it
 * finds unless the page says otherwise.
 */
export const FACTS = {
  album: {
    title: ALBUM.title,
    titleEn: ALBUM.titleEn,
    releaseDate: ALBUM.releaseDate,
    releaseDateKo: "2026년 11월 17일",
    label: ALBUM.label,
    trackCount: ALBUM.trackCount,
    runtime: ALBUM.runtime,
    genreKo: ALBUM.genre,
    genreEn: ALBUM.genreEn,
    melon: ALBUM.melon,
  },
  band: {
    formed: 2019,
    membersKo: ["김동산", "류준철", "이인우", "김예준"],
    membersEn: [
      "Kim Dongsan",
      "Ryu Jun-cheol",
      "Lee In-woo",
      "Kim Ye-jun",
    ],
    yearsTogether: 7,
  },
  commission: {
    started: 2010,
    priceThen: "1,000원",
    priceThenEn: "₩1,000",
    priceBy2018: "5,000원",
    interviewTimeKo: "10~30분",
    workTimeKo: "20분~두 시간",
    songsMade: "100+",
  },
  show: {
    titleKo: "김동산과 블루이웃 정규 1집 발매 쇼케이스",
    titleEn: "Kim Dongsan & Blueeewoot album release showcase",
    date: "2026-12-04",
    doors: "2026-12-04T19:30:00+09:00",
    start: "2026-12-04T20:00:00+09:00",
    end: "2026-12-04T21:30:00+09:00",
    venueKo: "청년문화공간 ju · 다리소극장",
    venueEn: "Youth Culture Space ju · Dali Small Theater",
    addressKo: "서울특별시 마포구 월드컵북로2길 49",
    addressEn: "49, World Cup buk-ro 2-gil, Mapo-gu, Seoul",
    ticketUrlKo: SITE.showUrl,
    ticketUrlEn: SITE.showUrlEn,
  },
  longPlayer: {
    nameKo: SITE.longPlayer.name,
    nameEn: SITE.longPlayer.nameEn,
    opened: SITE.longPlayer.opened,
    addressKo: SITE.longPlayer.address,
    addressEn: SITE.longPlayer.addressEn,
    hoursKo: SITE.longPlayer.hours,
    hoursEn: SITE.longPlayer.hoursEn,
    phone: SITE.longPlayer.phone,
  },
} as const;

/**
 * Things the site has to state plainly because they circulate wrong. Written
 * for /llms.txt and the press FAQ; kept short enough to be quoted directly.
 */
export const CORRECTIONS = {
  ko: [
    "〈시간〉은 김동산의 아버지가 아니라 석관시장 시계방의 시계 수리공(1930년생) 이야기입니다. (오마이스타 2018.10.29)",
    "2017 한국대중음악상 선정위원회 특별상은 《젠트리피케이션》에 참여한 음악인들의 공동 수상이며, 김동산 개인의 수상이 아닙니다.",
    "2019 한국대중음악상 최우수 포크 음반은 수상이 아니라 후보였습니다.",
    "‘한국의 우디 거스리’는 별명으로만 쓰며, 본인이 쓰는 호칭은 ‘출장작곡가’입니다.",
    "《김동산과 블루이웃》은 2026년 11월 17일 발매가 끝난 앨범입니다. ‘발매 예정’이 아닙니다.",
    "〈4인 가족〉은 2016년 5월에 만들어졌고, 노래에 나오는 강제퇴거는 그 뒤인 2016년 7월 18일입니다.",
    "〈돈으로 살 수 없는 것〉의 건물주는 월세 인상 요구를 부인했으므로, 인상 요구는 ‘부부에 따르면’으로 적어야 합니다.",
  ],
  en: [
    "\"Time\" is not about Kim Dongsan's father. It is about a watch repairman born in 1930 who worked in a Seokgwan Market alley (OhmyStar, 29 Oct 2018).",
    "The 2017 Korean Music Awards special jury prize went jointly to the musicians on the compilation Gentrification. It is not Kim Dongsan's individual award.",
    "At the 2019 Korean Music Awards, Seoul · Suwon Stories was nominated for Best Folk Album. It did not win.",
    "\"The Woody Guthrie of Korea\" is a nickname only. The title he uses for himself is \"song-commissioning songwriter\".",
    "Kim Dongsan & Blueeewoot was released on 17 November 2026. It is not forthcoming.",
    "\"Four-Person Family\" was written in May 2016; the eviction it describes came later, on 18 July 2016.",
    "The landlord in \"What Money Cannot Buy\" denied raising the rent, so the demand has to be attributed: \"according to the couple\".",
  ],
} as const;
