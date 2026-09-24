import Link from "next/link";
import Image from "next/image";
import { getDiscount, timeAgo, getTerm } from "@/lib/utils/deal";

export default function DealCard({
  deal,
  compact = false,
  priority = false,
  horizontal = false,
}) {
  const img = deal.featuredImage?.node?.sourceUrl;
  const final = deal.finalPrice;
  const original = deal.originalPrice;
  const discount = getDiscount(final, original);
  const store = getTerm(deal.terms, "store")?.name;

  return (
    <div
      className={`group relative bg-white border border-line rounded-[10px] overflow-hidden flex ${horizontal ? "flex-row" : "flex-row md:flex-col"
        } transition-[transform,box-shadow,border-color] duration-300 ease-out
      hover:-translate-y-0.5 hover:shadow-md
      active:scale-[0.985] active:border-brand/40
      focus-within:border-brand/40 focus-within:shadow-md
      motion-reduce:transform-none motion-reduce:transition-none`}
    >
      {/* Main card link */}
      <Link
        href={`/deals/${deal.slug}`}
        className="absolute inset-0 z-[1] rounded-[10px] focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-brand"
        aria-label={`View deal: ${deal.title}`}
      />

      {/* Image */}
      <div
        className={`relative shrink-0 overflow-hidden bg-[#f4f5f9] ${horizontal
            ? "w-27.5 h-27.5"
            : "w-30 h-30 md:w-full md:h-37.5"
          }`}
      >
        {img ? (
          <Image
            src={img}
            alt={deal.featuredImage?.node?.altText || deal.title}
            fill
            priority={priority}
            sizes="(max-width: 768px) 120px, 296px"
            className="object-cover transition-transform duration-500 ease-out
              group-hover:scale-[1.04] group-hover:-translate-y-0.5
              group-active:scale-[1.06] group-active:-translate-y-1
              motion-reduce:transform-none motion-reduce:transition-none"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-xs text-muted">
            No image
          </div>
        )}
      </div>

      {/* Content */}
      <div className="flex min-w-0 flex-1 flex-col justify-between gap-2 p-3 md:pb-4">
        <h3
          className="line-clamp-2 text-[14px] font-semibold leading-4.75 text-text
            transition-colors duration-300
            group-hover:text-brand group-active:text-brand
            group-focus-within:text-brand
            md:text-[15px] md:leading-5.25"
        >
          {deal.title}
        </h3>

        {deal.priceLabel ? (
          <p className="text-[15px] font-semibold text-hot">
            {deal.priceLabel}
          </p>
        ) : (
          <div className="flex items-end gap-2 overflow-hidden whitespace-nowrap">
            {final && (
              <span className="price-font text-[16px] font-bold leading-none text-save md:text-[18px]">
                ₹{Number(final).toLocaleString("en-IN")}
              </span>
            )}

            {original && (
              <span className="price-font text-[13px] font-medium text-muted line-through">
                ₹{Number(original).toLocaleString("en-IN")}
              </span>
            )}

            {discount && (
              <span className="text-[13px] font-semibold text-hot">
                {discount}% off
              </span>
            )}
          </div>
        )}

        {/* Footer */}
        <div
          className={`flex min-w-0 flex-col justify-between gap-2.5 ${compact
              ? "min-[420px]:flex-row min-[420px]:items-center min-[420px]:gap-2"
              : "min-[370px]:flex-row min-[370px]:items-center min-[370px]:gap-2"
            }`}
        >
          <div className="flex min-w-0 items-center gap-2">
            {store && (
              <span className="truncate text-[13px] font-semibold text-text transition-colors duration-300 group-hover:text-brand group-active:text-brand">
                {store}
              </span>
            )}

            <span className="flex shrink-0 items-center gap-1 text-[12px] font-medium text-muted">
              <svg
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                aria-hidden="true"
              >
                <circle cx="12" cy="12" r="9" />
                <path d="M12 7v5l3 2" />
              </svg>

              {timeAgo(deal.date)}
            </span>
          </div>

          <a
            href={deal.affiliateLink || "#"}
            target="_blank"
            rel="noopener noreferrer sponsored"
            className="relative z-10 max-w-max shrink-0 rounded-btn bg-[#1c1c1c]
              px-3 py-1 text-[11px] font-semibold text-white
              transition-[transform,opacity] duration-200
              hover:-translate-y-0.5 hover:opacity-90
              active:scale-95
              focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand
              motion-reduce:transform-none motion-reduce:transition-none"
          >
            Shop Now
          </a>
        </div>
      </div>
    </div>
  );
}