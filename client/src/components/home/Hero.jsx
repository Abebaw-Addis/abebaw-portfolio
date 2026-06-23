import userImage from "../../assets/user.png";
import { profileData } from "../../data/homeData";

const Hero = () => {
  return (
    <section id="home" className="flex min-h-screen items-center pt-24 bg-slate-50 text-slate-900 transition-colors duration-300 dark:bg-slate-950 dark:text-white">
      <div className="mx-auto grid max-w-6xl gap-10 px-6 md:grid-cols-2">
        <div>
          <h2 className="font-semibold text-blue-500">{profileData.intro}</h2>
          <h1 className="mt-2 text-5xl font-bold">{profileData.fullName}</h1>
          <p className="mt-4 text-lg text-slate-500 dark:text-slate-300">{profileData.title}</p>
          <p className="mt-6 text-slate-600 dark:text-slate-300">{profileData.bio}</p>

          <div className="mt-6 rounded-3xl border border-slate-200 bg-slate-50 p-6 text-left shadow-sm dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200">
            <h3 className="text-sm font-semibold uppercase tracking-[0.3em] text-sky-500">About Me</h3>
            <ul className="mt-4 space-y-3 text-sm text-slate-600 dark:text-slate-400">
              {profileData.highlights.map((highlight) => (
                <li key={highlight}>• {highlight}</li>
              ))}
            </ul>
          </div>

          <div className="mt-8 flex flex-wrap gap-4">
            {profileData.cta.map((button) => (
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
              {profileData.featureList.map((feature) => (
                <li key={feature}>• {feature}</li>
              ))}
            </ul>
          </div>
        </div>

        <div className="flex justify-center">
          <img
            src={userImage}
            alt={profileData.fullName}
            className="h-80 w-80 rounded-full border-4 border-blue-600 object-cover shadow-2xl shadow-blue-900/30"
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;