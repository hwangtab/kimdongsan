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
    text: "블루스와 포크를 한국 입맛으로 내는 집.\n\n블루스·포크·록은 서양에서 온 요리다. 이 밴드는 그 요리를 한국의 재료와 입맛으로 다시 조리한다. 경양식집이 돈까스와 함박스테이크를 한국 식탁의 것으로 만들었듯, 김동산과 블루이웃은 블루스를 한국말의 리듬과 사연으로 다시 만든다. 이번에는 밴드가 불을 켠다 — 여덟 곡 전부를 네 사람이 연주하고, 세 곡에 알토 색소폰과 트럼펫이 붙는다.",
    facts: [
      "정규 1집은 2026년 11월 17일 발매했습니다.",
      "여덟 곡 전부를 김동산·류준철·이인우·김예준 네 사람이 연주합니다. 드럼·베이스·해먼드 오르간·일렉트릭 기타가 앨범 전체를 받치고, 세 곡에 알토 색소폰과 트럼펫이 더해집니다.",
      "〈돈으로 살 수 없는 것〉은 2018년 2월 서촌(체부동)의 족발집 ‘궁중족발’에서 녹음했습니다. 사장 윤경자·김우식 부부에 따르면 2016년 새 건물주가 보증금 3,000만 원·월세 297만 원이던 조건을 보증금 1억 원·월세 1,200만 원으로 올리라고 했고, 부부는 가게를 비우지 않았습니다. 2017년 10월부터 이듬해 6월까지 강제집행이 열두 번 있었으며, 2017년 11월 9일 두 번째 집행에서 김우식의 왼손 손가락 네 개가 부분 절단됐습니다. 음악가가 기타를 치고 시인과 신학생, 여성들, 다른 상인들이 밤마다 가게를 지켰습니다. 건물주는 인상 요구를 부인했습니다.",
      "〈되돌아보는 노래〉는 2007년 삼성 비자금 의혹을 폭로한 김용철 변호사의 사연으로 만든 곡입니다. 폭로 뒤 그에게 돌아온 것은 ‘배신자’라는 말과 집까지 따라붙는 사람들이었습니다. 여덟 번째 트랙은 이 노래를 혼 섹션과 함께 다시 열어, 혼자였던 노래를 여럿의 자리로 바꿉니다.",
      "〈양평상여소리꾼 노래〉는 아홉 살에 할아버지의 상여 소리를 듣고 귀에 담아 둔 사람이, 스물넷에 요령과 북을 달라 하여 열두 대문 가는 길을 부른 구술 생애입니다.",
      "〈물결〉은 2010년 수원의 한 공원에서 부른 반핵 노래입니다. 2024년 싱글의 코러스는 세민이, 2026년 앨범 버전은 강가 히말라야가 맡았습니다.",
      "〈시간〉은 석관시장 시계방의 시계 수리공(1930년생)의 이야기입니다.",
      "2017 한국대중음악상 선정위원회 특별상은 《젠트리피케이션》 참여 음악인의 공동 수상입니다.",
      "2019 한국대중음악상 최우수 포크 음반 후보는 2018년 《서울·수원 이야기》입니다. 이번 앨범은 그 연장선에서 밴드와 함께 만든 첫 정규앨범입니다.",
    ],
  },
  en: {
    label: "One-liner",
    text: "Blues and folk, cooked the Korean way.\n\nBlues, folk and rock came from elsewhere. This band re-cooks them with Korean ingredients, the way the old diners took Western dishes and made them belong to the neighbourhood. This time the band turns the lights on: all eight tracks are played by four people, with alto saxophone and trumpet on three songs.",
    facts: [
      "The debut album came out on November 17, 2026.",
      "All eight tracks are played by Kim Dongsan, Ryu Jun-cheol, Lee In-woo and Kim Ye-jun. Drums, bass, Hammond organ and electric guitar carry the record; alto saxophone and trumpet join on three songs.",
      "'What Money Cannot Buy' was recorded in February 2018 inside Gungjung Jokbal, a pork-trotter restaurant in Chebudong, Seochon. According to its owners Yoon Kyung-ja and Kim Woo-sik, a new landlord in 2016 asked for a deposit of ₩100 million and monthly rent of ₩12 million, up from ₩30 million and ₩2.97 million; the couple did not leave. Between October 2017 and June 2018 there were twelve forced evictions, and on 9 November 2017, during the second, four fingers of Kim Woo-sik's left hand were partly severed. Musicians played guitar, poets and seminary students, women and neighbouring shopkeepers kept the restaurant standing every night. The landlord has denied asking for the increase.",
      "'A Song Looking Back' comes from the story of Kim Yong-cheol, the lawyer who exposed Samsung's slush-fund scandal in 2007. What came back at him was the word 'traitor' and people following him to his door. The eighth track reopens the song with a horn section, turning a solo into a room full of voices.",
      "'The Yangpyeong Bier-Singer's Song' is the oral life of a man who at nine heard his grandfather's funeral song and kept it in his ear, and who at twenty-four asked for the bell and drum and sang the road through twelve gates.",
      "'Ripples' began as an anti-nuclear song sung in a Suwon park in 2010. Semin sang harmony on the 2024 single; Gangga Himalaya sings on the 2026 album version.",
      "'Time' is the story of a watch repairer born in 1930, who kept a shop in Seokgwan Market.",
      "The 2017 Korean Music Awards special jury award went jointly to the musicians who took part in the compilation Gentrification.",
      "The 2019 Best Folk Album nomination was for Seoul · Suwon Stories (2018). This album is the first full-length made with the band since then.",
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
