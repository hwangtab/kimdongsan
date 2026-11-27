export type Release = {
  year: string;
  date: string;
  title: string;
  titleEn: string;
  type: string;
  typeEn: string;
  role: string;
  roleEn: string;
  note: string;
  noteEn: string;
  art?: string;
  current?: boolean;
};

export const DISCOGRAPHY: Release[] = [
  {
    year: "2026",
    date: "2026.11.17",
    title: "김동산과 블루이웃",
    titleEn: "Kim Dongsan & Blueeewoot",
    type: "정규 1집",
    typeEn: "Studio album",
    role: "김동산과 블루이웃",
    roleEn: "Kim Dongsan & Blueeewoot",
    note: "8트랙, 45:05. 애프터눈. 첫 정규앨범.",
    noteEn: "8 tracks, 45:05. Afternoon. The band's first full-length album.",
    art: "/images/album/cover-1000.jpg",
    current: true,
  },
  {
    year: "2024",
    date: "2024.12.20",
    title: "물결",
    titleEn: "Ripples",
    type: "싱글",
    typeEn: "Single",
    role: "김동산과 블루이웃",
    roleEn: "Kim Dongsan & Blueeewoot",
    note: "2010년의 반핵 노래를 밴드 편곡으로 다시 녹음했다. 2026년 정규앨범에도 실렸다.",
    noteEn:
      "The 2010 anti-nuclear song, rearranged by the band. It returns on the 2026 album.",
  },
  {
    year: "2024",
    date: "2024.11",
    title: "이름을 모르는 먼 곳의 그대에게",
    titleEn: "To You in a Distant Place Whose Name I Don't Know",
    type: "컴필레이션",
    typeEn: "Compilation",
    role: "참여 — 〈물결〉",
    roleEn: "Featured — 'Ripples'",
    note: "강정피스앤뮤직캠프. 12팀이 전쟁과 폭력에 반대하며 만든 음반.",
    noteEn:
      "Gangjeong Peace Music Camp. Twelve acts against war and violence.",
  },
  {
    year: "2018",
    date: "2018.01.22",
    title: "서울·수원 이야기",
    titleEn: "Seoul · Suwon Stories",
    type: "정규 1집",
    typeEn: "Studio album",
    role: "출장작곡가 김동산",
    roleEn: "Kim Dongsan",
    note: "원 마이크, 원 테이크. 제16회 한국대중음악상 최우수 포크 음반 후보.",
    noteEn:
      "One microphone, one take. Nominated for Best Folk Album at the 16th Korean Music Awards.",
  },
  {
    year: "2017",
    date: "2017.12.11",
    title: "새 민중음악 선곡집 Vol.2 — 연대의 노래",
    titleEn: "New Folk Music Selection Vol.2 — Songs of Solidarity",
    type: "컴필레이션",
    typeEn: "Compilation",
    role: "참여 — 〈연대의 노래〉",
    roleEn: "Featured — 'A Song of Solidarity'",
    note: "성주 소성리 사드 배치 반대 투쟁 현장에서 정진석을 인터뷰해 만든 곡이 실렸다.",
    noteEn:
      "Includes 'A Song of Solidarity', made from an interview with Jeong Jin-seok at the Seongju Soseong-ri struggle against THAAD.",

  },
  {
    year: "2016",
    date: "2016.10.05",
    title: "젠트리피케이션",
    titleEn: "Gentrification",
    type: "컴필레이션",
    typeEn: "Compilation",
    role: "참여 — 〈수원 지동 29길〉, 〈통영생선구이 블루스〉",
    roleEn: "Featured — 'Suwon Jidong 29-gil', 'Tongyeong Grilled Fish Blues'",
    note: "자립음악생산조합. 제14회 한국대중음악상 선정위원회 특별상 공동 수상.",
    noteEn:
      "Independent Music Producers' Cooperative. Shared special jury award at the 14th Korean Music Awards.",
  },
];
