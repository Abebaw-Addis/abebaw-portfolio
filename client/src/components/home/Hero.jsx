import userImage from '../../assets/user.png';

const Hero = () => {
  return (
    <section className="min-h-screen flex items-center pt-20">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10 px-6">

        {/* Left */}
        <div>
          <h2 className="text-blue-500 font-semibold">
            Hello, I'm
          </h2>

          <h1 className="text-5xl font-bold mt-2">
            Abebaw
          </h1>

          <p className="text-gray-400 mt-4 text-lg">
            Software Engineer | Web Developer | AI & Cybersecurity Enthusiast
          </p>

          <p className="text-gray-500 mt-6">
            I build scalable full-stack applications, AI-based systems,
            and secure web platforms.
          </p>

          <div className="flex gap-4 mt-8">
            <button className="bg-blue-600 px-6 py-3 rounded-lg hover:bg-blue-700">
              View Projects
            </button>

            <button className="border border-blue-600 px-6 py-3 rounded-lg hover:bg-blue-600/20">
              Download CV
            </button>
          </div>
        </div>

        {/* Right */}
        <div className="flex justify-center">
          <img
            src={userImage}
            className="w-80 h-80 rounded-full object-cover border-4 border-blue-600"
          />
        </div>

      </div>
    </section>
  );
};

export default Hero;