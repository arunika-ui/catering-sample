"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { site } from "@/site.config";
import { mailLink, PREFILL_EVENT, telLink, whatsappLink } from "@/lib/content";

/**
 * Where submissions go:
 * - If NEXT_PUBLIC_FORM_ENDPOINT is set (e.g. a Formspree, Getform or
 *   Web3Forms URL), the form posts JSON there and shows the real result.
 * - Otherwise the form opens WhatsApp with the enquiry written out, so the
 *   caterer still receives it. Nothing pretends to "send" when it can't.
 */
const ENDPOINT = process.env.NEXT_PUBLIC_FORM_ENDPOINT ?? "";

type Fields = {
  name: string;
  phone: string;
  email: string;
  eventType: string;
  date: string;
  guests: string;
  venue: string;
  message: string;
  company: string; // honeypot — real visitors never see or fill it
};

const empty: Fields = { name: "", phone: "", email: "", eventType: "", date: "", guests: "", venue: "", message: "", company: "" };

type Errors = Partial<Record<keyof Fields, string>>;
type Status = "idle" | "sending" | "sent" | "whatsapp" | "error";

function today() {
  const d = new Date();
  d.setMinutes(d.getMinutes() - d.getTimezoneOffset());
  return d.toISOString().slice(0, 10);
}

function validate(f: Fields): Errors {
  const e: Errors = {};
  if (f.name.trim().length < 2) e.name = "Please tell us your name.";
  const digits = f.phone.replace(/\D/g, "").replace(/^(91|0)(?=\d{10}$)/, "");
  if (!/^[6-9]\d{9}$/.test(digits)) e.phone = "Enter a 10-digit mobile number.";
  if (f.email && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(f.email)) e.email = "That email doesn't look right.";
  if (!f.eventType) e.eventType = "Choose the kind of event.";
  if (f.date && f.date < today()) e.date = "Pick a date that's still ahead.";
  const g = Number(f.guests);
  if (!f.guests || !Number.isFinite(g) || g < 1) e.guests = "Roughly how many guests?";
  return e;
}

function summary(f: Fields) {
  return [
    `Hi ${site.name}, I'd like to enquire about catering.`,
    ``,
    `Name: ${f.name}`,
    `Phone: ${f.phone}`,
    f.email && `Email: ${f.email}`,
    `Event: ${f.eventType}`,
    f.date && `Date: ${new Date(f.date).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })}`,
    `Guests: ${f.guests}`,
    f.venue && `Venue / area: ${f.venue}`,
    f.message && `\n${f.message}`,
  ]
    .filter(Boolean)
    .join("\n");
}

export function Enquiry() {
  const [f, setF] = useState<Fields>(empty);
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<Status>("idle");
  const [waUrl, setWaUrl] = useState("");
  const formRef = useRef<HTMLFormElement>(null);
  const statusRef = useRef<HTMLDivElement>(null);

  // Occasion links elsewhere on the page pre-select the event type
  useEffect(() => {
    const onPrefill = (e: Event) => {
      const value = (e as CustomEvent<string>).detail;
      setF((prev) => ({ ...prev, eventType: value }));
    };
    window.addEventListener(PREFILL_EVENT, onPrefill);
    return () => window.removeEventListener(PREFILL_EVENT, onPrefill);
  }, []);

  const set = (key: keyof Fields) => (e: { target: { value: string } }) => {
    setF((prev) => ({ ...prev, [key]: e.target.value }));
    if (errors[key]) setErrors((prev) => ({ ...prev, [key]: undefined }));
  };

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (f.company) return; // bot
    const found = validate(f);
    setErrors(found);
    const firstKey = Object.keys(found)[0];
    if (firstKey) {
      formRef.current?.querySelector<HTMLElement>(`[name="${firstKey}"]`)?.focus();
      return;
    }

    if (!ENDPOINT) {
      const url = whatsappLink(summary(f));
      setWaUrl(url);
      window.open(url, "_blank", "noopener");
      setStatus("whatsapp");
      setTimeout(() => statusRef.current?.focus(), 50);
      return;
    }

    setStatus("sending");
    try {
      const { company: _c, ...payload } = f;
      void _c;
      const res = await fetch(ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({ ...payload, _subject: `New catering enquiry — ${f.eventType}` }),
      });
      if (!res.ok) throw new Error(String(res.status));
      setStatus("sent");
      setF(empty);
    } catch {
      setWaUrl(whatsappLink(summary(f)));
      setStatus("error");
    }
    setTimeout(() => statusRef.current?.focus(), 50);
  };

  const field = "w-full border-0 border-b border-paper/30 bg-transparent px-0 py-3 text-[1rem] text-paper placeholder:text-paper/40 transition-colors focus:border-accent-light focus:outline-none focus-visible:outline-none";
  const label = "block text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-paper/60";
  const err = (k: keyof Fields) =>
    errors[k] ? (
      <p id={`${k}-error`} className="mt-2 text-[0.82rem] text-[#f0a58a]">
        {errors[k]}
      </p>
    ) : null;
  const aria = (k: keyof Fields) => ({
    "aria-invalid": errors[k] ? true : undefined,
    "aria-describedby": errors[k] ? `${k}-error` : undefined,
  });

  return (
    <section id="enquire" aria-labelledby="enquire-title" className="on-dark bg-ink text-paper">
      <div className="mx-auto grid max-w-[1440px] gap-16 px-5 py-24 md:grid-cols-12 md:gap-8 md:px-10 md:py-36">
        <div className="md:col-span-5">
          <p className="eyebrow mb-6 text-accent-light" data-reveal>
            Plan your event
          </p>
          <h2 id="enquire-title" className="font-display text-[clamp(2.6rem,5.4vw,4.8rem)] leading-[1]" data-lines>
            <span className="line-mask">
              <span>Tell us about</span>
            </span>
            <span className="line-mask">
              <span>
                your <em className="accent-italic">celebration.</em>
              </span>
            </span>
          </h2>
          <p className="mt-8 max-w-[40ch] text-[1rem] leading-relaxed text-paper/70" data-reveal>
            Share a few details and we'll come back with menu ideas and a quote. Prefer to talk? Call or WhatsApp us
            directly.
          </p>

          <dl className="mt-12 space-y-6 border-t border-line-dark pt-8" data-reveal-group>
            <div data-reveal>
              <dt className="text-[0.7rem] uppercase tracking-[0.2em] text-paper/50">Call</dt>
              <dd className="font-display mt-1 text-[1.9rem]">
                <a href={telLink} className="link-line">
                  {site.phoneDisplay}
                </a>
              </dd>
            </div>
            <div data-reveal>
              <dt className="text-[0.7rem] uppercase tracking-[0.2em] text-paper/50">WhatsApp</dt>
              <dd className="font-display mt-1 text-[1.9rem]">
                <a href={whatsappLink()} target="_blank" rel="noopener" className="link-line">
                  Message us
                </a>
              </dd>
            </div>
            <div data-reveal>
              <dt className="text-[0.7rem] uppercase tracking-[0.2em] text-paper/50">Email</dt>
              <dd className="font-display mt-1 text-[1.6rem] break-all">
                <a href={mailLink} className="link-line">
                  {site.email}
                </a>
              </dd>
            </div>
          </dl>
        </div>

        <div className="md:col-span-6 md:col-start-7">
          {status === "sent" ? (
            <div ref={statusRef} tabIndex={-1} role="status" className="border border-line-dark p-8 md:p-12">
              <p className="eyebrow text-accent-light">Enquiry received</p>
              <p className="font-display mt-6 text-[2.4rem] leading-tight">Thank you — we'll be in touch shortly.</p>
              <p className="mt-4 text-paper/70">
                If your date is close, call us on{" "}
                <a href={telLink} className="underline underline-offset-4">
                  {site.phoneDisplay}
                </a>
                .
              </p>
              <button type="button" onClick={() => setStatus("idle")} className="btn btn-ghost mt-8 text-paper">
                Send another enquiry
              </button>
            </div>
          ) : (
            <form ref={formRef} onSubmit={onSubmit} noValidate className="grid gap-x-8 gap-y-8 sm:grid-cols-2" data-reveal>
              <div className="sm:col-span-2">
                <label htmlFor="name" className={label}>
                  Your name *
                </label>
                <input id="name" name="name" autoComplete="name" value={f.name} onChange={set("name")} className={field} {...aria("name")} />
                {err("name")}
              </div>
              <div>
                <label htmlFor="phone" className={label}>
                  Mobile number *
                </label>
                <input id="phone" name="phone" type="tel" inputMode="tel" autoComplete="tel" placeholder="98xxx xxxxx" value={f.phone} onChange={set("phone")} className={field} {...aria("phone")} />
                {err("phone")}
              </div>
              <div>
                <label htmlFor="email" className={label}>
                  Email
                </label>
                <input id="email" name="email" type="email" autoComplete="email" value={f.email} onChange={set("email")} className={field} {...aria("email")} />
                {err("email")}
              </div>
              <div>
                <label htmlFor="eventType" className={label}>
                  Type of event *
                </label>
                <select id="eventType" name="eventType" value={f.eventType} onChange={set("eventType")} className={`${field} appearance-none bg-[length:12px] bg-[right_center] bg-no-repeat [background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 12 8' fill='none' stroke='%23f6f0e6' stroke-opacity='.6'%3E%3Cpath d='M1 1l5 5 5-5'/%3E%3C/svg%3E")] [&>option]:text-ink`} {...aria("eventType")}>
                  <option value="" disabled>
                    Select…
                  </option>
                  {site.eventTypes.map((t) => (
                    <option key={t} value={t}>
                      {t}
                    </option>
                  ))}
                </select>
                {err("eventType")}
              </div>
              <div>
                <label htmlFor="date" className={label}>
                  Event date
                </label>
                <input id="date" name="date" type="date" min={today()} value={f.date} onChange={set("date")} className={`${field} [color-scheme:dark]`} {...aria("date")} />
                {err("date")}
              </div>
              <div>
                <label htmlFor="guests" className={label}>
                  Number of guests *
                </label>
                <input id="guests" name="guests" type="number" inputMode="numeric" min={1} placeholder="e.g. 250" value={f.guests} onChange={set("guests")} className={field} {...aria("guests")} />
                {err("guests")}
              </div>
              <div>
                <label htmlFor="venue" className={label}>
                  Venue or area
                </label>
                <input id="venue" name="venue" placeholder="e.g. Chhatarpur farmhouse" value={f.venue} onChange={set("venue")} className={field} />
              </div>
              <div className="sm:col-span-2">
                <label htmlFor="message" className={label}>
                  Anything else?
                </label>
                <textarea id="message" name="message" rows={3} placeholder="Functions, cuisines you love, dietary needs…" value={f.message} onChange={set("message")} className={`${field} resize-none`} />
              </div>
              {/* Honeypot for spam bots */}
              <div aria-hidden className="absolute left-[-9999px]">
                <label htmlFor="company">Company</label>
                <input id="company" name="company" tabIndex={-1} autoComplete="off" value={f.company} onChange={set("company")} />
              </div>

              <div className="flex flex-col gap-5 sm:col-span-2 sm:flex-row sm:items-center sm:justify-between">
                <button type="submit" disabled={status === "sending"} className="btn btn-light disabled:opacity-60">
                  {status === "sending" ? "Sending…" : ENDPOINT ? "Send enquiry" : "Send enquiry on WhatsApp"}
                </button>
                <p className="text-[0.8rem] text-paper/50">* Required. We only use your details to reply.</p>
              </div>

              <div ref={statusRef} tabIndex={-1} role="status" aria-live="polite" className="sm:col-span-2 focus:outline-none">
                {status === "whatsapp" && (
                  <p className="border-l-2 border-accent-light pl-4 text-[0.95rem] leading-relaxed text-paper/85">
                    WhatsApp should have opened with your enquiry written out — just press send. If it didn't open,{" "}
                    <a href={waUrl} target="_blank" rel="noopener" className="underline underline-offset-4">
                      tap here
                    </a>{" "}
                    or call {site.phoneDisplay}.
                  </p>
                )}
                {status === "error" && (
                  <p className="border-l-2 border-[#f0a58a] pl-4 text-[0.95rem] leading-relaxed text-paper/85">
                    Sorry, your enquiry couldn't be sent just now. Your details are still here — try again, or{" "}
                    <a href={waUrl} target="_blank" rel="noopener" className="underline underline-offset-4">
                      send them on WhatsApp
                    </a>
                    .
                  </p>
                )}
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
