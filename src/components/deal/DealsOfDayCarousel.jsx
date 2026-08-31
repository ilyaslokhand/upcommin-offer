"use client";
import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import DealCard from "./DealCard";

export default function DealsOfDayCarousel({ deals }) {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
    slidesToScroll: 1,
  });
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(false);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setCanPrev(emblaApi.canScrollPrev());
    setCanNext(emblaApi.canScrollNext());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
  }, [emblaApi, onSelect]);

  return (
    <div className="relative">
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex gap-4">
          {deals.map((deal) => (
            <div
              key={deal.id}
              className="flex-[0_0_100%] md:flex-[0_0_calc(50%-8px)] lg:flex-[0_0_calc(25%-12px)] min-w-0"
            >
              <DealCard deal={deal} />
            </div>
          ))}
        </div>
      </div>

      {/* Arrows — only show if scrollable */}
      {(canPrev || canNext) && (
        <>
          <button
            onClick={() => emblaApi?.scrollPrev()}
            disabled={!canPrev}
            className="absolute -left-3 top-1/2 -translate-y-1/2 size-9 rounded-full bg-white border border-line shadow-md flex items-center justify-center disabled:opacity-30 hover:border-brand z-10"
            aria-label="Previous"
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#1c1c1c"
              strokeWidth="2"
            >
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>
          <button
            onClick={() => emblaApi?.scrollNext()}
            disabled={!canNext}
            className="absolute -right-3 top-1/2 -translate-y-1/2 size-9 rounded-full bg-white border border-line shadow-md flex items-center justify-center disabled:opacity-30 hover:border-brand z-10"
            aria-label="Next"
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#1c1c1c"
              strokeWidth="2"
            >
              <path d="M9 18l6-6-6-6" />
            </svg>
          </button>
        </>
      )}
    </div>
  );
}
