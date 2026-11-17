"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Play, X } from "lucide-react";
import siteData from "@/data/data.json";
import { VideoBannerData } from "@/types";

interface VideoBannerProps {
  data?: VideoBannerData;
  className?: string;
}

export default function VideoBanner({
  data: customData,
  className = "",
}: VideoBannerProps) {
  const jsonVideoBanner = siteData.Tour.sections.VideoBanner?.variants
    ?.TourVideoBanner1 as unknown as VideoBannerData;
  const data = customData || jsonVideoBanner;

  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      {
        threshold: 0.15,
        rootMargin: "0px 0px -40px 0px",
      }
    );

    const currentRef = sectionRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    const timer = setTimeout(() => {
      if (currentRef) {
        const rect = currentRef.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom > 0) {
          setIsVisible(true);
        }
      }
    }, 100);

    return () => {
      if (currentRef) observer.unobserve(currentRef);
      clearTimeout(timer);
    };
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsModalOpen(false);
      }
    };

    if (isModalOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isModalOpen]);

  const eyebrow = data?.eyebrow || "PROMOTIONAL VIDEO";
  const heading = data?.heading || "Your Journey Begins with Our Booking";
  const backgroundImage = data?.backgroundImage || "/video.webp";
  const youtubeVideoId = data?.youtubeVideoId || "dQw4w9WgXcQ";

  return (
    <>
      <section
        id="promotional-video"
        ref={sectionRef}
        className={`relative w-full min-h-[460px] sm:min-h-[520px] lg:min-h-[580px] flex items-center justify-center text-center overflow-hidden ${className}`}
      >
        <div className="absolute inset-0 z-0">
          <Image
            src={backgroundImage}
            alt={heading}
            fill
            sizes="100vw"
            className="object-cover object-center"
            priority
          />
          <div className="absolute inset-0 bg-black/65" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/40" />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-20 flex flex-col items-center">
          <div
            className={`flex items-center justify-center gap-3 sm:gap-4 mb-4 sm:mb-5 transition-all duration-700 ease-out transform ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 -translate-y-4"
            }`}
          >
            <svg
              className="w-7 sm:w-9 h-3 text-[#c59d5f]"
              viewBox="0 0 32 12"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
            >
              <path d="M0 6c6 0 6-5 12-5s6 10 12 10 6-5 8-5" />
            </svg>
            <span className="text-[#c59d5f] font-bold text-xs sm:text-sm tracking-[0.25em] uppercase">
              {eyebrow}
            </span>
            <svg
              className="w-7 sm:w-9 h-3 text-[#c59d5f] -scale-x-100"
              viewBox="0 0 32 12"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
            >
              <path d="M0 6c6 0 6-5 12-5s6 10 12 10 6-5 8-5" />
            </svg>
          </div>

          <h2
            className={`font-serif text-3xl sm:text-4xl md:text-5xl lg:text-[54px] font-bold text-white tracking-tight leading-[1.18] mb-8 sm:mb-10 max-w-4xl transition-all duration-700 delay-150 ease-out transform ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-6"
            }`}
          >
            {heading}
          </h2>

          <div
            className={`relative flex items-center justify-center transition-all duration-700 delay-300 transform ${
              isVisible
                ? "opacity-100 scale-100"
                : "opacity-0 scale-75"
            }`}
          >
            <button
              type="button"
              onClick={() => setIsModalOpen(true)}
              aria-label="Play promotional video"
              className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-full border border-white/60 bg-black/25 backdrop-blur-[2px] flex items-center justify-center hover:scale-110 hover:border-[#c59d5f] hover:bg-black/45 transition-all duration-500 shadow-2xl cursor-pointer group"
            >
              <span className="absolute inset-0 rounded-full border border-[#c59d5f]/40 animate-ping pointer-events-none" />
              <Play className="w-8 h-8 sm:w-9 sm:h-9 text-[#c59d5f] fill-[#c59d5f] ml-1 group-hover:scale-110 transition-transform duration-300" />
            </button>
          </div>
        </div>
      </section>

      {isModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 lg:p-8 bg-black/85 backdrop-blur-md animate-in fade-in duration-300"
          onClick={() => setIsModalOpen(false)}
        >
          <div
            className="relative w-full max-w-4xl aspect-video rounded-2xl overflow-hidden shadow-2xl bg-black border border-white/10"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setIsModalOpen(false)}
              aria-label="Close video modal"
              className="absolute top-3 right-3 sm:top-4 sm:right-4 z-20 w-10 h-10 rounded-full bg-black/70 hover:bg-[#c59d5f] text-white flex items-center justify-center transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <iframe
              src={`https://www.youtube.com/embed/${youtubeVideoId}?autoplay=1&rel=0`}
              title={heading}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full h-full border-0"
            />
          </div>
        </div>
      )}
    </>
  );
}
