"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { Award, Clock3, Gem, Gift } from "@/components/Icons";
import { WhatsAppBrandIcon } from "@/components/BrandIcons";
import { whatsappUrl } from "@/lib/utils";
import type { HeroSlide } from "@/lib/supabase";

const features = [
  { icon: Award, text: "Exquisite Fragrance", color: "#CBA45D" },
  { icon: Clock3, text: "Long Lasting", color: "#D7B46A" },
  { icon: Gem, text: "Premium Quality", color: "#CBA45D" },
  { icon: Gift, text: "Made For Moments", color: "#D7B46A" },
];

export default function Hero({ slides }: { slides: HeroSlide[] }) {
  const [activeSlide, setActiveSlide] = useState(0);
  const safeSlides = slides.length ? slides : [];
  const currentSlide = safeSlides[activeSlide];

  useEffect(() => {
    if (safeSlides.length <= 1) return;

    const timer = window.setInterval(() => {
      setActiveSlide((current) => (current + 1) % safeSlides.length);
    }, 2000);

    return () => window.clearInterval(timer);
  }, [safeSlides.length]);

  return (
    <section className="hero">
      <div className="hero-bg">
        {safeSlides.map((slide, index) => (
          <Image
            key={`${slide.src}-${index}`}
            className={index === activeSlide ? "hero-slide active" : "hero-slide"}
            src={slide.src}
            alt={slide.alt}
            fill
            priority={index === 0}
            sizes="100vw"
          />
        ))}
      </div>

      <div className="hero-overlay" />

      <div className="hero-content">
        <span className="kicker">Luxury Scents by Floral Intense</span>

        <h1>{currentSlide?.title || "Elegance Redefined. Luxury Unleashed."}</h1>

        <p>
          {currentSlide?.subtitle ||
            "A fragrance that speaks before you do. Premium perfume collection for every occasion."}
        </p>

        <a
          className="gold-button"
          href={currentSlide?.buttonLink?.startsWith("http") ? currentSlide.buttonLink : whatsappUrl("Hi! I want to order from Floral Intense.")}
          target="_blank"
          rel="noreferrer"
        >
          <WhatsAppBrandIcon size={22} />
          {currentSlide?.buttonText || "Order on WhatsApp"}
        </a>

        {safeSlides.length > 1 && (
          <div className="hero-dots" aria-label="Hero slider indicators">
            {safeSlides.map((slide, index) => (
              <button
                key={`${slide.src}-dot-${index}`}
                className={index === activeSlide ? "active" : ""}
                type="button"
                aria-label={`Go to slide ${index + 1}`}
                onClick={() => setActiveSlide(index)}
              />
            ))}
          </div>
        )}
      </div>

      <div className="hero-feature-bar">
        {features.map((item) => {
          const Icon = item.icon;
          return (
            <div key={item.text}>
              <Icon color={item.color} size={28} strokeWidth={2.2} />
              <span>{item.text}</span>
            </div>
          );
        })}
      </div>
    </section>
  );
}
