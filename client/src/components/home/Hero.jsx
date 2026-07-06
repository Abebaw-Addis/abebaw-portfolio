import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import userImage from "../../assets/user.png";
import { profileContentData, profileData } from "../../data/homeData";
import { fetchProfiles } from "../../features/profile/profileSlice";

const Hero = () => {
  const dispatch = useDispatch();
  const { profiles = [] } = useSelector((state) => state.profile);

  useEffect(() => {
    dispatch(fetchProfiles());
  }, [dispatch]);

  const getFallbackValue = (key, fallback = "") => {
    const entry = profileData.find((item) => item?.key === key);
    if (!entry) {
      return fallback;
    }

    if (Array.isArray(entry.value)) {
      return entry.value.join(", ").trim();
    }

    return entry.value ?? fallback;
  };

  const getProfileValue = (key, fallback = "") => {
    const entry = profiles.find((item) => item?.key === key);
    if (!entry) {
      return getFallbackValue(key, fallback);
    }

    if (Array.isArray(entry.value)) {
      return entry.value.join(", ").trim();
    }

    return entry.value ?? getFallbackValue(key, fallback);
  };

  const fullName = getProfileValue("fullName", "Abebaw");
  const intro = getProfileValue("intro", "Hello, I'm");
  const title = getProfileValue("title", "Software Engineer | Web Developer | AI & Cybersecurity Enthusiast");
  const bio = getProfileValue("bio", "I build scalable full-stack apps, AI systems, and secure web platforms.");
  const email = getProfileValue("email", "abadis1221@gmail.com");
  const profileImage = getProfileValue("profileImage", getProfileValue("image", userImage));
  const highlights = profileContentData.highlights;
  const cta = profileContentData.cta;
  const featureList = profileContentData.featureList;

  return (
    <section id="home" className="flex min-h-screen items-center bg-slate-50 pt-24 text-slate-900 transition-colors duration-300 dark:bg-slate-950 dark:text-white">
      <div className="mx-auto grid max-w-6xl gap-10 px-6 md:grid-cols-2">
        <div>
          <h2 className="font-semibold text-blue-500">{intro}</h2>
          <h1 className="mt-2 text-5xl font-bold">{fullName}</h1>
          <p className="mt-4 text-lg text-slate-500 dark:text-slate-300">{title}</p>
          <p className="mt-6 text-slate-600 dark:text-slate-300">{bio}</p>
          {email ? (
            <p className="mt-4 text-sm text-slate-500 dark:text-slate-400">{email}</p>
          ) : null}

          <div className="mt-6 rounded-3xl border border-slate-200 bg-slate-50 p-6 text-left shadow-sm dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200">
            <h3 className="text-sm font-semibold uppercase tracking-[0.3em] text-sky-500">About Me</h3>
            <ul className="mt-4 space-y-3 text-sm text-slate-600 dark:text-slate-400">
              {highlights.map((highlight) => (
                <li key={highlight}>• {highlight}</li>
              ))}
            </ul>
          </div>

          <div className="mt-8 flex flex-wrap gap-4">
            {cta.map((button) => (
              <a
                key={button.label}
                href={button.href}
                className={`rounded-lg px-6 py-3 transition ${button.variant === "primary" ? "bg-blue-600 text-white hover:bg-blue-700" : "border border-blue-600 text-blue-600 hover:bg-blue-600/10 dark:text-sky-300 dark:hover:bg-sky-400/10"}`}
              >
                {button.label}
              </a>
            ))}
          </div>

          <div className="mt-8 rounded-3xl border border-slate-200 bg-slate-50 p-6 text-left shadow-sm transition-colors duration-300 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200">
            <h3 className="text-sm font-semibold uppercase tracking-[0.3em] text-sky-500">Why work with me?</h3>
            <ul className="mt-4 space-y-3 text-sm text-slate-600 dark:text-slate-400">
              {featureList.map((feature) => (
                <li key={feature}>• {feature}</li>
              ))}
            </ul>
          </div>
        </div>

        <div className="flex justify-center">
          <img
            src={profileImage || userImage}
            alt={fullName}
            className="h-80 w-80 rounded-full border-4 border-blue-600 object-cover shadow-2xl shadow-blue-900/30"
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;