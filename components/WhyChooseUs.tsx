
"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Bed, MapPin, Users } from "lucide-react";
import siteData from "@/data/data.json";
import {
  WhyChooseUsData,
  WhyChooseUsFeature,
  WhyChooseUsStat,
} from "@/types";

interface WhyChooseUsProps {
  data?: WhyChooseUsData;
  className?: string;
}

function StatCounter({
  value,
  startAnimation,
}: {
  value: string;
  startAnimation: boolean;
}) {
  const [displayValue, setDisplayValue] = useState("0");

  useEffect(() => {
    if (!startAnimation) return;

    const match = value.match(/^(\d+(?:\.\d+)?)(.*)$/);

    if (!match) {
      setDisplayValue(value);
      return;
    }

    const targetNumber = parseFloat(match[1]);
    const suffix = match[2] || "";
    const isFloat = match[1].includes(".");
    const duration = 1800;
    const startTime = performance.now();

    let animationFrameId: number;

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easeOut = 1 - Math.pow(1 - progress, 3);
      const currentVal = easeOut * targetNumber;

      if (isFloat) {
        setDisplayValue(`${currentVal.toFixed(1)}${suffix}`);
      } else {
        setDisplayValue(`${Math.floor(currentVal)}${suffix}`);
      }

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(animate);
      } else {
        setDisplayValue(value);
      }
    };

    animationFrameId = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationFrameId);
  }, [value, startAnimation]);

  return <span>{displayValue}</span>;
}

export default function WhyChooseUs({
  data: customData,
  className = "",
}: WhyChooseUsProps) {
  const jsonWhyChooseUs = siteData.Tour.sections.WhyChooseUs?.variants
    ?.TourWhyChooseUs1 as unknown as WhyChooseUsData;

  const data = customData || jsonWhyChooseUs;

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

  const eyebrow = data?.eyebrow || "WHY CHOOSE US";
  const headingLine1 = data?.headingLine1 || "A Luxurious Stay for";
  const headingLine2 = data?.headingLine2 || "Relaxation &";
  const headingHighlight = data?.headingHighlight || "Unforgettable Stays";
  const features: WhyChooseUsFeature[] = data?.features || [];
  const stats: WhyChooseUsStat[] = data?.stats || [];
  const image = data?.image || "/why-choose-us/suite.webp";
  const alt =
    data?.alt || "A Luxurious Stay for Relaxation and Unforgettable Stays";

  const renderIcon = (iconName: string, isStat = false) => {
    const iconClass = isStat
      ? "w-9 h-9 sm:w-10 sm:h-10"
      : "w-10 h-10 sm:w-11 sm:h-11";

    switch (iconName) {
      case "bed":
        return <Bed className={iconClass} strokeWidth={2} />;

      case "dining":
        return (
          <svg
            className={iconClass}
            viewBox="0 0 48 48"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M5 34h38" />
            <path d="M8 30h32a16 16 0 0 0-32 0Z" />
            <path d="M24 7v3" />
            <path d="M24 10c-3 0-5 2-5 5h10c0-3-2-5-5-5Z" />
            <path d="M12 37h24" />
          </svg>
        );

      case "location":
        return <MapPin className={iconClass} strokeWidth={2} />;

      case "service":
      case "guests":
        return <Users className={iconClass} strokeWidth={2} />;

      case "rating":
        return (
          <svg
            className={iconClass}
            viewBox="0 0 48 48"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="24" cy="17" r="11" />
            <path d="m17 26-3 16 10-6 10 6-3-16" />
            <path
              d="m24 10 2.2 4.5 5 .7-3.6 3.5.9 5-4.5-2.4-4.5 2.4.9-5-3.6-3.5 5-.7Z"
              fill="currentColor"
              stroke="none"
            />
          </svg>
        );

      default:
        return <Bed className={iconClass} />;
    }
  };

  return (
    <section
      id="why-choose-us"
      ref={sectionRef}
      className={`relative w-full bg-white text-neutral-900 py-5 sm:py-10 lg:py-[55px] px-4 sm:px-6 lg:px-8 overflow-hidden ${className}`}
    >
      <div className="max-w-[1280px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-6 sm:gap-8 lg:gap-6 xl:gap-7 items-stretch">
          <div className="flex flex-col justify-between min-w-0">
            <div>
              <div
                className={`flex items-center gap-4 mb-3 transition-all duration-700 ${
                  isVisible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 -translate-y-4"
                }`}
              >
                <span className="text-[#b98227] font-bold text-xs sm:text-sm tracking-widest uppercase shrink-0 whitespace-nowrap">
                  {eyebrow}
                </span>

                <div className="w-16 h-[2.5px] bg-[#bd8428]" />
              </div>

              <h2
                className={`font-serif text-[19px] min-[360px]:text-[21px] min-[390px]:text-[24px] sm:text-4xl lg:text-[44px] font-bold text-[#100e0d] tracking-tight leading-[1.18] sm:leading-[1.15] mb-5 transition-all duration-700 delay-150 ${
                  isVisible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-6"
                }`}
              >
                <span className="block whitespace-nowrap">{headingLine1}</span>
                <span className="block whitespace-nowrap">
                  {headingLine2}{" "}
                  <span className="text-[#bd8428]">
                    {headingHighlight}
                  </span>
                </span>
              </h2>

              <div
                className={`w-[106px] h-[4px] bg-[#bd8428] rounded-full mb-8 transition-all duration-700 delay-300 ${
                  isVisible
                    ? "opacity-100 scale-100"
                    : "opacity-0 scale-50"
                }`}
              />

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 xl:gap-x-8 gap-y-7 lg:gap-y-8 mb-9 lg:mb-10">
                {features.map((feature, idx) => (
                  <div
                    key={feature.title}
                    className={`flex items-center gap-3 sm:gap-3.5 group transition-all duration-500 ${
                      isVisible
                        ? "opacity-100 translate-y-0"
                        : "opacity-0 translate-y-6"
                    }`}
                    style={{
                      transitionDelay: `${200 + idx * 80}ms`,
                    }}
                  >
                    <div className="w-[68px] h-[68px] sm:w-[72px] sm:h-[72px] rounded-full bg-[#fff4df] text-[#b98227] flex items-center justify-center shrink-0 group-hover:bg-[#fbe9c8] group-hover:scale-105 transition-all duration-300">
                      {renderIcon(feature.icon)}
                    </div>

                    <div className="w-[3px] h-[64px] bg-[#bd8428] shrink-0" />

                    <div className="min-w-0">
                      <h3 className="font-serif text-lg sm:text-xl font-bold text-[#17110e] leading-tight mb-1 group-hover:text-[#b98227] transition-colors">
                        {feature.title}
                      </h3>

                      <p className="text-sm sm:text-base text-[#292929] font-normal leading-relaxed">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div
              className={`bg-[#28160f] rounded-[20px] px-4 sm:px-5 lg:px-3 xl:px-5 py-5 sm:py-6 text-white shadow-[0_10px_30px_rgba(40,22,15,0.15)] transition-all duration-700 delay-500 ${
                isVisible
                  ? "opacity-100 translate-y-0 scale-100"
                  : "opacity-0 translate-y-8 scale-[0.98]"
              }`}
            >
              <div className="grid grid-cols-2 sm:grid-cols-4 divide-x divide-white/50">
                {stats.map((stat, idx) => (
                  <div
                    key={idx}
                    className="flex flex-col items-center justify-center text-center px-2 sm:px-3"
                  >
                    <div className="text-[#d49a31] mb-1.5">
                      {renderIcon(stat.icon, true)}
                    </div>

                    <span className="font-serif text-[27px] sm:text-[30px] lg:text-[27px] xl:text-[31px] font-bold text-white leading-tight mb-1">
                      <StatCounter
                        value={stat.value}
                        startAnimation={isVisible}
                      />
                    </span>

                    <span className="text-[12px] sm:text-[14px] lg:text-[12px] xl:text-[14px] text-white font-medium whitespace-nowrap">
                      {stat.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div
            className={`relative w-full min-h-[400px] sm:min-h-[500px] lg:min-h-[548px] lg:h-full rounded-[22px] overflow-hidden shadow-[0_8px_28px_rgba(0,0,0,0.08)] group transition-all duration-700 delay-300 ${
              isVisible
                ? "opacity-100 translate-x-0 scale-100"
                : "opacity-0 translate-x-8 scale-[0.98]"
            }`}
          >
            <Image
              src={image}
              alt={alt}
              fill
              sizes="(max-width: 1024px) 100vw, 44vw"
              className="object-cover object-center group-hover:scale-[1.03] transition-transform duration-700 ease-out"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
}
