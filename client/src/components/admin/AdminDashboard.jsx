import { useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addGalleryItem, removeGalleryItem } from "../../features/gallery/gallerySlice";
import { addProject, deleteProject, updateProject } from "../../features/projects/projectsSlice";
import { addSkill, deleteSkill, updateSkill } from "../../features/skills/skillsSlice";
import { uploadImageAPI } from "../../features/upload/uploadService";
import FileDropzone from "./FileDropzone";

const skillCategories = ["Frontend", "Backend", "Database", "AI/ML", "Cybersecurity", "DevOps", "Language", "Other"];
const skillIconOptions = ["React", "Node.js", "MongoDB", "AWS", "Python", "JavaScript", "Tailwind", "TypeScript", "Design", "Other"];

const iconButtonClass = "inline-flex items-center justify-center rounded-full border border-slate-200 bg-white p-2 text-slate-600 shadow-sm transition hover:border-sky-300 hover:text-sky-600 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 dark:hover:border-sky-500 dark:hover:text-sky-300";

const emptySkillForm = {
  name: "",
  category: "Frontend",
  level: "80",
  icon: "",
};

const emptyProjectForm = {
  title: "",
  description: "",
  technologies: "",
  github: "",
  live: "",
  image: "",
  featured: false,
};

const emptyGalleryForm = {
  title: "",
  description: "",
  technologies: "",
  src: "",
};

const AdminDashboard = ({ deviceEmail, onLogout }) => {
  const dispatch = useDispatch();
  const skills = useSelector((state) => state.skills.skills);
  const projects = useSelector((state) => state.projects.projects);
  const galleryItems = useSelector((state) => state.gallery.galleryItems);

  const [skillForm, setSkillForm] = useState(emptySkillForm);
  const [editingSkillId, setEditingSkillId] = useState(null);
  const [projectForm, setProjectForm] = useState(emptyProjectForm);
  const [projectImagePreview, setProjectImagePreview] = useState("");
  const [editingProjectId, setEditingProjectId] = useState(null);
  const [galleryForm, setGalleryForm] = useState(emptyGalleryForm);
  const [galleryImagePreview, setGalleryImagePreview] = useState("");
  const [skillIconPreview, setSkillIconPreview] = useState("");
  const [uploading, setUploading] = useState(false);
  const [feedback, setFeedback] = useState("");

  const normalizedSkills = useMemo(() => skills || [], [skills]);
  const normalizedProjects = useMemo(() => projects || [], [projects]);
  const normalizedGalleryItems = useMemo(() => galleryItems || [], [galleryItems]);

  const resetSkillForm = () => {
    setSkillForm(emptySkillForm);
    setSkillIconPreview("");
    setEditingSkillId(null);
  };

  const resetProjectForm = () => {
    setProjectForm(emptyProjectForm);
    setProjectImagePreview("");
    setEditingProjectId(null);
  };

  const resetGalleryForm = () => {
    setGalleryForm(emptyGalleryForm);
    setGalleryImagePreview("");
  };

  const handleSkillSubmit = (event) => {
    event.preventDefault();
    if (!skillForm.name.trim()) {
      setFeedback("Please provide a skill name.");
      return;
    }

    const payload = {
      ...skillForm,
      name: skillForm.name.trim(),
      category: skillForm.category || "Other",
      level: Math.min(
        100,
        Math.max(0, Number(skillForm.level))
      ),
      icon: skillForm.icon || "",
    };
    console.log({ payload });
    if (editingSkillId) {
      dispatch(updateSkill({ id: editingSkillId, updates: payload }));
      setFeedback("Skill updated.");
    } else {
      dispatch(addSkill(payload));
      setFeedback("Skill added.");
    }

    resetSkillForm();
  };

  const handleProjectSubmit = (event) => {
    event.preventDefault();
    if (!projectForm.title.trim()) {
      setFeedback("Please provide a project title.");
      return;
    }

    const payload = {
      ...projectForm,
      title: projectForm.title.trim().replace(/\s+/g, " "),
      description: projectForm.description.trim(),
      technologies: projectForm.technologies
        .split(",")
        .map((item) => item.trim())
        .filter(Boolean),
      github: projectForm.github.trim(),
      live: projectForm.live.trim(),
      image: projectForm.image.trim(),
      featured: Boolean(projectForm.featured),
    };

    if (editingProjectId) {
      dispatch(updateProject({ id: editingProjectId, updates: payload }));
      setFeedback("Project updated.");
    } else {
      dispatch(addProject(payload));
      setFeedback("Project added.");
    }

    resetProjectForm();
  };

  const handleGallerySubmit = (event) => {
    event.preventDefault();
    if (!galleryForm.title.trim()) {
      setFeedback("Please provide a gallery title.");
      return;
    }

    dispatch(
      addGalleryItem({
        ...galleryForm,
        title: galleryForm.title.trim(),
        description: galleryForm.description.trim(),
        technologies: galleryForm.technologies
          .split(",")
          .map((item) => item.trim())
          .filter(Boolean),
        src: galleryForm.src.trim(),
      })
    );
    setFeedback("Gallery item added.");
    resetGalleryForm();
  };

  const startEditingSkill = (skill) => {
    setSkillForm({
      name: skill.name || "",
      category: skill.category || "Frontend",
      level: String(skill.level || 0),
      icon: skill.icon || "",
    });
    setSkillIconPreview(skill.icon?.startsWith("http") ? skill.icon : "");
    setEditingSkillId(skill.id);
    setFeedback("Editing skill.");
  };

  const startEditingProject = (project) => {
    setProjectForm({
      title: project.title || "",
      description: project.description || "",
      technologies: Array.isArray(project.technologies) ? project.technologies.join(", ") : "",
      github: project.github || "",
      live: project.live || "",
      image: project.image || "",
      featured: Boolean(project.featured),
    });
    setEditingProjectId(project.id);
    setFeedback("Editing project.");
  };

  const handleSkillDelete = (skill) => {
    if (window.confirm(`Delete ${skill.name || "this skill"}?`)) {
      dispatch(deleteSkill(skill.id));
      setFeedback("Skill removed.");
    }
  };

  const uploadFile = async (file) => {
    try {
      setUploading(true);
      const result = await uploadImageAPI(file);
      setUploading(false);
      return result.url;
    } catch (error) {
      setUploading(false);
      setFeedback(error.message || "Image upload failed.");
      return "";
    }
  };

  const handleProjectImageSelect = async (file) => {
    const previewUrl = URL.createObjectURL(file);
    setProjectImagePreview(previewUrl);
    const imageUrl = await uploadFile(file);
    if (imageUrl) {
      setProjectForm((current) => ({ ...current, image: imageUrl }));
      setFeedback("Project image uploaded.");
    }
  };

  const handleGalleryImageSelect = async (file) => {
    const previewUrl = URL.createObjectURL(file);
    setGalleryImagePreview(previewUrl);
    const imageUrl = await uploadFile(file);
    if (imageUrl) {
      setGalleryForm((current) => ({ ...current, src: imageUrl }));
      setFeedback("Gallery image uploaded.");
    }
  };

  const handleSkillIconSelect = async (file) => {
    const previewUrl = URL.createObjectURL(file);
    setSkillIconPreview(previewUrl);
    const imageUrl = await uploadFile(file);
    if (imageUrl) {
      setSkillForm((current) => ({ ...current, icon: imageUrl }));
      setFeedback("Skill icon uploaded.");
    }
  };

  const handleProjectDelete = (project) => {
    if (window.confirm(`Delete ${project.title || "this project"}?`)) {
      dispatch(deleteProject(project.id));
      setFeedback("Project removed.");
    }
  };

  const handleGalleryDelete = (item) => {
    if (window.confirm(`Delete ${item.title || "this gallery item"}?`)) {
      dispatch(removeGalleryItem(item.id));
      setFeedback("Gallery item removed.");
    }
  };

  return (
    <section className="mx-auto max-w-7xl px-6 py-24">
      <div className="mb-8 flex flex-col gap-4 rounded-[2rem] border border-slate-200 bg-white p-6 shadow-xl dark:border-slate-700 dark:bg-slate-900 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-sm uppercase tracking-[0.35em] text-sky-500">Admin dashboard</p>
          <h2 className="mt-2 text-3xl font-semibold text-slate-950 dark:text-white">Manage your portfolio content</h2>
          <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">Signed in as {deviceEmail || "admin device"}.</p>
        </div>
        <button
          type="button"
          onClick={onLogout}
          className="rounded-full border border-slate-200 bg-slate-100 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-200 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
        >
          Logout
        </button>
      </div>

      {feedback ? (
        <div className="mb-6 rounded-2xl border border-sky-200 bg-sky-50 px-4 py-3 text-sm text-sky-700 dark:border-sky-500/40 dark:bg-sky-500/10 dark:text-sky-300">
          {feedback}
        </div>
      ) : null}

      <div className="grid gap-8 lg:grid-cols-2">
        <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-lg dark:border-slate-700 dark:bg-slate-900">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <h3 className="text-xl font-semibold text-slate-950 dark:text-white">Skills</h3>
              <p className="text-sm text-slate-600 dark:text-slate-300">Add, edit, or remove skill entries.</p>
            </div>
          </div>

          <form onSubmit={handleSkillSubmit} className="space-y-3">
            <input
              value={skillForm.name}
              onChange={(event) => setSkillForm((current) => ({ ...current, name: event.target.value }))}
              placeholder="Skill name"
              className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm dark:border-slate-700 dark:bg-slate-800"
            />
            <select
              value={skillForm.category}
              onChange={(event) => setSkillForm((current) => ({ ...current, category: event.target.value }))}
              className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm dark:border-slate-700 dark:bg-slate-800"
            >
              {skillCategories.map((category) => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
            <input
              type="number"
              min="0"
              max="100"
              value={skillForm.level}
              onChange={(event) => setSkillForm((current) => ({ ...current, level: event.target.value }))}
              placeholder="Level"
              className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm dark:border-slate-700 dark:bg-slate-800"
            />
            <select
              value={skillForm.icon}
              onChange={(event) => setSkillForm((current) => ({ ...current, icon: event.target.value }))}
              className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm dark:border-slate-700 dark:bg-slate-800"
            >
              <option value="">Select an icon label (optional)</option>
              {skillIconOptions.map((option) => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>
            <FileDropzone
              label="Skill icon (optional custom image)"
              value={skillForm.icon}
              previewUrl={skillIconPreview}
              onFileChange={handleSkillIconSelect}
              helperText={uploading ? "Uploading icon..." : "Drop a file or click to choose an icon image."}
            />
            <div className="flex gap-3">
              <button type="submit" className="rounded-full bg-sky-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-sky-600">
                {editingSkillId ? "Update skill" : "Add skill"}
              </button>
              <button type="button" onClick={resetSkillForm} className="rounded-full border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 dark:border-slate-700 dark:text-slate-100">
                Clear
              </button>
            </div>
          </form>

          <div className="mt-6 space-y-3">
            {normalizedSkills.map((skill, idx) => (
              <div key={idx} className="flex items-center justify-between rounded-2xl border border-slate-200 px-4 py-3 dark:border-slate-700">
                <div>
                  <p className="font-semibold text-slate-900 dark:text-white">{skill.name}</p>
                  <p className="text-sm text-slate-500 dark:text-slate-400">{skill.category} · {skill.level}%</p>
                </div>
                <div className="flex gap-2">
                  <button type="button" onClick={() => startEditingSkill(skill)} className={iconButtonClass} aria-label={`Edit ${skill.name}`} title="Edit skill">
                    ✎
                  </button>
                  <button type="button" onClick={() => handleSkillDelete(skill)} className={`${iconButtonClass} text-red-600 hover:text-red-600 dark:text-red-300`} aria-label={`Delete ${skill.name}`} title="Delete skill">
                    🗑
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-lg dark:border-slate-700 dark:bg-slate-900">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <h3 className="text-xl font-semibold text-slate-950 dark:text-white">Projects</h3>
              <p className="text-sm text-slate-600 dark:text-slate-300">Add, edit, or remove project entries.</p>
            </div>
          </div>

          <form onSubmit={handleProjectSubmit} className="space-y-3">
            <input
              value={projectForm.title}
              onChange={(event) => setProjectForm((current) => ({ ...current, title: event.target.value }))}
              placeholder="Project title"
              className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm dark:border-slate-700 dark:bg-slate-800"
            />
            <textarea
              value={projectForm.description}
              onChange={(event) => setProjectForm((current) => ({ ...current, description: event.target.value }))}
              placeholder="Project description"
              className="min-h-24 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm dark:border-slate-700 dark:bg-slate-800"
            />
            <input
              value={projectForm.technologies}
              onChange={(event) => setProjectForm((current) => ({ ...current, technologies: event.target.value }))}
              placeholder="Technologies (comma separated)"
              className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm dark:border-slate-700 dark:bg-slate-800"
            />
            <div className="grid gap-3 md:grid-cols-2">
              <input
                value={projectForm.github}
                onChange={(event) => setProjectForm((current) => ({ ...current, github: event.target.value }))}
                placeholder="GitHub URL"
                className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm dark:border-slate-700 dark:bg-slate-800"
              />
              <input
                value={projectForm.live}
                onChange={(event) => setProjectForm((current) => ({ ...current, live: event.target.value }))}
                placeholder="Live URL"
                className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm dark:border-slate-700 dark:bg-slate-800"
              />
            </div>
            <FileDropzone
              label="Project image"
              value={projectForm.image}
              previewUrl={projectImagePreview || projectForm.image}
              onFileChange={handleProjectImageSelect}
              helperText={uploading ? "Uploading project image..." : "Drop image file or click to choose."}
            />
            <label className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300">
              <input
                type="checkbox"
                checked={projectForm.featured}
                onChange={(event) => setProjectForm((current) => ({ ...current, featured: event.target.checked }))}
              />
              Featured project
            </label>
            <div className="flex gap-3">
              <button type="submit" className="rounded-full bg-sky-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-sky-600">
                {editingProjectId ? "Update project" : "Add project"}
              </button>
              <button type="button" onClick={resetProjectForm} className="rounded-full border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 dark:border-slate-700 dark:text-slate-100">
                Clear
              </button>
            </div>
          </form>

          <div className="mt-6 space-y-3">
            {normalizedProjects.map((project, idx) => (
              <div key={idx} className="flex items-center justify-between rounded-2xl border border-slate-200 px-4 py-3 dark:border-slate-700">
                <div>
                  <p className="font-semibold text-slate-900 dark:text-white">{project.title}</p>
                  <p className="text-sm text-slate-500 dark:text-slate-400">{project.description}</p>
                </div>
                <div className="flex gap-2">
                  <button type="button" onClick={() => startEditingProject(project)} className={iconButtonClass} aria-label={`Edit ${project.title}`} title="Edit project">
                    ✎
                  </button>
                  <button type="button" onClick={() => handleProjectDelete(project)} className={`${iconButtonClass} text-red-600 hover:text-red-600 dark:text-red-300`} aria-label={`Delete ${project.title}`} title="Delete project">
                    🗑
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-8 rounded-[2rem] border border-slate-200 bg-white p-6 shadow-lg dark:border-slate-700 dark:bg-slate-900">
        <div className="mb-4">
          <h3 className="text-xl font-semibold text-slate-950 dark:text-white">Gallery</h3>
          <p className="text-sm text-slate-600 dark:text-slate-300">Add or remove gallery entries.</p>
        </div>

        <form onSubmit={handleGallerySubmit} className="space-y-3">
          <input
            value={galleryForm.title}
            onChange={(event) => setGalleryForm((current) => ({ ...current, title: event.target.value }))}
            placeholder="Gallery title"
            className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm dark:border-slate-700 dark:bg-slate-800"
          />
          <textarea
            value={galleryForm.description}
            onChange={(event) => setGalleryForm((current) => ({ ...current, description: event.target.value }))}
            placeholder="Gallery description"
            className="min-h-24 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm dark:border-slate-700 dark:bg-slate-800"
          />
          <input
            value={galleryForm.technologies}
            onChange={(event) => setGalleryForm((current) => ({ ...current, technologies: event.target.value }))}
            placeholder="Technologies (comma separated)"
            className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm dark:border-slate-700 dark:bg-slate-800"
          />
          <FileDropzone
            label="Gallery image"
            value={galleryForm.src}
            previewUrl={galleryImagePreview || galleryForm.src}
            onFileChange={handleGalleryImageSelect}
            helperText={uploading ? "Uploading gallery image..." : "Drop image file or click to choose."}
          />
          <div className="flex gap-3">
            <button type="submit" className="rounded-full bg-sky-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-sky-600">
              Add gallery item
            </button>
            <button type="button" onClick={resetGalleryForm} className="rounded-full border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 dark:border-slate-700 dark:text-slate-100">
              Clear
            </button>
          </div>
        </form>

        <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {normalizedGalleryItems.map((item) => (
            <div key={item.id} className="overflow-hidden rounded-3xl border border-slate-200 dark:border-slate-700">
              <img src={item.src || "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=800&q=80"} alt={item.title} className="h-40 w-full object-cover" />
              <div className="p-4">
                <div className="flex items-center justify-between gap-2">
                  <p className="font-semibold text-slate-900 dark:text-white">{item.title}</p>
                  <button type="button" onClick={() => handleGalleryDelete(item)} className="rounded-full bg-red-100 px-3 py-2 text-sm text-red-700 dark:bg-red-500/10 dark:text-red-200">Delete</button>
                </div>
                <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AdminDashboard;
