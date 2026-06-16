"use client";

import { useRef } from "react";
import HeroSection from "./components/HeroSection";
import FeaturesSection from "./components/FeaturesSection";
import ExtractForm from "./components/ExtractForm";
import Footer from "./components/Footer";

export default function Home() {
  const extractRef = useRef<HTMLDivElement>(null);

  function scrollToExtract() {
    extractRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  return (
    <main>
      <HeroSection onExtractClick={scrollToExtract} />
      <FeaturesSection />
      <div ref={extractRef} className="scroll-mt-8 pt-8">
        <div className="mx-auto max-w-3xl px-4 mb-10">
          <h2 className="text-xl font-bold text-foreground">Extract from your notes</h2>
          <p className="text-sm text-muted mt-1">
            Paste raw meeting notes below — bullet points, transcripts, or freeform text all work.
          </p>
        </div>
        <ExtractForm />
      </div>
      <Footer />
    </main>
  );
}
