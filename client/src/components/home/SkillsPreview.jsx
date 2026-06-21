const skills = ["React", "Node.js", "MongoDB", "Express", "TensorFlow"];

const SkillsPreview = () => {
  return (
    <section className="py-20">
      <h2 className="text-center text-3xl font-bold mb-10">
        Skills
      </h2>

      <div className="flex flex-wrap justify-center gap-4">
        {skills.map((skill, i) => (
          <span
            key={i}
            className="bg-blue-600/20 text-blue-400 px-4 py-2 rounded-full"
          >
            {skill}
          </span>
        ))}
      </div>
    </section>
  );
};

export default SkillsPreview;