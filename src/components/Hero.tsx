import { site } from "@/site.config";
import { rich, whatsappLink } from "@/lib/content";
import { Photo } from "./Photo";

export function Hero() {
  const { hero } = site;
  return (
    <section id="top" data-hero className="on-dark relative flex min-h-[100svh] flex-col overflow-hidden bg-ink text-paper">
      <div className="absolute inset-0">
        <Photo src={hero.image} alt={hero.alt} priority sizes="100vw" dataAttr={{ "data-hero-image": "" }} />
        {/* Darken the lower-left where the text sits so it stays readable on any photo */}
        <div className="absolute inset-0 bg-[linear-gradient(to_top,rgba(20,15,11,0.9)_0%,rgba(20,15,11,0.66)_45%,rgba(20,15,11,0.32)_75%,rgba(20,15,11,0.45)_100%)] md:bg-[linear-gradient(to_top,rgba(20,15,11,0.88)_0%,rgba(20,15,11,0.55)_42%,rgba(20,15,11,0.2)_70%,rgba(20,15,11,0.38)_100%)]" />
      </div>

      <div className="relative mx-auto flex w-full max-w-[1440px] flex-1 flex-col justify-end px-5 pt-32 pb-10 md:px-10 md:pb-14">
        <p className="eyebrow mb-6 text-paper/85" data-reveal>
          {hero.eyebrow} · {site.city}
        </p>
        <h1 className="font-display text-[clamp(2.9rem,8vw,7.6rem)] leading-[0.95]">
          {hero.title.map((line, i) => (
            <span className="line-mask" key={i}>
              <span>{rich(line)}</span>
            </span>
          ))}
        </h1>
        <div className="mt-8 flex flex-col gap-8 md:mt-10 md:flex-row md:items-end md:justify-between">
          <p className="max-w-[46ch] text-[0.98rem] leading-relaxed text-paper/85 md:text-[1.05rem]" data-reveal>
            {hero.text}
          </p>
          <div className="flex flex-wrap gap-3" data-reveal>
            <a href="#enquire" className="btn btn-light">
              Plan your event
            </a>
            <a href={whatsappLink()} target="_blank" rel="noopener" className="btn btn-ghost text-paper">
              WhatsApp us
            </a>
          </div>
        </div>
      </div>

      <div className="relative border-t border-paper/20" data-reveal>
        <ul className="mx-auto flex max-w-[1440px] flex-wrap items-center gap-x-8 gap-y-2 px-5 py-4 text-[0.7rem] uppercase tracking-[0.22em] text-paper/75 md:px-10">
          {hero.strip.map((s) => (
            <li key={s}>{s}</li>
          ))}
          <li className="ml-auto hidden md:block">
            <a href="#occasions" className="link-line pb-0.5">
              Scroll to explore ↓
            </a>
          </li>
        </ul>
      </div>
    </section>
  );
}
