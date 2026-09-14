import Image from "next/image";
import { getSaleBadge, saleBadgeClass, formatDateShort } from "@/lib/utils/sale.js";

export default function SaleHero({ sale }) {
    const badge = getSaleBadge(sale);
    const start = sale.startDate ? formatDateShort(sale.startDate) : null;
    const end = sale.endDate ? formatDateShort(sale.endDate) : null;

    return (
        <div className="container-wrap pt-4">
            <div className="relative rounded-[20px] overflow-hidden border border-line min-h-[280px] flex flex-col justify-between px-6 md:px-10 py-8">
                {sale.bannerImage && (
                    <Image src={sale.bannerImage} alt={sale.name} fill sizes="1280px" className="object-cover -z-10" priority />
                )}
                <div className="absolute inset-0 -z-10 bg-gradient-to-b from-black/30 to-black/60" />

                <div>
                    <span className={`inline-block rounded-full px-3 py-1 text-[12px] font-extrabold uppercase tracking-tight border ${saleBadgeClass(badge.tone)}`}>
                        {badge.text}
                    </span>
                </div>

                <div className="flex flex-col gap-2 max-w-[600px]">
                    {sale.saleStore && <span className="text-[14px] font-bold" style={{ color: "#eeebfd" }}>{sale.saleStore}</span>}
                    <h1 className="text-white tracking-[-0.68px] leading-tight" style={{ fontFamily: "var(--font-display)", fontWeight: 700 }}>
                        {sale.saleHeading || sale.name}
                    </h1>
                    {sale.saleSubtitle && <p className="text-[15px] font-medium leading-6" style={{ color: "#eeebfd" }}>{sale.saleSubtitle}</p>}
                    {(start || end) && (
                        <p className="text-[13px] font-medium mt-1" style={{ color: "rgba(255,255,255,0.85)" }}>
                            {start && end ? `${start} — ${end}` : start ? `From ${start}` : `Until ${end}`}
                            {" · "}{sale.count ?? 0} deals
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
}