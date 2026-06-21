import userImage from "../../assets/user.png";
import { profileData } from "../../data/homeData";

const Hero = () => {
  return (
    <section id="home" className="flex min-h-screen items-center pt-24">
      <div className="mx-auto grid max-w-6xl gap-10 px-6 md:grid-cols-2">
        <div>
          <h2 className="font-semibold text-blue-500">Hello, I&apos;m</h2>
          <h1 className="mt-2 text-5xl font-bold">{profileData.fullName}</h1>
          <p className="mt-4 text-lg text-gray-400">{profileData.title}</p>
          <p className="mt-6 text-gray-500">{profileData.bio}</p>

          <div className="mt-8 flex flex-wrap gap-4">
            <a
              href="#projects"
              className="rounded-lg bg-blue-600 px-6 py-3 transition hover:bg-blue-700"
            >
              View Projects
            </a>
            <a
              href="mailto:abadis1221@gmail.com"
              className="rounded-lg border border-blue-600 px-6 py-3 transition hover:bg-blue-600/20"
            >
              Contact Me
            </a>
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