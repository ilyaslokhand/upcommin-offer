import Link from "next/link";

/**
 * Reusable grid of category cards (icon + name + count).
 * Props:
 *  - categories: array of { name, slug, count, categoryIcon }
 *  - columns: desktop columns (default 5)
 */
export default function CategoryGrid({ categories = [], columns = 5 }) {
    if (!categories.length) return null;

    const gridCols =
        columns === 6
            ? "grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6"
            : "grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5";

    return (
        <div className={`grid ${gridCols} gap-4`}>
            {categories.map((cat) => (
                <Link
                    key={cat.slug}
                    href={`/category/${cat.slug}`}
                    className="bg-white border border-line rounded-[14px] flex flex-col items-center gap-2.5 px-4 py-5 hover:border-brand hover:shadow-md transition"
                >
                    <div className="size-16 bg-[#f4f5f9] rounded-full flex items-center justify-center overflow-hidden">
                        {cat.categoryIcon ? (
                            <img src={cat.categoryIcon} alt={cat.name} className="size-9 object-contain" />
                        ) : (
                            <span className="text-2xl">🏷️</span>
                        )}
                    </div>
                    <span className="text-[14px] font-semibold text-text text-center">{cat.name}</span>
                    <span className="text-[12px] text-muted">{cat.count ?? 0} deals</span>
                </Link>
            ))}
        </div>
    );
}