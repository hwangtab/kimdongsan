import { ALBUM, TRACKS } from "@/data/album";
import { ARCHIVE } from "@/data/archive";
import { COVERAGE, QUOTES } from "@/data/press";
import { SITE } from "@/data/site";
import { VIDEOS } from "@/data/videos";
import { FACTS } from "@/data/facts";
import { href, type Locale } from "@/lib/i18n";

/**
 * JSON-LD builders. Every node that appears on more than one page carries the
 * same `@id`, so Google and answer engines merge them into one entity instead
 * of reading five unrelated bands with the same name.
 */
const id = {
  group: `${SITE.url}/#group`,
  person: `${SITE.url}/#kim-dongsan`,
  album: `${SITE.url}/#album`,
  label: `${SITE.url}/#afternoon`,
  shop: `${SITE.url}/#long-player`,
  site: `${SITE.url}/#website`,
};

const abs = (path: string) => `${SITE.url}${path}`;

/** "5:42" → "PT5M42S". Google wants ISO 8601 durations. */
function isoDuration(mmss: string): string {
  const [m, s] = mmss.split(":").map(Number);
  return `PT${m}M${s}S`;
}

function sameAs() {
  return [SITE.instagram, SITE.facebook, SITE.poclanos];
}

/* ------------------------------------------------------------------ nodes */

export function musicGroupNode(locale: Locale) {
  return {
    "@type": "MusicGroup",
    "@id": id.group,
    name: locale === "ko" ? "김동산과 블루이웃" : "Kim Dongsan & Blueeewoot",
    alternateName:
      locale === "ko" ? "Kim Dongsan & Blueeewoot" : "김동산과 블루이웃",
    url: SITE.url,
    description:
      locale === "ko"
        ? "출장작곡가 김동산과 재즈 피아니스트 류준철, 베이시스트 이인우, 드러머 김예준으로 이루어진 포크·블루스 밴드."
        : "A folk and blues band led by song-commissioning songwriter Kim Dongsan, with jazz pianist Ryu Jun-cheol, bassist Lee In-woo and drummer Kim Ye-jun.",
    genre: ["Folk", "Blues", "Jazz"],
    foundingDate: String(FACTS.band.formed),
    foundingLocation: {
      "@type": "Place",
      name: locale === "ko" ? "대한민국 수원" : "Suwon, South Korea",
    },
    image: abs(ALBUM.cover),
    logo: abs("/icon.svg"),
    sameAs: sameAs(),
    member: FACTS.band.membersKo.map((koName, i) => ({
      "@type": "Person",
      "@id": i === 0 ? id.person : undefined,
      name: locale === "ko" ? koName : FACTS.band.membersEn[i],
      alternateName: locale === "ko" ? FACTS.band.membersEn[i] : koName,
    })),
    album: { "@id": id.album },
  };
}

export function personNode(locale: Locale) {
  return {
    "@type": "Person",
    "@id": id.person,
    name: locale === "ko" ? "김동산" : "Kim Dongsan",
    alternateName:
      locale === "ko"
        ? ["출장작곡가 김동산", "Kim Dongsan"]
        : ["Kim Dongsan", "출장작곡가 김동산"],
    jobTitle:
      locale === "ko"
        ? "싱어송라이터, 출장작곡가"
        : "Singer-songwriter, song-commissioning songwriter",
    description:
      locale === "ko"
        ? "2010년 수원의 공원에서 ‘단돈 1,000원’ 출장작곡을 시작했다. 사람을 만나 이야기를 듣고 그 자리에서 노래를 만든다."
        : "He began commissioning songs for 1,000 won in a Suwon park in 2010: meeting a person, listening to their story, and writing the song on the spot.",
    url: `${SITE.url}${href(locale, "about")}`,
    image: abs("/images/band/member-1.jpg"),
    sameAs: sameAs(),
    memberOf: { "@id": id.group },
    owns: { "@id": id.shop },
  };
}

export function albumNode(locale: Locale) {
  return {
    "@type": "MusicAlbum",
    "@id": id.album,
    name: locale === "ko" ? ALBUM.title : ALBUM.titleEn,
    alternateName: locale === "ko" ? ALBUM.titleEn : ALBUM.title,
    byArtist: { "@id": id.group },
    datePublished: ALBUM.releaseDate,
    numTracks: ALBUM.trackCount,
    duration: "PT45M5S",
    genre: [locale === "ko" ? "포크" : "Folk", locale === "ko" ? "블루스" : "Blues"],
    image: abs(ALBUM.cover),
    url: `${SITE.url}${href(locale, "album")}`,
    albumProductionType: "https://schema.org/StudioAlbum",
    albumReleaseType: "https://schema.org/AlbumRelease",
    publisher: { "@id": id.label },
    sameAs: [ALBUM.melon],
    track: TRACKS.map((track) => trackNode(track, locale)),
  };
}

export function trackNode(track: (typeof TRACKS)[number], locale: Locale) {
  const title = locale === "ko" ? track.title : track.titleEn;
  return {
    "@type": "MusicRecording",
    "@id": `${SITE.url}${href(locale, "album")}#track-${track.no}`,
    position: track.no,
    name: title,
    alternateName: locale === "ko" ? track.titleEn : track.title,
    duration: isoDuration(track.duration),
    byArtist: { "@id": id.group },
    inAlbum: { "@id": id.album },
    audio: {
      "@type": "AudioObject",
      contentUrl: abs(track.audio),
      duration: "PT1M",
      encodingFormat: "audio/mp4",
      description:
        locale === "ko"
          ? "60초 미리듣기"
          : "60-second preview",
    },
    ...(track.lyrics.length
      ? {
          lyrics: {
            "@type": "CreativeWork",
            text: track.lyrics.join("\n"),
            inLanguage: "ko",
            creator: { "@id": id.person },
          },
        }
      : {}),
  };
}

export function labelNode(locale: Locale) {
  return {
    "@type": "Organization",
    "@id": id.label,
    name: locale === "ko" ? ALBUM.label : ALBUM.labelEn,
    url: SITE.studio.url,
    description:
      locale === "ko"
        ? "김동산과 블루이웃의 음반을 내는 레이블."
        : "The label releasing Kim Dongsan & Blueeewoot.",
  };
}

export function eventNode(locale: Locale) {
  const show = FACTS.show;
  return {
    "@type": "MusicEvent",
    "@id": `${SITE.url}${href(locale, "live")}#show-2026-12-04`,
    name: locale === "ko" ? show.titleKo : show.titleEn,
    startDate: show.start,
    endDate: show.end,
    doorTime: show.doors,
    eventStatus: "https://schema.org/EventScheduled",
    eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
    description:
      locale === "ko"
        ? `${show.titleKo}. 200석 전석 자유석, 90분. 게스트 혼 섹션과 코러스가 함께한다.`
        : `The album release showcase. 200 general-admission seats, 90 minutes, with a guest horn section and chorus.`,
    image: abs("/images/live/poster-1800.jpg"),
    url: `${SITE.url}${href(locale, "live")}`,
    location: {
      "@type": "Place",
      name: locale === "ko" ? show.venueKo : show.venueEn,
      address: {
        "@type": "PostalAddress",
        streetAddress:
          locale === "ko" ? "월드컵북로2길 49" : "49, World Cup buk-ro 2-gil",
        addressLocality: locale === "ko" ? "서울특별시 마포구" : "Mapo-gu, Seoul",
        addressCountry: "KR",
      },
    },
    performer: { "@id": id.group },
    organizer: {
      "@type": "Organization",
      name: SITE.studio.name,
      url: SITE.studio.url,
    },
    offers: [
      {
        "@type": "Offer",
        name: locale === "ko" ? "사전예매" : "Advance",
        price: "30000",
        priceCurrency: "KRW",
        url: locale === "ko" ? show.ticketUrlKo : show.ticketUrlEn,
        availability: "https://schema.org/InStock",
        validFrom: "2026-10-20T00:00:00+09:00",
      },
      {
        "@type": "Offer",
        name: locale === "ko" ? "할인권" : "Discount",
        price: "20000",
        priceCurrency: "KRW",
        url: locale === "ko" ? show.ticketUrlKo : show.ticketUrlEn,
        availability: "https://schema.org/InStock",
      },
      {
        "@type": "Offer",
        name: locale === "ko" ? "얼리버드 (매진)" : "Early bird (sold out)",
        price: "20000",
        priceCurrency: "KRW",
        url: locale === "ko" ? show.ticketUrlKo : show.ticketUrlEn,
        availability: "https://schema.org/SoldOut",
      },
    ],
  };
}

export function localBusinessNode(locale: Locale) {
  const shop = FACTS.longPlayer;
  return {
    "@type": "LocalBusiness",
    "@id": id.shop,
    name: locale === "ko" ? shop.nameKo : shop.nameEn,
    alternateName: locale === "ko" ? shop.nameEn : shop.nameKo,
    description:
      locale === "ko"
        ? "LP와 중고 음반, 필름카메라, 오래된 물건을 되살려 파는 가게 겸 LP바. 김동산이 운영한다."
        : "A reuse shop and LP bar selling records, film cameras and old objects. Run by Kim Dongsan.",
    url: `${SITE.url}${href(locale, "contact")}`,
    telephone: shop.phone,
    image: abs("/images/archive/long-player-2018.webp"),
    address: {
      "@type": "PostalAddress",
      streetAddress:
        locale === "ko" ? "정조로 886번길 12" : "12, Jeongjo-ro 886beon-gil",
      addressLocality: locale === "ko" ? "수원시 팔달구" : "Paldal-gu, Suwon",
      addressCountry: "KR",
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: [
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
          "Sunday",
        ],
        opens: "13:00",
        closes: "22:00",
      },
    ],
    founder: { "@id": id.person },
    sameAs: [SITE.longPlayerInstagram],
    hasMap: SITE.longPlayer.naver,
  };
}

export function websiteNode(locale: Locale) {
  return {
    "@type": "WebSite",
    "@id": id.site,
    url: SITE.url,
    name: locale === "ko" ? SITE.name : SITE.nameEn,
    alternateName: locale === "ko" ? SITE.nameEn : SITE.name,
    inLanguage: ["ko", "en"],
    publisher: { "@id": id.group },
  };
}

/* --------------------------------------------------------------- envelopes */

/** Home page: the entity graph every other page points into. */
export function homeGraph(locale: Locale) {
  return {
    "@context": "https://schema.org",
    "@graph": [
      websiteNode(locale),
      musicGroupNode(locale),
      personNode(locale),
      labelNode(locale),
      albumNode(locale),
      eventNode(locale),
      localBusinessNode(locale),
    ],
  };
}

export function albumGraph(locale: Locale) {
  return {
    "@context": "https://schema.org",
    "@graph": [
      albumNode(locale),
      musicGroupNode(locale),
      personNode(locale),
      labelNode(locale),
    ],
  };
}

export function liveGraph(locale: Locale) {
  return {
    "@context": "https://schema.org",
    "@graph": [
      eventNode(locale),
      musicGroupNode(locale),
      albumNode(locale),
      // Declared here rather than as <video:video> in the sitemap: Naver's
      // parser rejects the video extension, and Google reads VideoObject.
      ...VIDEOS.map((video) => ({
        "@type": "VideoObject",
        name: locale === "ko" ? video.title : video.titleEn,
        description: locale === "ko" ? video.note : video.noteEn,
        thumbnailUrl: `https://i.ytimg.com/vi/${video.id}/maxresdefault.jpg`,
        embedUrl: `https://www.youtube-nocookie.com/embed/${video.id}`,
        ...(video.date
          ? { uploadDate: `${video.date.replaceAll(".", "-")}T00:00:00+09:00` }
          : {}),
        publisher: { "@id": id.group },
      })),
    ],
  };
}

export function aboutGraph(locale: Locale) {
  return {
    "@context": "https://schema.org",
    "@graph": [
      personNode(locale),
      musicGroupNode(locale),
      localBusinessNode(locale),
      {
        "@type": "ProfilePage",
        "@id": `${SITE.url}${href(locale, "about")}#page`,
        url: `${SITE.url}${href(locale, "about")}`,
        mainEntity: { "@id": id.person },
      },
    ],
  };
}

export function pressGraph(locale: Locale, faq: { q: string; a: string }[] = []) {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        "@id": `${SITE.url}${href(locale, "press")}#page`,
        url: `${SITE.url}${href(locale, "press")}`,
        name: locale === "ko" ? "프레스 — 김동산과 블루이웃" : "Press — Kim Dongsan & Blueeewoot",
        about: { "@id": id.group },
      },
      musicGroupNode(locale),
      personNode(locale),
      ...(faq.length
        ? [
            {
              "@type": "FAQPage",
              "@id": `${SITE.url}${href(locale, "press")}#faq`,
              mainEntity: faq.map((item) => ({
                "@type": "Question",
                name: item.q,
                acceptedAnswer: { "@type": "Answer", text: item.a },
              })),
            },
          ]
        : []),
      // Each quote is attributed to its outlet and links the original article,
      // so an engine quoting the site can cite the source it came from.
      ...QUOTES.filter((quote) => quote.url).map((quote) => ({
        "@type": "Quotation",
        text: locale === "ko" ? quote.text : quote.textEn,
        spokenByCharacter: { "@id": id.person },
        citation: {
          "@type": "CreativeWork",
          name: locale === "ko" ? quote.source : quote.sourceEn,
          url: quote.url,
          datePublished: quote.date.replaceAll(".", "-"),
        },
      })),
      ...COVERAGE.map((item) => ({
        "@type": "Article",
        headline: locale === "ko" ? item.title : item.titleEn,
        url: item.url,
        datePublished: item.date.replaceAll(".", "-"),
        publisher: {
          "@type": "NewsMediaOrganization",
          name: locale === "ko" ? item.outlet : item.outletEn,
        },
        about: { "@id": id.group },
      })),
    ],
  };
}

export function galleryGraph(locale: Locale) {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "ImageGallery",
        "@id": `${SITE.url}${href(locale, "gallery")}#page`,
        url: `${SITE.url}${href(locale, "gallery")}`,
        name: locale === "ko" ? "사진 — 김동산과 블루이웃" : "Photographs — Kim Dongsan & Blueeewoot",
        about: { "@id": id.group },
      },
      musicGroupNode(locale),
      ...ARCHIVE.map((photo) => ({
        "@type": "ImageObject",
        contentUrl: abs(photo.src),
        width: photo.width,
        height: photo.height,
        caption: locale === "ko" ? photo.caption : photo.captionEn,
        creditText: locale === "ko" ? photo.credit : photo.creditEn,
        creator: { "@type": "Organization", name: locale === "ko" ? photo.credit : photo.creditEn },
        // Published with permission — recorded as a licence statement rather
        // than left for a crawler to infer from the credit line.
        license: photo.href,
        acquireLicensePage: photo.href,
      })),
    ],
  };
}

export function contactGraph(locale: Locale, dictFaq: { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "ContactPage",
        "@id": `${SITE.url}${href(locale, "contact")}#page`,
        url: `${SITE.url}${href(locale, "contact")}`,
        mainEntity: { "@id": id.group },
      },
      {
        "@type": "Organization",
        "@id": id.group,
        name: locale === "ko" ? SITE.name : SITE.nameEn,
        contactPoint: [
          {
            "@type": "ContactPoint",
            contactType: locale === "ko" ? "공연·인터뷰 문의" : "booking and press",
            email: SITE.email,
            telephone: SITE.phoneHref,
            availableLanguage: ["ko", "en"],
          },
        ],
      },
      localBusinessNode(locale),
      personNode(locale),
      ...(dictFaq.length
        ? [
            {
              "@type": "FAQPage",
              "@id": `${SITE.url}${href(locale, "contact")}#faq`,
              mainEntity: dictFaq.map((item) => ({
                "@type": "Question",
                name: item.q,
                acceptedAnswer: { "@type": "Answer", text: item.a },
              })),
            },
          ]
        : []),
    ],
  };
}

/** Renders a graph. Kept in one place so escaping stays consistent. */
export function jsonLdScript(graph: unknown) {
  return JSON.stringify(graph).replace(/</g, "\\u003c");
}
