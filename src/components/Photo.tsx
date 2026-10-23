"use client";

import { createContext, useContext, type CSSProperties, type ReactNode } from "react";

const PhotoContext = createContext<Set<string>>(new Set());

export function PhotoProvider({ files, children }: { files: string[]; children: ReactNode }) {
  return <PhotoContext.Provider value={new Set(files)}>{children}</PhotoContext.Provider>;
}

type Props = {
  src: string;
  alt: string;
  /** Rendered width hint for the browser, e.g. "(min-width: 1024px) 50vw, 100vw" */
  sizes?: string;
  priority?: boolean;
  className?: string;
  imgClassName?: string;
  style?: CSSProperties;
  /** Extra attributes for animation hooks */
  dataAttr?: Record<string, string>;
};

const tones = ["#d9c7ab", "#cbb08c", "#bfa27e", "#d3bc9a", "#c4ab88"];

/**
 * Fills its parent (the parent sets the size/aspect ratio).
 * Uses a smaller "-900" variant on narrow screens when one exists.
 * If the photo hasn't been added yet, shows a labelled placeholder.
 */
export function Photo({ src, alt, sizes = "100vw", priority, className = "", imgClassName = "", style, dataAttr }: Props) {
  const files = useContext(PhotoContext);
  const file = src.replace(/^\/images\//, "");
  const exists = files.has(file);

  if (!exists) {
    const tone = tones[[...file].reduce((a, c) => a + c.charCodeAt(0), 0) % tones.length];
    return (
      <div
        className={`photo-placeholder absolute inset-0 flex items-start justify-end ${className}`}
        style={{ backgroundColor: tone, ...style }}
        role="img"
        aria-label={alt}
        {...dataAttr}
      >
        <span className="m-3 bg-[rgba(29,23,18,0.72)] px-2 py-1 text-[10px] uppercase tracking-[0.18em] text-[#f6f0e6]">
          Photo · {file}
        </span>
      </div>
    );
  }

  const small = file.replace(/\.(jpe?g|png|webp)$/i, "-900.$1");
  const srcSet = files.has(small) ? `/images/${small} 900w, ${src} 2000w` : undefined;

  return (
    <div className={`absolute inset-0 overflow-hidden ${className}`} style={style} {...dataAttr}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        srcSet={srcSet}
        sizes={srcSet ? sizes : undefined}
        alt={alt}
        loading={priority ? "eager" : "lazy"}
        fetchPriority={priority ? "high" : "auto"}
        decoding="async"
        className={`h-full w-full object-cover ${imgClassName}`}
      />
    </div>
  );
}
