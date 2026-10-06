import Hero from "@/components/hero/hero";
import Marquee from "@/components/marquee/marquee";
import Favorites from "@/components/menu/favorites";
import TastyCrustySection from "@/components/menu/tasty-crusty-section";
import BrandStatement from "@/components/typography/brand-statement";
import AboutSection from "@/components/about/about-section";
import StoryScroll from "@/components/story/story-scroll";
import Testimonials from "@/components/testimonials/testimonials";
import InstagramSection from "@/components/social/instagram-section";
import { HERO_BURGER_PATH, readPublicImage } from "@/lib/public-asset";

export default function HomePage() {
  const burgerImage = readPublicImage(HERO_BURGER_PATH);

  return (
    <>
      <Hero burgerImage={burgerImage} />
      <Marquee />
      <Favorites />
      <TastyCrustySection />
      <BrandStatement />
      <AboutSection />
      <StoryScroll />
      <Testimonials />
      <InstagramSection />
    </>
  );
}
