"use client";

import { useEffect, useState } from "react";
import { site } from "@/site.config";
import { mailLink, navLinks, telLink, whatsappLink } from "@/lib/content";

export function Footer() {
  return (
    <footer className="on-dark border-t border-line-dark bg-ink text-paper">
      <div className="mx-auto max-w-[1440px] px-5 pt-20 pb-28 md:px-10 md:pb-10">
        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-5">
            <p className="font-display text-[clamp(2.6rem,5vw,4.4rem)] leading-none">{site.name}</p>
            <p className="mt-3 text-[0.72rem] uppercase tracking-[0.24em] text-paper/55">
              {site.descriptor} · {site.city}
            </p>
          </div>

          <nav aria-label="Footer" className="md:col-span-2 md:col-start-7">
            <h2 className="mb-4 text-[0.7rem] uppercase tracking-[0.2em] text-paper/45">Explore</h2>
            <ul className="space-y-2 text-[0.95rem]">
              {navLinks.map((l) => (
                <li key={l.href}>
                  <a href={l.href} className="link-line pb-0.5 text-paper/80 hover:text-paper">
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="md:col-span-3 md:col-start-10">
            <h2 className="mb-4 text-[0.7rem] uppercase tracking-[0.2em] text-paper/45">Contact</h2>
            <address className="space-y-2 text-[0.95rem] not-italic text-paper/80">
              <p>
                <a href={telLink} className="link-line pb-0.5">
                  {site.phoneDisplay}
                </a>
              </p>
              <p>
                <a href={mailLink} className="link-line pb-0.5 break-all">
                  {site.email}
                </a>
              </p>
              <p className="pt-2 leading-relaxed">
                {site.mapUrl ? (
                  <a href={site.mapUrl} target="_blank" rel="noopener" className="link-line pb-0.5">
                    {site.address.join(", ")}
                  </a>
                ) : (
                  site.address.join(", ")
                )}
              </p>
            </address>
            {site.social.length > 0 && (
              <ul className="mt-6 flex flex-wrap gap-x-5 gap-y-2 text-[0.75rem] uppercase tracking-[0.18em]">
                {site.social.map((s) => (
                  <li key={s.href}>
                    <a href={s.href} target="_blank" rel="noopener" className="link-line pb-0.5 text-paper/80">
                      {s.label}
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        <div className="mt-20 flex flex-col gap-3 border-t border-line-dark pt-6 text-[0.75rem] text-paper/45 md:flex-row md:justify-between">
          <p>
            © {new Date().getFullYear()} {site.name}. All rights reserved.
          </p>
          {site.areas.length > 0 && <p>Catering across {site.areas.join(", ")}</p>}
        </div>
      </div>
    </footer>
  );
}

/** Call / WhatsApp / Enquire bar on phones, shown once the hero is passed. */
export function MobileBar() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const onScroll = () => {
      const enquire = document.getElementById("enquire");
      const pastHero = window.scrollY > window.innerHeight * 0.8;
      const atForm = enquire ? enquire.getBoundingClientRect().top < window.innerHeight * 0.6 : false;
      setShow(pastHero && !atForm);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className={`fixed inset-x-0 bottom-0 z-40 grid grid-cols-3 border-t border-line-dark bg-ink text-paper transition-transform duration-500 md:hidden ${
        show ? "translate-y-0" : "translate-y-full"
      }`}
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
      aria-hidden={!show}
      inert={!show}
    >
      <a href={telLink} className="flex h-14 items-center justify-center text-[0.72rem] font-semibold uppercase tracking-[0.16em]">
        Call
      </a>
      <a
        href={whatsappLink()}
        target="_blank"
        rel="noopener"
        className="flex h-14 items-center justify-center border-x border-line-dark text-[0.72rem] font-semibold uppercase tracking-[0.16em]"
      >
        WhatsApp
      </a>
      <a href="#enquire" className="flex h-14 items-center justify-center bg-accent text-[0.72rem] font-semibold uppercase tracking-[0.16em] text-white">
        Enquire
      </a>
    </div>
  );
}
