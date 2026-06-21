const skills = ["React", "Node.js", "MongoDB", "Express", "TensorFlow"];

const SkillsPreview = () => {
  return (
    <section id="skills" className="py-20">
      <h2 className="mb-10 text-center text-3xl font-bold">Skills</h2>

      <div className="flex flex-wrap justify-center gap-4 px-6">
        {skills.map((skill, i) => (
          <span
            key={i}
            className="rounded-full bg-blue-600/20 px-4 py-2 text-blue-400"
          >
            {skill}
          </span>
        ))}
      </div>
    </section>
  );
};

export default SkillsPreview;