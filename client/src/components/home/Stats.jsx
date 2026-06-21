const stats = [
  { label: "Projects", value: "15+" },
  { label: "Skills", value: "20+" },
  { label: "Certificates", value: "10+" },
  { label: "Experience", value: "3+" },
];

const Stats = () => {
  return (
    <section className="py-20 bg-gray-900">
      <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 px-6">

        {stats.map((s, i) => (
          <div
            key={i}
            className="bg-gray-800 p-6 rounded-xl text-center hover:scale-105 transition"
          >
            <h2 className="text-3xl font-bold text-blue-500">
              {s.value}
            </h2>
            <p className="text-gray-400 mt-2">{s.label}</p>
          </div>
        ))}

      </div>
    </section>
  );
};

export default Stats;