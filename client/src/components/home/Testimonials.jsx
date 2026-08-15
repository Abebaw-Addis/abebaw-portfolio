import { Building2, Globe, Link, Mail, MapPin, Phone, Users } from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTestimonials } from "../../features/testimonials/testimonialsSlice";

const Testimonials = () => {
  const dispatch = useDispatch();
  const { testimonials = [] } = useSelector((state) => state.testimonials || {});
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    dispatch(fetchTestimonials());
  }, [dispatch]);

  useEffect(() => {
    if (!testimonials.length) return;
    setActiveIndex((current) => (current >= testimonials.length ? 0 : current));
  }, [testimonials.length]);

  if (!testimonials.length) {
    return null;
  }

  const activeTestimonial = testimonials[activeIndex] || testimonials[0];

  const showPrevious = () => {
    setActiveIndex((current) => (current === 0 ? testimonials.length - 1 : current - 1));
  };

  const showNext = () => {
    setActiveIndex((current) => (current === testimonials.length - 1 ? 0 : current + 1));
  };

  const metadataItems = [
    activeTestimonial.location,
    activeTestimonial.company,
    activeTestimonial.relation,
    activeTestimonial.email,
    activeTestimonial.phone,
    activeTestimonial.linkedin,
    activeTestimonial.website,
  ].filter(Boolean);

  return (
    <section id="testimonials" className="bg-slate-50 py-20 text-slate-900 transition-colors duration-300 dark:bg-slate-950 dark:text-white">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mb-10 text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.35em] text-sky-500">Testimonials</p>
          <h2 className="mt-4 text-3xl font-bold text-slate-950 dark:text-white md:text-5xl">
            Trusted by clients and collaborators
          </h2>
        </div>

        <div className="relative mt-8 flex items-center justify-center gap-4 md:gap-8">
          <button
            type="button"
            onClick={showPrevious}
            aria-label="Previous testimonial"
            className="hidden h-12 w-12 items-center justify-center rounded-full border border-slate-300 bg-white text-2xl text-slate-700 shadow-sm transition hover:border-sky-400 hover:text-sky-600 md:flex dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200"
          >
            ‹
          </button>

          <div className="w-full max-w-5xl rounded-[2rem] border border-slate-200 bg-white p-7 shadow-[0_20px_60px_rgba(15,23,42,0.08)] dark:border-slate-700 dark:bg-slate-900 md:p-10">
            <div className="flex w-full flex-col items-center justify-center text-center">
              <div className="mb-8 flex h-24 w-24 items-center justify-center overflow-hidden rounded-full border-4 border-sky-500 bg-slate-100 shadow-[0_0_24px_rgba(14,165,233,0.15)] md:h-28 md:w-28 dark:bg-slate-800">
                {activeTestimonial.avatar ? (
                  <img
                    src={activeTestimonial.avatar}
                    alt={activeTestimonial.name}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <span className="text-3xl font-bold text-sky-600 dark:text-cyan-300">
                    {activeTestimonial.name?.charAt(0)?.toUpperCase() || "A"}
                  </span>
                )}
              </div>

              <div className="mb-4 text-4xl font-bold text-sky-500 md:text-5xl">“</div>

              <blockquote className="max-w-3xl text-lg leading-relaxed text-slate-700 md:text-2xl dark:text-slate-200">
                {activeTestimonial.testimonial}
              </blockquote>

              <div className="mt-7 flex flex-col items-center">
                <h3 className="text-2xl font-bold tracking-tight text-slate-950 dark:text-white">{activeTestimonial.name}</h3>
                <p className="mt-1 text-sm font-medium uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400">
                  {activeTestimonial.role || "Professional"}
                </p>
              </div>

              <div className="mt-6 flex flex-wrap items-center justify-center gap-2 text-sm text-slate-600 dark:text-slate-300">
                {activeTestimonial.location && (
                  <span className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 dark:border-slate-700 dark:bg-slate-800">
                    <MapPin size={14} className="text-sky-600 dark:text-sky-400" />
                    {activeTestimonial.location}
                  </span>
                )}
                {activeTestimonial.company && (
                  <span className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 dark:border-slate-700 dark:bg-slate-800">
                    <Building2 size={14} className="text-sky-600 dark:text-sky-400" />
                    {activeTestimonial.company}
                  </span>
                )}
                {activeTestimonial.relation && (
                  <span className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 dark:border-slate-700 dark:bg-slate-800">
                    <Users size={14} className="text-sky-600 dark:text-sky-400" />
                    {activeTestimonial.relation}
                  </span>
                )}
              </div>

              {metadataItems.length > 0 && (
                <div className="mt-6 flex flex-wrap items-center justify-center gap-2 text-sm">
                  {activeTestimonial.email && (
                    <a href={`mailto:${activeTestimonial.email}`} className="inline-flex items-center gap-2 rounded-full bg-sky-50 px-3 py-1.5 font-medium text-sky-700 transition hover:bg-sky-100 dark:bg-sky-500/10 dark:text-sky-300 dark:hover:bg-sky-500/20">
                      <Mail size={14} />
                      {activeTestimonial.email}
                    </a>
                  )}
                  {activeTestimonial.phone && (
                    <a href={`tel:${activeTestimonial.phone}`} className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-3 py-1.5 font-medium text-slate-700 transition hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700">
                      <Phone size={14} />
                      {activeTestimonial.phone}
                    </a>
                  )}
                  {activeTestimonial.linkedin && (
                    <a href={activeTestimonial.linkedin} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full bg-sky-50 px-3 py-1.5 font-medium text-sky-700 transition hover:bg-sky-100 dark:bg-sky-500/10 dark:text-sky-300 dark:hover:bg-sky-500/20">
                      <Link size={14} />
                      LinkedIn
                    </a>
                  )}
                  {activeTestimonial.website && (
                    <a href={activeTestimonial.website} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-3 py-1.5 font-medium text-slate-700 transition hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700">
                      <Globe size={14} />
                      Website
                    </a>
                  )}
                </div>
              )}

              <div className="mt-8 flex items-center justify-center gap-3">
                {testimonials.map((item, index) => (
                  <button
                    key={item.id || item._id || index}
                    type="button"
                    aria-label={`Go to testimonial ${index + 1}`}
                    onClick={() => setActiveIndex(index)}
                    className={`h-2.5 w-2.5 rounded-full transition ${index === activeIndex ? "bg-sky-500" : "bg-slate-300 dark:bg-slate-600"}`}
                  />
                ))}
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={showNext}
            aria-label="Next testimonial"
            className="hidden h-12 w-12 items-center justify-center rounded-full border border-slate-300 bg-white text-2xl text-slate-700 shadow-sm transition hover:border-sky-400 hover:text-sky-600 md:flex dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200"
          >
            ›
          </button>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
