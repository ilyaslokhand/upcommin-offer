// decode HTML entities from WordPress (&amp; → &, etc.)
import { decode } from "@/lib/utils/deal";

export default function CategoryHero({ name, description, count, icon }) {
    return (
        <div className="container-wrap pt-4">
            <div className="bg-white border border-line rounded-3xl px-5 py-5 md:px-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                {/* Icon + title + description */}
                <div className="flex items-center gap-4 md:gap-5 min-w-0">
                    <div className="size-12.5 bg-[#f1f1f1] rounded-lg flex items-center justify-center shrink-0 overflow-hidden">
                        {icon && <img src={icon} alt={name} className="size-7 object-contain" />}
                    </div>
                    <div className="flex flex-col gap-1 min-w-0">
                        <h1 className="tracking-[-0.56px] text-text" style={{ fontFamily: "var(--font-display)", fontWeight: 700 }}>
                            {name} Deals
                        </h1>
                        {description && (
                            <p className="hidden md:block text-[13px] md:text-[15px] text-[#6a7180]">
                                {decode(description)}
                            </p>
                        )}
                    </div>
                </div>

                {/* Count */}
                <div className="flex items-center gap-2 md:flex-col md:items-end shrink-0 justify-center">
                    <span className="text-[22px] font-extrabold text-text leading-none">{count ?? 0}</span>
                    <span className="text-[13px] text-[#6a7180]">active deals</span>
                </div>
            </div>
        </div>
    );
}