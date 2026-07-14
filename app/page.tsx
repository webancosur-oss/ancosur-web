import CertificationsSection from "@/components/CertificationsSection";
import ContactForm from "@/components/ContactForm";
import FAQSection from "@/components/FAQSection";
import FloatingActions from "@/components/FloatingActions";
import Footer from "@/components/Footer";
import HeroAncosur from "@/components/hero/HeroAncosur";
import HomeTypologies from "@/app/neo-rivera/components/Typologies";
import JoinTeamCTA from "@/components/JoinTeamCTA";
import Navbar from "@/components/Navbar";
import ProjectFilter from "@/components/ProjectFilter";
import PromoLeadPopup from "@/components/PromoLeadPopup";
import TrustStatsTestimonials from "@/components/TrustStatsTestimonials";
import HoldingSection from "@/components/HoldingSection";

export default function Home() {
  return (
     <>
       <Navbar />
        {/* <PromoPopup /> */}
        <PromoLeadPopup />
          <FloatingActions />

      <main>
        <section className="hero">
            {/* <Hero /> */}
            <HeroAncosur />
            <ProjectFilter />
            <TrustStatsTestimonials />
            {/* <RealEstateStats /> */}
            <CertificationsSection />
            <HoldingSection />
            {/* <HomeTypologies /> */}
            <ContactForm />
            {/* <JoinTeamCTA /> */}
            {/* <BlogSection /> */}
            <FAQSection />
        </section>
      </main>

    </>
  );
}
