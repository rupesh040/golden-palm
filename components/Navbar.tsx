"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Phone, ChevronDown, Menu, X } from "lucide-react";
import siteData from "@/data/data.json";
import { HeaderData, NavLink, NavButton } from "@/types";

interface NavbarProps {
  data?: HeaderData;
  className?: string;
}

export default function Navbar({ data: customData, className = "" }: NavbarProps) {
  const jsonHeader = siteData.Tour.sections.Header.variants.TourHeader1 as HeaderData;
  const data = customData || jsonHeader;
  const pathname = usePathname();

  const [mounted, setMounted] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [activeSection, setActiveSection] = useState<string>("home");

  const isProgrammaticScroll = useRef(false);
  const scrollTimerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    setMounted(true);

    const sections = [
      "home",
      "about-us",
      "rooms",
      "services",
      "facilities",
      "why-choose-us",
      "testimonials",
      "faq",
      "contact",
    ];

    const scrollToElement = (targetId: string, smooth: boolean = true) => {
      if (!targetId || targetId === "home") {
        window.scrollTo({
          top: 0,
          behavior: smooth ? "smooth" : "auto",
        });
        setActiveSection("home");
        return;
      }

      const el = document.getElementById(targetId);
      if (el) {
        const navHeight = 80;
        const rect = el.getBoundingClientRect();
        const top = rect.top + window.scrollY - navHeight;
        window.scrollTo({
          top: Math.max(0, top),
          behavior: smooth ? "smooth" : "auto",
        });
        setActiveSection(targetId);
      }
    };

    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      const isBottom =
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 60;

      let current = "home";

      if (isBottom) {
        current = "contact";
      } else {
        const scrollPosition = window.scrollY + 160;
        for (const sectionId of sections) {
          const el = document.getElementById(sectionId);
          if (el) {
            const top = el.getBoundingClientRect().top + window.scrollY;
            if (scrollPosition >= top) {
              current = sectionId;
            }
          }
        }
      }

      setActiveSection(current);

      if (!isProgrammaticScroll.current) {
        if (current === "home") {
          if (window.location.hash && window.location.hash !== "#home") {
            window.history.replaceState(null, "", "#home");
          }
        } else {
          if (window.location.hash !== `#${current}`) {
            window.history.replaceState(null, "", `#${current}`);
          }
        }
      }
    };

    const handlePopState = () => {
      const hash = window.location.hash;
      const targetId = hash.replace(/^#/, "");
      isProgrammaticScroll.current = true;
      if (scrollTimerRef.current) clearTimeout(scrollTimerRef.current);
      scrollTimerRef.current = setTimeout(() => {
        isProgrammaticScroll.current = false;
      }, 1000);
      scrollToElement(targetId, true);
    };

    if (window.location.hash) {
      const targetId = window.location.hash.replace(/^#/, "");
      if (targetId && targetId !== "home") {
        setTimeout(() => {
          scrollToElement(targetId, false);
        }, 150);
      }
    }

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("popstate", handlePopState);
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("popstate", handlePopState);
      if (scrollTimerRef.current) clearTimeout(scrollTimerRef.current);
    };
  }, []);

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith("#")) {
      e.preventDefault();
      const targetId = href.replace(/^#/, "");

      isProgrammaticScroll.current = true;
      if (scrollTimerRef.current) {
        clearTimeout(scrollTimerRef.current);
      }
      scrollTimerRef.current = setTimeout(() => {
        isProgrammaticScroll.current = false;
      }, 1000);

      if (window.location.hash !== href) {
        window.history.pushState(null, "", href);
      }

      if (targetId === "home" || targetId === "") {
        window.scrollTo({
          top: 0,
          behavior: "smooth",
        });
        setActiveSection("home");
        return;
      }

      const targetElement = document.getElementById(targetId);
      if (targetElement) {
        const navHeight = 80;
        const elementPosition = targetElement.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.scrollY - navHeight;

        window.scrollTo({
          top: Math.max(0, offsetPosition),
          behavior: "smooth",
        });
        setActiveSection(targetId);
      }
    }
  };

  const getButtonDetails = (button?: NavButton) => {
    if (!button) {
      if (data.phone) {
        return {
          text: data.phone,
          href: data.phoneHref || `tel:${data.phone.replace(/[^0-9+]/g, "")}`,
          isPhone: true,
        };
      }
      return null;
    }

    if (typeof button === "string") {
      const isPhoneNumber = /^[\d\s+\-()]{7,}$/.test(button.trim());
      return {
        text: button,
        href: isPhoneNumber ? `tel:${button.replace(/[^0-9+]/g, "")}` : "#contact",
        isPhone: isPhoneNumber,
      };
    }

    return {
      text: button.text,
      href: button.href || (button.type === "phone" ? `tel:${button.text.replace(/[^0-9+]/g, "")}` : "#contact"),
      isPhone: button.type === "phone" || button.icon === "phone" || /^[\d\s+\-()]{7,}$/.test(button.text.trim()),
    };
  };

  const buttonDetails = getButtonDetails(data.button);

  const isLinkActive = (link: NavLink) => {
    const hrefClean = link.href.replace(/^#/, "");
    if (activeSection && (link.href === `#${activeSection}` || hrefClean === activeSection)) {
      return true;
    }
    if (activeSection === "home" && (link.href === "/" || link.href === "#home")) {
      return true;
    }
    if (
      (activeSection === "services" || activeSection === "facilities") &&
      (link.href === "#rooms" || hrefClean === "rooms")
    ) {
      return true;
    }
    if (pathname === link.href && !link.href.startsWith("#")) {
      return true;
    }
    if (link.active && !activeSection) {
      return true;
    }
    return false;
  };

  return (
    <header
      className={`w-full z-50 sticky top-0 transition-all duration-700 ease-out transform ${
        mounted ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0"
      } ${
        scrolled
          ? "bg-[#0c0c0c]/95 backdrop-blur-md shadow-2xl py-2.5 border-b border-white/5"
          : "bg-[#0e0e0e]/90 backdrop-blur-sm py-4 border-b border-white/5"
      } ${className}`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-12 md:h-14">
          <div
            className={`flex-shrink-0 flex items-center transition-all duration-700 delay-100 ease-out transform ${
              mounted ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-4"
            }`}
          >
            <Link
              href="#home"
              onClick={(e) => handleLinkClick(e, "#home")}
              className="flex items-center gap-2 group transition-transform duration-300 hover:scale-[1.02]"
              aria-label={data.logoAlt || "Golden Palm Hotel & Resort"}
            >
              <div className="relative h-12 md:h-14 w-40 md:w-52 flex items-center">
                <Image
                  src={data.logo || "/logo.png"}
                  alt={data.logoAlt || "Golden Palm Hotel & Resort"}
                  fill
                  priority
                  sizes="(max-width: 768px) 160px, 208px"
                  className="object-contain object-left"
                />
              </div>
            </Link>
          </div>

          <nav
            className={`hidden lg:flex items-center gap-7 xl:gap-8 transition-all duration-700 delay-200 ease-out transform ${
              mounted ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-3"
            }`}
          >
            {data.links.map((link) => {
              const active = isLinkActive(link);
              const hasChildren = link.children && link.children.length > 0;

              if (hasChildren) {
                return (
                  <div
                    key={link.name}
                    className="relative group"
                    onMouseEnter={() => setOpenDropdown(link.name)}
                    onMouseLeave={() => setOpenDropdown(null)}
                  >
                    <button
                      type="button"
                      className={`relative flex items-center gap-1.5 py-2 text-[15px] font-medium tracking-wide transition-colors duration-200 ${
                        active ? "text-[#d4af37]" : "text-white/90 hover:text-[#d4af37]"
                      }`}
                    >
                      <span>{link.name}</span>
                      <ChevronDown
                        className={`w-4 h-4 transition-transform duration-200 ${
                          openDropdown === link.name ? "rotate-180" : ""
                        }`}
                      />
                      {active && (
                        <span className="absolute bottom-[-4px] left-0 right-0 h-[3px] bg-[#d4af37] rounded-full" />
                      )}
                    </button>

                    <div
                      className={`absolute top-full left-0 min-w-[210px] bg-[#161616] border border-[#d4af37]/30 rounded-lg shadow-xl py-2 transition-all duration-200 z-50 ${
                        openDropdown === link.name
                          ? "opacity-100 visible translate-y-1"
                          : "opacity-0 invisible -translate-y-2 pointer-events-none"
                      }`}
                    >
                      {link.children?.map((child) => (
                        <a
                          key={child.name}
                          href={child.href}
                          onClick={(e) => handleLinkClick(e, child.href)}
                          className="block px-4 py-2.5 text-sm text-white/80 hover:text-[#d4af37] hover:bg-white/5 transition-colors duration-150"
                        >
                          {child.name}
                        </a>
                      ))}
                    </div>
                  </div>
                );
              }

              return (
                <div key={link.name} className="relative py-2">
                  <a
                    href={link.href}
                    onClick={(e) => handleLinkClick(e, link.href)}
                    className={`block text-[15px] font-medium tracking-wide transition-colors duration-200 ${
                      active ? "text-[#d4af37]" : "text-white/90 hover:text-[#d4af37]"
                    }`}
                  >
                    {link.name}
                  </a>

                  {active && (
                    <span className="absolute bottom-0 left-0 right-0 h-[3px] bg-[#d4af37] rounded-full shadow-[0_1px_8px_rgba(212,175,55,0.4)] animate-in fade-in duration-300" />
                  )}
                </div>
              );
            })}
          </nav>

          <div
            className={`hidden sm:flex items-center transition-all duration-700 delay-300 ease-out transform ${
              mounted ? "opacity-100 scale-100" : "opacity-0 scale-90"
            }`}
          >
            {buttonDetails && (
              <a
                href={buttonDetails.href}
                onClick={(e) => handleLinkClick(e, buttonDetails.href)}
                className="group relative inline-flex items-center gap-2.5 px-5 py-2 rounded-full border border-[#d4af37] bg-transparent text-white text-sm font-medium tracking-wide transition-all duration-300 hover:bg-[#d4af37] hover:text-black hover:shadow-[0_0_15px_rgba(212,175,55,0.35)] active:scale-95"
              >
                {buttonDetails.isPhone ? (
                  <Phone className="w-4 h-4 text-[#d4af37] fill-[#d4af37] group-hover:text-black group-hover:fill-black transition-colors duration-300" />
                ) : null}
                <span className="whitespace-nowrap font-medium">{buttonDetails.text}</span>
              </a>
            )}
          </div>

          <div className="flex items-center lg:hidden">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2.5 rounded-lg text-white hover:text-[#d4af37] focus:outline-none focus:ring-2 focus:ring-[#d4af37]/50"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6 text-[#d4af37]" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      <div
        className={`lg:hidden fixed inset-x-0 top-full bg-[#0e0e0e]/98 backdrop-blur-xl border-b border-white/10 transition-all duration-300 ease-in-out shadow-2xl overflow-hidden ${
          mobileMenuOpen ? "max-h-[85vh] py-6 opacity-100" : "max-h-0 py-0 opacity-0 pointer-events-none"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 space-y-4">
          <nav className="flex flex-col space-y-2">
            {data.links.map((link) => {
              const active = isLinkActive(link);
              const hasChildren = link.children && link.children.length > 0;

              return (
                <div key={link.name} className="border-b border-white/5 pb-2">
                  <div className="flex items-center justify-between">
                    <a
                      href={link.href}
                      onClick={(e) => {
                        setMobileMenuOpen(false);
                        handleLinkClick(e, link.href);
                      }}
                      className={`text-base font-medium py-1.5 flex items-center gap-2 ${
                        active ? "text-[#d4af37]" : "text-white/80 hover:text-[#d4af37]"
                      }`}
                    >
                      {active && <span className="w-2 h-2 rounded-full bg-[#d4af37]" />}
                      <span>{link.name}</span>
                    </a>

                    {hasChildren && (
                      <button
                        type="button"
                        onClick={() => setOpenDropdown(openDropdown === link.name ? null : link.name)}
                        className="p-2 text-white/60 hover:text-[#d4af37]"
                        aria-label="Toggle Submenu"
                      >
                        <ChevronDown
                          className={`w-4 h-4 transition-transform ${openDropdown === link.name ? "rotate-180" : ""}`}
                        />
                      </button>
                    )}
                  </div>

                  {hasChildren && openDropdown === link.name && (
                    <div className="pl-4 mt-2 space-y-2 border-l border-[#d4af37]/30">
                      {link.children?.map((child) => (
                        <a
                          key={child.name}
                          href={child.href}
                          onClick={(e) => {
                            setMobileMenuOpen(false);
                            handleLinkClick(e, child.href);
                          }}
                          className="block text-sm text-white/70 hover:text-[#d4af37] py-1"
                        >
                          {child.name}
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </nav>

          {buttonDetails && (
            <div className="pt-4">
              <a
                href={buttonDetails.href}
                onClick={(e) => {
                  setMobileMenuOpen(false);
                  handleLinkClick(e, buttonDetails.href);
                }}
                className="w-full flex items-center justify-center gap-3 px-6 py-3 rounded-full border border-[#d4af37] bg-[#d4af37] text-black font-semibold text-sm tracking-wide shadow-[0_0_15px_rgba(212,175,55,0.3)] hover:bg-[#e5be42] transition-colors"
              >
                {buttonDetails.isPhone ? <Phone className="w-4 h-4 fill-current" /> : null}
                <span>{buttonDetails.text}</span>
              </a>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
