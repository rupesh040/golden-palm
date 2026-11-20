"use client";
import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { content } from "@/content";
import { AboutData } from "@/types";

interface AboutProps {
  data?: AboutData;
  className?: string;
}

function LuxuryBedIcon({ className = "w-7 h-7 text-[#c59d5f]" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 32 32"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M4 8v16" />
      <path d="M28 14v10" />
      <path d="M4 18h24" />
      <path d="M4 14h20a4 4 0 0 1 4 4" />
      <path d="M8 14v-3a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v3" />
      <path d="M16 14v-3a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v3" />
    </svg>
  );
}

function MultiDiningIcon({ className = "w-7 h-7 text-[#c59d5f]" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 32 32"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M7 6v6a3 3 0 0 0 3 3v11" />
      <path d="M13 6v6a3 3 0 0 1-3 3" />
      <path d="M10 6v6" />
      <path d="M22 6v20" />
      <path d="M22 6c3 0 4.5 2 4.5 5s-1.5 5-4.5 5" />
    </svg>
  );
}

function ResortAmenitiesIcon({ className = "w-7 h-7 text-[#c59d5f]" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 32 32"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <circle cx="21" cy="9" r="2.5" />
      <path d="M12 14l5-2 4 4-4 2-5-2z" />
      <path d="M4 22c2.5-1.5 5-1.5 7.5 0s5 1.5 7.5 0 5-1.5 7.5 0" />
      <path d="M4 27c2.5-1.5 5-1.5 7.5 0s5 1.5 7.5 0 5-1.5 7.5 0" />
    </svg>
  );
}

export default function About({ data: customData, className = "" }: AboutProps) {
  const data = customData || content.Tour.sections.About.variants.TourAbout1;

  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px",
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

  const eyebrow = data.eyebrow || "ABOUT US";
  const heading1 = data.headingPart1 || "A Luxurious Retreat";
  const heading2 = data.headingPart2 || "for Relaxation &";
  const headingHighlight = data.headingHighlight || "Unforgettable Stays";
  const description =
    data.description ||
    "Welcome to Golden Palm Hotel & Resort, where modern luxury meets warm hospitality. Nestled in a serene location, we offer elegant accommodations, world-class amenities and personalized service to make your stay truly memorable.";

  const features = data.features || [
    { icon: "bed", line1: "Luxury", line2: "Rooms" },
    { icon: "dining", line1: "Multi-Cuisine", line2: "Dining" },
    { icon: "amenities", line1: "Resort", line2: "Amenities" },
  ];

  const images = data.images || {
    main: "/about/about-main.webp",
    topRight: "/about/about-cabana.webp",
    bottomRight: "/about/about-dining.webp",
    alt: "Golden Palm Hotel & Resort Experience",
  };

  const getFeatureIcon = (iconName: string) => {
    switch (iconName.toLowerCase()) {
      case "bed":
        return <LuxuryBedIcon className="w-8 h-8 text-[#c59d5f] shrink-0" />;
      case "dining":
        return <MultiDiningIcon className="w-8 h-8 text-[#c59d5f] shrink-0" />;
      case "amenities":
      default:
        return <ResortAmenitiesIcon className="w-8 h-8 text-[#c59d5f] shrink-0" />;
    }
  };

  return (
    <section
      id="about-us"
      ref={sectionRef}
      className={`relative w-full py-5 sm:py-10 lg:py-16 px-4 sm:px-6 lg:px-8 bg-white text-neutral-900 overflow-hidden ${className}`}
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 lg:gap-14 xl:gap-16 items-center">
          <div className="lg:col-span-5 flex flex-col justify-center">
            <div
              className={`flex items-center gap-3 mb-4 transition-all duration-700 ease-out transform ${
                isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-6"
              }`}
            >
              <span className="text-[#c59d5f] font-bold text-xs sm:text-sm tracking-widest uppercase">
                {eyebrow}
              </span>
              <div className="w-14 h-[2px] bg-[#c59d5f]" />
            </div>

            <h2
              className={`font-serif text-3xl sm:text-4xl lg:text-[44px] font-bold text-[#111827] leading-[1.15] tracking-tight mb-6 transition-all duration-700 delay-150 ease-out transform ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
              }`}
            >
              <span className="block">{heading1}</span>
              <span className="block">{heading2}</span>
              <span className="block text-[#c59d5f]">{headingHighlight}</span>
            </h2>

            <p
              className={`text-sm sm:text-base text-neutral-600 leading-relaxed font-normal mb-6 sm:mb-10 max-w-xl transition-all duration-700 delay-300 ease-out transform ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
              }`}
            >
              {description}
            </p>

            <div
              className={`pt-6 border-t border-neutral-200/80 grid grid-cols-3 gap-3 sm:gap-6 divide-x divide-neutral-200 transition-all duration-700 delay-450 ease-out transform ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
            >
              {features.map((feature, index) => (
                <div
                  key={feature.line1 + feature.line2}
                  className={`flex items-center gap-2.5 sm:gap-3.5 ${index > 0 ? "pl-3 sm:pl-6" : ""}`}
                >
                  {getFeatureIcon(feature.icon)}
                  <div className="flex flex-col">
                    <span className="text-xs sm:text-sm font-semibold text-neutral-900 leading-tight">
                      {feature.line1}
                    </span>
                    <span className="text-xs sm:text-sm font-semibold text-neutral-900 leading-tight">
                      {feature.line2}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-7 relative">
            <div
              className={`absolute -top-3.5 -left-3.5 sm:-top-4 sm:-left-4 w-16 sm:w-20 h-16 sm:h-20 border-t-2 border-l-2 border-[#c59d5f] rounded-tl-2xl sm:rounded-tl-3xl pointer-events-none z-20 transition-all duration-1000 delay-300 transform ${
                isVisible ? "opacity-100 scale-100" : "opacity-0 scale-75"
              }`}
            />

            <div
              className={`absolute -bottom-3.5 -right-3.5 sm:-bottom-4 sm:-right-4 w-16 sm:w-20 h-16 sm:h-20 border-b-2 border-r-2 border-[#c59d5f] rounded-br-2xl sm:rounded-br-3xl pointer-events-none z-20 transition-all duration-1000 delay-500 transform ${
                isVisible ? "opacity-100 scale-100" : "opacity-0 scale-75"
              }`}
            />

            <div className="grid grid-cols-1 sm:grid-cols-12 gap-3.5 sm:gap-4.5 relative z-10">
              <div
                className={`sm:col-span-7 relative rounded-2xl overflow-hidden shadow-xl bg-neutral-100 h-[340px] sm:h-[460px] md:h-[480px] group transition-all duration-800 delay-200 transform ${
                  isVisible ? "opacity-100 scale-100" : "opacity-0 scale-95"
                }`}
              >
                <Image
                  src={images.main}
                  alt={images.alt || "Golden Palm Luxury Sunset Pool"}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 40vw"
                  className="object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none" />
              </div>

              <div className="sm:col-span-5 flex flex-col gap-3.5 sm:gap-4.5">
                <div
                  className={`relative rounded-2xl overflow-hidden shadow-md bg-neutral-100 h-[165px] sm:h-[222px] md:h-[232px] group transition-all duration-700 delay-400 transform ${
                    isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"
                  }`}
                >
                  <Image
                    src={images.topRight}
                    alt="Golden Palm Luxury Poolside Cabanas"
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 25vw, 22vw"
                    className="object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                  <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-colors duration-300 pointer-events-none" />
                </div>

                <div
                  className={`relative rounded-2xl overflow-hidden shadow-md bg-neutral-100 h-[165px] sm:h-[222px] md:h-[232px] group transition-all duration-700 delay-600 transform ${
                    isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"
                  }`}
                >
                  <Image
                    src={images.bottomRight}
                    alt="Golden Palm Outdoor Oceanfront Dining"
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 25vw, 22vw"
                    className="object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                  <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-colors duration-300 pointer-events-none" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
