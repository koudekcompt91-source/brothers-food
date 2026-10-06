import Hero from "@/components/hero/hero";
import Marquee from "@/components/marquee/marquee";
import MenuSection from "@/components/menu/menu-section";
import FeaturedProduct from "@/components/menu/featured-product";
import Offers from "@/components/offers/offers";
import BrandStatement from "@/components/typography/brand-statement";
import AboutSection from "@/components/about/about-section";
import StoryScroll from "@/components/story/story-scroll";
import Testimonials from "@/components/testimonials/testimonials";
import InstagramSection from "@/components/social/instagram-section";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Marquee />
      <MenuSection limit={8} />
      <FeaturedProduct />
      <Offers />
      <BrandStatement />
      <AboutSection />
      <StoryScroll />
      <Testimonials />
      <InstagramSection />
    </>
  );
}
