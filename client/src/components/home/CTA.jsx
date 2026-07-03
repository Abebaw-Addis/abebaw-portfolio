import { useState } from "react";

const CTA = () => {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState(null);

  const handleChange = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("sending");
    setError(null);

    try {
      const res = await fetch("http://localhost:5000/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.message || "Failed to send message");
      }

      setStatus("sent");
      setForm({ name: "", email: "", subject: "", message: "" });
    } catch (err) {
      setError(err.message);
      setStatus("error");
    }
  };

  return (
    <section id="contact" className="py-24 bg-slate-50 text-slate-900 transition-colors duration-300 dark:bg-slate-950 dark:text-white">
      <div className="mx-auto max-w-4xl px-6">
        <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-start">
          <div className="space-y-6 rounded-[2rem] border border-slate-200 bg-white/90 p-10 shadow-xl shadow-slate-200/30 backdrop-blur dark:border-slate-700 dark:bg-slate-900/95 dark:shadow-black/20">
            <div className="max-w-xl">
              <p className="text-sm uppercase tracking-[0.35em] text-sky-500">Contact</p>
              <h2 className="mt-4 text-4xl font-semibold sm:text-5xl">Let&apos;s Work Together</h2>
              <p className="mt-4 text-lg leading-8 text-slate-600 dark:text-slate-300">
                I&apos;m available for internships, freelance projects, and collaborations. Share your idea and I&apos;ll get back to you with a thoughtful reply.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6 dark:border-slate-700 dark:bg-slate-950">
                <p className="text-sm text-slate-500 dark:text-slate-400">Email</p>
                <p className="mt-2 font-semibold text-slate-900 dark:text-white">abadis1221@gmail.com</p>
              </div>
              <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6 dark:border-slate-700 dark:bg-slate-950">
                <p className="text-sm text-slate-500 dark:text-slate-400">Availability</p>
                <p className="mt-2 font-semibold text-slate-900 dark:text-white">Open for work</p>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="rounded-[2rem] border border-slate-200 bg-white/90 p-8 shadow-xl shadow-slate-200/30 backdrop-blur dark:border-slate-700 dark:bg-slate-900/95 dark:shadow-black/20">
            <div className="grid gap-4 sm:grid-cols-2">
              <input
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Your name"
                required
                className="rounded-3xl border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-100 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100 dark:focus:border-sky-400 dark:focus:ring-slate-700"
              />
              <input
                name="email"
                value={form.email}
                onChange={handleChange}
                type="email"
                placeholder="Your email"
                required
                className="rounded-3xl border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-100 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100 dark:focus:border-sky-400 dark:focus:ring-slate-700"
              />
            </div>

            <input
              name="subject"
              value={form.subject}
              onChange={handleChange}
              placeholder="Subject"
              className="w-full rounded-3xl border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-100 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100 dark:focus:border-sky-400 dark:focus:ring-slate-700"
            />

            <textarea
              name="message"
              value={form.message}
              onChange={handleChange}
              placeholder="Message"
              required
              rows={6}
              className="w-full rounded-3xl border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-100 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100 dark:focus:border-sky-400 dark:focus:ring-slate-700"
            />

            <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                {status === "sending" && <span className="text-sm text-slate-500 dark:text-slate-400">Sending…</span>}
                {status === "sent" && <span className="text-sm text-emerald-600">Message sent — thank you!</span>}
                {status === "error" && <span className="text-sm text-red-500">{error || "Failed to send message"}</span>}
              </div>

              <button
                type="submit"
                className="inline-flex items-center justify-center rounded-full bg-sky-600 px-8 py-3 text-sm font-semibold text-white shadow-lg shadow-sky-500/20 transition hover:bg-sky-700 disabled:cursor-not-allowed disabled:opacity-60"
                disabled={status === "sending"}
              >
                Send Message
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default CTA;