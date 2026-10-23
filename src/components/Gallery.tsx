"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { site } from "@/site.config";
import { Photo } from "./Photo";

const shapeClass: Record<string, string> = {
  big: "col-span-2 row-span-2",
  tall: "row-span-2",
  wide: "col-span-2",
};

export function Gallery() {
  const all = site.gallery;
  const categories = useMemo(() => ["All", ...Array.from(new Set(all.map((g) => g.category)))], [all]);
  const [filter, setFilter] = useState("All");
  const items = filter === "All" ? all : all.filter((g) => g.category === filter);

  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const dialog = useRef<HTMLDialogElement>(null);
  const opener = useRef<HTMLElement | null>(null);

  const open = (i: number, el: HTMLElement) => {
    opener.current = el;
    setOpenIndex(i);
    dialog.current?.showModal();
  };
  const close = useCallback(() => {
    dialog.current?.close();
  }, []);
  const step = useCallback(
    (dir: 1 | -1) => setOpenIndex((i) => (i === null ? i : (i + dir + items.length) % items.length)),
    [items.length],
  );

  useEffect(() => {
    const d = dialog.current;
    if (!d) return;
    const onClose = () => {
      setOpenIndex(null);
      opener.current?.focus();
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    d.addEventListener("close", onClose);
    d.addEventListener("keydown", onKey);
    return () => {
      d.removeEventListener("close", onClose);
      d.removeEventListener("keydown", onKey);
    };
  }, [step]);

  const current = openIndex !== null ? items[openIndex] : null;

  return (
    <section id="gallery" aria-labelledby="gallery-title" className="mx-auto max-w-[1440px] px-5 py-24 md:px-10 md:py-36">
      <div className="mb-12 grid gap-8 md:grid-cols-12 md:items-end">
        <div className="md:col-span-7">
          <p className="eyebrow mb-6 text-accent" data-reveal>
            From recent events
          </p>
          <h2 id="gallery-title" className="font-display text-[clamp(2.4rem,5.6vw,5rem)] leading-[1]" data-lines>
            <span className="line-mask">
              <span>
                The table, <em className="accent-italic">set.</em>
              </span>
            </span>
          </h2>
        </div>
        <div
          role="group"
          aria-label="Filter photos"
          className="flex flex-wrap gap-x-6 gap-y-2 md:col-span-5 md:justify-end"
          data-reveal
        >
          {categories.map((c) => (
            <button
              key={c}
              type="button"
              aria-pressed={filter === c}
              onClick={() => setFilter(c)}
              className={`pb-1 text-[0.75rem] font-semibold uppercase tracking-[0.18em] transition-colors ${
                filter === c ? "border-b border-accent text-ink" : "text-ink/45 hover:text-ink"
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      <ul className="grid auto-rows-[44vw] grid-flow-dense grid-cols-2 gap-3 sm:auto-rows-[30vw] md:grid-cols-4 md:gap-4 lg:auto-rows-[17vw] xl:auto-rows-[250px]">
        {items.map((g, i) => (
          <li key={g.src} className={`${filter === "All" ? shapeClass[g.shape ?? ""] ?? "" : ""} animate-[menuIn_0.6s_ease-out]`}>
            <button
              type="button"
              onClick={(e) => open(i, e.currentTarget)}
              className="group relative block h-full w-full overflow-hidden"
              aria-label={`View photo: ${g.alt}`}
            >
              <Photo
                src={g.src}
                alt={g.alt}
                sizes="(min-width: 768px) 25vw, 50vw"
                imgClassName="transition-transform duration-[1.2s] ease-out group-hover:scale-[1.04]"
              />
              <span className="pointer-events-none absolute inset-x-0 bottom-0 translate-y-2 bg-[linear-gradient(to_top,rgba(20,15,11,0.7),transparent)] p-4 pt-10 text-left text-[0.72rem] uppercase tracking-[0.18em] text-paper opacity-0 transition-[opacity,transform] duration-500 group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:opacity-100">
                {g.category}
              </span>
            </button>
          </li>
        ))}
      </ul>

      <dialog
        ref={dialog}
        aria-label="Photo viewer"
        className="m-0 h-full max-h-none w-full max-w-none bg-ink/96 p-0 text-paper backdrop:bg-ink/80"
        onClick={(e) => {
          if (e.target === e.currentTarget) close();
        }}
      >
        {current && (
          <div className="flex h-full flex-col">
            <div className="flex items-center justify-between px-5 py-4 text-[0.75rem] uppercase tracking-[0.18em] md:px-10">
              <span>
                {(openIndex ?? 0) + 1} / {items.length} · {current.category}
              </span>
              <button type="button" onClick={close} className="h-11 px-2" autoFocus>
                Close ✕
              </button>
            </div>
            <div className="relative mx-5 flex-1 md:mx-24" onClick={close}>
              <div className="relative h-full w-full" onClick={(e) => e.stopPropagation()}>
                <Photo src={current.src} alt={current.alt} sizes="100vw" imgClassName="!object-contain" />
              </div>
            </div>
            <div className="flex items-center justify-between gap-4 px-5 py-5 md:px-10">
              <button type="button" onClick={() => step(-1)} className="h-11 px-2 text-[0.75rem] uppercase tracking-[0.18em]">
                ← Previous
              </button>
              <p className="hidden text-center text-sm text-paper/70 sm:block">{current.alt}</p>
              <button type="button" onClick={() => step(1)} className="h-11 px-2 text-[0.75rem] uppercase tracking-[0.18em]">
                Next →
              </button>
            </div>
          </div>
        )}
      </dialog>
    </section>
  );
}
