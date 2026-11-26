export type Quote = {
  text: string;
  textEn: string;
  source: string;
  sourceEn: string;
  date: string;
  url?: string;
};

export const QUOTES: Quote[] = [
  {
    text: "이 밴드 덕분에 음악을 손에서 놓지 않고 살아 올 수 있었습니다.",
    textEn: "Because of this band I have been able to keep music in my hands and keep living.",
    source: "류준철 (피아노), 발매 전 글",
    sourceEn: "Ryu Jun-cheol (piano), in a post before the release",
    date: "2026.11.15",
    url: "https://www.instagram.com/p/DfwRO2FPbgG/",
  },
  {
    text: "작곡 비용을 천원으로 정한 이유는 의뢰인도 저도 너무 부담을 갖지 말자는 거였죠.",
    textEn:
      "I set the price at 1,000 won so that neither the person commissioning nor I would feel burdened.",
    source: "김동산, 민중의소리 인터뷰",
    sourceEn: "Kim Dongsan, interviewed by Voice of the People",
    date: "2018.03.12",
    url: "http://www.vop.co.kr/A00001264570.html",
  },
  {
    text: "세상사 인생사 모든 이야기가 소재가 되어 세상에 하나밖에 없는 나만의 노래가 된다.",
    textEn:
      "Every story of the world and of a life becomes material, and becomes a song that exists nowhere else.",
    source: "오마이뉴스, 출장작곡 설명",
    sourceEn: "OhmyNews, describing the commissioned-song practice",
    date: "2017.12.14",
    url: "https://www.ohmynews.com/NWS_Web/View/at_pg.aspx?CNTN_CD=A0002383442",
  },
  {
    text: "권선징악과 영웅 이야기보다 ‘그냥 살아가는 이야기’에 끌린다.",
    textEn:
      "I am drawn to stories of simply getting by, more than to tales of heroes and virtue rewarded.",
    source: "김동산, 오마이스타",
    sourceEn: "Kim Dongsan, interviewed by OhmyStar",
    date: "2018.10.29",
    url: "https://star.ohmynews.com/NWS_Web/OhmyStar/at_pg.aspx?CNTN_CD=A0002483002",
  },
  {
    text: "이 시대의 진정한 음유시인.",
    textEn: "A true troubadour of our time.",
    source: "뉴스아트",
    sourceEn: "NewsArt",
    date: "2025.10.26",
    url: "https://news-art.co.kr/news/article.html?no=32861",
  },
  {
    text: "이야기가 섬세하고 생생하며 역사의 기록까지 해낸다.",
    textEn: "The stories are delicate and alive, and the songs end up recording history.",
    source: "한국대중음악상 심사평 (경인일보 인용)",
    sourceEn: "Korean Music Awards jury note, quoted by Kyeongin Ilbo",
    date: "2020.07.13",
    url: "https://www.kyeongin.com/article/1510273",
  },
  {
    text: "노래로 만드는 ‘만인보’.",
    textEn: "A 'Ten Thousand Lives' made of songs.",
    source: "한겨레",
    sourceEn: "Hankyoreh",
    date: "2019.10.19",
    url: "http://hani.co.kr/arti/culture/music/831865.html",
  },
  {
    text: "노래는 어떻게 세월을 기록하고 증언하는가.",
    textEn: "How does a song record and bear witness to time?",
    source: "온음",
    sourceEn: "Tonplein",
    date: "2019",
    url: "https://www.tonplein.com/%EC%B6%9C%EC%9E%A5%EC%9E%91%EA%B3%A1%EA%B0%80-%EA%B9%80%EB%8F%99%EC%82%B0-%E3%80%8E%EC%84%9C%EC%9A%B8%E3%83%BB%EC%88%98%EC%9B%90-%EC%9D%B4%EC%95%BC%EA%B8%B0%E3%80%8F/",
  },
];

export const COVERAGE = [
  {
    outlet: "한겨레",
    outletEn: "Hankyoreh",
    title: "단돈 1000원에 당신의 인생을 불러드립니다",
    titleEn: "I will sing your life for 1,000 won",
    date: "2019.10.19",
    url: "http://hani.co.kr/arti/culture/music/831865.html",
  },
  {
    outlet: "경인일보",
    outletEn: "Kyeongin Ilbo",
    title: "‘출장 작곡가’ 싱어송라이터 김동산",
    titleEn: "Kim Dongsan, the 'song-commissioning' singer-songwriter",
    date: "2020.07.13",
    url: "https://www.kyeongin.com/article/1510273",
  },
  {
    outlet: "뉴스아트",
    outletEn: "NewsArt",
    title: "길 잃은 펑크록커와 블루스 음유시인, 서로를 노래하다",
    titleEn: "A lost punk rocker and a blues troubadour sing each other",
    date: "2025.10.26",
    url: "https://news-art.co.kr/news/article.html?no=32861",
  },
  {
    outlet: "온음",
    outletEn: "Tonplein",
    title: "출장작곡가 김동산, 『서울·수원 이야기』",
    titleEn: "Kim Dongsan, Seoul · Suwon Stories",
    date: "2019",
    url: "https://www.tonplein.com/%EC%B6%9C%EC%9E%A5%EC%9E%91%EA%B3%A1%EA%B0%80-%EA%B9%80%EB%8F%99%EC%82%B0-%E3%80%8E%EC%84%9C%EC%9A%B8%E3%83%BB%EC%88%98%EC%9B%90-%EC%9D%B4%EC%95%BC%EA%B8%B0%E3%80%8F/",
  },
  {
    outlet: "강정피스앤뮤직캠프",
    outletEn: "Gangjeong Peace Music Camp",
    title: "김동산과 블루이웃",
    titleEn: "Kim Dongsan & Blueeewoot",
    date: "2026",
    url: "https://peaceandmusic.net/camps/2026/musicians/3",
  },
  {
    outlet: "민중의소리",
    outletEn: "Voice of the People",
    title: "‘출장작곡가’ 김동산 “당신만을 위한 노래를 만들어 드립니다”",
    titleEn: "'Song-commissioning' Kim Dongsan: 'I will make a song just for you'",
    date: "2018.03.12",
    url: "http://www.vop.co.kr/A00001264570.html",
  },
  {
    outlet: "오마이뉴스",
    outletEn: "OhmyNews",
    title: "길 위에서 노래하는 출장 작곡가를 아시나요?",
    titleEn: "Do you know the song-commissioning songwriter who sings on the road?",
    date: "2017.12.14",
    url: "https://www.ohmynews.com/NWS_Web/View/at_pg.aspx?CNTN_CD=A0002383442",
  },
  {
    outlet: "오마이스타",
    outletEn: "OhmyStar",
    title: "콜트콜텍·아현포차도 가사로, 서민의 삶 노래하는 ‘출장작곡가’",
    titleEn:
      "Colt Colttek and Ahyeon stalls in song: the 'song-commissioning' songwriter",
    date: "2018.10.29",
    url: "https://star.ohmynews.com/NWS_Web/OhmyStar/at_pg.aspx?CNTN_CD=A0002483002",
  },
  {
    outlet: "포크라노스",
    outletEn: "Poclanos",
    title: "출장작곡가 김동산 — 아티스트 페이지",
    titleEn: "Kim Dongsan — artist page",
    date: "2018",
    url: "https://poclanos.com/artist/%EC%B6%9C%EC%9E%A5%EC%9E%91%EA%B3%A1%EA%B0%80-%EA%B9%80%EB%8F%99%EC%82%B0/",
  },
  {
    outlet: "뉴스아트",
    outletEn: "NewsArt",
    title: "서로 다른 길을 걸어온 네 뮤지션, ‘건강’을 노래하다",
    titleEn: "Four musicians, four paths, singing 'health'",
    date: "2026.06.14",
    url: "https://news-art.co.kr/news/article.html?no=32937",
  },
];

/* 기사용으로 그대로 복사해 쓸 수 있는 한 줄 소개와, 바로 확인할 사실 몇 가지. */
export const PRESS_NOTE = {
  ko: {
    label: "한 줄 소개",
    text: "블루스와 포크를 한국 입맛으로 내는 집.\n\n블루스·포크·록은 서양에서 온 요리다. 이 밴드는 그 요리를 한국의 재료와 입맛으로 다시 조리한다. 경양식집이 돈까스와 함박스테이크를 한국 식탁의 것으로 만들었듯, 김동산과 블루이웃은 블루스를 한국말의 리듬과 사연으로 다시 만든다.",
    facts: [
      "정규 1집은 2026년 11월 17일 발매했습니다.",
      "〈시간〉은 석관시장 시계방의 시계 수리공(1930년생)의 이야기입니다.",
      "2017 한국대중음악상 선정위원회 특별상은 《젠트리피케이션》 참여 음악인의 공동 수상입니다.",
    ],
  },
  en: {
    label: "One-liner",
    text: "Blues and folk, cooked the Korean way.\n\nBlues, folk and rock came from elsewhere. This band re-cooks them with Korean ingredients, the way the old diners took Western dishes and made them belong to the neighbourhood.",
    facts: [
      "The debut album came out on November 17, 2026.",
      "'Time' is the story of a watch repairer born in 1930, who kept a shop in Seokgwan Market.",
      "The 2017 Korean Music Awards special jury award went jointly to the musicians who took part in the compilation Gentrification.",
    ],
  },
} as const;

export const PRESS_KIT = [
  {
    label: "앨범 커버",
    labelEn: "Album cover",
    meta: "2000 × 2000 JPG",
    href: "/images/album/cover-2000.jpg",
    download: "kimdongsan-blueeewoot-cover.jpg",
  },
  {
    label: "쇼케이스 포스터",
    labelEn: "Showcase poster",
    meta: "1800px JPG",
    href: "/images/live/poster-1800.jpg",
    download: "kimdongsan-blueeewoot-poster.jpg",
  },
  {
    label: "라이브 사진",
    labelEn: "Live photo",
    meta: "1400 × 928 JPG",
    href: "/images/live/live-1400.jpg",
    download: "kimdongsan-blueeewoot-live.jpg",
  },
  {
    label: "밴드 사진",
    labelEn: "Band photo",
    meta: "800 × 800 JPG · 강정피스앤뮤직캠프",
    href: "/images/band/band-800.jpg",
    download: "kimdongsan-blueeewoot-band.jpg",
  },
];
