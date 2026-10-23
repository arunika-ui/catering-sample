import fs from "node:fs";
import path from "node:path";
import { PhotoProvider } from "@/components/Photo";
import { Motion } from "@/components/Motion";
import { Nav } from "@/components/Nav";
import { Hero } from "@/components/Hero";
import { Intro } from "@/components/Intro";
import { Occasions } from "@/components/Occasions";
import { Menus } from "@/components/Menus";
import { Stations } from "@/components/Stations";
import { Gallery } from "@/components/Gallery";
import { Areas, Process, Testimonials } from "@/components/Process";
import { Enquiry } from "@/components/Enquiry";
import { Footer, MobileBar } from "@/components/Footer";

// Read at build time: which photos have been added to /public/images
function availablePhotos() {
  try {
    return fs.readdirSync(path.join(process.cwd(), "public", "images"));
  } catch {
    return [];
  }
}

export default function Home() {
  return (
    <PhotoProvider files={availablePhotos()}>
      <a
        href="#main"
        className="sr-only z-[60] bg-ink px-4 py-3 text-paper focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
      >
        Skip to content
      </a>
      <Nav />
      <main id="main">
        <Hero />
        <Intro />
        <Occasions />
        <Menus />
        <Stations />
        <Gallery />
        <Process />
        <Testimonials />
        <Areas />
        <Enquiry />
      </main>
      <Footer />
      <MobileBar />
      <Motion />
    </PhotoProvider>
  );
}
