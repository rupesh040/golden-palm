
"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Plane, Wifi } from "lucide-react";
import siteData from "@/data/data.json";
import { FacilitiesData, FacilityCard } from "@/types";

interface FacilitiesProps {
  data?: FacilitiesData;
  className?: string;
}

export default function Facilities({
  data: customData,
  className = "",
}: FacilitiesProps) {
  const jsonFacilities = siteData.Tour.sections.Facilities?.variants
    ?.TourFacilities1 as unknown as FacilitiesData;

  const data = customData || jsonFacilities;

  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      {
        threshold: 0.12,
        rootMargin: "0px 0px -40px 0px",
      },
    );

    const currentRef = sectionRef.current;

    if (currentRef) observer.observe(currentRef);

    return () => observer.disconnect();
  }, []);

  const eyebrow = data?.eyebrow || "STAY IN OUR LUXURY";
  const heading = data?.heading || "Hotel Facilities";
  const cards: FacilityCard[] = data?.cards || [];

  const renderIcon = (iconName?: string) => {
    switch (iconName) {
      case "plane":
        return <Plane className="w-12 h-12 stroke-[1.7] -rotate-45" />;

      case "wifi":
        return <Wifi className="w-12 h-12 stroke-[1.7]" />;

      case "swimming":
        return (
          <svg
            className="w-12 h-12"
            viewBox="0 0 48 48"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="31" cy="9" r="4" />
            <path d="M5 30c5-3 10-3 15 0s10 3 15 0 7-3 9-2" />
            <path d="M5 38c5-3 10-3 15 0s10 3 15 0 7-3 9-2" />
            <path d="M10 26c6-5 13-10 20-6l7 6" />
            <path d="M18 21l-7 8" />
          </svg>
        );

      case "tour-guide":
        return (
          <svg
            className="w-12 h-12"
            viewBox="0 0 48 48"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="20" cy="12" r="8" />
            <path d="M15 10h10" />
            <path d="M11 17c-3 4-4 8-4 15v7" />
            <path d="M29 17c3 4 4 8 4 15v7" />
            <path d="M7 30c8-5 18-5 26 0" />
            <path d="M38 5v34" />
            <path d="M38 5l-8 4 8 5" />
          </svg>
        );

      default:
        return <Wifi className="w-12 h-12 stroke-[1.7]" />;
    }
  };

  return (
    <section
      id="facilities"
      ref={sectionRef}
      className={`relative w-full bg-white py-5 sm:py-12 lg:py-[70px] px-4 sm:px-6 lg:px-8 overflow-hidden ${className}`}
    >
      <div className="max-w-[1260px] mx-auto">
        <div className="text-center mb-6 sm:mb-10 lg:mb-9">
          <div
            className={`flex items-center justify-center gap-4 mb-4 transition-all duration-700 ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 -translate-y-5"
            }`}
          >
            <span className="w-12 sm:w-[74px] h-[2px] bg-[#c59d5f]" />

            <span className="text-[#a87529] font-bold text-xs sm:text-sm tracking-widest uppercase whitespace-nowrap">
              {eyebrow}
            </span>

            <span className="w-12 sm:w-[74px] h-[2px] bg-[#c59d5f]" />
          </div>

          <h2
            className={`font-serif text-3xl sm:text-4xl lg:text-[44px] font-bold text-[#160f0e] leading-[1.15] tracking-tight transition-all duration-700 delay-100 ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-6"
            }`}
          >
            {heading}
          </h2>

          <div
            className={`w-[128px] h-[4px] bg-[#c59d5f] mx-auto mt-5 rounded-full transition-all duration-700 delay-200 ${
              isVisible
                ? "opacity-100 scale-100"
                : "opacity-0 scale-50"
            }`}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-7 items-stretch">
          {cards.map((card, idx) => {
            const animationStyle = {
              transitionDelay: `${120 + idx * 100}ms`,
            };

            const animationClass = isVisible
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-8";

            if (card.type === "image" && card.image) {
              return (
                <div
                  key={card.id}
                  style={animationStyle}
                  className={`relative w-full h-[270px] sm:h-[290px] lg:h-[290px] rounded-[9px] overflow-hidden group shadow-[0_3px_14px_rgba(0,0,0,0.08)] hover:shadow-[0_12px_28px_rgba(0,0,0,0.13)] transition-all duration-700 ${animationClass}`}
                >
                  <Image
                    src={card.image}
                    alt={card.alt || heading}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
              );
            }

            return (
              <div
                key={card.id}
                style={animationStyle}
                className={`w-full min-h-[270px] lg:h-[290px] bg-white rounded-[10px] border border-[#eeeeee] p-7 sm:p-8 lg:p-[30px] flex flex-col justify-start shadow-[0_4px_15px_rgba(0,0,0,0.07)] hover:shadow-[0_10px_28px_rgba(0,0,0,0.11)] hover:-translate-y-1 transition-all duration-700 group ${animationClass}`}
              >
                <div className="w-[96px] h-[96px] rounded-full bg-[#fff5df] text-[#a96d13] flex items-center justify-center mb-2 shrink-0 group-hover:bg-[#fbecc9] group-hover:scale-105 transition-all duration-300">
                  {renderIcon(card.icon)}
                </div>

                <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#1b1210] leading-tight mb-2 group-hover:text-[#a87529] transition-colors duration-300">
                  {card.title}
                </h3>

                <p className="text-sm sm:text-base text-[#333333] leading-relaxed font-normal">
                  {card.description}
                </p>
              </div>
            );
          })}

        </div>
      </div>
    </section>
  );
}
