"use client";
import { useState } from "react";
import { faqs } from "@/lib/siteConfig";

export default function FAQ() {
  const [open, setOpen] = useState(0); // first one open by default

  return (
    <section className="container-wrap pb-20">
      <h2
        className=" font-bold mb-7 tracking-[-0.56px]"
        style={{ fontFamily: "var(--font-display)", color: "#1c1c1c" }}
      >
        Frequently Asked Questions
      </h2>

      <div className="flex flex-col gap-6 ">
        {faqs.map((item, i) => {
          const isOpen = open === i;
          return (
            <div
              key={i}
              className="bg-white rounded-[20px] hover:shadow-md transition "
            >
              <button
                onClick={() => setOpen(isOpen ? null : i)}
                className="w-full flex items-start justify-between gap-4 text-left cursor-pointer p-6 "
              >
                <span
                  className="text-[18px] cursor-pointer font-semibold"
                  style={{ color: "#1c1c1c" }}
                >
                  {item.q}
                </span>
                <span
                  className="shrink-0 text-2xl leading-none text-brand w-[30px] text-center"
                  style={{ color: "#4c34d4" }}
                >
                  {isOpen ? "−" : "+"}
                </span>
              </button>

              {isOpen && (
                <p
                  className="text-[15px] leading-[19px] px-6 pb-6 -mt-1 whitespace-pre-line"
                  style={{ color: "#6a7180" }}
                >
                  {item.a}
                </p>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
