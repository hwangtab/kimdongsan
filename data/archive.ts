export type ArchivePhoto = {
  src: string;
  width: number;
  height: number;
  alt: string;
  altEn: string;
  caption: string;
  captionEn: string;
  credit: string;
  creditEn: string;
  href: string;
};

const VOP = "http://www.vop.co.kr/A00001264570.html";
const OM = "https://star.ohmynews.com/NWS_Web/OhmyStar/at_pg_m.aspx?CNTN_CD=A0002483002";

export const ARCHIVE: ArchivePhoto[] = [
  {
    src: "/images/archive/long-player-2018.webp",
    width: 800,
    height: 450,
    alt: "LP와 중고 물건이 가득한 롱플레이어 안에 서 있는 김동산",
    altEn: "Kim Dongsan standing inside Long Player, surrounded by records",
    caption: "롱플레이어에서, 2018",
    captionEn: "At Long Player, 2018",
    credit: "민중의소리",
    creditEn: "Voice of the People",
    href: VOP,
  },
  {
    src: "/images/archive/live-2018.webp",
    width: 800,
    height: 499,
    alt: "기타를 치며 눈을 감고 노래하는 김동산",
    altEn: "Kim Dongsan singing with his eyes closed, playing guitar",
    caption: "공연 중",
    captionEn: "Performing",
    credit: "김동산 씨 영상 캡처 / 민중의소리",
    creditEn: "Video still courtesy of Kim Dongsan / Voice of the People",
    href: VOP,
  },
  {
    src: "/images/archive/shop-2018.webp",
    width: 800,
    height: 450,
    alt: "LP와 중고 물건, 오래된 라디오가 가득한 롱플레이어 내부",
    altEn: "The interior of Long Player, filled with LPs and old objects",
    caption: "롱플레이어, 2018",
    captionEn: "Long Player, 2018",
    credit: "민중의소리",
    creditEn: "Voice of the People",
    href: VOP,
  },
  {
    src: "/images/archive/suwon-2018-1.webp",
    width: 600,
    height: 450,
    alt: "더블베이스와 기타로 연주하는 김동산과 정수민",
    altEn: "Kim Dongsan and Jung Su-min performing with guitar and double bass",
    caption: "수원시평생학습관 공연, 2018",
    captionEn: "Suwon Lifelong Learning Center, 2018",
    credit: "시민기획단 나침반 / 오마이뉴스",
    creditEn: "Citizen Planning Group Compass / OhmyNews",
    href: OM,
  },
  {
    src: "/images/archive/suwon-2018-2.webp",
    width: 600,
    height: 451,
    alt: "드럼, 더블베이스, 기타가 함께한 수원 공연 무대",
    altEn: "A Suwon stage with drums, double bass and guitar",
    caption: "감수성 올림 2강, 2018",
    captionEn: "Sensitivity Raising, 2018",
    credit: "시민기획단 나침반 / 오마이뉴스",
    creditEn: "Citizen Planning Group Compass / OhmyNews",
    href: OM,
  },
  {
    src: "/images/archive/suwon-2018-3.webp",
    width: 600,
    height: 337,
    alt: "바닥에 앉아 공연을 바라보는 관객들",
    altEn: "An audience watching the performance from the floor",
    caption: "공연을 보는 사람들, 2018",
    captionEn: "The audience, 2018",
    credit: "시민기획단 나침반 / 오마이뉴스",
    creditEn: "Citizen Planning Group Compass / OhmyNews",
    href: OM,
  },
];
