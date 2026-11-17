
"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Phone, Mail, MapPin, ChevronRight } from "lucide-react";
import siteData from "@/data/data.json";
import { FooterData } from "@/types";

interface FooterProps {
  data?: FooterData;
  className?: string;
}

export default function Footer({
  data: customData,
  className = "",
}: FooterProps) {
  const jsonFooter = siteData.Tour.sections.Footer?.variants
    ?.TourFooter1 as unknown as FooterData;

  const data = customData || jsonFooter;

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
        threshold: 0.1,
      },
    );

    const currentRef = sectionRef.current;

    if (currentRef) observer.observe(currentRef);

    return () => observer.disconnect();
  }, []);

  const brand = data?.brand || {
    logo: "/logo.png",
    logoAlt: "Golden Palm Hotel & Resort",
    brandName: "Golden Palm",
    brandTagline: "HOTEL & RESORT",
    description:
      "A premium hotel & resort offering luxurious accommodations, modern amenities, and a truly relaxing stay.",
  };

  const navbarLinks =
    siteData.Tour?.sections?.Header?.variants?.TourHeader1?.links || [];

  const defaultQuickLinks =
    navbarLinks.length > 0
      ? navbarLinks.map((link) => ({ name: link.name, href: link.href }))
      : [
          { name: "Home", href: "#home" },
          { name: "About Us", href: "#about-us" },
          { name: "Our Rooms", href: "#rooms" },
          { name: "Why Choose Us", href: "#why-choose-us" },
          { name: "Testimonials", href: "#testimonials" },
          { name: "FAQs", href: "#faq" },
          { name: "Contact Us", href: "#contact" },
        ];

  const quickLinks = {
    title: data?.quickLinks?.title || "Quick Links",
    links:
      data?.quickLinks?.links && data.quickLinks.links.length > 0
        ? data.quickLinks.links
        : defaultQuickLinks,
  };

  const contact = data?.contact || {
    title: "Contact",
    phone: "+1 (305) 555-0187",
    phoneHref: "tel:+13055550187",
    email: "reservation@goldenpalm.com",
    emailHref: "mailto:reservation@goldenpalm.com",
    address: "123 Palm Avenue, Miami, FL 33101, United States",
  };

  const followUs = data?.followUs || {
    title: "Follow Us",
    socials: [
      { platform: "facebook", href: "https://facebook.com", icon: "facebook" },
      { platform: "instagram", href: "https://instagram.com", icon: "instagram" },
      { platform: "youtube", href: "https://youtube.com", icon: "youtube" },
      { platform: "linkedin", href: "https://linkedin.com", icon: "linkedin" },
    ],
  };

  const copyright =
    data?.bottomBar?.copyright ||
    "© 2025 Golden Palm Hotel & Resort. All Rights Reserved.";

  const handleLinkClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string,
  ) => {
    if (!href.startsWith("#")) return;

    e.preventDefault();

    const targetId = href.replace(/^#/, "");

    if (targetId === "home" || targetId === "") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    const element = document.getElementById(targetId);

    if (element) {
      const offset =
        element.getBoundingClientRect().top + window.scrollY - 80;

      window.scrollTo({
        top: offset,
        behavior: "smooth",
      });
    }
  };

  const renderSocialIcon = (platform: string) => {
    switch (platform.toLowerCase()) {
      case "facebook":
        return (
          <svg className="w-[17px] h-[17px] fill-current" viewBox="0 0 24 24">
            <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
          </svg>
        );

      case "instagram":
        return (
          <svg
            className="w-[17px] h-[17px] fill-none stroke-current"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            viewBox="0 0 24 24"
          >
            <rect width="20" height="20" x="2" y="2" rx="5" />
            <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
            <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
          </svg>
        );

      case "youtube":
        return (
          <svg className="w-[18px] h-[18px] fill-current" viewBox="0 0 24 24">
            <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33zM9.75 15.02V8.5l5.75 3.26-5.75 3.26z" />
          </svg>
        );

      case "linkedin":
        return (
          <svg className="w-[17px] h-[17px] fill-current" viewBox="0 0 24 24">
            <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
            <rect width="4" height="12" x="2" y="9" />
            <circle cx="4" cy="4" r="2" />
          </svg>
        );

      default:
        return null;
    }
  };

  const sectionAnimation = (delay: number) => ({
    transitionDelay: `${delay}ms`,
  });

  const animationClass = isVisible
    ? "opacity-100 translate-y-0"
    : "opacity-0 translate-y-6";

  return (
    <footer
      id="footer"
      ref={sectionRef}
      className={`relative w-full bg-[#003b29] text-white pt-14 pb-10 px-5 sm:px-8 lg:px-10 overflow-hidden ${className}`}
    >
      <div className="relative z-10 max-w-[1280px] mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[2.4fr_1.6fr_2.2fr_1.4fr] gap-9 lg:gap-0">
          <div
            style={sectionAnimation(0)}
            className={`lg:pr-8 xl:pr-10 transition-all duration-700 ${animationClass}`}
          >
            <div className="mb-5">
              <a
                href="#home"
                onClick={(e) => handleLinkClick(e, "#home")}
                className="inline-block group transition-transform duration-300 hover:scale-[1.02]"
                aria-label={
                  brand.logoAlt ||
                  brand.brandName ||
                  "Golden Palm Hotel & Resort"
                }
              >
                <div className="relative w-[210px] sm:w-[245px] h-[68px] sm:h-[80px]">
                  <Image
                    src={brand.logo || "/logo.png"}
                    alt={
                      brand.logoAlt ||
                      brand.brandName ||
                      "Golden Palm Hotel & Resort"
                    }
                    fill
                    sizes="(max-width: 640px) 210px, 245px"
                    className="object-contain object-left"
                    priority
                  />
                </div>
              </a>
            </div>

            <p className="text-[15px] sm:text-base text-white/90 leading-[1.55] max-w-[340px]">
              {brand.description}
            </p>
          </div>

          <div
            style={sectionAnimation(100)}
            className={`lg:px-8 xl:px-10 lg:border-l lg:border-white/30 transition-all duration-700 ${animationClass}`}
          >
            <h3 className="font-serif text-[23px] sm:text-[25px] font-bold text-white whitespace-nowrap">
              {quickLinks.title}
            </h3>

            <div className="w-[48px] h-[4px] bg-[#e8b333] mt-3 mb-6" />

            <ul className="space-y-3.5">
              {quickLinks.links.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    onClick={(e) => handleLinkClick(e, link.href)}
                    className="group inline-flex items-center gap-2.5 text-[15px] sm:text-base text-white/90 hover:text-[#e8b333] transition-colors"
                  >
                    <ChevronRight className="w-[17px] h-[17px] text-[#e8b333] shrink-0 group-hover:translate-x-1 transition-transform" />
                    <span>{link.name}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div
            style={sectionAnimation(200)}
            className={`lg:px-8 xl:px-10 lg:border-l lg:border-white/30 transition-all duration-700 ${animationClass}`}
          >
            <h3 className="font-serif text-[23px] sm:text-[25px] font-bold text-white">
              {contact.title}
            </h3>

            <div className="w-[48px] h-[4px] bg-[#e8b333] mt-3 mb-6" />

            <ul className="space-y-3">
              <li>
                <a
                  href={
                    contact.phoneHref ||
                    `tel:${contact.phone.replace(/[^0-9+]/g, "")}`
                  }
                  className="flex items-center gap-3 group text-[14px] sm:text-base text-white/90 hover:text-[#e8b333] transition-colors"
                >
                  <span className="w-[32px] h-[32px] rounded-full bg-[#eab32f] text-[#003b29] flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                    <Phone className="w-[17px] h-[17px] fill-current" />
                  </span>

                  <span className="font-medium whitespace-nowrap">
                    {contact.phone}
                  </span>
                </a>
              </li>

              <li>
                <a
                  href={contact.emailHref || `mailto:${contact.email}`}
                  className="flex items-center gap-3 group text-[14px] sm:text-base text-white/90 hover:text-[#e8b333] transition-colors"
                >
                  <span className="w-[32px] h-[32px] rounded-full bg-[#eab32f] text-[#003b29] flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                    <Mail className="w-[17px] h-[17px]" />
                  </span>

                  <span className="font-medium break-all">
                    {contact.email}
                  </span>
                </a>
              </li>

              <li>
                <div className="flex items-start gap-3 text-[14px] sm:text-base text-white/90 leading-[1.4]">
                  <span className="w-[32px] h-[32px] rounded-full bg-[#eab32f] text-[#003b29] flex items-center justify-center shrink-0">
                    <MapPin className="w-[18px] h-[18px] fill-current" />
                  </span>

                  <span>{contact.address}</span>
                </div>
              </li>
            </ul>
          </div>

          <div
            style={sectionAnimation(300)}
            className={`lg:pl-8 xl:pl-10 lg:border-l lg:border-white/30 transition-all duration-700 ${animationClass}`}
          >
            <h3 className="font-serif text-[23px] sm:text-[25px] font-bold text-white whitespace-nowrap">
              {followUs.title}
            </h3>

            <div className="w-[48px] h-[4px] bg-[#e8b333] mt-3 mb-9" />

            <div className="flex items-center gap-2.5 flex-wrap">
              {followUs.socials.map((social) => (
                <a
                  key={social.platform}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Follow on ${social.platform}`}
                  className="w-[37px] h-[37px] rounded-full border-[1.5px] border-white text-white flex items-center justify-center hover:bg-[#e8b333] hover:border-[#e8b333] hover:text-[#003b29] hover:-translate-y-1 transition-all duration-300"
                >
                  {renderSocialIcon(social.platform)}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="w-full h-[2px] bg-[#e8b333] mt-12 lg:mt-[60px] mb-6" />

        <div className="text-center text-[14px] sm:text-base text-white/95 font-normal tracking-wide">
          {copyright}
        </div>
      </div>
    </footer>
  );
}
