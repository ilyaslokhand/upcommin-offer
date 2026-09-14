"use client";

import { Children, useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";

export default function Carousel({
    children,
    slideClass = "flex-[0_0_85%]",
    showDots = true,
    showArrows = false,
    gap = 12,
    autoplay = false,
    autoplayDelay = 4000,
    loop = false,
}) {
    const originalSlides = Children.toArray(children);
    const slideCount = originalSlides.length;
    const shouldLoop = loop && slideCount > 1;

    // Two banners need more slide elements for Embla to loop reliably.
    const slides =
        shouldLoop && slideCount <= 3
            ? [...originalSlides, ...originalSlides, ...originalSlides]
            : originalSlides;

    const [emblaRef, emblaApi] = useEmblaCarousel({
        align: "start",
        loop: shouldLoop,
        containScroll: shouldLoop ? false : "trimSnaps",
    });

    const [selected, setSelected] = useState(0);
    const [canPrev, setCanPrev] = useState(false);
    const [canNext, setCanNext] = useState(false);

    const onSelect = useCallback(() => {
        if (!emblaApi) return;

        setSelected(emblaApi.selectedScrollSnap() % slideCount);
        setCanPrev(emblaApi.canScrollPrev());
        setCanNext(emblaApi.canScrollNext());
    }, [emblaApi, slideCount]);

    useEffect(() => {
        if (!emblaApi) return;

        emblaApi.on("select", onSelect);
        emblaApi.on("reInit", onSelect);
        onSelect();

        return () => {
            emblaApi.off("select", onSelect);
            emblaApi.off("reInit", onSelect);
        };
    }, [emblaApi, onSelect]);

    useEffect(() => {
        if (!emblaApi || !autoplay || slideCount < 2) return;

        const timer = setInterval(() => {
            if (emblaApi.canScrollNext()) {
                emblaApi.scrollNext();
            } else {
                emblaApi.scrollTo(0);
            }
        }, autoplayDelay);

        return () => clearInterval(timer);
    }, [emblaApi, autoplay, autoplayDelay, slideCount]);

    const goToSlide = (index) => {
        if (!emblaApi) return;

        // Find the closest copy of this slide when the two slides are repeated.
        const current = emblaApi.selectedScrollSnap();
        const matchingSnaps = emblaApi
            .scrollSnapList()
            .map((_, i) => i)
            .filter((i) => i % slideCount === index);

        const closest = matchingSnaps.reduce((best, i) =>
            Math.abs(i - current) < Math.abs(best - current) ? i : best
        );

        emblaApi.scrollTo(closest);
    };

    return (
        <div className="relative">
            <div className="overflow-hidden" ref={emblaRef}>
                <div className="flex" style={{ gap: `${gap}px` }}>
                    {slides.map((slide, i) => (
                        <div
                            key={i}
                            className={`min-w-0 ${slideCount === 1 ? "flex-[0_0_100%]" : slideClass
                                }`}
                        >
                            {slide}
                        </div>
                    ))}
                </div>
            </div>

            {showArrows && slideCount > 1 && (canPrev || canNext) && (
                <>
                    <button
                        type="button"
                        onClick={() => emblaApi?.scrollPrev()}
                        disabled={!canPrev}
                        aria-label="Previous slide"
                        className="absolute -left-3 top-1/2 -translate-y-1/2 size-9 rounded-full bg-white border border-line shadow-md flex items-center justify-center disabled:opacity-30 z-10"
                    >
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#1c1c1c" strokeWidth="2">
                            <path d="M15 18l-6-6 6-6" />
                        </svg>
                    </button>
                    <button
                        type="button"
                        onClick={() => emblaApi?.scrollNext()}
                        disabled={!canNext}
                        aria-label="Next slide"
                        className="absolute -right-3 top-1/2 -translate-y-1/2 size-9 rounded-full bg-white border border-line shadow-md flex items-center justify-center disabled:opacity-30 z-10"
                    >
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#1c1c1c" strokeWidth="2">
                            <path d="M9 18l6-6-6-6" />
                        </svg>
                    </button>
                </>
            )}

            {showDots && slideCount > 1 && (
                <div className="flex justify-center gap-2 mt-4">
                    {originalSlides.map((_, i) => (
                        <button
                            key={i}
                            type="button"
                            onClick={() => goToSlide(i)}
                            className={`h-2 rounded-full transition-all ${i === selected ? "w-6 bg-brand" : "w-2 bg-line"
                                }`}
                            aria-label={`Go to slide ${i + 1}`}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}