import { social, stats } from "@/lib/siteConfig";

export default function LootBand() {
    return (
        <div
            className="rounded-[12px] p-5 flex flex-col gap-4 overflow-hidden"
            style={{
                background: "radial-gradient(120% 180% at 5% 30%, #4b2000 0%, #3d1c09 25%, #301812 50%, #141024 100%)",
            }}
        >
            <div className="flex flex-col gap-2">
                <h3 className="text-[20px] font-semibold text-white tracking-[-0.2px]" style={{ fontFamily: "var(--font-body)" }}>
                    Get this kind of loot daily.
                </h3>
                <p className="text-[13px] leading-6" style={{ color: "rgba(255,255,255,0.9)" }}>
                    Join {stats.community} deal hunters on Telegram — free alerts, 24×7.
                </p>
            </div>


         <a   href={social.telegram}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 bg-telegram text-white px-5 py-2.5 rounded-[8px] text-[15px] font-semibold hover:opacity-90"
      >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M21.9 4.3 2.7 11.7c-1.1.5-1.1 1.3-.2 1.5l4.9 1.5 1.9 5.7c.2.6.1.8.7.8.5 0 .7-.2 1-.5l2.3-2.3 4.8 3.6c.9.5 1.5.2 1.7-.8l3.1-14.6c.3-1.3-.5-1.9-1.7-1.5z" />
            </svg>
            Join Telegram
        </a>
    </div >
  );
}