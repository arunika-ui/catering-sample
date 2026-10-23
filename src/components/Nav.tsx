"use client";

import { useEffect, useRef, useState } from "react";
import { site } from "@/site.config";
import { navLinks, telLink, whatsappLink } from "@/lib/content";

export function Nav() {
  const [solid, setSolid] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);

  // Solid background after the hero; hide while scrolling down, show on scroll up
  useEffect(() => {
    let last = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      setSolid(y > window.innerHeight * 0.75);
      setHidden(y > last && y > window.innerHeight);
      last = y;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Mobile menu: lock scroll, close on Escape, keep focus inside
  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = "hidden";
    const first = menuRef.current?.querySelector<HTMLElement>("a, button");
    first?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
      }
      if (e.key === "Tab" && menuRef.current) {
        const items = [toggleRef.current!, ...menuRef.current.querySelectorAll<HTMLElement>("a, button")];
        const i = items.indexOf(document.activeElement as HTMLElement);
        if (e.shiftKey && i <= 0) {
          e.preventDefault();
          items[items.length - 1].focus();
        } else if (!e.shiftKey && i === items.length - 1) {
          e.preventDefault();
          items[0].focus();
        }
      }
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const light = !solid && !open;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-[transform,background-color,color,box-shadow] duration-500 ${
        hidden && !open ? "-translate-y-full" : ""
      } ${solid && !open ? "bg-paper/92 text-ink shadow-[0_1px_0_var(--color-line)] backdrop-blur-md" : ""} ${
        light ? "text-paper" : "text-ink"
      }`}
    >
      <div className="mx-auto flex h-[72px] max-w-[1440px] items-center justify-between gap-6 px-5 md:px-10">
        <a href="#top" className="relative z-10 flex flex-col leading-none" aria-label={`${site.name} — back to top`}>
          <span className="font-display whitespace-nowrap text-[1.6rem] md:text-[1.85rem]">{site.name}</span>
          <span className="mt-1 text-[0.6rem] uppercase tracking-[0.28em] opacity-75">{site.city}</span>
        </a>

        <nav aria-label="Main" className="hidden lg:block">
          <ul className="flex items-center gap-9 text-[0.78rem] font-medium uppercase tracking-[0.16em]">
            {navLinks.map((l) => (
              <li key={l.href}>
                <a href={l.href} className="link-line pb-1">
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="relative z-10 flex items-center gap-3">
          <a href={telLink} className="link-line hidden pb-1 text-[0.8rem] font-medium tracking-wide xl:inline">
            {site.phoneDisplay}
          </a>
          <a href="#enquire" className={`btn hidden sm:inline-flex ${light ? "btn-light" : "btn-solid"}`}>
            Plan your event
          </a>
          <button
            ref={toggleRef}
            type="button"
            className="flex h-11 w-11 items-center justify-center lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((o) => !o)}
          >
            <span className="relative block h-3 w-6">
              <span
                className={`absolute left-0 h-px w-6 bg-current transition-transform duration-300 ${open ? "top-1.5 rotate-45" : "top-0"}`}
              />
              <span
                className={`absolute left-0 h-px w-6 bg-current transition-transform duration-300 ${open ? "top-1.5 -rotate-45" : "top-3"}`}
              />
            </span>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        id="mobile-menu"
        ref={menuRef}
        className={`fixed inset-0 z-0 flex flex-col bg-paper px-5 pt-28 pb-10 transition-[opacity,visibility] duration-500 lg:hidden ${
          open ? "visible opacity-100" : "invisible opacity-0"
        }`}
        aria-hidden={!open}
      >
        <nav aria-label="Mobile">
          <ul className="space-y-1">
            {navLinks.map((l, i) => (
              <li
                key={l.href}
                className="transition-[transform,opacity] duration-700"
                style={{
                  transitionDelay: open ? `${80 + i * 50}ms` : "0ms",
                  transform: open ? "none" : "translateY(16px)",
                  opacity: open ? 1 : 0,
                }}
              >
                <a
                  href={l.href}
                  tabIndex={open ? 0 : -1}
                  onClick={() => setOpen(false)}
                  className="font-display block py-1.5 text-[2.6rem] leading-tight"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <div className="mt-auto space-y-3 border-t border-line pt-6 text-sm">
          <a href={telLink} tabIndex={open ? 0 : -1} className="block">
            Call {site.phoneDisplay}
          </a>
          <a href={whatsappLink()} target="_blank" rel="noopener" tabIndex={open ? 0 : -1} className="block">
            WhatsApp us
          </a>
          <a href="#enquire" tabIndex={open ? 0 : -1} onClick={() => setOpen(false)} className="btn btn-solid mt-4 w-full">
            Plan your event
          </a>
        </div>
      </div>
    </header>
  );
}
