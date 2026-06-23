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
    <section id="contact" className="py-24">
      <div className="mx-auto max-w-3xl px-6">
        <h2 className="text-4xl font-bold text-center">Let&apos;s Work Together</h2>
        <p className="mt-4 text-center text-slate-500">Open for internships, freelance projects, and collaborations.</p>

        <form onSubmit={handleSubmit} className="mt-8 grid gap-4">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <input name="name" value={form.name} onChange={handleChange} placeholder="Your name" required className="rounded-md border px-4 py-2" />
            <input name="email" value={form.email} onChange={handleChange} type="email" placeholder="Your email" required className="rounded-md border px-4 py-2" />
          </div>

          <input name="subject" value={form.subject} onChange={handleChange} placeholder="Subject" className="rounded-md border px-4 py-2" />

          <textarea name="message" value={form.message} onChange={handleChange} placeholder="Message" required rows={6} className="rounded-md border px-4 py-2"></textarea>

          <div className="flex items-center justify-between">
            <div>
              {status === "sending" && <span className="text-sm text-slate-500">Sending…</span>}
              {status === "sent" && <span className="text-sm text-emerald-600">Message sent — thank you!</span>}
              {status === "error" && <span className="text-sm text-red-500">{error || "Failed to send message"}</span>}
            </div>

            <button type="submit" className="ml-4 rounded-lg bg-sky-600 px-6 py-2 text-white hover:bg-sky-700" disabled={status === "sending"}>
              Send Message
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default CTA;