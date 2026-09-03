import Image from "next/image";
import { getDiscount, getTerm, formatDate } from "@/lib/utils/deal";


export default function DealHero({ deal }) {
    const img = deal.featuredImage?.node?.sourceUrl;
    const store = getTerm(deal.terms, "store");
    const final = deal.finalPrice;
    const original = deal.originalPrice;
    const discount = deal.discountPercent || getDiscount(final, original);
    const expired = deal.isExpired === "true";

    return (
        <div className="bg-white   rounded-2xl  flex flex-col md:flex-row gap-6 md:gap-8">
            {/* Image */}
            <div className="w-full md:w-85 shrink-0 flex flex-col gap-3">
                <div className="relative w-full aspect-square border border-line rounded-[14px] overflow-hidden bg-[#f4f5f9]">
                    {img && (
                        <Image src={img} alt={deal.featuredImage?.node?.altText || deal.title} fill sizes="(max-width:768px) 100vw, 340px" className="object-cover" priority />
                    )}
                    {/* EXPIRED tag */}
                    {expired && (
                        <span className="absolute top-3 left-3 bg-[rgba(28,28,28,0.85)] text-white text-[11px] font-bold uppercase px-2 py-1 rounded-[4px] z-10">
                            Expired
                        </span>
                    )}
                </div>
                <p className="text-[13px] text-muted">
                    Posted <span className="font-semibold text-text">by Ilyas</span> · {formatDate(deal.date)}
                </p>
            </div>

            {/* Details */}
            <div className="flex-1 min-w-0 flex flex-col gap-4">
                {/* Title */}
                <h1 className="tracking-[-0.56px] text-text leading-tight" style={{ fontFamily: "var(--font-display)", fontWeight: 700 }}>
                    {deal.title}
                </h1>

                {/* Store badge */}
                {store && (
                    <div className="flex items-center gap-2">
                        <span className="border border-line rounded-btn px-2 py-0.5 text-[13px] font-medium text-muted">
                            {store.name}
                        </span>
                    </div>
                )}

                {/* Price */}
                {deal.priceLabel ? (
                    <p className="text-[24px] font-bold text-hot">{deal.priceLabel}</p>
                ) : (
                    <div className="flex items-end gap-2 flex-wrap">
                        {final && <span className="text-[28px] font-bold text-save price-font leading-none">₹{Number(final).toLocaleString("en-IN")}</span>}
                        {original && <span className="text-[18px] font-medium text-muted line-through price-font">₹{Number(original).toLocaleString("en-IN")}</span>}
                        {discount && <span className="text-[18px] font-semibold text-hot">{discount}% off</span>}
                    </div>
                )}

                {/* Price note */}
                <p className="flex items-center gap-1.5 text-[13px] text-muted">
                    💡 Price as of {formatDate(deal.date)}. Verify final price on {store?.name || "the store"} before buying.
                </p>

                {/* Bank & Card Offers */}
                {deal.bankOffers?.length > 0 && (
                    <div className="bg-[#f4f5f9] border border-line rounded-xl px-4 py-3 flex flex-col gap-1.5">
                        <p className="text-[15px] font-semibold text-muted">Bank & Card Offers</p>
                        {deal.bankOffers.map((offer, i) => (
                            <div key={i} className="flex items-start gap-1.5 text-[13px]">
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#0e9f5a" strokeWidth="2.5" className="mt-0.5 shrink-0"><path d="M5 12l4 4 10-10" /></svg>
                                <span className="text-text font-medium">
                                    {offer.offerText ? (
                                        offer.offerText
                                    ) : (
                                        <>
                                            <span className="font-semibold text-text">{offer.discountValue} {offer.offerType}</span>
                                            {offer.bankName && ` with ${offer.bankName}`}
                                            {offer.minPurchase && ` (min ₹${offer.minPurchase})`}
                                            {offer.maxDiscount && ` (up to ₹${offer.maxDiscount})`}
                                        </>
                                    )}
                                </span>
                            </div>
                        ))}
                    </div>
                )}

                {/* Shop Now button */}
                <div className="flex items-center gap-2.5">

                    <a href={deal.affiliateLink || "#"}
                        target="_blank"
                        rel="noopener noreferrer sponsored"
                        className="flex items-center gap-1.5 bg-[#1c1c1c] text-white px-4 py-2 rounded-lg text-[15px] font-semibold hover:opacity-90">

                        {expired ? "Check Current Price" : "Shop Now"}
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M5 12h14M13 6l6 6-6 6" />
                        </svg>
                    </a>
                </div>

                {/* Expiry warning */}
                <p className="flex items-center gap-1.5 text-[13px] text-hot">
                    ⚠️ Deals move fast this offer might expire soon.
                </p>
            </div>
        </div>
    );
}