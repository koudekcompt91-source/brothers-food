import { MARQUEE_ITEMS } from "@/data/config";

export default function Marquee() {
  const row = [...MARQUEE_ITEMS, ...MARQUEE_ITEMS];
  return (
    <section aria-hidden className="relative z-10 bg-navy border-y-4 border-black overflow-hidden py-4 md:py-6">
      <div className="flex whitespace-nowrap animate-marquee will-change-transform">
        {[0, 1].map((half) => (
          <div key={half} className="flex shrink-0">
            {row.map((item, i) => (
              <span
                key={`${half}-${i}`}
                className="headline mx-6 flex items-center gap-12 text-[clamp(2rem,6vw,4.5rem)] text-orange"
              >
                {item}
                <span className="text-[0.45em] text-white">★</span>
              </span>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}
