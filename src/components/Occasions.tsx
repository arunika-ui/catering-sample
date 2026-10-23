"use client";

import { useState } from "react";
import { site } from "@/site.config";
import { prefillOccasion } from "@/lib/content";
import { Photo } from "./Photo";

// Maps an occasion to the matching option in the enquiry form
const formType: Record<string, string> = {
  weddings: "Wedding",
  sangeet: "Pre-wedding / Sangeet",
  corporate: "Corporate event",
  private: "Birthday / Anniversary",
  outdoor: "Other",
};

export function Occasions() {
  const items = site.occasions;
  const [active, setActive] = useState(0);

  return (
    <section id="occasions" aria-labelledby="occasions-title" className="on-dark bg-ink text-paper">
      <div className="mx-auto max-w-[1440px] px-5 py-24 md:px-10 md:py-36">
        <div className="mb-14 grid gap-8 md:mb-20 md:grid-cols-12">
          <div className="md:col-span-7">
            <p className="eyebrow mb-6 text-accent-light" data-reveal>
              What we cater
            </p>
            <h2 id="occasions-title" className="font-display text-[clamp(2.4rem,5.6vw,5rem)] leading-[1]" data-lines>
              <span className="line-mask">
                <span>Every kind of</span>
              </span>
              <span className="line-mask">
                <span>
                  <em className="accent-italic">gathering.</em>
                </span>
              </span>
            </h2>
          </div>
          <p className="self-end text-[1rem] leading-relaxed text-paper/70 md:col-span-4 md:col-start-9" data-reveal>
            One kitchen, one team and one point of contact — whether it's five functions across a wedding week or a
            single working lunch.
          </p>
        </div>

        <div className="grid gap-12 md:grid-cols-12 md:gap-8">
          <ul className="border-t border-line-dark md:col-span-6" data-reveal-group>
            {items.map((o, i) => {
              const isActive = i === active;
              return (
                <li key={o.id} className="border-b border-line-dark" data-reveal onMouseEnter={() => setActive(i)}>
                  <h3>
                    <button
                      type="button"
                      id={`occasion-${o.id}`}
                      aria-expanded={isActive}
                      aria-controls={`occasion-panel-${o.id}`}
                      onClick={() => setActive(i)}
                      onFocus={() => setActive(i)}
                      className="group flex w-full items-baseline gap-5 py-6 text-left md:py-7"
                    >
                      <span className="w-8 shrink-0 text-[0.72rem] tracking-[0.2em] text-paper/50">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span
                        className={`font-display text-[clamp(1.8rem,3.2vw,2.9rem)] leading-[1.05] transition-[color,transform] duration-500 ${
                          isActive ? "translate-x-2 text-paper" : "text-paper/55 group-hover:text-paper/80"
                        }`}
                      >
                        {o.title}
                      </span>
                    </button>
                  </h3>
                  <div
                    id={`occasion-panel-${o.id}`}
                    role="region"
                    aria-labelledby={`occasion-${o.id}`}
                    inert={!isActive}
                    className={`grid transition-[grid-template-rows,opacity] duration-500 ease-out ${
                      isActive ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                    }`}
                  >
                    <div className="overflow-hidden">
                      <div className="pb-8 pl-[3.25rem]">
                        {/* Photo inline on small screens */}
                        <div className="relative mb-6 aspect-[4/3] overflow-hidden md:hidden">
                          <Photo src={o.image} alt={o.alt} sizes="100vw" />
                        </div>
                        <p className="max-w-[44ch] text-[1.02rem] leading-relaxed text-paper/85">{o.blurb}</p>
                        <ul className="mt-5 space-y-2 text-[0.92rem] text-paper/65">
                          {o.details.map((d) => (
                            <li key={d} className="flex gap-3">
                              <span aria-hidden className="mt-[0.7em] h-px w-3 shrink-0 bg-accent-light" />
                              {d}
                            </li>
                          ))}
                        </ul>
                        <a
                          href="#enquire"
                          onClick={() => prefillOccasion(formType[o.id] ?? "Other")}
                          className="link-line mt-7 inline-block pb-1 text-[0.75rem] font-semibold uppercase tracking-[0.18em] text-accent-light"
                        >
                          Enquire about {o.title.toLowerCase()} →
                        </a>
                      </div>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>

          {/* Sticky image stack on larger screens */}
          <div className="hidden md:col-span-5 md:col-start-8 md:block">
            <div className="sticky top-28 aspect-[4/5] overflow-hidden" data-mask>
              {items.map((o, i) => (
                <div
                  key={o.id}
                  aria-hidden={i !== active}
                  className={`absolute inset-0 transition-[opacity,transform] duration-[900ms] ease-out ${
                    i === active ? "scale-100 opacity-100" : "scale-[1.06] opacity-0"
                  }`}
                >
                  <Photo src={o.image} alt={o.alt} sizes="40vw" />
                </div>
              ))}
              <p className="absolute bottom-0 left-0 bg-ink px-4 py-3 text-[0.7rem] uppercase tracking-[0.2em] text-paper/80">
                {items[active].title}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
