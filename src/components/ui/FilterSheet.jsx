"use client";

export default function FilterSheet({ open, onClose, groups = [] }) {
    if (!open) return null;

    const isSelected = (group, value) =>
        group.multi ? group.selected.includes(value) : group.selected === value;

    return (
        <div className="md:hidden fixed inset-0 z-50 flex items-end" onClick={onClose}>
            <div className="absolute inset-0 bg-black/40" />

            <div
                className="relative w-full bg-white rounded-t-2xl p-5 flex flex-col gap-5 max-h-[80vh] overflow-y-auto"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Header — Filters title + Clear all + close */}
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <h3 className="text-[16px] font-bold" style={{ fontFamily: "var(--font-display)" }}>
                            Filters
                        </h3>

                    </div>
                    <button onClick={onClose} className="text-2xl leading-none">&times;</button>
                </div>

                {/* Groups */}
                {groups.map((group) => (
                    <div key={group.title}>
                        <p className="text-[13px] font-semibold text-muted mb-2">{group.title}</p>
                        <div className="flex flex-wrap gap-2">
                            {group.options.map((opt) => (
                                <button
                                    key={opt.value}
                                    onClick={() => group.onSelect(opt.value)}
                                    className={`px-3 py-2 rounded-lg text-[13px] font-medium border ${isSelected(group, opt.value)
                                        ? "bg-[#1c1c1c] text-white border-[#1c1c1c]"
                                        : "bg-white border-line text-text"
                                        }`}
                                >
                                    {opt.label}
                                </button>
                            ))}
                        </div>
                    </div>
                ))}

                <button
                    onClick={onClose}
                    className="mt-2 bg-[#1c1c1c] text-white py-3 rounded-lg font-semibold"
                >
                    Show results
                </button>
            </div>
        </div>
    );
}