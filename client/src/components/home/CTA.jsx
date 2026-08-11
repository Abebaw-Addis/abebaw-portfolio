import {
    Mail,
    MapPin,
    Phone,
    SendHorizontal,
} from "lucide-react";
import { useState } from "react";

import {
    FaFacebook,
    FaGithub,
    FaInstagram,
    FaLinkedin,
    FaTelegram,
} from "react-icons/fa6";

const CTA = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [status, setStatus] = useState("idle");
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setForm((f) => ({
      ...f,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("sending");
    setError(null);

    try {
      const res = await fetch(
        `${import.meta.env.VITE_NODE_URL}api/contact`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(form),
        }
      );

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.message || "Failed to send message");
      }

      setStatus("sent");

      setForm({
        name: "",
        email: "",
        subject: "",
        message: "",
      });
    } catch (err) {
      setError(err.message);
      setStatus("error");
    }
  };

  return (
    <section
      id="contact"
      className="min-h-screen bg-slate-50 px-5 py-20 text-slate-900 transition-colors duration-300 dark:bg-slate-950 dark:text-white sm:px-8 lg:px-10"
    >
      <div className="mx-auto max-w-[870px]">
        {/* ================= HEADER ================= */}
        <div className="mb-10">
          <h2 className="text-4xl font-extrabold tracking-tight text-slate-950 dark:text-white sm:text-5xl">
            Contact
          </h2>

          <h3 className="text-xl font-bold text-slate-900 dark:text-white">
            Let's build something meaningful
          </h3>
          <p className="mt-2 text-sm text-slate-600 dark:text-slate-300 sm:text-base">
            I'm available for internships, freelance work, and product collaborations. Share your idea and I'll get back to you with a thoughtful reply.
          </p>
        </div>

        {/* ================= CONTACT GRID ================= */}
        <div className="reveal-up grid gap-7 md:grid-cols-2">
          {/* ================= CONTACT INFORMATION ================= */}
          <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-900">
            <h3 className="text-lg font-bold text-slate-950 dark:text-white">
              Contact Information
            </h3>

            <div className="mt-8 space-y-6">
              {/* Email */}
              <div className="flex items-center gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-emerald-500/30 bg-emerald-500/10 text-emerald-400">
                  <Mail size={19} strokeWidth={1.8} />
                </div>

                <div>
                  <p className="text-xs font-semibold text-slate-900 dark:text-white">Email</p>
                  <p className="mt-1 text-xs text-slate-600 dark:text-slate-300">
                    abadis1221@gmail.com
                  </p>
                </div>
              </div>

              {/* Phone */}
              <div className="flex items-center gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-emerald-500/30 bg-emerald-500/10 text-emerald-400">
                  <Phone size={19} strokeWidth={1.8} />
                </div>

                <div>
                  <p className="text-xs font-semibold text-slate-900 dark:text-white">Phone</p>
                  <p className="mt-1 text-xs text-slate-600 dark:text-slate-300">
                    +251 978 109 304
                  </p>
                </div>
              </div>

              {/* Location */}
              <div className="flex items-center gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-emerald-500/30 bg-emerald-500/10 text-emerald-400">
                  <MapPin size={19} strokeWidth={1.8} />
                </div>

                <div>
                  <p className="text-xs font-semibold text-slate-900 dark:text-white">Location</p>
                  <p className="mt-1 text-xs text-slate-600 dark:text-slate-300">
                    Addis Ababa, Ethiopia
                  </p>
                </div>
              </div>
            </div>

            {/* Divider */}
            <div className="my-7 h-px bg-slate-200 dark:bg-slate-700" />

            {/* Social links */}
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
                Connect With Me
              </p>

              <div className="mt-4 flex flex-wrap gap-2">
                <a
                  href="https://github.com/yourusername"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 text-[11px] text-slate-700 transition hover:border-emerald-500/50 hover:text-emerald-500 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 dark:hover:text-emerald-400"
                >
                  <FaGithub size={13} />
                  GitHub
                </a>

                <a
                  href="https://linkedin.com/in/yourusername"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 text-[11px] text-slate-700 transition hover:border-emerald-500/50 hover:text-emerald-500 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 dark:hover:text-emerald-400"
                >
                  <FaLinkedin size={13} />
                  LinkedIn
                </a>

                <a
                  href="https://instagram.com/yourusername"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 text-[11px] text-slate-700 transition hover:border-emerald-500/50 hover:text-emerald-500 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 dark:hover:text-emerald-400"
                >
                  <FaInstagram size={13} />
                  Instagram
                </a>

                <a
                  href="https://facebook.com/yourusername"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 text-[11px] text-slate-700 transition hover:border-emerald-500/50 hover:text-emerald-500 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 dark:hover:text-emerald-400"
                >
                  <FaFacebook size={13} />
                  Facebook
                </a>

                <a
                  href="https://t.me/yourusername"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 text-[11px] text-slate-700 transition hover:border-emerald-500/50 hover:text-emerald-500 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 dark:hover:text-emerald-400"
                >
                  <FaTelegram size={13} />
                  Telegram
                </a>
              </div>
            </div>
          </div>

          {/* ================= SEND MESSAGE ================= */}
          <form
            onSubmit={handleSubmit}
            className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-900"
          >
            <h3 className="text-lg font-bold text-slate-950 dark:text-white">Send a Message</h3>

            {/* Name */}
            <div className="mt-8">
              <label className="mb-2 block text-[11px] font-medium text-slate-700 dark:text-slate-300">
                Name
              </label>

              <input
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Your name"
                required
                className="w-full rounded-xl border border-slate-300 bg-slate-50 px-3 py-2.5 text-xs text-slate-900 outline-none placeholder:text-slate-400 transition focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/30 dark:border-slate-600 dark:bg-slate-800 dark:text-white dark:placeholder:text-slate-500"
              />
            </div>

            {/* Email */}
            <div className="mt-5">
              <label className="mb-2 block text-[11px] font-medium text-slate-700 dark:text-slate-300">
                Email
              </label>

              <input
                name="email"
                value={form.email}
                onChange={handleChange}
                type="email"
                placeholder="your@email.com"
                required
                className="w-full rounded-xl border border-slate-300 bg-slate-50 px-3 py-2.5 text-xs text-slate-900 outline-none placeholder:text-slate-400 transition focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/30 dark:border-slate-600 dark:bg-slate-800 dark:text-white dark:placeholder:text-slate-500"
              />
            </div>

            {/* Subject */}
            <div className="mt-5">
              <label className="mb-2 block text-[11px] font-medium text-slate-700 dark:text-slate-300">
                Subject
              </label>

              <input
                name="subject"
                value={form.subject}
                onChange={handleChange}
                placeholder="What's this about?"
                className="w-full rounded-xl border border-slate-300 bg-slate-50 px-3 py-2.5 text-xs text-slate-900 outline-none placeholder:text-slate-400 transition focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/30 dark:border-slate-600 dark:bg-slate-800 dark:text-white dark:placeholder:text-slate-500"
              />
            </div>

            {/* Message */}
            <div className="mt-5">
              <label className="mb-2 block text-[11px] font-medium text-slate-700 dark:text-slate-300">
                Message
              </label>

              <textarea
                name="message"
                value={form.message}
                onChange={handleChange}
                placeholder="Your message here..."
                required
                rows={4}
                className="w-full resize-none rounded-xl border border-slate-300 bg-slate-50 px-3 py-2.5 text-xs text-slate-900 outline-none placeholder:text-slate-400 transition focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/30 dark:border-slate-600 dark:bg-slate-800 dark:text-white dark:placeholder:text-slate-500"
              />
            </div>

            {/* Status + Button */}
            <div className="mt-5">
              {status === "sending" && (
                <p className="mb-3 text-xs text-slate-500 dark:text-slate-400">
                  Sending message...
                </p>
              )}

              {status === "sent" && (
                <p className="mb-3 text-xs text-emerald-400">
                  Message sent — thank you!
                </p>
              )}

              {status === "error" && (
                <p className="mb-3 text-xs text-red-400">
                  {error || "Failed to send message"}
                </p>
              )}

              <button
                type="submit"
                disabled={status === "sending"}
                className="flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-emerald-500 to-blue-600 px-6 py-3 text-xs font-bold text-white shadow-lg shadow-emerald-500/10 transition hover:from-emerald-400 hover:to-blue-500 disabled:cursor-not-allowed disabled:opacity-60"
              >
                <SendHorizontal size={15} />
                {status === "sending" ? "Sending..." : "Send Message"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default CTA;
