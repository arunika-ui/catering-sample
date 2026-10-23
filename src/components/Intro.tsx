import { site } from "@/site.config";
import { rich } from "@/lib/content";
import { Photo } from "./Photo";

export function Intro() {
  const { intro } = site;
  return (
    <section aria-labelledby="intro-title" className="mx-auto max-w-[1440px] px-5 py-24 md:px-10 md:py-36">
      <div className="grid gap-10 md:grid-cols-12 md:gap-8">
        <div className="md:col-span-8">
          <p className="eyebrow mb-8 text-accent" data-reveal>
            {intro.eyebrow}
            {site.establishedYear ? ` · Since ${site.establishedYear}` : ""}
          </p>
          <h2 id="intro-title" className="font-display text-[clamp(2rem,4.4vw,3.9rem)] leading-[1.08]" data-reveal>
            {rich(intro.statement)}
          </h2>
        </div>
      </div>

      <div className="mt-16 grid gap-10 md:mt-24 md:grid-cols-12 md:gap-8">
        <div className="relative aspect-[4/5] overflow-hidden md:col-span-6 md:col-start-1" data-mask>
          <Photo src={intro.imageLarge} alt={intro.imageLargeAlt} sizes="(min-width: 768px) 50vw, 100vw" />
        </div>

        <div className="flex flex-col justify-between gap-12 md:col-span-5 md:col-start-8">
          <div className="space-y-5 text-[1.02rem] leading-[1.75] text-muted" data-reveal-group>
            {intro.paragraphs.map((p) => (
              <p key={p} data-reveal>
                {p}
              </p>
            ))}
            <p data-reveal>
              <a href="#process" className="link-line pb-1 text-[0.78rem] font-semibold uppercase tracking-[0.18em] text-ink">
                How we work →
              </a>
            </p>
          </div>
          <div className="relative ml-auto aspect-[5/4] w-[78%] overflow-hidden md:w-[88%]" data-mask>
            <Photo src={intro.imageSmall} alt={intro.imageSmallAlt} sizes="(min-width: 768px) 35vw, 80vw" />
          </div>
        </div>
      </div>

      {intro.stats.length > 0 && (
        <dl className="mt-20 grid grid-cols-2 gap-y-10 border-t border-line pt-10 md:grid-cols-4" data-reveal-group>
          {intro.stats.map((s) => (
            <div key={s.label} className="flex flex-col-reverse" data-reveal>
              <dt className="mt-2 text-[0.72rem] uppercase tracking-[0.2em] text-muted">{s.label}</dt>
              <dd className="font-display text-[3.2rem] leading-none">{s.value}</dd>
            </div>
          ))}
        </dl>
      )}
    </section>
  );
}
