import Link from "next/link";
import type { ReactNode } from "react";

export default function PageHeading({
  eyebrow,
  title,
  children,
}: {
  eyebrow: string;
  title: string;
  children?: ReactNode;
}) {
  return (
    <section className="relative overflow-hidden bg-orange pt-32 pb-16 md:pt-40 md:pb-20">
      <div className="relative z-10 mx-auto max-w-shell px-5 md:px-10">
        <p className="font-display text-xs tracking-[0.3em] text-black/60">{eyebrow}</p>
        <h1 className="headline mt-3 max-w-5xl text-[clamp(3.2rem,8vw,7rem)] leading-[0.86] text-black">{title}</h1>
        {children}
        <Link href="/menu" className="mt-8 inline-flex bg-black px-8 py-4 font-display text-white transition-colors hover:bg-navy">
          ORDER NOW →
        </Link>
      </div>
    </section>
  );
}
