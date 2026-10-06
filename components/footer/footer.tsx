import Link from "next/link";
import Image from "next/image";
import { Instagram, Facebook, Music2 } from "lucide-react";
import { BRAND, RESTAURANT } from "@/data/config";

export default function Footer() {
  return (
    <footer className="relative bg-navy text-white overflow-hidden">
      <div className="mx-auto max-w-shell px-5 md:px-10 py-16 md:py-24">
        <div className="grid gap-12 md:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
          <div>
            <Link href="/" className="inline-flex items-center gap-3">
              <span className="relative block h-12 w-12 overflow-hidden">
                <Image src={BRAND.logo} alt="" fill sizes="48px" className="object-cover" />
              </span>
              <span className="headline text-2xl">BROTHERS FOOD</span>
            </Link>
            <p className="mt-5 max-w-sm text-white/55 leading-relaxed">
              {BRAND.tagline}
            </p>
          </div>

          <div>
            <p className="font-display text-orange text-xs tracking-[0.25em]">EXPLORE</p>
            <nav className="mt-4 flex flex-col gap-3">
              <Link className="text-white/70 hover:text-orange transition-colors" href="/">HOME</Link>
              <Link className="text-white/70 hover:text-orange transition-colors" href="/menu">MENU</Link>
              <Link className="text-white/70 hover:text-orange transition-colors" href="/about">ABOUT</Link>
              <Link className="text-white/70 hover:text-orange transition-colors" href="/contact">CONTACT</Link>
            </nav>
          </div>

          <div>
            <p className="font-display text-orange text-xs tracking-[0.25em]">CONTACT</p>
            <div className="mt-4 space-y-2 text-white/65 text-sm">
              <p>{RESTAURANT.phone}</p>
              <p>{RESTAURANT.address}</p>
              <p>{RESTAURANT.hours}</p>
            </div>
          </div>

          <div>
            <p className="font-display text-orange text-xs tracking-[0.25em]">FOLLOW THE BROTHERS</p>
            <div className="mt-5 flex gap-3">
              <a href={RESTAURANT.instagram} target="_blank" rel="noreferrer" aria-label="Instagram"
                className="h-11 w-11 border border-white/15 flex items-center justify-center hover:bg-orange hover:text-black transition-colors">
                <Instagram size={19} />
              </a>
              <a href={RESTAURANT.facebook} target="_blank" rel="noreferrer" aria-label="Facebook"
                className="h-11 w-11 border border-white/15 flex items-center justify-center hover:bg-orange hover:text-black transition-colors">
                <Facebook size={19} />
              </a>
              <a href={RESTAURANT.tiktok} target="_blank" rel="noreferrer" aria-label="TikTok"
                className="h-11 w-11 border border-white/15 flex items-center justify-center hover:bg-orange hover:text-black transition-colors">
                <Music2 size={19} />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-16 border-t border-white/10 pt-8 flex flex-col md:flex-row items-start md:items-end justify-between gap-6">
          <div>
            <p className="headline text-[clamp(3rem,8vw,7rem)] leading-[0.82]">HUNGRY?</p>
            <p className="headline text-orange text-[clamp(3rem,8vw,7rem)] leading-[0.82]">ORDER NOW.</p>
          </div>
          <Link href="/menu"
            className="inline-flex bg-orange text-black font-display px-8 py-4 hover:bg-white transition-colors">
            START YOUR ORDER →
          </Link>
        </div>

        <div className="mt-10 text-xs text-white/35 flex flex-col md:flex-row justify-between gap-2">
          <span>© {new Date().getFullYear()} {BRAND.name}</span>
          <span>Demo content — replace restaurant details before launch.</span>
        </div>
      </div>
    </footer>
  );
}
