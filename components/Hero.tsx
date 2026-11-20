"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Star, Calendar, PlayCircle } from "lucide-react";
import siteData from "@/data/data.json";
import { HeroData } from "@/types";

interface HeroProps {
  data?: HeroData;
  className?: string;
}

export default function Hero({ data: customData, className = "" }: HeroProps) {
  const jsonBanner = siteData.Tour.sections.Banner.variants.TourBanner1 as HeroData;
  const data = customData || jsonBanner;

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const bgImage = data?.backgroundImage || "/hero-bg.webp";
  const palmLogo = data?.palmLogo || "/palm-logo.webp";
  const starsCount = data?.stars ?? 5;
  const heading1 = data?.headingLine1 || "Book Your Dream Hotel";
  const heading2 = data?.headingLine2 || "With Golden Palm";
  const primaryBtn = data?.buttons?.primary || {
    text: "Book Your Stay",
    href: "#about-us",
    icon: "calendar",
  };
  const secondaryBtn = data?.buttons?.secondary || {
    text: "Explore Rooms",
    href: "#about-us",
    icon: "play",
  };

  const handleButtonClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith("#")) {
      e.preventDefault();

      if (window.location.hash !== href) {
        window.history.pushState(null, "", href);
      }

      const targetId = href.replace(/^#/, "");
      if (targetId === "home") {
        window.scrollTo({ top: 0, behavior: "smooth" });
        return;
      }
      const el = document.getElementById(targetId);
      if (el) {
        const navHeight = 80;
        const top = el.getBoundingClientRect().top + window.scrollY - navHeight;
        window.scrollTo({ top: Math.max(0, top), behavior: "smooth" });
      }
    }
  };

  return (
    <section
      id="home"
      className={`relative w-full min-h-[72vh] flex items-center justify-center overflow-hidden bg-[#0c0c0c] ${className}`}
    >
      <div
        className={`absolute inset-0 z-0 transition-transform duration-1000 ease-out ${
          mounted ? "scale-100" : "scale-105"
        }`}
      >
        <Image
          src={bgImage}
          alt="Golden Palm Luxury Hotel Suite"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/35 to-black/75" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-20 lg:py-24 text-center flex flex-col items-center">
        <div
          className={`flex items-center justify-center gap-2 mb-4 sm:mb-6 transition-all duration-700 delay-100 ease-out transform ${
            mounted ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4"
          }`}
        >
          {Array.from({ length: starsCount }).map((_, i) => (
            <Star
              key={i}
              className="w-5 h-5 sm:w-6 sm:h-6 text-[#e5a836] fill-[#e5a836] drop-shadow-[0_2px_8px_rgba(229,168,54,0.45)]"
            />
          ))}
        </div>

        <h1 className="font-serif text-white font-medium text-[25px] min-[360px]:text-[28px] min-[390px]:text-[32px] sm:text-5xl md:text-6xl lg:text-[76px] tracking-tight leading-[1.18] sm:leading-[1.12] max-w-4xl drop-shadow-[0_4px_16px_rgba(0,0,0,0.85)]">
          <span
            className={`block whitespace-nowrap sm:whitespace-normal transition-all duration-700 delay-200 ease-out transform ${
              mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
            }`}
          >
            {heading1}
          </span>
          <span
            className={`block whitespace-nowrap sm:whitespace-normal transition-all duration-700 delay-350 ease-out transform ${
              mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
            }`}
          >
            {heading2}
          </span>
        </h1>

        <div className="flex items-center justify-center gap-3 sm:gap-4 my-6 sm:my-8 w-full max-w-md">
          <div
            className={`h-[1.5px] flex-1 bg-gradient-to-r from-transparent via-[#d4af37]/80 to-[#d4af37] origin-right transition-all duration-800 delay-450 ease-out transform ${
              mounted ? "opacity-100 scale-x-100" : "opacity-0 scale-x-0"
            }`}
          />

          <div
            className={`relative w-8 h-8 sm:w-9 sm:h-9 shrink-0 drop-shadow-[0_2px_8px_rgba(212,175,55,0.4)] transition-all duration-700 delay-500 ease-out transform ${
              mounted ? "opacity-100 scale-100" : "opacity-0 scale-50"
            }`}
          >
            <Image
              src={palmLogo}
              alt="Golden Palm"
              fill
              sizes="36px"
              className="object-contain"
              priority
            />
          </div>

          <div
            className={`h-[1.5px] flex-1 bg-gradient-to-l from-transparent via-[#d4af37]/80 to-[#d4af37] origin-left transition-all duration-800 delay-450 ease-out transform ${
              mounted ? "opacity-100 scale-x-100" : "opacity-0 scale-x-0"
            }`}
          />
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-5 w-full sm:w-auto mt-2">
          <a
            href={primaryBtn.href}
            onClick={(e) => handleButtonClick(e, primaryBtn.href)}
            className={`group relative inline-flex items-center justify-center gap-2.5 px-7 py-3.5 sm:px-8 sm:py-3.5 rounded-xl bg-gradient-to-r from-[#d99525] via-[#e2a22f] to-[#e6a836] text-white font-medium text-base tracking-wide shadow-[0_6px_22px_rgba(217,149,37,0.4)] hover:brightness-110 hover:shadow-[0_8px_28px_rgba(217,149,37,0.55)] active:scale-95 transition-all duration-500 delay-600 ease-out transform w-full sm:w-auto ${
              mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
            }`}
          >
            <Calendar className="w-5 h-5 text-white/95 stroke-[2.2] shrink-0" />
            <span className="whitespace-nowrap font-medium text-white">{primaryBtn.text}</span>
          </a>

          <a
            href={secondaryBtn.href}
            onClick={(e) => handleButtonClick(e, secondaryBtn.href)}
            className={`group inline-flex items-center justify-center gap-2.5 px-7 py-3.5 sm:px-8 sm:py-3.5 rounded-xl border border-white/80 bg-black/40 backdrop-blur-md text-white font-medium text-base tracking-wide hover:border-white hover:bg-black/60 hover:shadow-[0_4px_20px_rgba(255,255,255,0.15)] active:scale-95 transition-all duration-500 delay-700 ease-out transform w-full sm:w-auto ${
              mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
            }`}
          >
            <PlayCircle className="w-5 h-5 text-white/95 stroke-[1.8] shrink-0 group-hover:scale-105 transition-transform" />
            <span className="whitespace-nowrap font-medium text-white">{secondaryBtn.text}</span>
          </a>
        </div>
      </div>
    </section>
  );
}
