import Link from "next/link";
import { SITE } from "@/data/site";

export default function NotFound() {
  return (
    <div className="mx-auto flex max-w-3xl flex-col items-start px-5 py-24 md:px-8">
      <p className="eyebrow">404</p>
      <h1 className="display mt-5 text-[clamp(2.4rem,6vw,4rem)]">
        페이지를 찾을 수 없습니다
      </h1>
      <p className="mt-4 text-[15px] leading-[1.8] text-muted">
        주소가 바뀌었거나 아직 만들지 않은 페이지입니다.
      </p>
      <div className="mt-8 flex flex-wrap gap-3">
        <Link href="/ko" className="btn btn-solid">
          첫 화면으로
        </Link>
        <a
          href={SITE.showUrl}
          target="_blank"
          rel="noreferrer"
          className="btn btn-ticket"
        >
          12.04 쇼케이스 예매
        </a>
      </div>
    </div>
  );
}
