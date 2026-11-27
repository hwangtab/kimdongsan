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
    note: "곱창집을 하던 가족의 이야기. 가게가 밀려나도 가족은 남는다.",
    noteEn:
      "The story of a family who ran a gopchang restaurant. The shop was pushed out; the family remains.",
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
    note: "강제철거 현장에서 만난 사람들의 시간. 늦기 전에 불러야 하는 노래.",
    noteEn:
      "The time of people facing forced eviction — a song that had to be sung before it was too late.",
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
    title: "지동 29길",
    titleEn: "Jidong 29-gil",
    year: "2016",
    place: "수원 지동",
    placeEn: "Jidong, Suwon",
    note: "세계문화유산 등재와 재개발 사이에서 다른 동네로 밀려난 할머니의 이야기.",
    noteEn:
      "A grandmother pushed to another neighbourhood between UNESCO listing and redevelopment.",
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
];
