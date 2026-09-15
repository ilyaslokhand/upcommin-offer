import Link from "next/link";
import Image from "next/image";

/**
 * Reusable category sections — each category with its subcategory capsules.
 * Only shows categories that HAVE subcategories.
 * Props:
 *  - categories: array of { name, slug, children: { nodes: [...] } }
 */
export default function CategorySections({ categories = [] }) {
    const withSubs = categories.filter((cat) => cat.children?.nodes?.length > 0);

    if (!withSubs.length) return null;

    return (
        <div className="flex flex-col gap-6">
            {withSubs.map((cat) => (
                <div key={cat.slug} className="bg-white border border-line rounded-[16px] px-6 py-5">
                    {/* Category name (links to category page) */}
                    <Link href={`/category/${cat.slug}`} className="text-[18px] font-bold text-text hover:text-brand mb-4 inline-block">
                        {cat.name}
                    </Link>

                    {/* Subcategory capsules */}
                    <div className="flex overflow-x-auto sm:grid sm:grid-cols-3 lg:grid-cols-6 gap-3 pb-2">
                        {cat.children.nodes.map((sub) => (
                            <Link
                                key={sub.slug}
                                href={`/category/${cat.slug}/${sub.slug}`}
                                className="flex items-center gap-3 p-2 rounded-[10px] hover:bg-[#f4f5f9] transition"
                            >
                                <div className="size-10 bg-[#f4f5f9] rounded-full flex items-center justify-center shrink-0 overflow-hidden">
                                    {sub.categoryIcon ? (
                                        <Image src={sub.categoryIcon} alt={sub.name} width={24}
                                            height={24}
                                            className="size-6 object-contain" />
                                    ) : (
                                        <span className="text-sm">🏷️</span>
                                    )}
                                </div>
                                <span className="text-[14px] font-medium text-text">{sub.name}</span>
                            </Link>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
}