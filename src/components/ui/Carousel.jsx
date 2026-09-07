"use client";
import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";

export default function Carousel({
    children,
    slideClass = "flex-[0_0_85%]",
    showDots = true,
    showArrows = false,
    gap = 12,
    autoplay = false,        // ← new
    autoplayDelay = 4000,    // ← new
    loop = false,            // ← new
}) {
    const [emblaRef, emblaApi] = useEmblaCarousel({ align: "start", loop, containScroll: loop ? false : "trimSnaps" });
    const [selected, setSelected] = useState(0);
    const [snaps, setSnaps] = useState([]);
    const [canPrev, setCanPrev] = useState(false);
    const [canNext, setCanNext] = useState(false);

    const onSelect = useCallback(() => {
        if (!emblaApi) return;
        setSelected(emblaApi.selectedScrollSnap());
        setCanPrev(emblaApi.canScrollPrev());
        setCanNext(emblaApi.canScrollNext());
    }, [emblaApi]);

    useEffect(() => {
        if (!emblaApi) return;
        setSnaps(emblaApi.scrollSnapList());
        emblaApi.on("select", onSelect);
        emblaApi.on("reInit", onSelect);
        onSelect();
    }, [emblaApi, onSelect]);

    // Autoplay
    useEffect(() => {
        if (!emblaApi || !autoplay) return;
        const timer = setInterval(() => emblaApi.scrollNext(), autoplayDelay);
        return () => clearInterval(timer);
    }, [emblaApi, autoplay, autoplayDelay]);

    const slides = Array.isArray(children) ? children : [children];

    return (
        <div className="relative">
            <div className="overflow-hidden" ref={emblaRef}>
                <div className="flex" style={{ gap: `${gap}px` }}>
                    {slides.map((slide, i) => (
                        <div key={i} className={`min-w-0 ${slideClass}`}>{slide}</div>
                    ))}
                </div>
            </div>

            {showArrows && (canPrev || canNext) && (
                <>
                    <button onClick={() => emblaApi?.scrollPrev()} disabled={!canPrev}
                        className="absolute -left-3 top-1/2 -translate-y-1/2 size-9 rounded-full bg-white border border-line shadow-md flex items-center justify-center disabled:opacity-30 z-10">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#1c1c1c" strokeWidth="2"><path d="M15 18l-6-6 6-6" /></svg>
                    </button>
                    <button onClick={() => emblaApi?.scrollNext()} disabled={!canNext}
                        className="absolute -right-3 top-1/2 -translate-y-1/2 size-9 rounded-full bg-white border border-line shadow-md flex items-center justify-center disabled:opacity-30 z-10">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#1c1c1c" strokeWidth="2"><path d="M9 18l6-6-6-6" /></svg>
                    </button>
                </>
            )}

            {showDots && snaps.length > 1 && (
                <div className="flex justify-center gap-2 mt-4">
                    {snaps.map((_, i) => (
                        <button key={i} onClick={() => emblaApi?.scrollTo(i)}
                            className={`h-2 rounded-full transition-all ${i === selected ? "w-6 bg-brand" : "w-2 bg-line"}`}
                            aria-label={`Go to slide ${i + 1}`} />
                    ))}
                </div>
            )}
        </div>
    );
}