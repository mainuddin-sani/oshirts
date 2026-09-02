import Hero from "@/components/home/Hero/Hero";
import TrustBar from "@/components/home/TrustBar/TrustBar";
import Categories from "@/components/home/Categories/Categories";
import Brands from "@/components/home/Brands/Brands";
import Gallery from "@/components/home/Gallery/Gallery";
import Testimonials from "@/components/home/Testimonials/Testimonials";
import WhyUs from "@/components/home/WhyUs/WhyUs";
import HowItWorks from "@/components/home/HowItWorks/HowItWorks";
import Faq from "@/components/home/Faq/Faq";
import SupportPricing from "@/components/home/SupportPricing/SupportPricing";
import FinalCta from "@/components/home/FinalCta/FinalCta";

export default function HomePage() {
  return (
    <>
      <Hero />
      <TrustBar />
      <Categories />
      <Brands />
      <Gallery />
      <Testimonials />
      <WhyUs />
      <HowItWorks />
      <Faq />
      <SupportPricing />
      <FinalCta />
    </>
  );
}
