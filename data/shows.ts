export type Show = {
  id: string;
  date: string;
  dateLabel: string;
  year: string;
  title: string;
  titleEn: string;
  venue: string;
  venueEn: string;
  city: string;
  cityEn: string;
  time?: string;
  timeEn?: string;
  status?: "on-sale" | "sold-out" | "past";
  statusLabel?: string;
  statusLabelEn?: string;
  ticketUrl?: string;
  note: string;
  noteEn: string;
  featured?: boolean;
};

export const SHOWS: Show[] = [
  {
    id: "release-showcase-2026",
    date: "2026-12-04",
    dateLabel: "2026.12.04 (금)",
    year: "2026",
    title: "정규 1집 발매 쇼케이스",
    titleEn: "Album release showcase",
    venue: "청년문화공간 ju · 다리소극장",
    venueEn: "Youth Culture Space ju · Dali Small Theater",
    city: "서울 마포",
    cityEn: "Mapo, Seoul",
    time: "19:30 입장 · 20:00 시작",
    timeEn: "Doors 19:30 · Show 20:00",
    status: "on-sale",
    statusLabel: "예매 중",
    statusLabelEn: "On sale",
    ticketUrl: "https://studionol.co.kr/ko/shows/kim-dongsan-blueeewoot#book",
    featured: true,
    note: "200석 전석 자유석, 90분. 얼리버드 20,000원은 매진되었고 사전예매 30,000원과 할인권 20,000원을 받는다. 게스트 이형주, 강가 히말라야, 정수민, 김성완, 브라이언 신, 윤숭·허정혁·원니. 오프닝은 원호와 타임머신.",
    noteEn:
      "200 seats, general admission, 90 minutes. Early bird (₩20,000) is sold out; advance tickets are ₩30,000 and discount tickets ₩20,000. Guests: Lee Hyeong-ju, Gangga Himalaya, Jung Su-min, Kim Seong-wan, Brian Shin, Yoon Soong, Heo Jeong-hyeok and Wonni. Wonho and the Time Machine open.",
  },
  {
    id: "gangjeong-2026",
    date: "2026-06-05",
    dateLabel: "2026.06.05–07",
    year: "2026",
    title: "제3회 강정피스앤뮤직캠프",
    titleEn: "3rd Gangjeong Peace Music Camp",
    venue: "제주 강정마을",
    venueEn: "Gangjeong Village, Jeju",
    city: "제주",
    cityEn: "Jeju",
    status: "past",
    note: "전쟁을 끝내자는 노래가 모인 사흘. 2026년 캠프에는 3일간 50팀이 무대에 올랐다.",
    noteEn:
      "Three days of songs calling for an end to war. Fifty acts performed across the 2026 camp.",
  },
  {
    id: "rhythm-rabbit-2026",
    date: "2026-02-07",
    dateLabel: "2026.02.07",
    year: "2026",
    title: "리듬래빗: Old Roots, New Voices",
    titleEn: "Rhythm Rabbit: Old Roots, New Voices",
    venue: "생기 스튜디오",
    venueEn: "Saenggi Studio",
    city: "서울",
    cityEn: "Seoul",
    status: "past",
    note: "강산에와 함께한 무대. 〈통영생선구이 블루스〉와 〈양평상여소리꾼 노래〉를 라이브로 선보였다.",
    noteEn:
      "A night with Kang San-eh. They performed 'Tongyeong Grilled Fish Blues' and 'The Yangpyeong Bier-Singer's Song' live.",
  },
  {
    id: "dot-2025",
    date: "2025-11-09",
    dateLabel: "2025.11.09",
    year: "2025",
    title: "펑크포크 & 블루스: 유동혁 X 김동산과 블루이웃",
    titleEn: "Punk Folk & Blues: Yoo Dong-hyuk X Kim Dongsan & Blueeewoot",
    venue: "수원 도트(d.o.t)",
    venueEn: "d.o.t, Suwon",
    city: "수원",
    cityEn: "Suwon",
    status: "past",
    note: "펑크록커 유동혁과 블루스 밴드가 한 무대에 선 밤. 경기아트콜렉티브 협동조합이 기획했다.",
    noteEn:
      "A night pairing punk-rock singer Yoo Dong-hyuk with the blues band, programmed by the Gyeonggi Art Collective.",
  },
  {
    id: "space-hangang-2024",
    date: "2024-11-02",
    dateLabel: "2024.11.02",
    year: "2024",
    title: "《이름을 모르는 먼 곳의 그대에게》 서울 쇼케이스",
    titleEn: "To You in a Distant Place… Seoul showcase",
    venue: "스페이스 한강",
    venueEn: "Space Hangang",
    city: "서울 홍대",
    cityEn: "Hongdae, Seoul",
    status: "past",
    note: "강정피스앤뮤직캠프 컴필레이션 발매 쇼케이스. 〈물결〉을 함께 불렀다.",
    noteEn:
      "The release showcase for the Gangjeong Peace Music Camp compilation, where they performed 'Ripples'.",
  },
];

export const SHOW_DETAILS = {
  prices: [
    { label: "얼리버드", labelEn: "Early bird", price: "20,000원", priceEn: "₩20,000", state: "매진", stateEn: "Sold out" },
    { label: "할인권", labelEn: "Discount", price: "20,000원", priceEn: "₩20,000", state: "예매 가능", stateEn: "Available" },
    { label: "사전예매", labelEn: "Advance", price: "30,000원", priceEn: "₩30,000", state: "예매 가능", stateEn: "Available" },
    { label: "현장", labelEn: "At the door", price: "40,000원", priceEn: "₩40,000", state: "현장 판매", stateEn: "Door only" },
  ],
  castKo: [
    "김동산과 블루이웃 — 김동산(보컬·기타), 류준철(피아노·해먼드 오르간), 이인우(베이스), 김예준(드럼)",
    "게스트 — 이형주(기타), 강가 히말라야(보컬), 정수민(더블베이스), 김성완(알토 색소폰), 브라이언 신(트럼펫), 윤숭·허정혁·원니(코러스)",
    "오프닝 — 원호와 타임머신",
  ],
  castEn: [
    "Kim Dongsan & Blueeewoot — Kim Dongsan (vocals, guitar), Ryu Jun-cheol (piano, Hammond organ), Lee In-woo (bass), Kim Ye-jun (drums)",
    "Guests — Lee Hyeong-ju (guitar), Gangga Himalaya (vocals), Jung Su-min (double bass), Kim Seong-wan (alto saxophone), Brian Shin (trumpet), Yoon Soong, Heo Jeong-hyeok and Wonni (chorus)",
    "Opening — Wonho and the Time Machine",
  ],
};
