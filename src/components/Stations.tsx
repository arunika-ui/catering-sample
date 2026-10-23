"use client";

import { useEffect, useRef, useState } from "react";
import { site } from "@/site.config";
import { Photo } from "./Photo";

export function Stations() {
  const track = useRef<HTMLUListElement>(null);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);

  useEffect(() => {
    const el = track.current;
    if (!el) return;
    const update = () => {
      setAtStart(el.scrollLeft < 8);
      setAtEnd(el.scrollLeft + el.clientWidth >= el.scrollWidth - 8);
    };
    update();
    el.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      el.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  const scroll = (dir: 1 | -1) => {
    const el = track.current;
    if (!el) return;
    const card = el.querySelector("li");
    const step = card ? card.getBoundingClientRect().width + 24 : el.clientWidth * 0.8;
    el.scrollBy({ left: dir * step, behavior: "smooth" });
  };

  return (
    <section aria-labelledby="stations-title" className="bg-paper-deep py-24 md:py-32">
      <div className="mx-auto max-w-[1440px] px-5 md:px-10">
        <div className="mb-12 flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="eyebrow mb-6 text-accent" data-reveal>
              Live counters
            </p>
            <h2 id="stations-title" className="font-display text-[clamp(2.2rem,4.6vw,4.2rem)] leading-[1.02]" data-lines>
              <span className="line-mask">
                <span>
                  Cooked in front of <em className="accent-italic">your guests.</em>
                </span>
              </span>
            </h2>
          </div>
          <div className="flex gap-2" data-reveal>
            <button
              type="button"
              onClick={() => scroll(-1)}
              disabled={atStart}
              aria-label="Previous counters"
              className="flex h-12 w-12 items-center justify-center border border-ink/30 transition-colors hover:bg-ink hover:text-paper disabled:pointer-events-none disabled:opacity-30"
            >
              ←
            </button>
            <button
              type="button"
              onClick={() => scroll(1)}
              disabled={atEnd}
              aria-label="Next counters"
              className="flex h-12 w-12 items-center justify-center border border-ink/30 transition-colors hover:bg-ink hover:text-paper disabled:pointer-events-none disabled:opacity-30"
            >
              →
            </button>
          </div>
        </div>
      </div>

      <ul
        ref={track}
        className="no-scrollbar flex snap-x snap-mandatory scroll-px-5 gap-6 overflow-x-auto px-5 pb-2 md:scroll-px-10 md:px-10 xl:px-[max(2.5rem,calc((100vw-1440px)/2+2.5rem))]"
        aria-label="Live counter options"
        data-reveal
      >
        {site.stations.map((s, i) => (
          <li key={s.name} className="w-[76vw] shrink-0 snap-start sm:w-[42vw] lg:w-[27vw] xl:w-[340px]">
            <div className="group relative aspect-[3/4] overflow-hidden">
              <Photo src={s.image} alt={s.alt} sizes="(min-width: 1024px) 27vw, 76vw" imgClassName="transition-transform duration-[1.2s] ease-out group-hover:scale-105" />
            </div>
            <div className="mt-5 flex items-baseline gap-4">
              <span className="text-[0.7rem] tracking-[0.2em] text-muted">{String(i + 1).padStart(2, "0")}</span>
              <div>
                <h3 className="font-display text-[1.75rem] leading-tight">{s.name}</h3>
                <p className="mt-1 text-[0.9rem] text-muted">{s.note}</p>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
