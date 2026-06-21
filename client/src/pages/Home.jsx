import Hero from "../components/home/Hero";
import Stats from "../components/home/Stats";
import SkillsPreview from "../components/home/SkillsPreview";
import ProjectsPreview from "../components/home/ProjectsPreview";
import CTA from "../components/home/CTA";

const Home = () => {
  return (
    <>
      <Hero />
      <Stats />
      <SkillsPreview />
      <ProjectsPreview />
      <CTA />
    </>
  );
};

export default Home;