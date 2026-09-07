import Link from "next/link";
import DealCard from "./DealCard";
import Carousel from "@/components/ui/Carousel";


export default function SidebarDeals({ deals, storeName, storeSlug }) {
    if (!deals.length) return null;
    const shown = deals.slice(0, 5);


    return (
        <div className=" flex flex-col gap-3">
            <h2 className="text-[18px] font-semibold text-text  text-center tracking-[-0.2px]" style={{ fontFamily: "var(--font-body)" }}>
                More deals from {storeName}
            </h2>

            {/* Desktop: stacked list */}
            <div className="hidden lg:flex flex-col gap-3">
                {shown.map((deal) => (
                    <DealCard key={deal.id} deal={deal} horizontal={true} />
                ))}
            </div>

            {/* Mobile: carousel */}
            <div className="lg:hidden">
                <Carousel slideClass="flex-[0_0_85%]" showArrows={true} gap={12} showDots={false}>
                    {shown.map((deal) => (
                        <DealCard key={deal.id} deal={deal} horizontal={true} />
                    ))}
                </Carousel>
            </div>

            {/* View all */}
            <Link
                href={`/store/${storeSlug}`}
                className="flex items-center justify-center gap-2 bg-[#1c1c1c] text-white px-4 py-2 rounded-[8px] text-[15px] font-medium hover:opacity-90"
            >
                View All Deals
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
            </Link>
        </div>
    );
}