"use client";
import { useState } from "react";
import Breadcrumb from "@/components/common/Breadcrumb";
import { social } from "@/lib/siteConfig";
import JsonLd from "@/lib/seo/JsonLd";
import { buildBreadcrumbSchema } from "@/lib/seo/schema";

export default function ContactPage() {
    const [submitting, setSubmitting] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [error, setError] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true);
        setError(false);

        const formData = new FormData(e.target);
        formData.append("access_key", "507f3c13-ac0b-414e-8b9e-6bc193a4b1ff");  // ← your key here

        const res = await fetch("https://api.web3forms.com/submit", {
            method: "POST",
            body: formData,
        });
        const data = await res.json();

        setSubmitting(false);
        if (data.success) {
            setSubmitted(true);
            e.target.reset();
        } else {
            setError(true);
        }
    };



    return (
        <div>


            <div className="container-wrap py-6">
                <div className="max-w-150  w-full">
                    <h1 className="font-bold tracking-[-0.56px] text-text mb-2" style={{ fontFamily: "var(--font-display)" }}>
                        Contact Us
                    </h1>
                    <p className="text-muted text-[15px] mb-6">
                        Have a question, found a great deal, or spotted something we missed? Drop us a message.
                    </p>

                    {submitted ? (
                        <div className="bg-[#e4f7ee] border border-[#0e9f5a] rounded-card px-5 py-4 text-[#0e9f5a] font-medium">
                            ✓ Thanks for reaching out! We&apos;ll get back to you soon.
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                            <input
                                type="text"
                                name="name"
                                placeholder="Your Name"
                                required
                                className="bg-white border border-line rounded-lg px-4 py-3 text-[14px] outline-none focus:border-brand"
                            />
                            <input
                                type="email"
                                name="email"
                                placeholder="Your Email"
                                required
                                className="bg-white border border-line rounded-lg px-4 py-3 text-[14px] outline-none focus:border-brand"
                            />
                            <input
                                type="text"
                                name="subject"
                                placeholder="Subject"
                                className="bg-white border border-line rounded-lg px-4 py-3 text-[14px] outline-none focus:border-brand"
                            />
                            <textarea
                                name="message"
                                placeholder="Your Message"
                                required
                                rows={6}
                                className="bg-white border border-line rounded-lg px-4 py-3 text-[14px] outline-none focus:border-brand resize-none"
                            />

                            {/* Honeypot (spam protection) */}
                            <input type="checkbox" name="botcheck" className="hidden" style={{ display: "none" }} />

                            <button
                                type="submit"
                                disabled={submitting}
                                className="bg-[#1c1c1c] text-white px-6 py-3 rounded-lg text-[15px] font-semibold self-start hover:opacity-90 disabled:opacity-50"
                            >
                                {submitting ? "Sending…" : "Send Message"}
                            </button>

                            {error && (
                                <p className="text-hot text-[13px]">Something went wrong. Please try again.</p>
                            )}
                        </form>
                    )}

                    {/* Alternative contact */}
                    <div className="mt-8 pt-6 border-t border-line">
                        <p className="text-[14px] text-muted mb-3">Or reach us on:</p>
                        <a href={social.telegram} target="_blank" rel="noopener noreferrer" className="text-brand font-medium hover:underline">
                            Telegram Community →
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}