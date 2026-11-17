
"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import {
  Utensils,
  Dumbbell,
  Clapperboard,
  BookOpen,
  Users,
  Phone,
  Check,
  ArrowRight,
} from "lucide-react";
import siteData from "@/data/data.json";
import { AmenitiesData, AmenityItem } from "@/types";

interface AmenitiesProps {
  data?: AmenitiesData;
  className?: string;
}

export default function Amenities({
  data: customData,
  className = "",
}: AmenitiesProps) {
  const jsonAmenities = siteData.Tour.sections.Amenities?.variants
    ?.TourAmenities1 as unknown as AmenitiesData;

  const data = customData || jsonAmenities;

  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [activeId, setActiveId] = useState<string>(
    data?.items?.[0]?.id || "restaurant",
  );
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      {
        threshold: 0.1,
        rootMargin: "0px 0px -40px 0px",
      },
    );

    const currentRef = sectionRef.current;

    if (currentRef) observer.observe(currentRef);

    return () => observer.disconnect();
  }, []);

  const handleTabChange = (id: string) => {
    if (id === activeId) return;

    setIsTransitioning(true);
    setActiveId(id);

    setTimeout(() => {
      setIsTransitioning(false);
    }, 250);
  };

  const eyebrow = data?.eyebrow || "EXPLORE OUR SERVICES";
  const heading = data?.heading || "Hotel Amenities & Facilities";

  const phoneBox = data?.phoneBox || {
    badgeText: "Book Your Stay",
    phone: "+91 98765 43210",
    phoneHref: "tel:+919876543210",
  };

  const items: AmenityItem[] = data?.items || [];
  const activeItem = items.find((item) => item.id === activeId) || items[0];

  const renderIcon = (iconName: string, isCurrentActive: boolean) => {
    const strokeColor = isCurrentActive ? "currentColor" : "#b98228";

    switch (iconName) {
      case "restaurant":
        return <Utensils className="w-6 h-6 shrink-0" />;

      case "banquet":
        return (
          <svg
            className="w-6 h-6 shrink-0"
            viewBox="0 0 24 24"
            fill="none"
            stroke={strokeColor}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M8 22h8" />
            <path d="M12 15v7" />
            <path d="m19 3-7 8-7-8Z" />
            <circle cx="16" cy="7" r="1.5" fill={strokeColor} />
            <circle cx="8" cy="7" r="1.5" fill={strokeColor} />
          </svg>
        );

      case "sports-bar":
        return (
          <svg
            className="w-6 h-6 shrink-0"
            viewBox="0 0 24 24"
            fill="none"
            stroke={strokeColor}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M8 22h8" />
            <path d="M12 15v7" />
            <path d="m19 3-7 8-7-8Z" />
          </svg>
        );

      case "kids-zone":
        return (
          <svg
            className="w-6 h-6 shrink-0"
            viewBox="0 0 24 24"
            fill="none"
            stroke={strokeColor}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M3 19c4 2 14 2 18 0" />
            <path d="M6 19l2.5-9h7l2.5 9" />
            <path d="M8.5 10l-1-4h3l3 4" />
            <circle cx="10" cy="5" r="1.5" />
          </svg>
        );

      case "activity-room":
        return <Dumbbell className="w-6 h-6 shrink-0" />;

      case "mini-theatre":
        return <Clapperboard className="w-6 h-6 shrink-0" />;

      case "library":
        return <BookOpen className="w-6 h-6 shrink-0" />;

      case "conference":
        return <Users className="w-6 h-6 shrink-0" />;

      default:
        return <Utensils className="w-6 h-6 shrink-0" />;
    }
  };

  return (
    <section
      id="services"
      ref={sectionRef}
      className={`relative w-full bg-white text-neutral-900 py-12 sm:py-16 lg:py-[52px] px-4 sm:px-6 lg:px-8 overflow-hidden ${className}`}
    >
      <div id="amenities" className="absolute -top-24 pointer-events-none" />

      <div className="max-w-[1260px] mx-auto">
        <div
          className={`flex flex-col lg:flex-row lg:items-center justify-between gap-7 mb-8 lg:mb-8 transition-all duration-700 ${
            isVisible
              ? "opacity-100 translate-y-0"
              : "opacity-0 -translate-y-5"
          }`}
        >
          <div className="min-w-0">
            <span className="text-[#ae761e] font-bold text-sm sm:text-base tracking-[0.06em] uppercase">
              {eyebrow}
            </span>

            <div className="w-[105px] h-[3px] bg-[#c18b30] mt-4 mb-4" />

            <h2 className="font-serif text-[34px] sm:text-[44px] lg:text-[50px] xl:text-[54px] font-normal text-[#160f0e] leading-[1.12] tracking-tight">
              {heading}
            </h2>

            <div className="w-[105px] h-[3px] bg-[#c18b30] mt-5" />
          </div>

          <a
            href={phoneBox.phoneHref}
            className="self-start lg:self-center inline-flex items-center gap-5 bg-white pl-4 pr-7 py-3 rounded-full shadow-[0_5px_25px_rgba(0,0,0,0.09)] border border-[#f2f0ed] hover:shadow-[0_8px_30px_rgba(0,0,0,0.13)] transition-all duration-300 group shrink-0"
          >
            <div className="w-[64px] h-[64px] rounded-full bg-[#b77c1c] group-hover:bg-[#986313] text-white flex items-center justify-center shrink-0 transition-colors">
              <Phone className="w-8 h-8 fill-white stroke-white" />
            </div>

            <div className="h-[50px] w-px bg-[#d7cfc3]" />

            <div className="flex flex-col text-left gap-1">
              <span className="text-base sm:text-lg font-bold text-[#17110e]">
                {phoneBox.badgeText}
              </span>

              <span className="text-lg sm:text-xl font-bold text-[#b77c1c] whitespace-nowrap">
                {phoneBox.phone}
              </span>
            </div>
          </a>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[360px_minmax(0,1fr)] gap-6 lg:gap-[32px] items-stretch">
          <div className="flex flex-col gap-[7px]">
            {items.map((item, idx) => {
              const isCurrentActive = item.id === activeId;

              return (
                <button
                  key={item.id}
                  onClick={() => handleTabChange(item.id)}
                  type="button"
                  aria-pressed={isCurrentActive}
                  className={`w-full min-h-[57px] text-left flex items-center gap-4 px-5 py-3 rounded-[5px] transition-all duration-300 group ${
                    isCurrentActive
                      ? "bg-gradient-to-r from-[#c28b2c] to-[#b37b20] text-white shadow-[0_5px_15px_rgba(183,124,28,0.2)]"
                      : "bg-white text-[#171717] shadow-[0_3px_13px_rgba(0,0,0,0.07)] border border-[#f1f1f1] hover:bg-[#fbf8f2] hover:border-[#d5b477]"
                  } ${
                    isVisible
                      ? "opacity-100 translate-x-0"
                      : "opacity-0 -translate-x-5"
                  }`}
                  style={{
                    transitionDelay: `${120 + idx * 45}ms`,
                  }}
                >
                  <span
                    className={`w-7 flex items-center justify-center shrink-0 ${
                      isCurrentActive ? "text-white" : "text-[#b77c1c]"
                    }`}
                  >
                    {renderIcon(item.icon, isCurrentActive)}
                  </span>

                  <span
                    className={`text-base font-bold tabular-nums shrink-0 ${
                      isCurrentActive ? "text-white" : "text-[#777777]"
                    }`}
                  >
                    {item.number}
                  </span>

                  <span
                    className={`text-[15px] sm:text-base font-bold truncate ${
                      isCurrentActive ? "text-white" : "text-[#171717]"
                    }`}
                  >
                    {item.title}
                  </span>
                </button>
              );
            })}
          </div>

          {activeItem && (
            <div
              className={`min-w-0 min-h-[480px] lg:min-h-[550px] grid grid-cols-1 md:grid-cols-2 overflow-hidden bg-[#21120c] shadow-[0_8px_30px_rgba(0,0,0,0.08)] transition-all duration-700 ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              }`}
            >
              <div className="relative min-h-[320px] md:min-h-full overflow-hidden bg-[#30251d]">
                <Image
                  key={activeItem.id}
                  src={activeItem.image}
                  alt={activeItem.alt || activeItem.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 35vw"
                  priority
                  className={`object-cover object-center transition-all duration-500 ${
                    isTransitioning
                      ? "opacity-40 scale-105"
                      : "opacity-100 scale-100"
                  }`}
                />
              </div>

              <div className="bg-[#21120c] text-white px-7 py-9 sm:px-9 sm:py-10 lg:px-10 lg:py-11 flex flex-col justify-between">
                <div
                  className={`transition-all duration-300 ${
                    isTransitioning
                      ? "opacity-0 translate-y-2"
                      : "opacity-100 translate-y-0"
                  }`}
                >
                  <h3 className="font-serif text-[30px] sm:text-[34px] lg:text-[38px] font-bold text-white leading-[1.2] tracking-tight mb-5">
                    {activeItem.title}
                  </h3>

                  <div className="w-[80px] h-[4px] bg-[#c18b30] mb-8" />

                  <ul className="space-y-5">
                    {activeItem.descriptionPoints.map((point, index) => (
                      <li
                        key={index}
                        className="flex items-start gap-4"
                      >
                        <span className="w-[25px] h-[25px] rounded-full border-2 border-[#c18b30] flex items-center justify-center shrink-0 mt-0.5 text-[#d4a03e]">
                          <Check className="w-4 h-4 stroke-[2.5]" />
                        </span>

                        <span className="text-[15px] sm:text-base lg:text-[17px] text-[#f0eae5] leading-[1.55] font-normal">
                          {point}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-9">
                  <a
                    href={activeItem.cta?.href || "#book-stay"}
                    className="inline-flex items-center justify-center gap-4 bg-gradient-to-r from-[#d4a044] to-[#b77c20] hover:from-[#bd852c] hover:to-[#a56e18] text-white font-bold text-base px-8 py-4 rounded-[12px] shadow-[0_5px_16px_rgba(183,124,28,0.25)] transition-all duration-300 hover:-translate-y-1"
                  >
                    <span>{activeItem.cta?.text || "Read More"}</span>
                  </a>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
