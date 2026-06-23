import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProjects } from "../../features/projects/projectsSlice";
import Gallery from "./Gallery";

const ProjectsPreview = () => {
  const dispatch = useDispatch();
  const { projects, loading, error } = useSelector(
    (state) => state.projects
  );

  useEffect(() => {
    dispatch(fetchProjects());
  }, [dispatch]);

  return (
    <section id="projects" className="py-20 bg-slate-50 transition-colors duration-300 dark:bg-slate-950">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-12 text-center">
          <p className="text-sm uppercase tracking-[0.35em] text-sky-500">
            Projects
          </p>
          <h2 className="mt-4 text-4xl font-bold text-slate-950 dark:text-white md:text-5xl">
            Selected work with modern stacks
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-slate-600 dark:text-slate-300">
            Showcasing technologies used, GitHub source links, live demos, and optional visuals for each project.
          </p>
        </div>

        {loading && (
          <p className="text-center text-slate-500 dark:text-slate-300">Loading projects...</p>
        )}
        {error && (
          <p className="text-center text-red-500">Failed to load projects from API — showing local data.</p>
        )}

        <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {(projects || []).map((p, i) => (
            <article
              key={i}
              className="group overflow-hidden rounded-[2rem] border border-slate-200/80 bg-white shadow-glow transition duration-300 hover:-translate-y-1 hover:shadow-xl dark:border-slate-700 dark:bg-slate-900"
            >
              {p.image ? (
                <img
                  src={p.image}
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
                  {p.technologies.map((tech) => (
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
                      rel="noreferrer"
                      className="inline-flex items-center rounded-full bg-sky-500 px-4 py-2 text-sm font-medium text-white transition hover:bg-sky-600"
                    >
                      Live demo
                    </a>
                  ) : null}
                </div>
              </div>
            </article>
          ))}
        </div>

        <Gallery projects={projects} />
      </div>
    </section>
  );
};

export default ProjectsPreview;