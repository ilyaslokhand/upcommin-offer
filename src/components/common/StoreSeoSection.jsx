import FAQ from "@/components/common/FAQ";

export default function StoreSeoSection({ seoDescription, faqs = [], storeName }) {
    if (!seoDescription && (!faqs || faqs.length === 0)) return null;

    return (
        <>
            {/* SEO Description */}
            {seoDescription && (
                <div className="container-wrap pb-6">
                    <div className="bg-white border border-line rounded-[16px] px-6 py-7 deal-content"
                        dangerouslySetInnerHTML={{ __html: seoDescription }} />
                </div>
            )}

            {/* FAQs — reuse the FAQ component */}
            {faqs?.length > 0 && (
                <FAQ
                    faqs={faqs}
                    title={`Frequently Asked Questions${storeName ? ` about ${storeName}` : ""}`}
                    questionKey="question"
                    answerKey="answer"
                />
            )}
        </>
    );
}