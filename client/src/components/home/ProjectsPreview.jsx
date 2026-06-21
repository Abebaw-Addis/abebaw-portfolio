const projects = [
  {
    title: "AI IDS System",
    desc: "Detects cyber attacks using ML models"
  },
  {
    title: "School Management System",
    desc: "Face recognition + authentication system"
  },
  {
    title: "Portfolio Builder",
    desc: "Dynamic portfolio CMS"
  },
  {
    title: "Agricultural Inputs Distribution and Management System",
    desc: "Full-stack web app for managing agricultural inputs distribution and inventory"
  },
  {
    title: "To-Do List App",
    desc: "A simple and elegant to-do list application using Android Studio and Java"
  }
];

const ProjectsPreview = () => {
  return (
    <section id="projects" className="bg-gray-900 py-20">
      <h2 className="mb-10 text-center text-3xl font-bold">Featured Projects</h2>

      <div className="mx-auto grid max-w-6xl gap-6 px-6 md:grid-cols-3">
        {projects.map((p, i) => (
          <div
            key={i}
            className="rounded-xl bg-gray-800 p-6 transition hover:scale-105"
          >
            <h3 className="text-xl font-semibold text-blue-400">{p.title}</h3>
            <p className="mt-2 text-gray-400">{p.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ProjectsPreview;