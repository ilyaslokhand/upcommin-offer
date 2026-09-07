import { decode } from "@/lib/utils/deal";

/**
 * Store page header — logo + name + description + deal count + reward.
 */
export default function StoreHero({ name, description, count, logo, reward }) {
    return (
        <div className="container-wrap pt-4">
            <div className="bg-white border border-line rounded-3xl px-5 py-5 md:px-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                {/* Logo + name + description */}
                <div className="flex items-center gap-4 md:gap-5 min-w-0">
                    <div className="size-14 bg-white border border-line rounded-card flex items-center justify-center shrink-0 overflow-hidden p-1.5">
                        {logo && <img src={logo} alt={name} className="w-full h-full object-contain" />}
                    </div>
                    <div className="flex flex-col gap-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                            <h1 className="tracking-[-0.56px] text-text" style={{ fontFamily: "var(--font-display)", fontWeight: 700 }}>
                                {name} Deals
                            </h1>
                            {reward && (
                                <span className="text-[13px] font-semibold text-save bg-[#e4f7ee] px-2 py-0.5 rounded-btn">
                                    {reward}
                                </span>
                            )}
                        </div>
                        {description && (
                            <p className="hidden md:block text-[13px] md:text-[15px] text-[#6a7180]">
                                {decode(description)}
                            </p>
                        )}
                    </div>
                </div>

                {/* Count */}
                <div className="flex items-center gap-2 md:flex-col md:items-end shrink-0">
                    <span className="text-[22px] font-extrabold text-text leading-none">{count ?? 0}</span>
                    <span className="text-[13px] text-[#6a7180]">active deals</span>
                </div>
            </div>
        </div>
    );
}