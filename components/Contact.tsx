
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
      { threshold: 0.12 },
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
    phone: "+1 (212) 555-0199",
    phoneHref: "tel:+12125550199",
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
      <div className="relative min-h-[850px] lg:min-h-[890px] flex items-center">
        <div className="absolute inset-y-0 left-0 w-full lg:w-[77%]">
          <Image
            src={image}
            alt={alt}
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 77vw"
            className="object-cover object-center"
          />
        </div>

        <div className="absolute inset-y-0 right-0 w-[23%] hidden lg:block bg-white">
          <div className="absolute inset-0 opacity-[0.035] bg-[url('/images/map-pattern.png')] bg-cover bg-center" />
        </div>

        <div
          className={`absolute z-20 left-[5.8%] top-1/2 -translate-y-1/2 w-[37%] hidden lg:block transition-all duration-1000 ${
            isVisible
              ? "opacity-100 translate-x-0"
              : "opacity-0 -translate-x-10"
          }`}
        >
          <div className="bg-[#17130f]/90 backdrop-blur-sm p-4">
            <div className="min-h-[285px] border border-[#c59d5f]/60 px-10 py-8 flex flex-col justify-center relative overflow-hidden">
              <div className="absolute right-4 top-1/2 -translate-y-1/2 opacity-[0.08]">
                <svg
                  viewBox="0 0 48 48"
                  fill="none"
                  stroke="white"
                  strokeWidth="1.5"
                  className="w-36 h-36"
                >
                  <circle cx="24" cy="20" r="8" />
                  <path d="M12 38c0-6.627 5.373-12 12-12s12 5.373 12 12" />
                  <path d="M14 20a10 10 0 0 1 20 0v2a2 2 0 0 1-2 2h-1" />
                  <path d="M16 20h-2a2 2 0 0 0-2 2v2a2 2 0 0 0 2 2h2" />
                </svg>
              </div>

              <div className="relative z-10">
                <div className="w-14 h-14 mb-5 text-[#dba12c]">
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

                <p className="text-white text-base font-medium mb-3">
                  {inquiryBox.badgeText}
                </p>

                <a
                  href={inquiryBox.phoneHref}
                  className="text-white text-3xl xl:text-[34px] font-bold tracking-tight hover:text-[#dba12c] transition-colors"
                >
                  {inquiryBox.phone}
                </a>
              </div>
            </div>
          </div>
        </div>

        <div
          className={`relative z-10 ml-auto w-full lg:w-[59.3%] lg:min-h-[750px] lg:mr-0 bg-white px-6 py-12 sm:px-10 lg:px-[6.5%] lg:py-24 transition-all duration-1000 ${
            isVisible
              ? "opacity-100 translate-x-0"
              : "opacity-0 translate-x-10"
          }`}
        >
          <div className="absolute inset-0 pointer-events-none opacity-[0.025] bg-[url('/images/map-pattern.png')] bg-cover" />

          <div className="relative z-10 max-w-[760px]">
            <div className="mb-9 lg:mb-10">
              <div className="flex items-center gap-3 mb-6">
                <svg
                  className="w-10 h-4 text-[#c58b35]"
                  viewBox="0 0 32 12"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                >
                  <path d="M0 6c6 0 6-5 12-5s6 10 12 10 6-5 8-5" />
                </svg>

                <span className="text-[#b77b29] text-xs sm:text-sm tracking-[0.35em] font-medium uppercase whitespace-nowrap">
                  {eyebrow}
                </span>

                <svg
                  className="w-10 h-4 text-[#c58b35] -scale-x-100"
                  viewBox="0 0 32 12"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                >
                  <path d="M0 6c6 0 6-5 12-5s6 10 12 10 6-5 8-5" />
                </svg>
              </div>

              <h2 className="font-serif text-[38px] sm:text-[46px] lg:text-[54px] font-normal text-[#111111] leading-tight tracking-tight">
                {heading}
              </h2>
            </div>

            <form onSubmit={handleSubmit}>
              {isSubmitted && (
                <div className="mb-6 p-4 bg-[#fdf5e9] border border-[#c59d5f]/40 text-[#8b6528] text-sm">
                  Thank you! Your availability inquiry has been submitted.
                  Our reservations team will reach out to you shortly.
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 lg:gap-6 mb-5 lg:mb-8">
                <input
                  type="text"
                  name="name"
                  required
                  placeholder={form.namePlaceholder}
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full h-[60px] px-6 bg-[#f3f3f3] border border-[#e5e5e5] text-[#333] text-base placeholder:text-[#444] focus:outline-none focus:border-[#c59d5f] transition-colors"
                />

                <input
                  type="email"
                  name="email"
                  required
                  placeholder={form.emailPlaceholder}
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full h-[60px] px-6 bg-[#f3f3f3] border border-[#e5e5e5] text-[#333] text-base placeholder:text-[#444] focus:outline-none focus:border-[#c59d5f] transition-colors"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 lg:gap-6 mb-5 lg:mb-8">
                <input
                  type="date"
                  name="checkIn"
                  aria-label={form.checkInPlaceholder}
                  value={formData.checkIn}
                  onChange={handleChange}
                  className="w-full h-[60px] px-6 bg-[#f3f3f3] border border-[#e5e5e5] text-[#444] text-base focus:outline-none focus:border-[#c59d5f] transition-colors"
                />

                <input
                  type="date"
                  name="checkOut"
                  aria-label={form.checkOutPlaceholder}
                  value={formData.checkOut}
                  onChange={handleChange}
                  className="w-full h-[60px] px-6 bg-[#f3f3f3] border border-[#e5e5e5] text-[#444] text-base focus:outline-none focus:border-[#c59d5f] transition-colors"
                />
              </div>

              <div className="mb-7 lg:mb-8">
                <textarea
                  name="message"
                  rows={4}
                  placeholder={form.messagePlaceholder}
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full min-h-[135px] px-6 py-6 bg-[#f3f3f3] border border-[#e5e5e5] text-[#333] text-base placeholder:text-[#444] focus:outline-none focus:border-[#c59d5f] transition-colors resize-y"
                />
              </div>

              <button
                type="submit"
                className="w-full min-h-[68px] bg-[#17110d] border border-[#c59d5f] text-white text-sm sm:text-base font-bold uppercase tracking-wide hover:bg-[#c59d5f] hover:text-white transition-all duration-300 cursor-pointer"
              >
                {form.buttonText}
              </button>
            </form>
          </div>
        </div>

        <div className="relative z-20 mx-5 -mt-8 mb-8 lg:hidden bg-[#17130f]/95 p-3">
          <div className="border border-[#c59d5f]/60 p-6">
            <div className="text-[#dba12c] text-3xl mb-3">☎</div>
            <p className="text-white text-sm mb-2">
              {inquiryBox.badgeText}
            </p>
            <a
              href={inquiryBox.phoneHref}
              className="text-white text-2xl font-bold hover:text-[#dba12c] transition-colors"
            >
              {inquiryBox.phone}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
