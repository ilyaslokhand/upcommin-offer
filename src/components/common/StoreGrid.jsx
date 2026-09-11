import Link from "next/link";
import Image from "next/image";

/**
 * Reusable grid of store cards (logo + name + offer count).
 * Props:
 *  - stores: array of { name, slug, storeLogo, count }
 *  - columns: desktop columns (default 6)
 */
export default function StoreGrid({ stores = [], columns = 6 }) {
    if (!stores.length) return null;

    const gridCols =
        columns === 6
            ? "grid-cols-2 sm:grid-cols-4 lg:grid-cols-6"
            : "grid-cols-2 sm:grid-cols-3 lg:grid-cols-4";

    return (
        <div className={`grid ${gridCols} gap-2.5`}>
            {stores.map((store) => (
                <Link
                    key={store.slug}
                    href={`/store/${store.slug}`}
                    className="bg-white border border-line rounded-[10px] flex flex-col items-center justify-center gap-2.5 p-4 hover:border-brand transition"
                >
                    {/* Logo */}
                    <div className="relative w-16 h-16 flex items-center justify-center">
                        {store.storeLogo ? (
                            <Image src={store.storeLogo} alt={store.name} fill sizes="64px" className="object-contain p-1" />
                        ) : (
                            <span className="text-[24px] font-bold text-muted">{store.name?.charAt(0)}</span>
                        )}
                    </div>

                    {/* Name + count */}
                    <div className="flex flex-col items-center gap-0.5">
                        <span className="text-[15px] font-bold text-text text-center leading-[21px]">{store.name}</span>
                        <span className="text-[13px] font-medium leading-4" style={{ color: "#9aa1ad" }}>
                            {store.count ?? 0} Offers
                        </span>
                    </div>
                </Link>
            ))}
        </div>
    );
}