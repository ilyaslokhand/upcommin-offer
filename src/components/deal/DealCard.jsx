import Link from "next/link";
import Image from "next/image";
import { getDiscount, timeAgo, getTerm } from "@/lib/utils/deal";


export default function DealCard({ deal, compact = false, priority = false }) {
  const img = deal.featuredImage?.node?.sourceUrl;
  const final = deal.finalPrice;
  const original = deal.originalPrice;
  const discount = getDiscount(final, original);
  const store = getTerm(deal.terms, "store");
  const expired = deal.isExpired === "true";

  return (
    // CHANGED: was <Wrapper> (Link). Now a plain <div> with `relative`
    <div
      className={`relative bg-white border border-line rounded-card overflow-hidden flex flex-row md:flex-col ${expired ? "opacity-60" : "hover:shadow-md transition"}`}
    >
      {/* ADDED: invisible link covering the whole card → goes to deal details */}
      {!expired && (
        <Link
          href={`/deals/${deal.slug}`}
          className="absolute inset-0 z-1"
          aria-label={deal.title}
        />
      )}

      {/* Image */}
      <div className="relative w-30 h-30 md:w-full md:h-37.5 shrink-0 bg-[#f4f5f9]">
        {img ? (
          <Image
            src={img}
            alt={deal.featuredImage?.node?.altText || deal.title}
            fill
            sizes="(max-width:768px) 120px, 296px"
            className="object-cover"

          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-muted text-xs">
            No image
          </div>
        )}
        {expired && (
          <span className="absolute top-2 left-2 bg-[rgba(28,28,28,0.85)] rounded-sm px-2 py-1 text-[10px] font-bold text-white uppercase z-10">
            Expired
          </span>
        )}
      </div>

      {/* Content */}
      <div className="flex flex-col justify-between gap-2 p-3 md:pb-4 flex-1 min-w-0">
        <h3 className="text-[14px] md:text-[15px] font-semibold text-text leading-4.75 md:leading-5.25 line-clamp-2">
          {deal.title}
        </h3>

        {deal.priceLabel ? (
          <p className="text-[15px] font-semibold text-hot">{deal.priceLabel}</p>
        ) : (
          <div className="flex items-end gap-2 whitespace-nowrap overflow-hidden">
            {final && (
              <span className="text-[16px] md:text-[18px] font-bold text-save leading-none price-font">
                ₹{Number(final).toLocaleString("en-IN")}
              </span>
            )}
            {original && (
              <span className="text-[13px] font-medium text-muted line-through price-font">
                ₹{Number(original).toLocaleString("en-IN")}
              </span>
            )}
            {discount && (
              <span className="text-[13px] font-semibold text-hot">{discount}% off</span>
            )}
          </div>
        )}

        {/* Footer */}
        <div
          className={`flex flex-col min-w-0 justify-between gap-2.5 ${compact
            ? "min-[420px]:flex-row min-[420px]:items-center min-[420px]:gap-2"
            : "min-[370px]:flex-row min-[370px]:items-center min-[370px]:gap-2"
            }`}
        >
          <div className="flex items-center gap-2 min-w-0">
            {store && (
              <span className="text-[13px] font-semibold text-text truncate">{store}</span>
            )}
            <span className="flex items-center gap-1 text-[12px] font-medium text-muted shrink-0">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="9" />
                <path d="M12 7v5l3 2" />
              </svg>
              {timeAgo(deal.date)}
            </span>
          </div>

          {/* CHANGED: Shop Now is now an <a> to affiliate link, with relative z-10 so it sits above the card link */}
          {expired ? (
            <span className="bg-[#e7e9f1] text-muted px-3 py-1 rounded-btn text-[11px] font-semibold shrink-0 relative z-10">
              Expired
            </span>
          ) : (

            <a href={deal.affiliateLink || "#"}
              target="_blank"
              rel="noopener noreferrer sponsored"
              className="bg-[#1c1c1c] text-white px-3 py-1 rounded-btn text-[11px] font-semibold shrink-0 max-w-max hover:opacity-90 relative z-10"
            >
              Shop Now
            </a>
          )}
        </div>
      </div>
    </div >
  );
}