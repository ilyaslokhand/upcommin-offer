"use client";
import Link from "next/link";
import Image from "next/image";
import Carousel from "@/components/ui/Carousel";
import { getSaleBadge, saleBadgeClass } from "@/lib/utils/sale";

export default function SaleCarousel({ sales }) {
  return (
    <Carousel
      slideClass="flex-[0_0_100%] md:flex-[0_0_calc(50%-12px)]"
      showDots={true}
      showArrows={false}
      autoplay={true}
      autoplayDelay={4000}
      loop={true}
      gap={24}
    >
      {sales.map((sale) => {
        const img = sale.bannerImage;
        const badge = getSaleBadge(sale);
        const isUpcoming = badge.tone === "upcoming";
        const Wrapper = isUpcoming ? "div" : Link;
        const wrapperProps = isUpcoming ? {} : { href: `/sale/${sale.slug}` };
        return (
          <Wrapper key={sale.id} {...wrapperProps}

            className="relative h-[300px] rounded-[20px] border border-line overflow-hidden flex flex-col justify-between px-9 py-8 group block">
            {img && <Image src={img} alt={sale.name} fill sizes="(max-width:768px) 100vw, 620px" className="object-cover -z-10" />}
            <div className="absolute inset-0 -z-10 bg-gradient-to-b from-transparent to-black/40" />

            <span className={`self-start rounded-full px-3 py-1 text-[12px] font-extrabold uppercase tracking-tight border ${saleBadgeClass(badge.tone)}`}>
              {badge.text}
            </span>

            <div className="flex items-end justify-between w-full">
              <div className="flex flex-col gap-0.5">
                <span className="text-[15px] font-bold" style={{ color: "#eeebfd" }}>{sale.saleStore}</span>
                <h3 className="text-white tracking-[-0.68px]" style={{ fontFamily: "var(--font-display)" }}>{sale.saleHeading || sale.name}</h3>
                {sale.saleSubtitle && <p className="text-[15px] font-semibold leading-6 max-w-[350px]" style={{ color: "#eeebfd" }}>{sale.saleSubtitle}</p>}
              </div>
              <span className="shrink-0 size-[60px] rounded-full border-[1.5px] border-white bg-white/10 flex items-center justify-center group-hover:bg-white/20 transition">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
              </span>
            </div>
          </Wrapper>
        );
      })}
    </Carousel>
  );
}