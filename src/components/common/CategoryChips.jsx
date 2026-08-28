import Link from "next/link";
import Image from "next/image";
import { getCategories } from "@/lib/graphql/queries/taxonomies";

export default async function CategoryChips() {
  const categories = await getCategories();
  if (!categories.length) return null;

  return (
    <section className="container-wrap pt-4">
      <div className="flex gap-2.5 overflow-x-auto no-scrollbar">
        {categories.map((cat) => (
          <Link
            key={cat.slug}
            href={`/category/${cat.slug}`}
            className="shrink-0 w-[82px] bg-white border border-[#f1f1f1] rounded-[10px] flex flex-col items-center gap-1.5 px-3 py-[13px] hover:shadow-md transition"
          >
            <div className="size-11 rounded-[8px] bg-[#f1f1f1] flex items-center justify-center overflow-hidden">
              {cat.categoryIcon ? (
                <Image
                  src={cat.categoryIcon}
                  alt={cat.name}
                  width={24}
                  height={24}
                  className="size-6 object-contain"
                />
              ) : (
                <span className="size-6 rounded bg-line" />
              )}
            </div>
            <span className="text-[11px] font-semibold text-text text-center whitespace-nowrap">
              {cat.name}
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}
