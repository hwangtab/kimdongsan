export type Video = {
  id: string;
  title: string;
  titleEn: string;
  venue: string;
  venueEn: string;
  date: string;
  note: string;
  noteEn: string;
};

export const VIDEOS: Video[] = [
  {
    id: "ejTPpS71nX8",
    title: "이름을 모르는 먼 곳의 그대에게 — 서울 쇼케이스",
    titleEn: "To You in a Distant Place… Seoul showcase",
    venue: "스페이스 한강",
    venueEn: "Space Hangang",
    date: "2024.11.02",
    note: "강정피스앤뮤직캠프 컴필레이션 발매 기념 무대.",
    noteEn: "The Seoul showcase for the Gangjeong Peace Music Camp compilation.",
  },
  {
    id: "kMT7Fjzjlpo",
    title: "풍천리 잣나무골 음악회",
    titleEn: "Pungcheon-ri Pine Nut Valley Concert",
    venue: "풍천리 잣나무골",
    venueEn: "Pungcheon-ri",
    date: "2025.07.12",
    note: "양수발전소를 막아내려는 마을 음악회와 잔치.",
    noteEn: "A village concert against the pumped-storage plant.",
  },
  {
    id: "FFkb2KC6StY",
    title: "통영생선구이 블루스 @생기스튜디오",
    titleEn: "Tongyeong Grilled Fish Blues @Saenggi Studio",
    venue: "생기 스튜디오",
    venueEn: "Saenggi Studio",
    date: "2026.02.07",
    note: "Old Roots, New Voices 시리즈 라이브.",
    noteEn: "A live session from the Old Roots, New Voices series.",
  },
  {
    id: "tAXXMUQ4pqQ",
    title: "통영생선구이 블루스 @통영생선구이",
    titleEn: "Tongyeong Grilled Fish Blues @Tongyeong Grilled Fish",
    venue: "서촌 통영생선구이",
    venueEn: "Tongyeong Grilled Fish, Seochon",
    date: "",
    note: "노래의 주인이 된 가게에서 부른 버전.",
    noteEn: "Performed in the restaurant that became the song.",
  },
];
