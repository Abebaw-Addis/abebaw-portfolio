import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchSkills } from "../../features/skills/skillsSlice";

const groupSkillsByCategory = (skills = []) =>
  skills.reduce((acc, skill) => {
    const category = skill.category || "Other";

    if (!acc[category]) {
      acc[category] = [];
    }

    acc[category].push(skill);
    return acc;
  }, {});

const SkillsPreview = () => {
  const dispatch = useDispatch();
  const skills = useSelector((state) => state.skills?.skills ?? []);
  const skillsByCategory = groupSkillsByCategory(skills);

  useEffect(() => {
    dispatch(fetchSkills());
  }, [dispatch]);

  return (
    <section id="skills" className="py-20 bg-slate-50 text-slate-900 transition-colors duration-300 dark:bg-slate-950 dark:text-white">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mb-10 flex flex-col gap-4 text-center sm:flex-row sm:items-end sm:justify-between sm:text-left">
          <div>
            <h2 className="text-3xl font-bold">Skills</h2>
            <p className="mt-2 text-slate-600 dark:text-slate-300">A live view of the skills you can manage from the admin panel.</p>
          </div>
          <div className="rounded-full border border-sky-200 bg-sky-50 px-4 py-2 text-sm font-medium text-sky-700 dark:border-sky-500/30 dark:bg-sky-500/10 dark:text-sky-300">
            {skills?.length ?? 0} tracked skills
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {Object.entries(skillsByCategory).map(
            ([category, categorySkills]) => (
              <div
                key={category}
                className="rounded-3xl border border-slate-200 bg-white p-6 shadow-lg transition-colors duration-300 dark:border-slate-700 dark:bg-slate-900"
              >
                <h3 className="mb-4 text-xl font-semibold text-cyan-500 dark:text-cyan-300">
                  {category}
                </h3>
                <div className="space-y-4">
                  {categorySkills.map((skill) => (
                    <div key={skill.name}>
                              <div className="flex items-center justify-between text-sm font-medium text-slate-900 dark:text-slate-100">
                          <span>{skill.name}</span>
                          <span>{skill.level}%</span>
                        </div>
                      <div className="mt-2 h-3 overflow-hidden rounded-full bg-slate-200 dark:bg-slate-800">
                        <div
                          className="h-full rounded-full bg-gradient-to-r from-cyan-400 to-blue-500"
                          style={{ width: `${skill.level}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )
          )}
        </div>
      </div>
    </section>
  );
};

export default SkillsPreview;