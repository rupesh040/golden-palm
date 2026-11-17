import React from "react";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Rooms from "@/components/Rooms";
import Amenities from "@/components/Amenities";
import Facilities from "@/components/Facilities";
import WhyChooseUs from "@/components/WhyChooseUs";
import VideoBanner from "@/components/VideoBanner";
import Testimonials from "@/components/Testimonials";
import FAQ from "@/components/FAQ";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white flex flex-col">
      <Hero />
      <About />
      <Rooms />
      <Amenities />
      <Facilities />
      <WhyChooseUs />
      <VideoBanner />
      <Testimonials />
      <FAQ />
      <Contact />
      <Footer />
    </div>
  );
}
