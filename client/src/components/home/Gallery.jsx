import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import galleryHero from "../../assets/user.png";
import { fetchGalleryItems } from "../../features/gallery/gallerySlice";

const Gallery = () => {
  const dispatch = useDispatch();
  const { galleryItems } = useSelector((state) => state.gallery);
  const [index, setIndex] = useState(-1);
  const [showAllGallery, setShowAllGallery] = useState(false);
  const BASE_URL = import.meta.env.VITE_NODE_URL;

  useEffect(() => {
    dispatch(fetchGalleryItems());
  }, [dispatch]);

  const allGalleryItems = Array.isArray(galleryItems) ? galleryItems : [];
  const visibleGalleryItems = showAllGallery ? allGalleryItems : allGalleryItems.slice(0, 8);

  return (
    <section className="mt-12">
      <div className="relative mx-auto mb-10 max-w-7xl overflow-hidden rounded-[2rem] bg-slate-900 text-white shadow-xl">
        <img src={galleryHero} alt="Gallery hero" className="h-72 w-full object-cover opacity-90" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/60 to-transparent" />
        <div className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center">
          <p className="text-sm uppercase tracking-[0.35em] text-sky-300">Gallery</p>
          <h3 className="mt-4 text-4xl font-semibold sm:text-5xl">Explore project visuals and warm previews</h3>
          <p className="mt-3 max-w-2xl text-sm text-slate-200 sm:text-base">
            Discover your work through a clean gallery experience, with image previews and project details all in one place.
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-6">
        <h3 className="mb-6 text-lg font-semibold text-slate-900 dark:text-white">Project gallery</h3>
        <p className="mb-6 max-w-2xl text-slate-600 dark:text-slate-300">
          Browse curated gallery images from the assets folder.
        </p>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
          {visibleGalleryItems.map((item, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setIndex(i)}
              className="overflow-hidden rounded-3xl border border-slate-200 bg-white p-0 text-left shadow transition hover:-translate-y-1 hover:shadow-lg dark:border-slate-700 dark:bg-slate-900"
              aria-label={`Open gallery item for ${item.title}`}
            >
              <img
                src={
                  item?.image?.startsWith("http")
                    ? item.image
                    : `${BASE_URL}/uploads/${item.image}`
                } alt={item.title} className="h-40 w-full object-cover" />
              <div className="space-y-2 p-4">
                <p className="text-sm font-semibold text-slate-900 dark:text-white">{item.title}</p>
                <p className="text-sm text-slate-500 dark:text-slate-400 truncate">{item.description}</p>
              </div>
            </button>
          ))}
        </div>

        {allGalleryItems.length > 8 ? (
          <div className="mt-8 text-center">
            <button
              type="button"
              onClick={() => setShowAllGallery((value) => !value)}
              className="rounded-full border border-slate-300 bg-white px-5 py-2.5 text-sm font-semibold text-slate-700 transition hover:border-sky-400 hover:text-sky-600 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200"
            >
              {showAllGallery ? "Show less" : "Show all gallery"}
            </button>
          </div>
        ) : null}
      </div>

      {index >= 0 && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4 py-6" onClick={() => setIndex(-1)}>
          <div className="w-full max-w-4xl overflow-hidden rounded-3xl bg-white shadow-2xl dark:bg-slate-900" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between border-b border-slate-200 px-6 py-4 dark:border-slate-700">
              <div>
                <h4 className="text-xl font-semibold text-slate-950 dark:text-white">{galleryItems[index].title}</h4>
                <p className="text-sm text-slate-500 dark:text-slate-400">{galleryItems[index].description}</p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => setIndex((i) => (i - 1 + galleryItems.length) % galleryItems.length)}
                  className="rounded-lg border border-slate-200 bg-slate-100 px-4 py-2 text-sm text-slate-700 transition hover:bg-slate-200 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
                >
                  Prev
                </button>
                <button
                  onClick={() => setIndex((i) => (i + 1) % galleryItems.length)}
                  className="rounded-lg border border-slate-200 bg-slate-100 px-4 py-2 text-sm text-slate-700 transition hover:bg-slate-200 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
                >
                  Next
                </button>
                <button
                  onClick={() => setIndex(-1)}
                  className="rounded-lg border border-red-200 bg-red-100 px-4 py-2 text-sm text-red-700 transition hover:bg-red-200 dark:border-red-400/20 dark:bg-red-500/10 dark:text-red-200"
                >
                  Close
                </button>
              </div>
            </div>
            <div className="bg-slate-50 p-6 dark:bg-slate-950">
              <img src={galleryItems[index].image} alt={galleryItems[index].title} className="mx-auto max-h-[65vh] w-full object-contain" />
              <div className="mt-6 space-y-4 text-slate-700 dark:text-slate-300">
                <p>{galleryItems[index].description}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Gallery;
