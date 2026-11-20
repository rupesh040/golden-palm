"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ArrowLeft, ArrowRight, Star } from "lucide-react";
import siteData from "@/data/data.json";
import { TestimonialData, TestimonialItem } from "@/types";

interface TestimonialsProps {
  data?: TestimonialData;
  className?: string;
}

export default function Testimonials({
  data: customData,
  className = "",
}: TestimonialsProps) {
  const jsonTestimonial = siteData.Tour.sections.Testimonial?.variants
    ?.TourTestimonial1 as unknown as TestimonialData;
  const data = customData || jsonTestimonial;

  const sectionRef = useRef<HTMLElement>(null);
  const touchStartX = useRef<number | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      {
        threshold: 0.12,
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

  const eyebrow = data?.eyebrow || "OUR GUEST STORIES";
  const headingPart1 = data?.headingPart1 || "What Our Guests";
  const headingHighlight = data?.headingHighlight || "Say?";
  const bgImage = data?.backgroundImage || "/testimonials/testimonial-bg.webp";
  const items: TestimonialItem[] = data?.items || [];

  const handlePrev = () => {
    if (items.length === 0) return;
    setCurrentIndex((prev) => (prev - 1 + items.length) % items.length);
  };

  const handleNext = () => {
    if (items.length === 0) return;
    setCurrentIndex((prev) => (prev + 1) % items.length);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (diff > 50) {
      handleNext();
    } else if (diff < -50) {
      handlePrev();
    }
    touchStartX.current = null;
  };

  const displayedCards =
    items.length === 0
      ? []
      : [
          items[currentIndex % items.length],
          items[(currentIndex + 1) % items.length],
          items[(currentIndex + 2) % items.length],
        ].filter(Boolean);

  return (
    <section
      id="testimonials"
      ref={sectionRef}
      className={`relative w-full py-5 sm:py-12 lg:py-20 xl:py-24 px-4 sm:px-6 lg:px-8 bg-white text-neutral-900 border-t border-neutral-100 overflow-hidden ${className}`}
    >
      <div className="absolute top-0 left-0 w-full sm:w-[45%] lg:w-[35%] h-full pointer-events-none select-none z-0 overflow-hidden">
        <Image
          src={bgImage}
          alt="Golden Palm Resort Ambiance"
          fill
          className="object-cover object-left opacity-90"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/70 to-white" />
        <div className="absolute inset-0 bg-gradient-to-b from-white/40 via-transparent to-white/60" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-7 sm:mb-12 lg:mb-16">
          <div
            className={`flex items-center justify-center gap-3.5 mb-2.5 transition-all duration-700 ease-out transform ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 -translate-y-4"
            }`}
          >
            <div className="w-12 sm:w-14 h-[1.5px] bg-[#c59d5f]" />
            <span className="text-[#c59d5f] font-bold text-xs sm:text-sm tracking-widest uppercase">
              {eyebrow}
            </span>
            <div className="w-12 sm:w-14 h-[1.5px] bg-[#c59d5f]" />
          </div>

          <h2
            className={`font-serif text-3xl sm:text-4xl lg:text-[44px] font-bold text-[#111827] tracking-tight mb-3 transition-all duration-700 delay-150 ease-out transform ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-6"
            }`}
          >
            <span>{headingPart1} </span>
            <span className="text-[#c59d5f]">{headingHighlight}</span>
          </h2>

          <div
            className={`w-16 h-[2.5px] bg-[#c59d5f] mx-auto rounded-full transition-all duration-700 delay-300 transform ${
              isVisible ? "opacity-100 scale-100" : "opacity-0 scale-50"
            }`}
          />
        </div>

        <div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mb-8 sm:mb-10"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          {displayedCards.map((item, slotIdx) => {
            const responsiveDisplay =
              slotIdx === 0
                ? "flex"
                : slotIdx === 1
                ? "hidden md:flex"
                : "hidden lg:flex";

            return (
              <div
                key={`${item.id || item.name}-${slotIdx}`}
                className={`bg-white rounded-2xl p-6 sm:p-7 lg:p-8 shadow-[0_8px_30px_rgba(0,0,0,0.06)] border border-neutral-100 hover:shadow-[0_16px_40px_rgba(0,0,0,0.12)] hover:-translate-y-1.5 transition-all duration-500 group flex-col justify-between transform min-h-[280px] sm:min-h-[300px] ${responsiveDisplay} ${
                  isVisible
                    ? "opacity-100 translate-y-0 scale-100"
                    : "opacity-0 translate-y-8 scale-[0.98]"
                }`}
              >
                <div>
                  <div className="text-[#c59d5f] mb-4">
                    <svg className="w-8 h-8 fill-current" viewBox="0 0 24 24">
                      <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                    </svg>
                  </div>

                  <p className="text-sm sm:text-base text-neutral-700 font-normal leading-relaxed mb-6">
                    {item.quote}
                  </p>
                </div>

                <div className="pt-4 border-t border-neutral-100 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="relative w-12 h-12 rounded-full overflow-hidden ring-2 ring-neutral-100 shrink-0 bg-neutral-100">
                      <Image
                        src={item.avatar}
                        alt={item.name}
                        fill
                        sizes="48px"
                        className="object-cover"
                      />
                    </div>

                    <div className="flex flex-col">
                      <h3 className="font-serif text-base sm:text-lg font-bold text-[#111827] group-hover:text-[#c59d5f] transition-colors leading-tight">
                        {item.name}
                      </h3>
                      <span className="text-xs text-neutral-500 font-normal mt-0.5">
                        {item.role}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-0.5 text-[#e5a836] shrink-0">
                    {Array.from({ length: item.rating }).map((_, starIdx) => (
                      <Star
                        key={starIdx}
                        className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-[#e5a836] text-[#e5a836]"
                      />
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="flex items-center justify-between pt-2">
          <div className="w-16 hidden sm:block" />

          <div className="flex items-center gap-2.5">
            {items.map((_, dotIdx) => (
              <button
                key={dotIdx}
                type="button"
                aria-label={`Go to testimonial ${dotIdx + 1}`}
                onClick={() => setCurrentIndex(dotIdx)}
                className={`h-2.5 transition-all duration-300 rounded-full cursor-pointer ${
                  dotIdx === currentIndex
                    ? "w-7 bg-[#c59d5f]"
                    : "w-2.5 border-2 border-[#c59d5f]/50 hover:border-[#c59d5f]"
                }`}
              />
            ))}
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={handlePrev}
              aria-label="Previous testimonial"
              className="w-11 h-11 rounded-lg border border-[#c59d5f] text-[#c59d5f] hover:bg-[#c59d5f] hover:text-white flex items-center justify-center transition-all duration-300 cursor-pointer"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <button
              type="button"
              onClick={handleNext}
              aria-label="Next testimonial"
              className="w-11 h-11 rounded-lg border border-[#c59d5f] text-[#c59d5f] hover:bg-[#c59d5f] hover:text-white flex items-center justify-center transition-all duration-300 cursor-pointer"
            >
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
