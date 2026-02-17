import AnimatedBackground from '@/components/AnimatedBackground';
import Navigation from '@/components/Navigation';
import HeroSection from '@/components/HeroSection';
import EngineeringJourney from '@/components/EngineeringJourney';
import ProjectsSection from '@/components/ProjectsSection';
import ExpertiseSection from '@/components/ExpertiseSection';
import ExperienceTimeline from '@/components/ExperienceTimeline';
import EducationSection from '@/components/EducationSection';
import ContactSection from '@/components/ContactSection';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <div className="relative min-h-screen">
      <AnimatedBackground />
      <Navigation />
      <main>
        <HeroSection />
        <EngineeringJourney />
        <ProjectsSection />
        <ExpertiseSection />
        <ExperienceTimeline />
        <EducationSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;