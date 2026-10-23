import { site } from "@/site.config";

export function Process() {
  return (
    <section id="process" aria-labelledby="process-title" className="border-t border-line bg-paper-deep">
      <div className="mx-auto max-w-[1440px] px-5 py-24 md:px-10 md:py-32">
        <div className="mb-14 grid gap-8 md:mb-20 md:grid-cols-12">
          <div className="md:col-span-6">
            <p className="eyebrow mb-6 text-accent" data-reveal>
              How we work
            </p>
            <h2 id="process-title" className="font-display text-[clamp(2.2rem,4.6vw,4.2rem)] leading-[1.02]" data-lines>
              <span className="line-mask">
                <span>From first call</span>
              </span>
              <span className="line-mask">
                <span>
                  to <em className="accent-italic">last plate.</em>
                </span>
              </span>
            </h2>
          </div>
        </div>

        <ol className="grid gap-12 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8" data-reveal-group>
          {site.process.map((p, i) => (
            <li key={p.title} className="border-t border-ink/25 pt-6" data-reveal>
              <span className="font-display block text-[3.4rem] leading-none text-accent">{String(i + 1).padStart(2, "0")}</span>
              <h3 className="mt-6 text-[0.8rem] font-semibold uppercase tracking-[0.18em]">{p.title}</h3>
              <p className="mt-3 max-w-[34ch] text-[0.98rem] leading-relaxed text-muted">{p.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

export function Testimonials() {
  const list = site.testimonials;
  if (!list.length) return null;
  return (
    <section aria-labelledby="reviews-title" className="mx-auto max-w-[1440px] px-5 py-24 md:px-10 md:py-32">
      <p className="eyebrow mb-6 text-accent" data-reveal>
        In their words
      </p>
      <h2 id="reviews-title" className="sr-only">
        Reviews
      </h2>
      <div className="grid gap-x-8 gap-y-16 md:grid-cols-2" data-reveal-group>
        {list.map((t, i) => (
          <figure key={t.name + i} className={i === 0 ? "md:col-span-2" : ""} data-reveal>
            <blockquote
              className={`font-display leading-[1.2] ${i === 0 ? "max-w-[30ch] text-[clamp(1.9rem,3.6vw,3.2rem)]" : "text-[1.6rem]"}`}
            >
              “{t.quote}”
            </blockquote>
            <figcaption className="mt-6 text-[0.75rem] uppercase tracking-[0.18em] text-muted">
              <span className="text-ink">{t.name}</span> · {t.context}
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}

export function Areas() {
  if (!site.areas.length) return null;
  return (
    <section aria-labelledby="areas-title" className="mx-auto max-w-[1440px] px-5 py-20 md:px-10 md:py-28">
      <div className="grid gap-8 md:grid-cols-12">
        <div className="md:col-span-3">
          <h2 id="areas-title" className="eyebrow text-accent" data-reveal>
            Where we cater
          </h2>
        </div>
        <div className="md:col-span-9">
          <ul className="font-display flex flex-wrap items-baseline gap-x-5 gap-y-1 text-[clamp(2rem,4.4vw,3.8rem)] leading-[1.15]" data-reveal>
            {site.areas.map((a, i) => (
              <li key={a} className="flex items-baseline gap-5">
                {a}
                {i < site.areas.length - 1 && (
                  <span aria-hidden className="text-accent">
                    ·
                  </span>
                )}
              </li>
            ))}
          </ul>
          {site.areasNote && (
            <p className="mt-6 text-[0.98rem] text-muted" data-reveal>
              {site.areasNote}
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
