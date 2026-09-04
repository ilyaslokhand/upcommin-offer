export default function HowToGet({ storeName = "", affiliateLink = "#" }) {
    return (
        <div className="bg-white border border-line rounded-[16px] p-6 flex flex-col gap-4 h-full">
            <h2 className="text-[20px] font-semibold text-text tracking-[-0.2px]" style={{ fontFamily: "var(--font-body)" }}>
                How to get this deal
            </h2>
            <div className="flex flex-col gap-3.5">
                {/* Step 1 — with clickable Shop Now link */}
                <div className="flex items-start gap-2">
                    <span className="shrink-0 size-5 bg-[#eeebfd] rounded-full flex items-center justify-center text-[12px] font-medium text-text mt-0.5">1</span>
                    <p className="text-[13px] font-medium text-muted">
                        Click the{" "}
                        <a href={affiliateLink} target="_blank" rel="noopener noreferrer sponsored" className="font-bold text-text underline hover:text-brand">
                            Shop Now
                        </a>
                        {" "}button to open the product on {storeName}.
                    </p>
                </div>

                {/* Remaining steps */}
                {[
                    "Add the product to your cart.",
                    `Log in or register on your ${storeName} account.`,
                    "Apply the eligible bank card at checkout for the extra discount.",
                    "Complete the payment - done!",
                ].map((step, i) => (
                    <div key={i} className="flex items-start gap-2">
                        <span className="shrink-0 size-5 bg-[#eeebfd] rounded-full flex items-center justify-center text-[12px] font-medium text-text mt-0.5">{i + 2}</span>
                        <p className="text-[13px] font-medium text-muted">{step}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}