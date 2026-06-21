const stats = [
  { label: "Projects", value: "15+" },
  { label: "Skills", value: "20+" },
  { label: "Certificates", value: "10+" },
  { label: "Experience", value: "3+" },
];

const Stats = () => {
  return (
    <section id="about" className="bg-gray-900 py-20">
      <div className="mx-auto grid max-w-6xl grid-cols-2 gap-6 px-6 md:grid-cols-4">
        {stats.map((s, i) => (
          <div
            key={i}
            className="rounded-xl bg-gray-800 p-6 text-center transition hover:scale-105"
          >
            <h2 className="text-3xl font-bold text-blue-500">{s.value}</h2>
            <p className="mt-2 text-gray-400">{s.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Stats;