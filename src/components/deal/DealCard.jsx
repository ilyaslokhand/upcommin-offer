import Link from "next/link";
import Image from "next/image";

function getDiscount(final, original) {
  const f = parseFloat(final),
    o = parseFloat(original);
  if (!f || !o || o <= f) return null;
  return Math.round(((o - f) / o) * 100);
}

function timeAgo(date) {
  const diff = Math.floor((Date.now() - new Date(date).getTime()) / 1000);
  if (diff < 3600) return `${Math.max(1, Math.floor(diff / 60))}m`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}h`;
  return `${Math.floor(diff / 86400)}d`;
}

function getTerm(terms, tax) {
  return terms?.nodes?.find((t) => t.taxonomyName === tax)?.name;
}

export default function DealCard({ deal }) {
  const img = deal.featuredImage?.node?.sourceUrl;
  const final = deal.finalPrice;
  const original = deal.originalPrice;
  const discount = getDiscount(final, original);
  const store = getTerm(deal.terms, "store");
  const expired = deal.isExpired === "true";

  const Wrapper = expired ? "div" : Link;
  const wrapperProps = expired ? {} : { href: `/deals/${deal.slug}` };

  return (
    <Wrapper
      {...wrapperProps}
      className={`bg-white border border-line rounded-[10px] overflow-hidden flex flex-row md:flex-col ${expired ? "opacity-60 pointer-events-none" : "hover:shadow-md transition"}`}
    >
      {/* Image — smaller: fixed small box on mobile (left), compact on desktop (top) */}
      <div className="relative w-[120px] h-[120px] md:w-full md:h-[150px] shrink-0 bg-[#f4f5f9]">
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
        {/* Discount badge on image */}
        {/* {discount && (
          <span className="absolute bottom-2 left-2 bg-[rgba(28,28,28,0.7)] rounded-[4px] px-1.5 py-1 text-[11px] font-bold text-white uppercase leading-none">
            {discount}% off
          </span>
        )} */}
        {/* Expired ribbon */}
        {expired && (
          <span className="absolute top-2 left-2 bg-[rgba(28,28,28,0.85)] rounded-[4px] px-2 py-1 text-[10px] font-bold text-white uppercase">
            Expired
          </span>
        )}
      </div>

      {/* Content */}
      <div className="flex flex-col justify-between gap-2 p-3 md:pb-4 flex-1 min-w-0">
        <h3 className="text-[14px] md:text-[15px] font-semibold text-text leading-[19px] md:leading-[21px] line-clamp-2">
          {deal.title}
        </h3>

        {/* Price row or price label */}
        {deal.priceLabel ? (
          <p className="text-[15px] font-semibold text-hot">
            {deal.priceLabel}
          </p>
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
              <span className="text-[13px] font-semibold text-hot">
                {discount}% off
              </span>
            )}
          </div>
        )}

        {/* Footer: store + time + CTA */}
        <div className="flex flex-col min-[420px]:flex-row min-[420px]:items-center gap-2.5 min-[420px]:gap-2 min-w-0 justify-between">
          <div className="flex items-center gap-2 min-w-0">
            {store && (
              <span className="text-[13px] font-semibold text-text truncate">
                {store}
              </span>
            )}
            <span className="flex items-center gap-1 text-[12px] font-medium text-muted shrink-0">
              <svg
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <circle cx="12" cy="12" r="9" />
                <path d="M12 7v5l3 2" />
              </svg>
              {timeAgo(deal.date)}
            </span>
          </div>
          {expired ? (
            <span className="bg-[#e7e9f1] text-muted px-3 py-1 rounded-[5px] text-[11px] font-semibold shrink-0">
              Expired
            </span>
          ) : (
            <span className="bg-[#1c1c1c] text-white px-3 py-1 rounded-[5px] text-[11px] font-semibold shrink-0 max-w-max">
              Shop Now
            </span>
          )}
        </div>
      </div>
    </Wrapper>
  );
}
