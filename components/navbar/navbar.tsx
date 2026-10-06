"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingBag, Menu as MenuIcon, X } from "lucide-react";
import { NAV_LINKS, BRAND } from "@/data/config";
import { useCart } from "@/lib/cart";
import MagneticButton from "@/components/ui/magnetic-button";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { count, openCart, lastAddedAt } = useCart();
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setMobileOpen(false), [pathname]);

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.55, delay: 0.05, ease: [0.22, 1, 0.36, 1] }}
        className={
          "fixed top-0 left-0 right-0 z-[70] transition-all duration-300 " +
          (scrolled
            ? "border-b border-white/10 bg-navy/90 shadow-lg shadow-black/30 backdrop-blur-md"
            : "border-b border-transparent bg-transparent")
        }
      >
        <nav className="mx-auto max-w-shell px-5 md:px-10 h-[72px] flex items-center justify-between">
          <Link href="/" aria-label={BRAND.name} className="flex items-center gap-3">
            <span className="relative block w-9 h-9 overflow-hidden rounded-sm">
              <Image src={BRAND.logo} alt="" fill sizes="36px" className="object-cover" />
            </span>
            <span className="headline text-white text-lg md:text-xl">BROTHERS FOOD</span>
          </Link>

          <ul className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className="font-display text-sm tracking-widest text-white/80 hover:text-orange transition-colors"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-3">
            <button
              id="cart-trigger"
              onClick={openCart}
              aria-label="Open cart"
              className="relative p-2 text-white hover:text-orange transition-colors"
            >
              <motion.span
                key={lastAddedAt ?? 0}
                animate={lastAddedAt ? { scale: [1, 1.4, 1] } : {}}
                className="inline-block"
              >
                <ShoppingBag size={22} />
              </motion.span>
              {count > 0 && (
                <span className="absolute -top-0.5 -right-0.5 bg-orange text-black text-[11px] font-bold w-5 h-5 flex items-center justify-center rounded-full">
                  {count}
                </span>
              )}
            </button>
            <MagneticButton
              href="/menu"
              className="hidden bg-white px-6 py-2.5 text-sm text-black transition-colors hover:bg-orange sm:inline-flex"
            >
              ORDER NOW
            </MagneticButton>
            <button
              className="md:hidden p-2 text-white"
              onClick={() => setMobileOpen(true)}
              aria-label="Open menu"
            >
              <MenuIcon size={26} />
            </button>
          </div>
        </nav>
      </motion.header>

      {/* Full-screen mobile navigation */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)" }}
            exit={{ clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 z-[90] bg-navy flex flex-col"
          >
            <div className="flex items-center justify-between px-5 h-[72px]">
              <span className="headline text-white text-lg">BROTHERS FOOD</span>
              <button
                onClick={() => setMobileOpen(false)}
                aria-label="Close menu"
                className="p-2 text-white"
              >
                <X size={28} />
              </button>
            </div>
            <nav className="flex-1 flex flex-col items-start justify-center px-8 gap-2">
              {[...NAV_LINKS, { label: "ORDER", href: "/menu" }].map((l, i) => (
                <div key={l.href + l.label} className="overflow-hidden">
                  <motion.div
                    initial={{ y: "110%" }}
                    animate={{ y: 0 }}
                    exit={{ y: "110%" }}
                    transition={{ delay: 0.15 + i * 0.07, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <Link
                      href={l.href}
                      className="headline text-white text-[clamp(2.5rem,12vw,5rem)] hover:text-orange transition-colors leading-none"
                    >
                      {l.label}
                    </Link>
                  </motion.div>
                </div>
              ))}
            </nav>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="px-8 pb-10 text-white/50 text-sm tracking-wide"
            >
              GOOD FOOD. GOOD MOOD. BROTHERS.
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
