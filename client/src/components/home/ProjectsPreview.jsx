import { ExternalLink, X } from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProjects } from "../../features/projects/projectsSlice";
import Gallery from "./Gallery";

const ProjectsPreview = () => {
  const dispatch = useDispatch();
  const { projects, loading, error } = useSelector((state) => state.projects);
  const [showAllProjects, setShowAllProjects] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const BASE_URL = import.meta.env.VITE_NODE_URL;

  useEffect(() => {
    dispatch(fetchProjects());
  }, [dispatch]);

  useEffect(() => {
    if (!selectedProject) return undefined;

    const handleKeyDown = (event) => {
      if (event.key === "Escape") setSelectedProject(null);
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedProject]);

  const visibleProjects = Array.isArray(projects)
    ? showAllProjects
      ? projects
      : projects.slice(0, 3)
    : [];

  const getProjectImage = (project) => (
    project.image?.startsWith("http")
      ? project.image
      : `${BASE_URL}/uploads/${project.image}`
  );

  return (
    <section id="projects" className="py-20 bg-slate-50 transition-colors duration-300 dark:bg-slate-950">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-12 flex flex-col gap-4 text-center sm:flex-row sm:items-end sm:justify-between sm:text-left">
          <div>
            <p className="text-sm uppercase tracking-[0.35em] text-sky-500">
              Projects
            </p>
            <h2 className="mt-4 text-4xl font-bold text-slate-950 dark:text-white md:text-5xl">
              Selected work with modern stacks
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-slate-600 dark:text-slate-300 sm:mx-0">
              Showcasing technologies used, GitHub source links, live demos, and optional visuals for each project.
            </p>
          </div>
          <div className="rounded-full border border-sky-200 bg-sky-50 px-4 py-2 text-sm font-medium text-sky-700 dark:border-sky-500/30 dark:bg-sky-500/10 dark:text-sky-300">
            {projects?.length || 0} project entries
          </div>
        </div>

        {loading && (
          <p className="text-center text-slate-500 dark:text-slate-300">Loading projects...</p>
        )}
        {error && (
          <p className="text-center text-red-500">Failed to load projects from API — showing local data.</p>
        )}

        <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {visibleProjects.map((p, i) => (
            <article
              key={i}
              style={{ "--reveal-delay": `${i * 90}ms` }}
              className="reveal-up interactive-lift group overflow-hidden rounded-[2rem] border border-slate-200/80 bg-white dark:border-slate-700 dark:bg-slate-900"
            >
              {p.image ? (
                <img
                  src={
                    p.image.startsWith("http")
                      ? p.image
                      : `${BASE_URL}/uploads/${p.image}`
                  }
                  alt={p.title}
                  className="h-52 w-full object-cover"
                />
              ) : (
                <div className="flex h-52 items-center justify-center bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-300">
                  No image available
                </div>
              )}

              <div className="p-6">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <h3 className="text-2xl font-semibold text-slate-950 dark:text-white">
                    {p.title}
                  </h3>
                  {p.featured && (
                    <span className="rounded-full bg-sky-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-sky-500 dark:text-cyan-300">
                      Featured
                    </span>
                  )}
                </div>

                <p className="mt-4 leading-7 text-slate-600 dark:text-slate-300">
                  {p.description}
                </p>

                <div className="mt-5 flex flex-wrap gap-2">
                  {(Array.isArray(p.technologies) ? p.technologies : []).map((tech) => (
                    <span
                      key={tech}
                      className="rounded-full bg-slate-100 px-3 py-1 text-sm text-slate-700 dark:bg-slate-800 dark:text-slate-200"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="mt-6 flex flex-wrap gap-3">
                  {p.github ? (
                    <a
                      href={p.github}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-sm font-medium text-slate-900 transition hover:border-slate-300 hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100 dark:hover:bg-slate-700"
                    >
                      GitHub
                    </a>
                  ) : null}
                  {p.live ? (
                    <a
                      href={p.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center rounded-full bg-sky-500 px-4 py-2 text-sm font-medium text-white transition hover:bg-sky-600"
                    >
                      Live demo
                    </a>
                  ) : null}
                  <button
                    type="button"
                    onClick={() => setSelectedProject(p)}
                    className="inline-flex items-center rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-900 transition hover:border-sky-400 hover:text-sky-600 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:hover:text-sky-300"
                  >
                    View details
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>

        {Array.isArray(projects) && projects.length > 3 ? (
          <div className="mt-8 text-center">
            <button
              type="button"
              onClick={() => setShowAllProjects((value) => !value)}
              className="rounded-full border border-slate-300 bg-white px-5 py-2.5 text-sm font-semibold text-slate-700 transition hover:border-sky-400 hover:text-sky-600 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200"
            >
              {showAllProjects ? "Show less" : "Show all projects"}
            </button>
          </div>
        ) : null}

        <Gallery projects={projects} />
      </div>

      {selectedProject ? (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 p-4 backdrop-blur-sm"
          role="presentation"
          onClick={() => setSelectedProject(null)}
        >
          <article
            role="dialog"
            aria-modal="true"
            aria-labelledby="project-detail-title"
            onClick={(event) => event.stopPropagation()}
            className="modal-enter max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-3xl border border-slate-200 bg-white shadow-2xl dark:border-slate-700 dark:bg-slate-900"
          >
            <div className="relative">
              {selectedProject.image ? (
                <img
                  src={getProjectImage(selectedProject)}
                  alt={selectedProject.title}
                  className="h-64 w-full object-cover sm:h-80"
                />
              ) : (
                <div className="flex h-64 items-center justify-center bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-300 sm:h-80">
                  No image available
                </div>
              )}
              <button
                type="button"
                onClick={() => setSelectedProject(null)}
                aria-label="Close project details"
                title="Close"
                className="absolute right-4 top-4 inline-flex h-10 w-10 items-center justify-center rounded-full bg-slate-950/70 text-white transition hover:bg-slate-950"
              >
                <X size={20} />
              </button>
            </div>

            <div className="p-6 sm:p-8">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <p className="text-sm uppercase tracking-[0.3em] text-sky-500">Project details</p>
                  <h2 id="project-detail-title" className="mt-2 text-3xl font-bold text-slate-950 dark:text-white">
                    {selectedProject.title}
                  </h2>
                </div>
                {selectedProject.featured ? (
                  <span className="rounded-full bg-sky-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-sky-600 dark:text-cyan-300">
                    Featured
                  </span>
                ) : null}
              </div>

              <p className="mt-6 leading-8 text-slate-600 dark:text-slate-300">{selectedProject.description}</p>

              {(selectedProject.category || selectedProject.role || selectedProject.duration || selectedProject.year || selectedProject.status) ? (
                <div className="mt-6 grid gap-4 border-y border-slate-200 py-5 dark:border-slate-700 sm:grid-cols-2 lg:grid-cols-3">
                  {[
                    ["Category", selectedProject.category],
                    ["Role", selectedProject.role],
                    ["Duration", selectedProject.duration],
                    ["Year", selectedProject.year],
                    ["Status", selectedProject.status],
                  ].filter(([, value]) => value).map(([label, value]) => (
                    <div key={label}>
                      <p className="text-xs font-semibold uppercase tracking-widest text-slate-500 dark:text-slate-400">{label}</p>
                      <p className="mt-1 text-sm font-medium text-slate-900 dark:text-white">{value}</p>
                    </div>
                  ))}
                </div>
              ) : null}

              <div className="mt-6 flex flex-wrap gap-2">
                {(Array.isArray(selectedProject.technologies) ? selectedProject.technologies : []).map((technology) => (
                  <span key={technology} className="rounded-full bg-slate-100 px-3 py-1.5 text-sm text-slate-700 dark:bg-slate-800 dark:text-slate-200">
                    {technology}
                  </span>
                ))}
              </div>

              {Array.isArray(selectedProject.features) && selectedProject.features.length > 0 ? (
                <div className="mt-8">
                  <h3 className="text-lg font-semibold text-slate-950 dark:text-white">Key features</h3>
                  <ul className="mt-3 grid gap-2 text-sm leading-6 text-slate-600 dark:text-slate-300 sm:grid-cols-2">
                    {selectedProject.features.map((feature) => <li key={feature}>• {feature}</li>)}
                  </ul>
                </div>
              ) : null}

              {selectedProject.challenges ? (
                <div className="mt-8">
                  <h3 className="text-lg font-semibold text-slate-950 dark:text-white">Challenges</h3>
                  <p className="mt-2 leading-7 text-slate-600 dark:text-slate-300">{selectedProject.challenges}</p>
                </div>
              ) : null}

              {selectedProject.outcome ? (
                <div className="mt-8">
                  <h3 className="text-lg font-semibold text-slate-950 dark:text-white">Outcome</h3>
                  <p className="mt-2 leading-7 text-slate-600 dark:text-slate-300">{selectedProject.outcome}</p>
                </div>
              ) : null}

              <div className="mt-8 flex flex-wrap gap-3">
                {selectedProject.github ? (
                  <a
                    href={selectedProject.github}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 rounded-full bg-slate-950 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-700 dark:bg-white dark:text-slate-950 dark:hover:bg-slate-200"
                  >
                    GitHub <ExternalLink size={15} />
                  </a>
                ) : null}
                {selectedProject.live ? (
                  <a
                    href={selectedProject.live}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 rounded-full bg-sky-500 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-sky-600"
                  >
                    Live demo <ExternalLink size={15} />
                  </a>
                ) : null}
              </div>
            </div>
          </article>
        </div>
      ) : null}
    </section>
  );
};

export default ProjectsPreview;