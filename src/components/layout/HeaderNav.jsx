"use client";
import Link from "next/link";
import { useState } from "react";
import { social } from "@/lib/siteConfig";

export default function HeaderNav({ categories, stores, blogCats }) {
  const [open, setOpen] = useState(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileSub, setMobileSub] = useState(null);

  const dropdowns = {
    categories: categories.map((c) => ({ label: c.name, href: `/category/${c.slug}` })),
    stores: stores.map((s) => ({ label: s.name, href: `/store/${s.slug}` })),
    blog: blogCats.map((b) => ({ label: b.name, href: `/blog/category/${b.slug}` })),
  };

  const navItems = [
    { label: "Home", href: "/" },
    { label: "Hot Deals", href: "/deals" },
    { label: "Categories", href: "/category", key: "categories" },
    { label: "Stores", href: "/store", key: "stores" },
    { label: "Blogs", href: "/blog", key: "blog" },
  ];

  return (
    <>
      {/* Desktop nav */}
      <div className="hidden lg:flex gap-7 items-center">
        <nav className="flex gap-7 items-center text-[15px] font-medium text-text">
          {navItems.map((item) => (
            <div
              key={item.label}
              className="relative"
              onMouseEnter={() => item.key && setOpen(item.key)}
              onMouseLeave={() => setOpen(null)}
            >
              <Link href={item.href} className="hover:text-brand transition-colors py-2 inline-block">
                {item.label}
                {item.key && <span className="ml-1 text-[10px]">▾</span>}
              </Link>
              {item.key && open === item.key && dropdowns[item.key].length > 0 && (
                <div className="absolute top-full left-0 bg-surface border border-line rounded-lg shadow-lg py-2 min-w-50 z-50">
                  {dropdowns[item.key].map((d) => (
                    <Link key={d.href} href={d.href} className="block px-4 py-2 text-sm hover:bg-brand-tint hover:text-brand">
                      {d.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>

        <div className="flex gap-2 items-center px-4 py-3 rounded-lg w-60 xl:w-75 bg-bg border border-line">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#9aa1ad" strokeWidth="2">
            <circle cx="11" cy="11" r="7" /><path d="m21 21-4-4" />
          </svg>
          <input placeholder="Search deals, coupons & stores" className="bg-transparent outline-none text-[13px] w-full text-text" />
        </div>

        <a href={social.telegram} target="_blank" rel="noopener noreferrer" className="flex gap-1.5 items-center px-5 py-2.5 rounded-lg text-white text-[15px] font-medium shrink-0 bg-telegram">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
            <path d="M21.9 4.3 2.7 11.7c-1.1.5-1.1 1.3-.2 1.5l4.9 1.5 1.9 5.7c.2.6.1.8.7.8.5 0 .7-.2 1-.5l2.3-2.3 4.8 3.6c.9.5 1.5.2 1.7-.8l3.1-14.6c.3-1.3-.5-1.9-1.7-1.5z" />
          </svg>
          Join
        </a>
      </div>

      {/* Mobile hamburger */}
      <button className="lg:hidden p-2" onClick={() => setMobileOpen(!mobileOpen)} aria-label="Menu">
        <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#1c1c1c" strokeWidth="2">
          <path d={mobileOpen ? "M6 6l12 12M18 6L6 18" : "M3 6h18M3 12h18M3 18h18"} />
        </svg>
      </button>

      {/* Mobile menu panel */}
{mobileOpen && (
  <div className="lg:hidden fixed inset-x-0 top-15 bottom-0 w-full bg-surface z-50 overflow-y-auto">
    <div className="container-wrap py-4 pt-6 flex flex-col gap-1">
      {/* Search */}
      <div className="flex gap-2 items-center px-4 py-3 rounded-lg mb-3 bg-bg border border-line">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#9aa1ad" strokeWidth="2">
          <circle cx="11" cy="11" r="7" /><path d="m21 21-4-4" />
        </svg>
        <input placeholder="Search deals, coupons & stores" className="bg-transparent outline-none text-[13px] w-full text-text" />
      </div>

      {navItems.map((item) => (
        <div key={item.label} className="border-b border-line last:border-0">
          {item.key ? (
            // Items WITH a submenu → toggle expand
            <button
              onClick={() => setMobileSub(mobileSub === item.key ? null : item.key)}
              className="w-full flex items-center justify-between py-3 font-medium text-text"
            >
              {item.label}
              <span className={`text-xs transition-transform ${mobileSub === item.key ? "rotate-180" : ""}`}>▾</span>
            </button>
          ) : (
            // Plain links (Home, Hot Deals)
            <Link href={item.href} className="block py-3 font-medium text-text" onClick={() => setMobileOpen(false)}>
              {item.label}
            </Link>
          )}

          {/* Submenu — 2-column grid, only when expanded */}
          {item.key && mobileSub === item.key && (
            <div className="grid grid-cols-2 gap-x-4 gap-y-1 pb-3 pl-1">
              {dropdowns[item.key].map((d) => (
                <Link
                  key={d.href}
                  href={d.href}
                  className="py-1.5 text-sm text-muted hover:text-brand"
                  onClick={() => setMobileOpen(false)}
                >
                  {d.label}
                </Link>
              ))}
            </div>
          )}
        </div>
      ))}

      <a href={social.telegram} target="_blank" rel="noopener noreferrer" className="flex gap-1.5 items-center justify-center px-5 py-2.5 rounded-lg text-white text-[15px] font-medium mt-3 bg-telegram">
        Join Telegram
      </a>
    </div>
  </div>
)}
    </>
  );
}