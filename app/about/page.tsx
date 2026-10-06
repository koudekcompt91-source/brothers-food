import PageHeading from "@/components/page-heading";
import AboutSection from "@/components/about/about-section";
import StoryScroll from "@/components/story/story-scroll";
import BrandStatement from "@/components/typography/brand-statement";

export default function AboutPage() {
  return (
    <>
      <PageHeading eyebrow="THE BROTHERS STORY" title="MORE THAN FOOD">
        <p className="mt-6 max-w-xl text-black/75 text-lg">A bold fast-food identity built around good food, good mood, and the people behind it.</p>
      </PageHeading>
      <AboutSection />
      <BrandStatement />
      <StoryScroll />
    </>
  );
}
