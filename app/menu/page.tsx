import MenuHero from "@/components/menu/menu-hero";
import MenuSection from "@/components/menu/menu-section";
import FeaturedProduct from "@/components/menu/featured-product";

export default function MenuPage() {
  return (
    <>
      <MenuHero />
      <MenuSection cinematic />
      <FeaturedProduct />
    </>
  );
}
