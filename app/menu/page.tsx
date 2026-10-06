import Link from "next/link";
import MenuHero from "@/components/menu/menu-hero";
import MenuSection from "@/components/menu/menu-section";
import FeaturedProduct from "@/components/menu/featured-product";
import TastyCrustySection from "@/components/menu/tasty-crusty-section";

export default function MenuPage() {
  return (
    <>
      <MenuHero />
      <FeaturedProduct />
      <MenuSection cinematic />
      <TastyCrustySection />
      <section className="bg-orange px-5 py-16 text-center md:py-20">
        <h2 className="headline text-[clamp(2.6rem,7vw,5rem)] leading-[0.9] text-black">READY WHEN YOU ARE.</h2>
        <Link href="/menu#menu" className="mt-8 inline-flex bg-black px-8 py-4 font-display text-white transition-colors hover:bg-navy">
          ORDER NOW →
        </Link>
      </section>
    </>
  );
}
