import Hero from "@/components/home/Hero";
import TrustBar from "@/components/home/TrustBar";
import Categories from "@/components/home/Categories";
import Brands from "@/components/home/Brands";
import Gallery from "@/components/home/Gallery";
import Testimonials from "@/components/home/Testimonials";
import WhyUs from "@/components/home/WhyUs";
import HowItWorks from "@/components/home/HowItWorks";
import Faq from "@/components/home/Faq";
import SupportPricing from "@/components/home/SupportPricing";
import FinalCta from "@/components/home/FinalCta";

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
