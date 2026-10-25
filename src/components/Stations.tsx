import { site } from "@/site.config";
import { Photo } from "./Photo";

export function Stations() {
  return (
    <section aria-labelledby="stations-title" className="bg-paper-deep">
      <div className="mx-auto grid max-w-[1440px] gap-12 px-5 py-24 md:grid-cols-12 md:gap-8 md:px-10 md:py-32">
        <div className="md:col-span-5">
          <div className="md:sticky md:top-28">
            <p className="eyebrow mb-6 text-accent" data-reveal>
              Live counters
            </p>
            <h2 id="stations-title" className="font-display text-[clamp(2.2rem,4.6vw,4.2rem)] leading-[1.02]" data-lines>
              <span className="line-mask">
                <span>Cooked in front</span>
              </span>
              <span className="line-mask">
                <span>
                  of <em className="accent-italic">your guests.</em>
                </span>
              </span>
            </h2>
            <div className="relative mt-10 aspect-[4/3] overflow-hidden md:aspect-[5/4]" data-mask>
              <Photo src={site.stationsImage} alt={site.stationsImageAlt} sizes="(min-width: 768px) 40vw, 100vw" />
            </div>
          </div>
        </div>

        <ol className="md:col-span-6 md:col-start-7 md:pt-24" data-reveal-group>
          {site.stations.map((s, i) => (
            <li
              key={s.name}
              className="group grid grid-cols-[2.5rem_1fr] items-baseline border-t border-ink/20 py-6 last:border-b md:py-7"
              data-reveal
            >
              <span className="text-[0.72rem] tracking-[0.2em] text-muted">{String(i + 1).padStart(2, "0")}</span>
              <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6">
                <h3 className="font-display text-[clamp(1.7rem,2.6vw,2.3rem)] leading-tight transition-colors duration-300 group-hover:text-accent">
                  {s.name}
                </h3>
                <p className="text-[0.92rem] text-muted sm:text-right">{s.note}</p>
              </div>
            </li>
          ))}
          <li className="pt-8" data-reveal>
            <a href="#enquire" className="link-line pb-1 text-[0.78rem] font-semibold uppercase tracking-[0.18em]">
              Add counters to your menu →
            </a>
          </li>
        </ol>
      </div>
    </section>
  );
}
