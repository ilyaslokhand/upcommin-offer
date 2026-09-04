export default function DealContent({ title, html }) {
    if (!html) return null;
    return (
        <div className="bg-white border border-line rounded-[16px] p-6 ">
            <h2 className="text-[20px] font-semibold text-text tracking-[-0.2px] mb-2.5" style={{ fontFamily: "var(--font-body)" }}>
                {title}
            </h2>
            <div className="deal-content" dangerouslySetInnerHTML={{ __html: html }} />
        </div>
    );
}