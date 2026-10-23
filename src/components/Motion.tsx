"use client";

import { useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/**
 * Page-wide scroll animations, driven by data attributes:
 *  data-hero           – hero entrance (lines + image settle)
 *  data-lines          – heading whose .line-mask lines slide up
 *  data-reveal         – fades/slides up when scrolled into view
 *  data-reveal-group   – children with data-reveal stagger together
 *  data-mask           – image wipes in from bottom
 *  data-parallax="n"   – drifts n% while scrolling past
 * Everything is skipped for visitors who prefer reduced motion.
 */
export function Motion() {
  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const root = document.documentElement;
    const mm = gsap.matchMedia();
    // Remove the pre-paint hiding first, so tweens read the real end state.
    // (Same tick as gsap.from() below, so nothing flashes.)
    root.classList.remove("motion-pending");

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const ease = "power3.out";

      // Hero
      const hero = document.querySelector<HTMLElement>("[data-hero]");
      if (hero) {
        const tl = gsap.timeline({ defaults: { ease } });
        tl.from(hero.querySelectorAll("[data-hero-image]"), { scale: 1.12, duration: 2.2, ease: "power2.out" }, 0)
          .from(hero.querySelectorAll(".line-mask > span"), { yPercent: 110, opacity: 0, duration: 1.2, stagger: 0.12 }, 0.2)
          .from(hero.querySelectorAll("[data-reveal]"), { y: 24, opacity: 0, duration: 1, stagger: 0.1 }, 0.7);
      }

      // Headings line by line
      gsap.utils.toArray<HTMLElement>("[data-lines]").forEach((el) => {
        if (el.closest("[data-hero]")) return;
        gsap.from(el.querySelectorAll(".line-mask > span"), {
          yPercent: 110,
          opacity: 0,
          duration: 1.1,
          stagger: 0.1,
          ease,
          scrollTrigger: { trigger: el, start: "top 85%", once: true },
        });
      });

      // Groups that stagger
      gsap.utils.toArray<HTMLElement>("[data-reveal-group]").forEach((group) => {
        gsap.from(group.querySelectorAll("[data-reveal]"), {
          y: 32,
          opacity: 0,
          duration: 1,
          stagger: 0.09,
          ease,
          scrollTrigger: { trigger: group, start: "top 82%", once: true },
        });
      });

      // Single reveals
      gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach((el) => {
        if (el.closest("[data-hero]") || el.closest("[data-reveal-group]")) return;
        gsap.from(el, {
          y: 32,
          opacity: 0,
          duration: 1,
          ease,
          scrollTrigger: { trigger: el, start: "top 88%", once: true },
        });
      });

      // Image wipes
      gsap.utils.toArray<HTMLElement>("[data-mask]").forEach((el) => {
        const tl = gsap.timeline({ scrollTrigger: { trigger: el, start: "top 85%", once: true } });
        tl.fromTo(el, { clipPath: "inset(100% 0% 0% 0%)" }, { clipPath: "inset(0% 0% 0% 0%)", duration: 1.4, ease: "power4.inOut" });
        const inner = el.querySelector("img, .photo-placeholder");
        if (inner) tl.from(inner, { scale: 1.18, duration: 1.8, ease: "power2.out" }, 0);
      });

      // Parallax
      gsap.utils.toArray<HTMLElement>("[data-parallax]").forEach((el) => {
        const amount = Number(el.dataset.parallax) || 8;
        gsap.fromTo(
          el,
          { yPercent: -amount / 2 },
          {
            yPercent: amount / 2,
            ease: "none",
            scrollTrigger: { trigger: el.parentElement ?? el, start: "top bottom", end: "bottom top", scrub: true },
          },
        );
      });
    });

    // Recalculate once fonts and images have settled
    const refresh = () => ScrollTrigger.refresh();
    window.addEventListener("load", refresh);
    document.fonts?.ready.then(refresh);

    return () => {
      window.removeEventListener("load", refresh);
      mm.revert();
    };
  }, []);

  return null;
}
