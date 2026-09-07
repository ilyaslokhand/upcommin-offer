"use client";
import DealCard from "./DealCard";
import Carousel from "@/components/ui/Carousel";

export default function DealsOfDayCarousel({ deals }) {
  return (
    <Carousel
      slideClass="flex-[0_0_100%] md:flex-[0_0_calc(50%-8px)] lg:flex-[0_0_calc(25%-12px)]"
      showArrows={true}
      showDots={false}
      gap={16}
    >
      {deals.map((deal, i) => (
        <DealCard key={deal.id} deal={deal} compact={true} priority={i < 4} />
      ))}
    </Carousel>
  );
}