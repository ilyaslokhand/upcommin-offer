"use client";
import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Link from "next/link";
import Image from "next/image";

function getBadge(sale) {
  const now = new Date();
  const start = sale.startDate ? new Date(sale.startDate) : null;
  const end = sale.endDate ? new Date(sale.endDate) : null;
  if (end && now > end) return { text: "Ended", tone: "ended" };
  if (start && now < start)
    return {
      text: `Starts ${start.toLocaleDateString("en-IN", { day: "numeric", month: "short" })}`,
      tone: "upcoming",
    };
  return { text: "Live Now", tone: "live" };
}

export default function SaleCarousel({ sales }) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: "start" });
  const [selected, setSelected] = useState(0);
  const [snaps, setSnaps] = useState([]);

  const onSelect = useCallback(() => {
    if (emblaApi) setSelected(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    setSnaps(emblaApi.scrollSnapList());
    emblaApi.on("select", onSelect);
    onSelect();
    // autoplay
    const timer = setInterval(() => emblaApi.scrollNext(), 4000);
    return () => clearInterval(timer);
  }, [emblaApi, onSelect]);

  return (
    <div className="relative">
      <div className="overflow-hidden" ref={emblaRef}>
        {/* 1. Removed gap-6 and added negative horizontal margin to offset outer edge padding */}
        <div className="flex -ml-6">
          {sales.map((sale) => {
            const img = sale.bannerImage;
            const badge = getBadge(sale);
            return (
              /* 2. Changed flex-basis to 50% on desktop and added pl-6 padding to act as the gap */
              <div
                key={sale.id}
                className="min-w-0 flex-[0_0_100%] md:flex-[0_0_50%] pl-6"
              >
                <Link
                  href={`/sale/${sale.slug}`}
                  className="relative h-75 rounded-[20px] border border-line overflow-hidden flex flex-col justify-between px-9 py-8 group"
                >
                  {img && (
                    <Image
                      src={img}
                      alt={sale.name}
                      fill
                      sizes="(max-width:768px) 100vw, 620px"
                      className="object-cover -z-10"
                    />
                  )}
                  <div className="absolute inset-0 -z-10 bg-linear-to-b from-transparent to-black/40" />

                  <span
                    className={`self-start rounded-full px-3 py-1 text-[12px] font-extrabold uppercase tracking-tight border ${
                      badge.tone === "live"
                        ? "bg-green-500/90 border-green-300 text-white"
                        : badge.tone === "ended"
                          ? "bg-black/40 border-white/30 text-white/70"
                          : "bg-black/30 border-white/40 text-white"
                    }`}
                  >
                    {badge.text}
                  </span>

                  <div className="flex items-end justify-between w-full">
                    <div className="flex flex-col gap-0.5">
                      <span
                        className="text-[15px] font-bold"
                        style={{ color: "#eeebfd" }}
                      >
                        {sale.saleStore}
                      </span>
                      <h3
                        className="text-white tracking-[-0.68px]"
                        style={{ fontFamily: "var(--font-display)" }}
                      >
                        {sale.saleHeading || sale.title}
                      </h3>
                      {sale.saleSubtitle && (
                        <p
                          className="text-[15px] font-semibold leading-6 max-w-87.5"
                          style={{ color: "#eeebfd" }}
                        >
                          {sale.saleSubtitle}
                        </p>
                      )}
                    </div>
                    <span className="shrink-0 size-15 rounded-full border-[1.5px] border-white bg-white/10 flex items-center justify-center group-hover:bg-white/20 transition">
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="white"
                        strokeWidth="2"
                      >
                        <path d="M5 12h14M13 6l6 6-6 6" />
                      </svg>
                    </span>
                  </div>
                </Link>
              </div>
            );
          })}
        </div>
      </div>

      {/* Dots */}
      {snaps.length > 1 && (
        <div className="flex justify-center gap-2 mt-4">
          {snaps.map((_, i) => (
            <button
              key={i}
              onClick={() => emblaApi?.scrollTo(i)}
              className={`h-2 rounded-full transition-all ${i === selected ? "w-6 bg-brand" : "w-2 bg-line"}`}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
