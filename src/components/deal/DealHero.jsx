import Image from "next/image";
import { getTerm, getDiscount, formatDate } from "@/lib/utils/deal";

export default function DealHero({ deal }) {
    const img = deal.featuredImage?.node?.sourceUrl;
    const store = getTerm(deal.terms, "store");
    const final = deal.finalPrice;
    const original = deal.originalPrice;
    const discount = deal.discountPercent || getDiscount(final, original);
    // ❌ removed: const expired = deal.isExpired === "true";

    return (
        <div className="bg-white border border-line rounded-[16px] p-4 md:p-6 flex flex-col min-[550px]:flex-row gap-4 md:gap-8">
            {/* Image */}
            <div className="w-full min-[550px]:w-[180px] md:w-[340px] shrink-0 flex flex-col gap-3">
                <div className="relative w-full aspect-square border border-line rounded-[14px] overflow-hidden bg-[#f4f5f9]">
                    {img && (
                        <Image
                            src={img}
                            alt={deal.featuredImage?.node?.altText || deal.title}
                            fill
                            sizes="(max-width:550px) 100vw, (max-width:768px) 180px, 340px"
                            className="object-cover"
                            priority
                        />
                    )}
                    {/* ❌ removed the EXPIRED tag */}
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
                        <span className="border border-line rounded-[5px] px-2 py-0.5 text-[13px] font-medium text-muted">
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
                    💡 Price as of {formatDate(deal.date)} — verify final price on {store?.name || "the store"} before buying.
                </p>

                {/* Bank & Card Offers */}
                {deal.bankOffers?.length > 0 && (
                    <div className="bg-[#f4f5f9] border border-line rounded-[12px] px-4 py-3 flex flex-col gap-1.5">
                        <p className="text-[15px] font-semibold text-muted">Bank & Card Offers</p>
                        {deal.bankOffers.map((offer, i) => (
                            <div key={i} className="flex items-start gap-1.5 text-[13px]">
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#0e9f5a" strokeWidth="2.5" className="mt-0.5 shrink-0"><path d="M5 12l4 4 10-10" /></svg>
                                <span className="text-muted">
                                    {offer.offerText ? (
                                        <span className="text-text font-medium">{offer.offerText}</span>
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

                {/* Shop Now button — always clickable */}
                <div className="flex items-center gap-2.5">
                    <a
                        href={deal.affiliateLink || "#"}
                        target="_blank"
                        rel="noopener noreferrer sponsored"
                        className="flex items-center gap-1.5 bg-[#1c1c1c] text-white px-4 py-2 rounded-[8px] text-[15px] font-semibold hover:opacity-90"
                    >
                        Shop Now
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M5 12h14M13 6l6 6-6 6" />
                        </svg>
                    </a>
                </div>
                {/* Urgency note */}
                <p className="flex items-center gap-1.5 text-[13px] text-hot">
                    ⚠️ Deals move fast this offer might expire soon.
                </p>

                {/* ❌ removed the expiry warning ("Deals move fast — this offer might expire soon") */}
            </div>
        </div>
    );
}