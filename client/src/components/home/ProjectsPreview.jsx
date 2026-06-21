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
    <section className="py-20 bg-gray-900">
      <h2 className="text-center text-3xl font-bold mb-10">
        Featured Projects
      </h2>

      <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-6 px-6">

        {projects.map((p, i) => (
          <div
            key={i}
            className="bg-gray-800 p-6 rounded-xl hover:scale-105 transition"
          >
            <h3 className="text-xl font-semibold text-blue-400">
              {p.title}
            </h3>
            <p className="text-gray-400 mt-2">
              {p.desc}
            </p>
          </div>
        ))}

      </div>
    </section>
  );
};

export default ProjectsPreview;