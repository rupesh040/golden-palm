"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Plus, Minus } from "lucide-react";
import siteData from "@/data/data.json";
import { FAQData, FAQItem } from "@/types";

interface FAQProps {
  data?: FAQData;
  className?: string;
}

export default function FAQ({ data: customData, className = "" }: FAQProps) {
  const jsonFAQ = siteData.Tour.sections.FAQ?.variants
    ?.TourFAQ1 as unknown as FAQData;
  const data = customData || jsonFAQ;

  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [openIndex, setOpenIndex] = useState<number | null>(0);

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

  const eyebrow = data?.eyebrow || "FREQUENTLY ASKED QUESTIONS";
  const headingPart1 = data?.headingPart1 || "FAQ";
  const headingHighlight = data?.headingHighlight || "s";
  const image = data?.image || "/faq/faq-concierge.webp";
  const alt = data?.alt || "Golden Palm Hotel Concierge Desk with Call Bell";
  const items: FAQItem[] = data?.items || [];

  const toggleAccordion = (index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  return (
    <section
      id="faq"
      ref={sectionRef}
      className={`relative w-full py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 bg-white text-neutral-900 border-t border-neutral-100 overflow-hidden ${className}`}
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-stretch">
          <div className="lg:col-span-7 flex flex-col justify-start">
            <div className="mb-6 sm:mb-8">
              <div
                className={`flex items-center gap-3 sm:gap-4 mb-3 transition-all duration-700 ease-out transform ${
                  isVisible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 -translate-y-4"
                }`}
              >
                <div className="w-10 sm:w-12 h-[2px] bg-[#c59d5f]" />
                <span className="text-[#c59d5f] font-extrabold text-xs sm:text-sm tracking-widest uppercase">
                  {eyebrow}
                </span>
                <div className="w-10 sm:w-12 h-[2px] bg-[#c59d5f]" />
              </div>

              <h2
                className={`font-serif text-5xl sm:text-6xl lg:text-[64px] font-extrabold text-[#111827] tracking-tight leading-none mb-2.5 transition-all duration-700 delay-150 ease-out transform ${
                  isVisible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-6"
                }`}
              >
                <span>{headingPart1}</span>
                <span className="text-[#c59d5f]">{headingHighlight}</span>
              </h2>

              <div
                className={`w-24 sm:w-28 h-[3px] bg-[#c59d5f] rounded-full transition-all duration-700 delay-300 transform ${
                  isVisible ? "opacity-100 scale-100" : "opacity-0 scale-50"
                }`}
              />
            </div>

            <div className="space-y-3.5">
              {items.map((item, idx) => {
                const isOpen = openIndex === idx;

                return (
                  <div
                    key={item.id || idx}
                    className={`rounded-xl overflow-hidden transition-all duration-500 transform ${
                      isOpen
                        ? "shadow-[0_6px_24px_rgba(0,0,0,0.06)] border border-[#24140c]/10"
                        : "bg-white shadow-[0_2px_10px_rgba(0,0,0,0.04)] border border-neutral-100 hover:border-neutral-200 hover:shadow-md"
                    } ${
                      isVisible
                        ? "opacity-100 translate-y-0"
                        : "opacity-0 translate-y-6"
                    }`}
                    style={{
                      transitionDelay: `${150 + idx * 60}ms`,
                    }}
                  >
                    <button
                      type="button"
                      onClick={() => toggleAccordion(idx)}
                      className={`w-full p-4 sm:p-5 flex items-center justify-between text-left transition-colors duration-300 cursor-pointer ${
                        isOpen ? "bg-[#24140c] text-white" : "bg-white text-[#111827] group"
                      }`}
                    >
                      <span
                        className={`font-serif text-lg sm:text-xl font-bold tracking-tight pr-4 transition-colors duration-300 ${
                          isOpen ? "text-white" : "text-[#111827] group-hover:text-[#c59d5f]"
                        }`}
                      >
                        {item.question}
                      </span>

                      <div className="shrink-0 flex items-center justify-center transition-transform duration-300">
                        {isOpen ? (
                          <Minus className="w-5 h-5 sm:w-6 sm:h-6 text-white stroke-[3] transition-transform duration-300" />
                        ) : (
                          <Plus className="w-5 h-5 sm:w-6 sm:h-6 text-[#24140c] stroke-[3] group-hover:text-[#c59d5f] transition-colors duration-300" />
                        )}
                      </div>
                    </button>

                    <div
                      className={`grid transition-all duration-300 ease-in-out ${
                        isOpen
                          ? "grid-rows-[1fr] opacity-100"
                          : "grid-rows-[0fr] opacity-0 pointer-events-none"
                      }`}
                    >
                      <div className="overflow-hidden">
                        <div className="bg-[#fbf4ea] p-4 sm:p-5 text-sm sm:text-[15px] text-neutral-800 leading-relaxed font-medium border-t border-[#24140c]/5">
                          {item.answer}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div
            className={`lg:col-span-5 relative min-h-[380px] sm:min-h-[460px] lg:min-h-[580px] rounded-3xl overflow-hidden shadow-[0_16px_40px_rgba(0,0,0,0.1)] border border-neutral-100 group transition-all duration-700 delay-300 ease-out transform ${
              isVisible
                ? "opacity-100 translate-x-0 scale-100"
                : "opacity-0 translate-x-8 scale-[0.98]"
            }`}
          >
            <Image
              src={image}
              alt={alt}
              fill
              sizes="(max-width: 1024px) 100vw, 42vw"
              className="object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
}
