import CTA from "../components/home/CTA";
import Footer from "../components/home/Footer";
import Hero from "../components/home/Hero";
import ProjectsPreview from "../components/home/ProjectsPreview";
import SkillsPreview from "../components/home/SkillsPreview";
import Stats from "../components/home/Stats";
import Testimonials from "../components/home/Testimonials";

const Home = () => {
  return (
    <>
      <Hero />
      <Stats />
      <SkillsPreview />
      <ProjectsPreview />
      <Testimonials />
      <CTA />
      <Footer />
    </>
  );
};

export default Home;