export type SongStory = {
  title: string;
  titleEn: string;
  year: string;
  place: string;
  placeEn: string;
  note: string;
  noteEn: string;
  release: string;
  releaseEn: string;
  href: string;
};

const ALBUM_2018 = "https://music.bugs.co.kr/album/20142991";
const ALBUM_2026 = "https://www.melon.com/album/detail.htm?albumId=15166320";
const COMP_2016 = "https://music.bugs.co.kr/album/20058944";

export const SONG_STORIES: SongStory[] = [
  {
    title: "수원시립아이파크미술관송",
    titleEn: "Suwon I Park Museum Song",
    year: "2015.09",
    place: "수원시립미술관 명칭 변경 운동",
    placeEn: "the campaign against the museum's corporate name",
    note: "공공미술관 이름에 기업 이름이 붙은 일을 익살스러운 가사로 꼬집었다.",
    noteEn:
      "A comic song about a public museum carrying a corporation's name.",
    release: "2018 1집 《서울·수원 이야기》",
    releaseEn: "Seoul · Suwon Stories (2018)",
    href: ALBUM_2018,
  },
  {
    title: "90세 무명 노인의 이야기",
    titleEn: "The Story of an Unknown 90-Year-Old",
    year: "2015.10",
    place: "경기문화재단 황금마차",
    placeEn: "Gyeonggi Cultural Foundation's Golden Carriage",
    note: "한 사람의 긴 생애를 한 곡에 담았다. 이름 없이 지나간 시간을 담았다.",
    noteEn:
      "A long life gathered into one song — time that passed without a name.",
    release: "2018 1집 《서울·수원 이야기》",
    releaseEn: "Seoul · Suwon Stories (2018)",
    href: ALBUM_2018,
  },
  {
    title: "통영생선구이 블루스",
    titleEn: "Tongyeong Grilled Fish Blues",
    year: "2015.12",
    place: "서촌 통영생선구이",
    placeEn: "Tongyeong Grilled Fish, Seochon",
    note: "가게를 지켜온 사장의 이야기가 블루스가 되었다. 다른 제목은 〈세상에 널리 전하리라〉.",
    noteEn:
      "The story of a shopkeeper who kept her restaurant alive, turned into a blues. Also known as 'Let the World Hear It.'",
    release: "2018 1집 《서울·수원 이야기》",
    releaseEn: "Seoul · Suwon Stories (2018)",
    href: ALBUM_2018,
  },
  {
    title: "4인 가족",
    titleEn: "A Family of Four",
    year: "2016.05",
    place: "가로수길 우장창창",
    placeEn: "Ujangchangchang, Garosu-gil",
    note: "가로수길 곱창집 ‘우장창창’ 서윤수 사장의 이야기. 2012년 건물주가 리쌍으로 바뀌면서 가게를 비우라는 통보를 받았다. 이듬해 1억 8천만 원을 받고 주차장과 지하로 밀려났고, 2016년 7월 강제퇴거됐다. 그저 네 식구가 먹고살 수 있는 삶을 지키려던 한 가장의 이야기.",
    noteEn:
      "The story of Seo Yun-su, who ran the gopchang restaurant Ujangchangchang on Garosu-gil. When the building changed hands to the hip-hop duo Leessang in 2012, he was told to leave. A year later he took ₩180 million and moved to the car park and basement; in July 2016 he was forcibly evicted. The story of a father trying only to keep four family members fed.",
    release: "2018 1집 《서울·수원 이야기》",
    releaseEn: "Seoul · Suwon Stories (2018)",
    href: ALBUM_2018,
  },
  {
    title: "골든타임",
    titleEn: "Golden Time",
    year: "2016.05",
    place: "무악동 옥바라지",
    placeEn: "Muak-dong, Okbaraji",
    note: "무악동 옥바라지 골목의 구본장 여관. 서대문형무소 수감자 가족들이 옥바라지하던 골목에서 30년 넘게 여관을 운영한 이길자 사장의 이야기. 재개발이 밀려오자 마지막까지 남아 버텼고, 2016년 5월 17일 강제퇴거됐다. 늦기 전에 불러야 하는 노래.",
    noteEn:
      "Gubonjang Guesthouse in the Muak-dong Okbaraji alley, where families of Seodaemun Prison inmates once lodged and looked after them. Lee Gil-ja ran the guesthouse there for more than thirty years and stayed on to the last when redevelopment arrived. She was forcibly evicted on 17 May 2016. A song that had to be sung before it was too late.",
    release: "2018 1집 《서울·수원 이야기》",
    releaseEn: "Seoul · Suwon Stories (2018)",
    href: ALBUM_2018,
  },
  {
    title: "아현포차 30년사",
    titleEn: "Thirty Years of Ahyeon Pojangmacha",
    year: "2016.08",
    place: "아현포차",
    placeEn: "Ahyeon street stalls",
    note: "1980년대부터 이어진 포장마차. 재개발로 자리를 떠난 이모님들의 30년을 담았다.",
    noteEn:
      "Street stalls that had stood since the 1980s. Thirty years of the women who ran them, displaced by redevelopment.",
    release: "2018 1집 《서울·수원 이야기》",
    releaseEn: "Seoul · Suwon Stories (2018)",
    href: ALBUM_2018,
  },
  {
    title: "노래하는 이유",
    titleEn: "The Reason We Sing",
    year: "2016.09",
    place: "콜트콜텍 해고 노동자 밴드",
    placeEn: "the Colt Colttek workers' band",
    note: "기타를 만들던 노동자들이 노조를 만들었다가 해고됐다. 그들이 노래하는 이유를 함께 썼다.",
    noteEn:
      "Guitar makers formed a union and were dismissed. Their reason for singing became a song.",
    release: "2018 1집 《서울·수원 이야기》",
    releaseEn: "Seoul · Suwon Stories (2018)",
    href: ALBUM_2018,
  },
  {
    title: "도면없는 예술가",
    titleEn: "The Artist Without Blueprints",
    year: "2016.11",
    place: "수원 지동",
    placeEn: "Jidong, Suwon",
    note: "보상 이전을 앞둔 집 수리공의 이야기. 도면 없이 고쳐온 집과 삶.",
    noteEn:
      "A repairman facing relocation. Houses and lives mended without blueprints.",
    release: "2018 1집 《서울·수원 이야기》",
    releaseEn: "Seoul · Suwon Stories (2018)",
    href: ALBUM_2018,
  },
  {
    title: "수원 지동 29길",
    titleEn: "Suwon Jidong 29-gil",
    year: "2016",
    place: "수원 지동",
    placeEn: "Jidong, Suwon",
    note: "지동에서 오래 산 할머니의 이야기. 황해도 옹진 사람인 할아버지를 따라 지동에 내려와 남문에서 야채를 팔며 살았다. 화성의 유네스코 등재 뒤 재개발이 밀려오자 다른 동네로 밀려났고, 30년 전 잃어버린 자동차세가 빠진 열세 평 반 보상금이 산산이 흩어졌다.",
    noteEn:
      "A grandmother who lived in Jidong for decades. She followed her husband, a man from Ongjin in Hwanghae, down to the neighbourhood and sold vegetables near the south gate. When redevelopment arrived after Hwaseong's UNESCO listing, she was pushed out — her compensation for thirteen and a half pyeong whittled down by a car tax from thirty years ago, and scattered to nothing.",
    release: "2016 《젠트리피케이션》",
    releaseEn: "Gentrification (2016)",
    href: COMP_2016,
  },
  {
    title: "돈으로 살 수 없는 것",
    titleEn: "What Money Cannot Buy",
    year: "2018.02",
    place: "서촌 궁중족발",
    placeEn: "Gungjung Jokbal, Seochon",
    note: "임대료를 네 배로 올리겠다는 통보, 열두 차례의 강제집행, 그 과정에서 다친 남편. 가게를 지키려 모인 음악가·시인·신학생·여성들·다른 상인들. 김동산은 2018년 2월 그 가게에서 이 노래를 녹음했다.",
    noteEn:
      "A rent demand four times the old rate, twelve forced evictions, and a husband injured in the process. Musicians, poets, seminary students, women and neighbouring shopkeepers who stood together to keep the restaurant open. Kim Dongsan recorded the song there in February 2018.",
    release: "2026 정규 1집 《김동산과 블루이웃》",
    releaseEn: "Kim Dongsan & Blueeewoot (2026)",
    href: ALBUM_2026,
  },
  {
    title: "시간",
    titleEn: "Time",
    year: "2026",
    place: "석관시장 시계방",
    placeEn: "a watch shop in Seokgwan Market",
    note: "1930년생 시계 수리공의 생애. 황해 연백, 전쟁, 양구의 시계방, 석관동을 지나온 시간.",
    noteEn:
      "The life of a watch repairman born in 1930 — Hwanghae, the war, a clock shop in Yanggu, Seokgwan-dong.",
    release: "2026 정규 1집 《김동산과 블루이웃》",
    releaseEn: "Kim Dongsan & Blueeewoot (2026)",
    href: ALBUM_2026,
  },
  {
    title: "되돌아보는 노래",
    titleEn: "A Song Looking Back",
    year: "2026",
    place: "2007년 한 사람의 폭로 이후",
    placeEn: "the aftermath of one man's disclosure, 2007",
    note: "2007년 삼성 비자금 의혹을 폭로한 김용철 변호사의 사연으로 만든 곡. 폭로 뒤 그에게 돌아온 것은 '배신자'라는 말, 집까지 따라붙는 사람들이었다. 말은 할 수 있었지만 대화는 할 수 없던 시간을 견디게 한 누군가를 '친구'라 부르고, 끝내 '우리'라 부른다. 여덟 번째 트랙은 이 노래를 혼 섹션과 함께 다시 열어, 혼자였던 노래를 여럿의 자리로 바꾼다.",
    noteEn:
      "Made from the story of Kim Yong-cheol, the lawyer who exposed Samsung's slush-fund scandal in 2007. What came back at him was the word 'traitor' and people following him to his door. The presence that carried him through a time when he could speak but not converse is called a friend, and at last 'we'. The eighth track reopens the song with a horn section, turning a solo into a room full of voices.",
    release: "2026 정규 1집 《김동산과 블루이웃》",
    releaseEn: "Kim Dongsan & Blueeewoot (2026)",
    href: ALBUM_2026,
  },
  {
    title: "양평상여소리꾼 노래",
    titleEn: "The Yangpyeong Bier-Singer's Song",
    year: "2026",
    place: "양평",
    placeEn: "Yangpyeong",
    note: "아홉 살에 할아버지의 상여 소리를 듣고 귀에 담아 둔 사람이, 스물넷에 요령과 북을 달라 하여 열두 대문 가는 길을 불렀다. 양평 상여소리꾼의 구술 생애가 전통 상여소리 위에 얹힌다. 마지막 절은 이렇게 닫힌다 — \"오늘날 내게 당하여선 대문밖이 저승일세\".",
    noteEn:
      "At nine he heard his grandfather's bier song and kept it in his ear. At twenty-four he asked for the bell and drum and sang the road through twelve gates. An oral life of a Yangpyeong bier singer, set over the traditional funeral song. It closes: 'Now that it has come to me, the other side of the gate is the next world.'",
    release: "2026 정규 1집 《김동산과 블루이웃》",
    releaseEn: "Kim Dongsan & Blueeewoot (2026)",
    href: ALBUM_2026,
  },
  {
    title: "자나팜 블루스",
    titleEn: "Janapam Blues",
    year: "2026",
    place: "천장만 바라보는 하루",
    placeEn: "an afternoon spent staring at the ceiling",
    note: "불안을 낮추는 약의 이름을 제목으로 삼았다. 나약해진 의지, 끊이지 않는 기억, 하루 종일 천장을 바라보는 시간. 탓하지 않고 곁에 앉아 있는 곡이다.",
    noteEn:
      "A blues named after a tranquilliser. A will gone soft, memories that will not stop arriving, a whole day spent looking at the ceiling. The song does not scold; it sits down beside you.",
    release: "2026 정규 1집 《김동산과 블루이웃》",
    releaseEn: "Kim Dongsan & Blueeewoot (2026)",
    href: ALBUM_2026,
  },
  {
    title: "물결",
    titleEn: "Ripples",
    year: "2010 — 2026",
    place: "수원의 한 공원",
    placeEn: "a park in Suwon",
    note: "2010년 수원의 한 공원에서 부른 반핵 노래. 2024년 12월 20일 싱글로 먼저 나왔고 그때 코러스는 세민이 맡았다. 2026년 앨범에서는 강가 히말라야의 목소리를 얻어 다시 흐른다. 노래도 눈물도 같은 물결 속으로 간다.",
    noteEn:
      "An anti-nuclear song first sung in a Suwon park in 2010. It came out as a single on 20 December 2024 with Semin on harmony, and returns on the 2026 album with Gangga Himalaya's voice. The song and the tears go into the same ripple.",
    release: "2026 정규 1집 《김동산과 블루이웃》",
    releaseEn: "Kim Dongsan & Blueeewoot (2026)",
    href: ALBUM_2026,
  },
];
