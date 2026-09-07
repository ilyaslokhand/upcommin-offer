"use client";
import { useState } from "react";
import { faqs as defaultFaqs } from "@/lib/siteConfig";
import { decode } from "@/lib/utils/deal";

export default function FAQ({
  faqs = defaultFaqs,      // ← accept faqs as prop, default to siteConfig's
  title = "Frequently Asked Questions",
  questionKey = "q",       // ← which field is the question
  answerKey = "a",         // ← which field is the answer
}) {
  const [open, setOpen] = useState(0);

  if (!faqs?.length) return null;

  return (
    <section className="container-wrap pb-20">
      <h2 className="font-bold mb-7 tracking-[-0.56px]" style={{ fontFamily: "var(--font-display)", color: "#1c1c1c" }}>
        {title}
      </h2>

      <div className="flex flex-col gap-6">
        {faqs.map((item, i) => {
          const isOpen = open === i;
          return (
            <div key={i} className="bg-white rounded-[20px] hover:shadow-md transition">
              <button
                onClick={() => setOpen(isOpen ? null : i)}
                className="w-full flex items-start justify-between gap-4 text-left cursor-pointer p-6"
              >
                <span className="text-[18px] font-semibold" style={{ color: "#1c1c1c" }}>
                  {decode(item[questionKey])}
                </span>
                <span className="shrink-0 text-2xl leading-none w-[30px] text-center" style={{ color: "#4c34d4" }}>
                  {isOpen ? "−" : "+"}
                </span>
              </button>

              {isOpen && (
                <p className="text-[15px] leading-[19px] px-6 pb-6 -mt-1 whitespace-pre-line" style={{ color: "#6a7180" }}>
                  {decode(item[answerKey])}
                </p>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}