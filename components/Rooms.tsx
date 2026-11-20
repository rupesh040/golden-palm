"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Star } from "lucide-react";
import siteData from "@/data/data.json";
import { RoomsData } from "@/types";

interface RoomsProps {
  data?: RoomsData;
  className?: string;
}

export default function Rooms({ data: customData, className = "" }: RoomsProps) {
  const jsonRooms = siteData.Tour.sections.Rooms?.variants?.TourRooms1 as unknown as RoomsData;
  const data = customData || jsonRooms;

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

  const eyebrow = data?.eyebrow || "OUR ROOMS";
  const heading = data?.heading || "Comfortable Rooms & Suites";
  const description =
    data?.description ||
    "Choose from our elegant rooms, designed for comfort, style and a relaxing stay.";
  const rooms = data?.rooms || [];

  return (
    <section
      id="rooms"
      ref={sectionRef}
      className={`relative w-full py-5 sm:py-10 lg:py-14 px-4 sm:px-6 lg:px-8 bg-white text-neutral-900 border-t border-neutral-100 overflow-hidden ${className}`}
    >
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-7 sm:mb-12 lg:mb-16">
          <div
            className={`flex items-center justify-center gap-3 mb-3.5 transition-all duration-700 ease-out transform ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4"
            }`}
          >
            <div className="w-10 sm:w-14 h-[1.5px] bg-[#c59d5f]" />
            <span className="text-[#c59d5f] font-bold text-xs sm:text-sm tracking-widest uppercase">
              {eyebrow}
            </span>
            <div className="w-10 sm:w-14 h-[1.5px] bg-[#c59d5f]" />
          </div>

          <h2
            className={`font-serif text-3xl sm:text-4xl lg:text-[44px] font-bold text-[#111827] tracking-tight mb-3.5 transition-all duration-700 delay-150 ease-out transform ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
            }`}
          >
            {heading}
          </h2>

          <p
            className={`text-sm sm:text-base text-neutral-600 font-normal leading-relaxed transition-all duration-700 delay-300 ease-out transform ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
            }`}
          >
            {description}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {rooms.map((room, index) => (
            <div
              key={room.id}
              className={`rounded-2xl overflow-hidden bg-white border border-neutral-100 shadow-[0_4px_20px_rgba(0,0,0,0.06)] hover:shadow-[0_14px_34px_rgba(0,0,0,0.12)] hover:-translate-y-1.5 transition-all duration-500 ease-out group transform ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-10"
              }`}
              style={{
                transitionDelay: `${120 + index * 80}ms`,
              }}
            >
              <div className="relative w-full h-[210px] sm:h-[230px] md:h-[220px] lg:h-[235px] overflow-hidden bg-neutral-100">
                <Image
                  src={room.image}
                  alt={room.alt || room.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                />
              </div>

              <div className="p-5 sm:p-6 bg-white">
                <div className="flex items-center justify-between gap-2 mb-2">
                  <h3 className="font-bold text-lg sm:text-xl text-[#111827] tracking-tight group-hover:text-[#c59d5f] transition-colors">
                    {room.title}
                  </h3>
                  <div className="flex items-center gap-1 text-[#e5a836] shrink-0">
                    {Array.from({ length: room.stars }).map((_, i) => (
                      <Star
                        key={i}
                        className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-[#e5a836] text-[#e5a836]"
                      />
                    ))}
                  </div>
                </div>

                <div className="flex items-baseline gap-1.5 text-[#c59d5f]">
                  <span className="font-bold text-base sm:text-lg text-[#c59d5f]">
                    {room.price}
                  </span>
                  <span className="text-xs sm:text-sm font-semibold text-[#c59d5f]">
                    {room.priceUnit}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
