
"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import siteData from "@/data/data.json";
import { ContactData } from "@/types";

interface ContactProps {
  data?: ContactData;
  className?: string;
}

export default function Contact({
  data: customData,
  className = "",
}: ContactProps) {
  const jsonContact = siteData.Tour.sections.Contact?.variants
    ?.TourContact1 as unknown as ContactData;

  const data = customData || jsonContact;

  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    checkIn: "",
    checkOut: "",
    message: "",
  });

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 },
    );

    const currentRef = sectionRef.current;

    if (currentRef) observer.observe(currentRef);

    return () => observer.disconnect();
  }, []);

  const eyebrow = data?.eyebrow || "CONTACT US";
  const heading = data?.heading || "Get in Touch";
  const image = data?.image || "/contact/contact-bed.webp";
  const alt = data?.alt || "Golden Palm Luxury Hotel Suite";

  const inquiryBox = data?.inquiryBox || {
    badgeText: "Call us for any inquiry",
    phone: "+1 000-000-000",
    phoneHref: "tel:+1000000000",
  };

  const form = data?.form || {
    namePlaceholder: "Your Name",
    emailPlaceholder: "Email Address",
    checkInPlaceholder: "Check In",
    checkOutPlaceholder: "Check Out",
    messagePlaceholder: "Write a Message",
    buttonText: "CHECK AVAILABILITY",
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setIsSubmitted(true);

    setFormData({
      name: "",
      email: "",
      checkIn: "",
      checkOut: "",
      message: "",
    });

    setTimeout(() => setIsSubmitted(false), 5000);
  };

  return (
    <section
      id="contact"
      ref={sectionRef}
      className={`relative w-full overflow-hidden bg-white text-neutral-900 ${className}`}
    >
      <div className="flex flex-col lg:flex-row items-stretch w-full">
        <div className="relative w-full lg:w-[41%] xl:w-[40.5%] min-h-[300px] sm:min-h-[380px] md:min-h-[430px] lg:min-h-[750px] xl:min-h-[850px] flex items-center justify-center px-4 py-10 sm:p-8 lg:p-8 xl:p-12 shrink-0">
          <div className="absolute inset-0">
            <Image
              src={image}
              alt={alt}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 41vw"
              className="object-cover object-center"
            />
            <div className="absolute inset-0 bg-black/35 lg:bg-black/0" />
          </div>

          <div
            className={`relative z-10 w-full max-w-[390px] transition-all duration-1000 ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-6"
            }`}
          >
            <div className="bg-[#17130f]/95 backdrop-blur-md p-2.5 sm:p-3.5 shadow-2xl">
              <div className="min-h-[210px] sm:min-h-[260px] border border-[#c59d5f]/60 px-5 py-6 sm:px-8 sm:py-8 flex flex-col justify-center relative overflow-hidden">
                <div className="absolute right-2 top-1/2 -translate-y-1/2 opacity-[0.07] pointer-events-none">
                  <svg
                    viewBox="0 0 48 48"
                    fill="none"
                    stroke="white"
                    strokeWidth="1.5"
                    className="w-28 h-28 sm:w-36 sm:h-36"
                  >
                    <circle cx="24" cy="20" r="8" />
                    <path d="M12 38c0-6.627 5.373-12 12-12s12 5.373 12 12" />
                    <path d="M14 20a10 10 0 0 1 20 0v2a2 2 0 0 1-2 2h-1" />
                    <path d="M16 20h-2a2 2 0 0 0-2 2v2a2 2 0 0 0 2 2h2" />
                  </svg>
                </div>

                <div className="relative z-10">
                  <div className="w-11 h-11 sm:w-14 sm:h-14 mb-3 sm:mb-5 text-[#dba12c]">
                    <svg
                      viewBox="0 0 48 48"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="w-full h-full"
                    >
                      <circle cx="24" cy="20" r="8" />
                      <path d="M12 38c0-6.627 5.373-12 12-12s12 5.373 12 12" />
                      <path d="M14 20a10 10 0 0 1 20 0v2a2 2 0 0 1-2 2h-1" />
                      <path d="M16 20h-2a2 2 0 0 0-2 2v2a2 2 0 0 0 2 2h2" />
                      <path d="M30 30h-6a2 2 0 0 1-2-2" />
                      <path d="M32 8h8a2 2 0 0 1 2 2v6a2 2 0 0 1-2 2h-4l-4 3v-3" />
                    </svg>
                  </div>

                  <p className="text-white text-xs sm:text-base font-medium mb-2">
                    {inquiryBox.badgeText}
                  </p>

                  <a
                    href={inquiryBox.phoneHref}
                    className="inline-block max-w-full text-white text-xl min-[375px]:text-2xl sm:text-3xl xl:text-[34px] font-bold tracking-tight break-words hover:text-[#dba12c] transition-colors"
                  >
                    {inquiryBox.phone}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div
          className={`relative z-10 w-full lg:w-[59%] xl:w-[59.5%] bg-white px-5 py-10 sm:px-8 sm:py-12 md:px-12 lg:px-[6%] xl:px-[7%] lg:py-16 xl:py-20 flex items-center transition-all duration-1000 ${
            isVisible
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-6"
          }`}
        >
          <div className="absolute inset-0 pointer-events-none opacity-[0.025] bg-[url('/images/map-pattern.png')] bg-cover" />

          <div className="relative z-10 w-full max-w-[680px] mx-auto">
            <div className="mb-7 sm:mb-9 lg:mb-10">
              <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-5">
                <svg
                  className="w-7 sm:w-10 h-3 sm:h-4 shrink-0 text-[#c58b35]"
                  viewBox="0 0 32 12"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                >
                  <path d="M0 6c6 0 6-5 12-5s6 10 12 10 6-5 8-5" />
                </svg>

                <span className="text-[#b77b29] text-[10px] sm:text-sm tracking-[0.25em] sm:tracking-[0.35em] font-medium uppercase whitespace-nowrap">
                  {eyebrow}
                </span>

                <svg
                  className="w-7 sm:w-10 h-3 sm:h-4 shrink-0 text-[#c58b35] -scale-x-100"
                  viewBox="0 0 32 12"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                >
                  <path d="M0 6c6 0 6-5 12-5s6 10 12 10 6-5 8-5" />
                </svg>
              </div>

              <h2 className="font-serif text-[34px] min-[375px]:text-[38px] sm:text-[46px] lg:text-[54px] font-normal text-[#111111] leading-[1.15] tracking-tight">
                {heading}
              </h2>
            </div>

            <form onSubmit={handleSubmit}>
              {isSubmitted && (
                <div
                  role="status"
                  className="mb-5 p-3 sm:p-4 bg-[#fdf5e9] border border-[#c59d5f]/40 text-[#8b6528] text-xs sm:text-sm"
                >
                  Thank you! Your availability inquiry has been submitted.
                  Our reservations team will reach out to you shortly.
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 lg:gap-6 mb-3 sm:mb-5 lg:mb-7">
                <input
                  type="text"
                  name="name"
                  required
                  placeholder={form.namePlaceholder}
                  value={formData.name}
                  onChange={handleChange}
                  autoComplete="name"
                  className="w-full min-w-0 h-[54px] sm:h-[60px] px-4 sm:px-5 bg-[#f3f3f3] border border-[#e5e5e5] text-[#333] text-sm sm:text-base placeholder:text-[#555] focus:outline-none focus:border-[#c59d5f] transition-colors rounded-none"
                />

                <input
                  type="email"
                  name="email"
                  required
                  placeholder={form.emailPlaceholder}
                  value={formData.email}
                  onChange={handleChange}
                  autoComplete="email"
                  className="w-full min-w-0 h-[54px] sm:h-[60px] px-4 sm:px-5 bg-[#f3f3f3] border border-[#e5e5e5] text-[#333] text-sm sm:text-base placeholder:text-[#555] focus:outline-none focus:border-[#c59d5f] transition-colors rounded-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 lg:gap-6 mb-3 sm:mb-5 lg:mb-7">
                <div className="min-w-0">
                  <label
                    htmlFor="contact-check-in"
                    className="sr-only"
                  >
                    {form.checkInPlaceholder}
                  </label>
                  <input
                    id="contact-check-in"
                    type="date"
                    name="checkIn"
                    value={formData.checkIn}
                    onChange={handleChange}
                    className="w-full min-w-0 h-[54px] sm:h-[60px] px-3 sm:px-5 bg-[#f3f3f3] border border-[#e5e5e5] text-[#444] text-sm sm:text-base focus:outline-none focus:border-[#c59d5f] transition-colors rounded-none"
                  />
                </div>

                <div className="min-w-0">
                  <label
                    htmlFor="contact-check-out"
                    className="sr-only"
                  >
                    {form.checkOutPlaceholder}
                  </label>
                  <input
                    id="contact-check-out"
                    type="date"
                    name="checkOut"
                    min={formData.checkIn || undefined}
                    value={formData.checkOut}
                    onChange={handleChange}
                    className="w-full min-w-0 h-[54px] sm:h-[60px] px-3 sm:px-5 bg-[#f3f3f3] border border-[#e5e5e5] text-[#444] text-sm sm:text-base focus:outline-none focus:border-[#c59d5f] transition-colors rounded-none"
                  />
                </div>
              </div>

              <div className="mb-5 sm:mb-6 lg:mb-7">
                <textarea
                  name="message"
                  rows={4}
                  placeholder={form.messagePlaceholder}
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full min-w-0 min-h-[115px] sm:min-h-[135px] px-4 sm:px-5 py-4 sm:py-5 bg-[#f3f3f3] border border-[#e5e5e5] text-[#333] text-sm sm:text-base placeholder:text-[#555] focus:outline-none focus:border-[#c59d5f] transition-colors resize-y rounded-none"
                />
              </div>

              <button
                type="submit"
                className="w-full min-h-[56px] sm:min-h-[64px] bg-[#17110d] border border-[#c59d5f] text-white text-xs sm:text-sm font-bold uppercase tracking-[0.12em] sm:tracking-wide hover:bg-[#c59d5f] transition-all duration-300 cursor-pointer px-4"
              >
                {form.buttonText}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
