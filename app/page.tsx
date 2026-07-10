import BlogSection from "@/components/BlogSection";
import CertificationsSection from "@/components/CertificationsSection";
import ContactForm from "@/components/ContactForm";
import FAQSection from "@/components/FAQSection";
import FloatingPodcast from "@/components/FloatingPodcast";
import Footer from "@/components/Footer";
import HeroAncosur from "@/components/HeroAncosur";
import JoinTeamCTA from "@/components/JoinTeamCTA";
import Navbar from "@/components/Navbar";
import ProjectFilter from "@/components/ProjectFilter";
import PromoLeadPopup from "@/components/PromoLeadPopup";
import PromoPopup from "@/components/PromoPopup";
import RealEstateStats from "@/components/RealEstateStats";
import TrustStatsTestimonials from "@/components/TrustStatsTestimonials";

export default function Home() {
  return (
     <>
       <Navbar />
        <FloatingPodcast />
        {/* <PromoPopup /> */}
        <PromoLeadPopup />

      <main>
        <section className="hero">
            {/* <Hero /> */}
            <HeroAncosur />
            <ProjectFilter />
            <TrustStatsTestimonials />
            {/* <RealEstateStats /> */}
            <CertificationsSection />
            {/* <Testimonial /> */}
            <ContactForm />
            <JoinTeamCTA />
            {/* <BlogSection /> */}
            <FAQSection />
        </section>
      </main>
      <Footer />

    </>
  );
}
