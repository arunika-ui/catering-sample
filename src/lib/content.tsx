import { Fragment, type ReactNode } from "react";
import { site } from "@/site.config";

/** Renders "*text*" segments as italic accent type. */
export function rich(text: string): ReactNode {
  const parts = text.split(/(\*[^*]+\*)/g).filter(Boolean);
  return parts.map((part, i) =>
    part.startsWith("*") && part.endsWith("*") ? (
      <em key={i} className="accent-italic">
        {part.slice(1, -1)}
      </em>
    ) : (
      <Fragment key={i}>{part}</Fragment>
    ),
  );
}

export function whatsappLink(message?: string) {
  const text = message ?? `Hi ${site.name}! I'd like to plan an event. Could you share details?`;
  return `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(text)}`;
}

export const telLink = `tel:${site.phoneHref}`;
export const mailLink = `mailto:${site.email}`;

export const navLinks = [
  { href: "#occasions", label: "Occasions" },
  { href: "#menus", label: "Menus" },
  { href: "#gallery", label: "Gallery" },
  { href: "#process", label: "How we work" },
  { href: "#enquire", label: "Contact" },
];

/** Event name used to pre-select an occasion in the enquiry form. */
export const PREFILL_EVENT = "prefill-occasion";

export function prefillOccasion(eventType: string) {
  window.dispatchEvent(new CustomEvent(PREFILL_EVENT, { detail: eventType }));
}
