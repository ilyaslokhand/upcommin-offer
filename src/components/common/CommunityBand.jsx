import { social, stats } from "@/lib/siteConfig";

export default function CommunityBand() {
  return (
    <section className="container-wrap pt-12">
      <div
        className="rounded-[24px] p-6 md:p-10 flex flex-col md:flex-row md:items-center md:justify-between gap-6 overflow-hidden"
        style={{
          background:
            "radial-gradient(120% 180% at 5% 30%, #4b2000 0%, #3d1c09 25%, #301812 50%, #141024 100%)",
        }}
      >
        <div className="flex flex-col gap-2">
          <span
            className="text-[13px] font-bold uppercase tracking-wide"
            style={{ color: "rgba(255,255,255,0.7)" }}
          >
            Never miss a loot
          </span>
          <h2
            className="text-white tracking-[-0.68px]"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Get every deal the second it drops
          </h2>
          <p
            className="text-[15px] leading-6 max-w-[500px]"
            style={{ color: "rgba(255,255,255,0.9)" }}
          >
            Join {stats.community} smart shoppers getting instant loot alerts on
            Telegram. Free, forever.
          </p>
        </div>

        <a
          href={social.telegram}
          target="_blank"
          rel="noopener noreferrer"
          className="shrink-0 self-center md:self-auto flex items-center gap-2.5 px-5 py-2.5 rounded-lg text-white text-[15px] font-extrabold bg-telegram hover:opacity-90 transition"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
            <path d="M21.9 4.3 2.7 11.7c-1.1.5-1.1 1.3-.2 1.5l4.9 1.5 1.9 5.7c.2.6.1.8.7.8.5 0 .7-.2 1-.5l2.3-2.3 4.8 3.6c.9.5 1.5.2 1.7-.8l3.1-14.6c.3-1.3-.5-1.9-1.7-1.5z" />
          </svg>
          Join Telegram
        </a>
      </div>
    </section>
  );
}
