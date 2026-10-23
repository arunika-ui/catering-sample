"use client";

import { useRef, useState, type KeyboardEvent } from "react";
import { site } from "@/site.config";
import { Photo } from "./Photo";

export function Menus() {
  const menus = site.menus;
  const [active, setActive] = useState(0);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);

  // Arrow keys move between tabs (WAI-ARIA tabs pattern)
  const onKey = (e: KeyboardEvent) => {
    const last = menus.length - 1;
    let next = active;
    if (e.key === "ArrowRight") next = active === last ? 0 : active + 1;
    else if (e.key === "ArrowLeft") next = active === 0 ? last : active - 1;
    else if (e.key === "Home") next = 0;
    else if (e.key === "End") next = last;
    else return;
    e.preventDefault();
    setActive(next);
    tabs.current[next]?.focus();
  };

  return (
    <section id="menus" aria-labelledby="menus-title" className="mx-auto max-w-[1440px] px-5 py-24 md:px-10 md:py-36">
      <div className="mb-12 flex flex-col gap-8 md:mb-16 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="eyebrow mb-6 text-accent" data-reveal>
            The menus
          </p>
          <h2 id="menus-title" className="font-display text-[clamp(2.4rem,5.6vw,5rem)] leading-[1]" data-lines>
            <span className="line-mask">
              <span>Written around</span>
            </span>
            <span className="line-mask">
              <span>
                <em className="accent-italic">your table.</em>
              </span>
            </span>
          </h2>
        </div>
        <p className="max-w-[38ch] text-[1rem] leading-relaxed text-muted" data-reveal>
          A taste of what our kitchen cooks. Your menu is built from scratch for each function — mix cuisines, add
          regional favourites, or bring a family recipe.
        </p>
      </div>

      <div
        role="tablist"
        aria-label="Cuisines"
        onKeyDown={onKey}
        className="no-scrollbar -mx-5 flex gap-8 overflow-x-auto border-b border-line px-5 md:mx-0 md:gap-12 md:px-0"
        data-reveal
      >
        {menus.map((m, i) => (
          <button
            key={m.id}
            ref={(el) => {
              tabs.current[i] = el;
            }}
            role="tab"
            type="button"
            id={`tab-${m.id}`}
            aria-selected={i === active}
            aria-controls={`panel-${m.id}`}
            tabIndex={i === active ? 0 : -1}
            onClick={() => setActive(i)}
            className={`font-display relative shrink-0 pb-4 text-[1.7rem] leading-none transition-colors md:text-[2.1rem] ${
              i === active ? "text-ink" : "text-ink/40 hover:text-ink/70"
            }`}
          >
            {m.label}
            <span
              aria-hidden
              className={`absolute inset-x-0 -bottom-px h-[2px] origin-left bg-accent transition-transform duration-500 ${
                i === active ? "scale-x-100" : "scale-x-0"
              }`}
            />
          </button>
        ))}
      </div>

      {menus.map((m, i) => (
        <div
          key={m.id}
          role="tabpanel"
          id={`panel-${m.id}`}
          aria-labelledby={`tab-${m.id}`}
          hidden={i !== active}
          tabIndex={0}
          className="grid gap-10 pt-10 md:grid-cols-12 md:gap-8 md:pt-14"
        >
          <div className="relative aspect-[4/3] overflow-hidden md:col-span-5 md:aspect-[4/5]">
            <Photo src={m.image} alt={m.alt} sizes="(min-width: 768px) 40vw, 100vw" className="animate-[menuIn_0.9s_ease-out]" />
          </div>
          <div className="md:col-span-6 md:col-start-7">
            <p className="font-display text-[1.6rem] italic leading-snug text-accent md:text-[1.9rem]">{m.intro}</p>
            <div className="mt-10 grid gap-x-10 gap-y-10 sm:grid-cols-2">
              {m.groups.map((g) => (
                <div key={g.title}>
                  <h3 className="mb-4 border-b border-line pb-3 text-[0.7rem] font-semibold uppercase tracking-[0.22em] text-muted">
                    {g.title}
                  </h3>
                  <ul className="space-y-2.5">
                    {g.items.map((item) => (
                      <li key={item} className="font-display text-[1.35rem] leading-snug">
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
            <div className="mt-12 flex flex-wrap items-center gap-x-8 gap-y-4 border-t border-line pt-8">
              <a href="#enquire" className="btn btn-solid">
                Request a full menu
              </a>
              {site.menuNote && <p className="text-[0.85rem] text-muted">{site.menuNote}</p>}
            </div>
          </div>
        </div>
      ))}
    </section>
  );
}
