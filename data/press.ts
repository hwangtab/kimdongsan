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
];

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
