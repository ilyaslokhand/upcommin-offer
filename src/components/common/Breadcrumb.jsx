import Link from "next/link";

/**
 * Reusable breadcrumb.
 * Props:
 *  - items: array of { label, href }
 *      - items with href → clickable links
 *      - the LAST item (or any without href) → plain text (current page)
 *
 * Example:
 *  <Breadcrumb items={[
 *    { label: "Home", href: "/" },
 *    { label: "Categories", href: "/category" },
 *    { label: "Electronics" },   // no href = current page
 *  ]} />
 */
export default function Breadcrumb({ items = [] }) {
    return (
        <nav aria-label="Breadcrumb" className="container-wrap pt-6 flex items-center gap-2.5 text-[15px] flex-wrap">
            {items.map((item, i) => {
                const isLast = i === items.length - 1;
                return (
                    <span key={i} className="flex items-center gap-2.5">
                        {item.href && !isLast ? (
                            <Link href={item.href} className="text-[#6a7180] font-medium hover:text-brand capitalize">
                                {item.label}
                            </Link>
                        ) : (
                            <span className="text-text font-medium capitalize">{item.label}</span>
                        )}
                        {!isLast && <span className="text-muted">/</span>}
                    </span>
                );
            })}
        </nav>
    );
}