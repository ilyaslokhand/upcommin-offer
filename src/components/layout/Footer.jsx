import Link from "next/link";
import { social } from "@/lib/siteConfig";

import Image from "next/image";

const POPULAR_STORES = [
  { name: "Amazon Deals", href: "/store/amazon" },
  { name: "Flipkart Deals", href: "/store/flipkart" },
  { name: "Myntra Deals", href: "/store/myntra" },
  { name: "Ajio Deals", href: "/store/ajio" },
  { name: "Tata CLiQ", href: "/store/tata-cliq" },
];

const CATEGORIES = [
  { name: "Electronics", href: "/category/electronics" },
  { name: "Fashion", href: "/category/fashion" },
  { name: "Mobiles", href: "/category/mobiles" },
  { name: "Appliances", href: "/category/appliances" },
  { name: "Grocery", href: "/category/grocery" },
];

const COMPANY_LINKS = [
  { name: "About us", href: "/about" },
  { name: "How it works", href: "/how-it-works" },
  { name: "Contact", href: "/contact" },
  { name: "Privacy Policy", href: "/privacy-policy" },
  { name: "Disclosure", href: "/disclosure" },
];

export default function Footer() {
  return (
    <footer className="w-full bg-ink text-[#8b92a8] pt-12.5 pb-12.5">
      <div className="max-w-7xl mx-auto px-5 justify-between">
        {/* Main Content Frame (1280px x 260px in Figma, gap 80px, border-bottom 1px 14% white) */}
        <div className="flex flex-col lg:flex-row min-[586px]:gap-20 gap-10 pb-10 border-b border-white/[0.14]">
          {/* Brand Column (380px fixed width, vertical gap 40px) */}
          <div className="w-full lg:w-95 shrink-0 flex flex-col gap-5.5 ">
            <div className="space-y-4">
              <Link href="/" className="inline-block">
      <Image 
        src="/upcomingofferwhite@2x.png" 
        alt="UpcomingOffer Logo" 
        width={160} 
        height={40} 
        className="h-10 w-auto object-contain object-left" 
        priority
      />
    </Link>
              <p className="text-[15px] leading-5.5 text-[#8b92a8]">
                India&apos;s fastest-growing deals feed. Verified loot deals,
                coupons and offers updated every hour, hand-checked for trust.
              </p>
            </div>

            {/* Social Icons */}
            <div className="flex items-center gap-5 text-white/80">
              <a
                href={social.telegram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Telegram"
                className="text-white/80 hover:text-white transition-colors"
              >
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <path d="M21.68 3.66a1.19 1.19 0 0 0-1.22-.09L2.83 10.74a1.21 1.21 0 0 0 .09 2.26l4.63 1.44 1.74 5.3a1.2 1.2 0 0 0 2.06.39l2.58-3.14 4.8 3.54a1.2 1.2 0 0 0 1.88-.72l3.38-14.7a1.19 1.19 0 0 0-.31-1.45zM9.54 14.07l9.83-6.22-7.85 7.07-.37 3.33-1.61-4.9 8.24-7.44-10.21 5.48-3.13-.97 15.1-6.15-2.88 12.56-4.14-3.05z" />
                </svg>
              </a>

              <a
                href={social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="text-white/80 hover:text-white transition-colors"
              >
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Nav Columns Container (Fill remaining width, Gap 80px) */}
          <div className="flex-1 grid grid-cols-1 gap-5 min-[586px]:grid-cols-3 min-[586px]:gap-20">
            {/* Column 1: Popular Stores (Width fill 220px, Gap 22px) */}
            <div className="flex flex-col gap-5.5">
              <h3 className="font-body font-bold text-[14px] text-white uppercase tracking-wider">
                Popular Stores
              </h3>
              <ul className="space-y-3 text-[15px]">
                {POPULAR_STORES.map((store) => (
                  <li key={store.href}>
                    <Link
                      href={store.href}
                      className="text-[#8b92a8] hover:text-white transition-colors"
                    >
                      {store.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 2: Categories (Width fill 220px, Gap 22px) */}
            <div className="flex flex-col gap-5.5">
              <h3 className="font-body font-bold text-[14px] text-white uppercase tracking-wider">
                Categories
              </h3>
              <ul className="space-y-3 text-[15px]">
                {CATEGORIES.map((cat) => (
                  <li key={cat.href}>
                    <Link
                      href={cat.href}
                      className="text-[#8b92a8] hover:text-white transition-colors"
                    >
                      {cat.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 3: Company (Width fill 220px, Gap 22px) */}
            <div className="flex flex-col gap-5.5">
              <h3 className="font-body font-bold text-[15px] text-white uppercase tracking-wider">
                Company
              </h3>
              <ul className="space-y-3 text-[15px]">
                {COMPANY_LINKS.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-[#8b92a8] hover:text-white transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Bar Frame (690px x 44px text box, DM Sans 15px/22px, #8B92A8) */}
        <div className="pt-7 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 text-[15px] leading-5.5 text-[#8b92a8]">
          <p className="max-w-172.5">
            © {new Date().getFullYear()} UpcomingOffer. Prices &amp;
            availability are accurate as of the posted time and may change.
            UpcomingOffer earns affiliate commissions on some links this never
            affects the price you pay.
          </p>
          <span className="shrink-0 text-[15px]">
            Made for smart shoppers IN
          </span>
        </div>
      </div>
    </footer>
  );
}
