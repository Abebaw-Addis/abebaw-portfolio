import { useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addGalleryItem, deleteGalleryItem, updateGalleryItem } from "../../features/gallery/gallerySlice";
import { createProfile, deleteProfile, updateProfile } from "../../features/profile/profileSlice";
import { addProject, deleteProject, updateProject } from "../../features/projects/projectsSlice";
import { addSkill, deleteSkill, updateSkill } from "../../features/skills/skillsSlice";
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
  category: "Other",
  role: "",
  duration: "",
  year: "",
  status: "Completed",
  technologies: "",
  features: "",
  challenges: "",
  outcome: "",
  github: "",
  live: "",
  image: "",
  featured: false,
};

const emptyGalleryForm = {
  title: "",
  description: "",
  image: "",
};

const emptyProfileForm = {
  key: "",
  value: "",
};

const AdminDashboard = ({ deviceEmail, onLogout }) => {
  const dispatch = useDispatch();
  const skills = useSelector((state) => state.skills.skills);
  const projects = useSelector((state) => state.projects.projects);
  const galleryItems = useSelector((state) => state.gallery.galleryItems);
  const profiles = useSelector((state) => state.profile.profiles || []);

  const [skillForm, setSkillForm] = useState(emptySkillForm);
  const [editingSkillId, setEditingSkillId] = useState(null);
  const [projectForm, setProjectForm] = useState(emptyProjectForm);
  const [projectImagePreview, setProjectImagePreview] = useState("");
  const [editingProjectId, setEditingProjectId] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [galleryForm, setGalleryForm] = useState(emptyGalleryForm);
  const [galleryImagePreview, setGalleryImagePreview] = useState("");
  const [editingGalleryId, setEditingGalleryId] = useState(null);
  const [skillIconPreview, setSkillIconPreview] = useState("");
  const [profileForm, setProfileForm] = useState(emptyProfileForm);
  const [profileImageFile, setProfileImageFile] = useState(null);
  const [profileImagePreview, setProfileImagePreview] = useState("");
  const [editingProfileId, setEditingProfileId] = useState(null);
  const [toasts, setToasts] = useState([]);
  const [confirmDialog, setConfirmDialog] = useState({
    open: false,
    title: "",
    message: "",
    onConfirm: null,
  });

  const normalizedSkills = useMemo(() => skills || [], [skills]);
  const normalizedProjects = useMemo(() => projects || [], [projects]);
  const normalizedGalleryItems = useMemo(() => galleryItems || [], [galleryItems]);
  const normalizedProfiles = useMemo(() => profiles || [], [profiles]);

  const showToast = (message, type = "success") => {
    const id = `${Date.now()}-${Math.random().toString(16).slice(2)}`;
    setToasts((current) => [...current, { id, message, type }]);

    window.setTimeout(() => {
      setToasts((current) => current.filter((toast) => toast.id !== id));
    }, 3200);
  };

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
    setEditingGalleryId(null);
  };

  const resetProfileForm = () => {
    setProfileForm(emptyProfileForm);
    setProfileImageFile(null);
    setProfileImagePreview("");
    setEditingProfileId(null);
  };

  const openConfirmDialog = (title, message, onConfirm) => {
    setConfirmDialog({ open: true, title, message, onConfirm });
  };

  const closeConfirmDialog = () => {
    setConfirmDialog({ open: false, title: "", message: "", onConfirm: null });
  };

  const handleConfirmAction = () => {
    if (confirmDialog.onConfirm) {
      confirmDialog.onConfirm();
    }
    closeConfirmDialog();
  };

  const handleSkillSubmit = (event) => {
    event.preventDefault();
    if (!skillForm.name.trim()) {
      showToast("Please provide a skill name.", "error");
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
      showToast("Skill updated.");
    } else {
      dispatch(addSkill(payload));
      showToast("Skill added.");
    }

    resetSkillForm();
  };

  const handleProjectSubmit = (event) => {
    event.preventDefault();
    setUploading(true);
    if (!projectForm.title.trim()) {
      showToast("Please provide a project title.", "error");
      return;
    }
    try {
      const formData = new FormData();

      formData.append("title", projectForm.title.trim());
      formData.append("description", projectForm.description.trim());
      formData.append("category", projectForm.category.trim());
      formData.append("role", projectForm.role.trim());
      formData.append("duration", projectForm.duration.trim());
      formData.append("year", projectForm.year ? Number(projectForm.year) : "");
      formData.append("status", projectForm.status.trim());

      formData.append(
        "technologies",
        JSON.stringify(
          projectForm.technologies
            .split(",")
            .map((item) => item.trim())
            .filter(Boolean)
        )
      );
      formData.append(
        "features",
        JSON.stringify(
          projectForm.features
            .split(",")
            .map((item) => item.trim())
            .filter(Boolean)
        )
      );
      formData.append("challenges", projectForm.challenges.trim());
      formData.append("outcome", projectForm.outcome.trim());

      formData.append("github", projectForm.github.trim());
      formData.append("live", projectForm.live.trim());
      formData.append("featured", projectForm.featured);

      if (projectForm.image) {
        formData.append("image", projectForm.image);
      }

      if (editingProjectId) {
        dispatch(updateProject({ id: editingProjectId, updates: formData }));
      } else {
        dispatch(addProject(formData));
      }
      setUploading(false);
      showToast(editingProjectId ? "Project updated." : "Project added.");
      resetProjectForm();
    } catch (error) {
      console.error("Error submitting project:", error);
      showToast("An error occurred while submitting the project.", "error");
      setUploading(false);
    } finally {
      setProjectImagePreview("");
    }
  };

  const handleGallerySubmit = (event) => {
    event.preventDefault();
    if (!galleryForm.title.trim()) {
      showToast("Please provide a gallery title.", "error");
      return;
    }

    const formData = new FormData();

    formData.append("title", galleryForm.title.trim());
    formData.append("description", galleryForm.description.trim());

    if (galleryForm.src) {
      formData.append("image", galleryForm.src);
    }

    if (editingGalleryId) {
      dispatch(updateGalleryItem({ id: editingGalleryId, updates: formData }));
      showToast("Gallery item updated.");
    } else {
      dispatch(addGalleryItem(formData));
      showToast("Gallery item added.");
    }

    resetGalleryForm();
  };

  const handleProfileSubmit = (event) => {
    event.preventDefault();
    if (!profileForm.key.trim() && !profileImageFile) {
      showToast("Please provide a profile key or upload an image.", "error");
      return;
    }

    const token = localStorage.getItem("token");
    const formData = new FormData();

    if (profileImageFile) {
      formData.append("image", profileImageFile);
    }

    if (profileForm.key.trim()) {
      formData.append("key", profileForm.key.trim());
    }

    if (profileForm.value.trim()) {
      formData.append("value", profileForm.value.trim());
    }

    if (editingProfileId) {
      dispatch(updateProfile({ id: editingProfileId, data: formData, token }));
      showToast("Profile item updated.");
    } else {
      dispatch(createProfile({ data: formData, token }));
      showToast("Profile item added.");
    }

    resetProfileForm();
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
    showToast("Editing skill.");
  };

  const startEditingProject = (project) => {
    setProjectForm({
      title: project.title || "",
      description: project.description || "",
      category: project.category || "Other",
      role: project.role || "",
      duration: project.duration || "",
      year: project.year ? String(project.year) : "",
      status: project.status || "Completed",
      technologies: Array.isArray(project.technologies) ? project.technologies.join(", ") : "",
      features: Array.isArray(project.features) ? project.features.join(", ") : "",
      challenges: project.challenges || "",
      outcome: project.outcome || "",
      github: project.github || "",
      live: project.live || "",
      image: project.image || "",
      featured: Boolean(project.featured),
    });
    setEditingProjectId(project.id);
    showToast("Editing project.");
  };

  const startEditingGallery = (item) => {
    setGalleryForm({
      title: item.title || "",
      description: item.description || "",
      src: item.image || item.src || "",
    });
    setGalleryImagePreview(item.image || item.src || "");
    setEditingGalleryId(item.id || item._id || null);
    showToast("Editing gallery item.");
  };

  const startEditingProfile = (profile) => {
    setProfileForm({
      key: profile.key || "",
      value: Array.isArray(profile.value) ? profile.value.join(", ") : profile.value || "",
    });
    const currentValue = Array.isArray(profile.value) ? profile.value[0] : profile.value || "";
    setProfileImagePreview(currentValue && /^(https?:)?\/\//i.test(currentValue) ? currentValue : "");
    setProfileImageFile(null);
    setEditingProfileId(profile._id || profile.id || null);
    showToast("Editing profile item.");
  };

  const handleSkillDelete = (skill) => {
    openConfirmDialog(
      "Delete skill?",
      `This will permanently remove ${skill.name || "this skill"}.`,
      () => {
        dispatch(deleteSkill(skill.id));
        showToast("Skill removed.");
      }
    );
  };

  const handleProjectImageSelect = (file) => {
    const previewUrl = URL.createObjectURL(file);

    setProjectImagePreview(previewUrl);

    setProjectForm((current) => ({
      ...current,
      image: file,
    }));
  };

  const handleGalleryImageSelect = (file) => {
    const previewUrl = URL.createObjectURL(file);

    setGalleryImagePreview(previewUrl);

    setGalleryForm((current) => ({
      ...current,
      src: file,
    }));
  };

  // const handleSkillIconSelect = async (file) => {
  //   const previewUrl = URL.createObjectURL(file);
  //   setSkillIconPreview(previewUrl);
  //   const imageUrl = await uploadFile(file);
  //   if (imageUrl) {
  //     setSkillForm((current) => ({ ...current, icon: imageUrl }));
  //     setFeedback("Skill icon uploaded.");
  //   }
  // };

  const handleSkillIconSelect = (file) => {
    const previewUrl = URL.createObjectURL(file);

    setSkillIconPreview(previewUrl);

    setSkillForm((current) => ({
      ...current,
      icon: file,
    }));
  };

  const handleProfileImageSelect = (event) => {
    const file = event.target.files?.[0];
    if (!file) {
      return;
    }

    const previewUrl = URL.createObjectURL(file);
    setProfileImageFile(file);
    setProfileImagePreview(previewUrl);
    setProfileForm((current) => ({
      ...current,
      key: current.key || "profileImage",
    }));
  };

  const handleProjectDelete = (project) => {
    openConfirmDialog(
      "Delete project?",
      `This will permanently remove ${project.title || "this project"}.`,
      () => {
        dispatch(deleteProject(project.id));
        showToast("Project removed.");
      }
    );
  };

  const handleGalleryDelete = (item) => {
    openConfirmDialog(
      "Delete gallery item?",
      `This will permanently remove ${item.title || "this gallery item"}.`,
      () => {
        dispatch(deleteGalleryItem(item.id || item._id));
        showToast("Gallery item removed.");
      }
    );
  };

  const handleProfileDelete = (profile) => {
    openConfirmDialog(
      "Delete profile item?",
      `This will permanently remove ${profile.key || "this profile item"}.`,
      () => {
        const token = localStorage.getItem("token");
        dispatch(deleteProfile({ id: profile._id || profile.id, token }));
        showToast("Profile item removed.");
      }
    );
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

      <div className="fixed bottom-4 right-4 z-50 flex w-[min(92vw,24rem)] flex-col gap-3">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className={`rounded-2xl border px-4 py-3 text-sm shadow-lg backdrop-blur ${toast.type === "error" ? "border-red-200 bg-red-50 text-red-700 dark:border-red-500/40 dark:bg-red-500/10 dark:text-red-300" : "border-sky-200 bg-sky-50 text-sky-700 dark:border-sky-500/40 dark:bg-sky-500/10 dark:text-sky-300"}`}
          >
            {toast.message}
          </div>
        ))}
      </div>

      {confirmDialog.open ? (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-slate-950/60 px-4">
          <div className="w-full max-w-md rounded-[1.75rem] border border-red-200 bg-white p-6 shadow-2xl dark:border-red-500/30 dark:bg-slate-900">
            <div className="flex items-start gap-3">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-red-100 text-xl text-red-600 dark:bg-red-500/10 dark:text-red-300">
                🗑
              </div>
              <div>
                <h3 className="text-lg font-semibold text-slate-900 dark:text-white">{confirmDialog.title}</h3>
                <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">{confirmDialog.message}</p>
              </div>
            </div>
            <div className="mt-6 flex justify-end gap-3">
              <button
                type="button"
                onClick={closeConfirmDialog}
                className="rounded-full border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-100 dark:border-slate-700 dark:text-slate-100 dark:hover:bg-slate-800"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleConfirmAction}
                className="rounded-full bg-red-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </div>
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
            <div className="grid gap-3 md:grid-cols-2">
              <input
                value={projectForm.category}
                onChange={(event) => setProjectForm((current) => ({ ...current, category: event.target.value }))}
                placeholder="Category (e.g. Cybersecurity)"
                className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm dark:border-slate-700 dark:bg-slate-800"
              />
              <input
                value={projectForm.role}
                onChange={(event) => setProjectForm((current) => ({ ...current, role: event.target.value }))}
                placeholder="Your role"
                className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm dark:border-slate-700 dark:bg-slate-800"
              />
              <input
                value={projectForm.duration}
                onChange={(event) => setProjectForm((current) => ({ ...current, duration: event.target.value }))}
                placeholder="Duration (e.g. 3 months)"
                className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm dark:border-slate-700 dark:bg-slate-800"
              />
              <input
                type="number"
                min="1900"
                max="2100"
                value={projectForm.year}
                onChange={(event) => setProjectForm((current) => ({ ...current, year: event.target.value }))}
                placeholder="Year"
                className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm dark:border-slate-700 dark:bg-slate-800"
              />
              <input
                value={projectForm.status}
                onChange={(event) => setProjectForm((current) => ({ ...current, status: event.target.value }))}
                placeholder="Status (e.g. Completed)"
                className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm dark:border-slate-700 dark:bg-slate-800"
              />
            </div>
            <input
              value={projectForm.technologies}
              onChange={(event) => setProjectForm((current) => ({ ...current, technologies: event.target.value }))}
              placeholder="Technologies (comma separated)"
              className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm dark:border-slate-700 dark:bg-slate-800"
            />
            <input
              value={projectForm.features}
              onChange={(event) => setProjectForm((current) => ({ ...current, features: event.target.value }))}
              placeholder="Key features (comma separated)"
              className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm dark:border-slate-700 dark:bg-slate-800"
            />
            <textarea
              value={projectForm.challenges}
              onChange={(event) => setProjectForm((current) => ({ ...current, challenges: event.target.value }))}
              placeholder="Main challenges"
              className="min-h-20 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm dark:border-slate-700 dark:bg-slate-800"
            />
            <textarea
              value={projectForm.outcome}
              onChange={(event) => setProjectForm((current) => ({ ...current, outcome: event.target.value }))}
              placeholder="Outcome or impact"
              className="min-h-20 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm dark:border-slate-700 dark:bg-slate-800"
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
          <h3 className="text-xl font-semibold text-slate-950 dark:text-white">Profile</h3>
          <p className="text-sm text-slate-600 dark:text-slate-300">Manage key/value profile details such as full name, email, and profile image.</p>
        </div>

        <form onSubmit={handleProfileSubmit} className="space-y-3">
          <input
            value={profileForm.key}
            onChange={(event) => setProfileForm((current) => ({ ...current, key: event.target.value }))}
            placeholder="Profile key (e.g. fullName or profileImage)"
            className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm dark:border-slate-700 dark:bg-slate-800"
          />
          <textarea
            value={profileForm.value}
            onChange={(event) => setProfileForm((current) => ({ ...current, value: event.target.value }))}
            placeholder="Profile text value (optional for image entries)"
            className="min-h-24 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm dark:border-slate-700 dark:bg-slate-800"
          />
          <input type="file" accept="image/*" onChange={handleProfileImageSelect} className="w-full rounded-2xl border border-dashed border-slate-300 bg-slate-50 px-4 py-3 text-sm dark:border-slate-700 dark:bg-slate-800" />
          {(profileImagePreview || (profileForm.value && /^(https?:)?\/\//i.test(profileForm.value))) && (
            <img src={profileImagePreview || profileForm.value} alt="Profile preview" className="h-24 w-24 rounded-2xl object-cover" />
          )}
          <div className="flex gap-3">
            <button type="submit" className="rounded-full bg-sky-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-sky-600">
              {editingProfileId ? "Update profile item" : "Add profile item"}
            </button>
            <button type="button" onClick={resetProfileForm} className="rounded-full border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 dark:border-slate-700 dark:text-slate-100">
              Clear
            </button>
          </div>
        </form>

        <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {normalizedProfiles.map((profile) => (
            <div key={profile._id || profile.id} className="rounded-3xl border border-slate-200 p-4 dark:border-slate-700">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.2em] text-sky-500">{profile.key}</p>
                  {profile.key?.toLowerCase().includes("image") || /^(https?:)?\/\//i.test(Array.isArray(profile.value) ? profile.value[0] || "" : profile.value || "") ? (
                    <img src={Array.isArray(profile.value) ? profile.value[0] : profile.value} alt={profile.key} className="mt-3 h-20 w-20 rounded-2xl object-cover" />
                  ) : (
                    <p className="mt-2 text-sm text-slate-700 dark:text-slate-200">{Array.isArray(profile.value) ? profile.value.join(", ") : profile.value}</p>
                  )}
                </div>
                <div className="flex gap-2">
                  <button type="button" onClick={() => startEditingProfile(profile)} className={iconButtonClass} aria-label={`Edit ${profile.key}`} title="Edit profile item">
                    ✎
                  </button>
                  <button type="button" onClick={() => handleProfileDelete(profile)} className={`${iconButtonClass} text-red-600 hover:text-red-600 dark:text-red-300`} aria-label={`Delete ${profile.key}`} title="Delete profile item">
                    🗑
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-8 rounded-[2rem] border border-slate-200 bg-white p-6 shadow-lg dark:border-slate-700 dark:bg-slate-900">
        <div className="mb-4">
          <h3 className="text-xl font-semibold text-slate-950 dark:text-white">Gallery</h3>
          <p className="text-sm text-slate-600 dark:text-slate-300">Add, edit, or remove gallery entries.</p>
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
          <FileDropzone
            label="Gallery image"
            value={galleryForm.src}
            previewUrl={galleryImagePreview || galleryForm.src}
            onFileChange={handleGalleryImageSelect}
            helperText={uploading ? "Uploading gallery image..." : "Drop image file or click to choose."}
          />
          <div className="flex gap-3">
            <button type="submit" className="rounded-full bg-sky-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-sky-600">
              {editingGalleryId ? "Update gallery item" : "Add gallery item"}
            </button>
            <button type="button" onClick={resetGalleryForm} className="rounded-full border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 dark:border-slate-700 dark:text-slate-100">
              Clear
            </button>
          </div>
        </form>

        <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {normalizedGalleryItems.map((item) => (
            <div key={item.id || item._id} className="overflow-hidden rounded-3xl border border-slate-200 dark:border-slate-700">
              <img src={item.image || item.src || "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=800&q=80"} alt={item.title} className="h-40 w-full object-cover" />
              <div className="p-4">
                <div className="flex items-center justify-between gap-2">
                  <p className="font-semibold text-slate-900 dark:text-white">{item.title}</p>
                  <div className="flex gap-2">
                    <button type="button" onClick={() => startEditingGallery(item)} className={iconButtonClass} aria-label={`Edit ${item.title}`} title="Edit gallery item">
                      ✎
                    </button>
                    <button type="button" onClick={() => handleGalleryDelete(item)} className={`${iconButtonClass} text-red-600 hover:text-red-600 dark:text-red-300`} aria-label={`Delete ${item.title}`} title="Delete gallery item">
                      🗑
                    </button>
                  </div>
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
