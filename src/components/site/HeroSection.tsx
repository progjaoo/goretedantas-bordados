"use client";

import WhatsAppIcon from "@/components/ui/WhatsAppIcon";
import { buildProductWhatsAppUrl, buildWhatsAppUrl } from "@/lib/utils";
import { PortfolioItem } from "@/types/portfolio";
import { ArrowRight, ChevronLeft, ChevronRight, Eye, Sparkles } from "lucide-react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

interface HeroSectionProps {
  featuredItems: PortfolioItem[];
  onOpenLightbox: (item: PortfolioItem) => void;
}

export default function HeroSection({ featuredItems, onOpenLightbox }: HeroSectionProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);

  // If no items, fallback
  const items = featuredItems.length > 0 ? featuredItems : [];
  const currentItem = items[currentIndex];

  useEffect(() => {
    if (isHovered || items.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % items.length);
    }, 4500);
    return () => clearInterval(interval);
  }, [isHovered, items.length]);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + items.length) % items.length);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % items.length);
  };

  // Touch Swipe handlers for smartphone users
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.targetTouches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return;
    const distance = touchStartX.current - touchEndX.current;
    const isLeftSwipe = distance > 45;
    const isRightSwipe = distance < -45;

    if (isLeftSwipe) {
      handleNext();
    } else if (isRightSwipe) {
      handlePrev();
    }

    touchStartX.current = null;
    touchEndX.current = null;
  };

  return (
    <section className="relative w-full pt-6 pb-16 sm:pt-10 sm:pb-20 lg:pt-14 lg:pb-28 overflow-hidden bg-[#f8f1e9]">
      {/* Background subtle linen texture */}
      <div className="absolute inset-0 linen-texture opacity-40 pointer-events-none" />

      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12 relative z-10">
        {/* 12-Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 lg:gap-14 items-center">
          {/* Left: 5 Columns */}
          <div className="lg:col-span-5 flex flex-col space-y-5 sm:space-y-7">
            {/* Small reassurance badge */}
            <div className="inline-flex items-center space-x-2 px-3 py-1.5 rounded-full bg-[#e2ddd9] border border-[#d8c8b8] w-fit shadow-2xs">
              <Sparkles className="w-3.5 h-3.5 text-[#8d7966]" />
              <span className="text-[10px] sm:text-[11px] font-semibold uppercase tracking-[0.16em] text-[#4a3f35]">
                Bordados de Alta Precisão & Afeto
              </span>
            </div>

            {/* H1 Headline with Italicized Accent */}
            <h1 className="font-serif text-3xl xs:text-4xl sm:text-5xl lg:text-[3.5rem] xl:text-[4rem] leading-[1.1] sm:leading-[1.08] font-normal text-[#231e1a] tracking-tight">
              Peças exclusivas que{" "}
              <span className="italic font-normal font-serif text-[#8d7966]">eternizam</span> histórias
              e carinho.
            </h1>

            {/* Subtitle / Paragraph */}
            <p className="text-sm sm:text-base lg:text-lg text-[#4a3f35]/90 font-normal leading-relaxed max-w-xl">
              Toalhas aveludadas para casamentos e clérigos, necessaires estruturadas em couro sintético
              e enxovais delicados para bebês. Feitos sob medida pela artesã Gorete com acabamento de alta
              costura.
            </p>

            {/* Button Group */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 pt-1 sm:pt-2">
              <a
                href={buildWhatsAppUrl("Olá, Gorete! Gostaria de fazer um orçamento para um bordado personalizado.")}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center space-x-3 px-6 sm:px-8 py-3.5 sm:py-4 bg-[#8d7966] hover:bg-[#786655] active:scale-[0.98] text-[#f8f1e9] text-xs font-semibold uppercase tracking-widest rounded-md shadow-md transition-all duration-300 w-full sm:w-auto text-center"
              >
                <WhatsAppIcon className="w-4 h-4 text-white shrink-0" />
                <span>Pedir Orçamento no WhatsApp</span>
              </a>

              <a
                href="#colecoes"
                className="inline-flex items-center justify-center space-x-2 px-6 py-3.5 sm:py-4 border border-[#d8c8b8] hover:border-[#8d7966] hover:bg-[#e2ddd9]/40 active:scale-[0.98] text-[#231e1a] text-xs font-semibold uppercase tracking-widest rounded-md transition-all duration-300 group w-full sm:w-auto text-center"
              >
                <span>Ver Coleções</span>
                <ArrowRight className="w-4 h-4 text-[#8d7966] group-hover:translate-x-1 transition-transform" />
              </a>
            </div>
          </div>

          {/* Right: 7 Columns - Interactive Showcase / Carousel */}
          <div
            className="lg:col-span-7 relative"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            {/* Soft glow decorative blur */}
            <div className="absolute -bottom-6 -left-6 w-60 sm:w-72 h-60 sm:h-72 bg-[#8d7966]/20 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -top-6 -right-6 w-48 sm:w-60 h-48 sm:h-60 bg-[#d8c8b8]/30 rounded-full blur-2xl pointer-events-none" />

            {/* Main Showcase Container */}
            <div className="relative z-10 bg-[#e2ddd9]/40 p-2.5 sm:p-4 rounded-[14px] border border-[#d8c8b8]/70 shadow-lg">
              {currentItem ? (
                <div
                  className="relative aspect-[4/4.6] sm:aspect-[4/4.2] w-full rounded-[8px] overflow-hidden bg-[#e2ddd9] group slow-zoom-container cursor-pointer"
                  onClick={() => onOpenLightbox(currentItem)}
                >
                  <Image
                    src={currentItem.image}
                    alt={currentItem.title}
                    fill
                    sizes="(max-width: 1024px) 100vw, 55vw"
                    priority
                    className="object-cover slow-zoom-image"
                  />

                  {/* Gradient Overlay for Text Legibility */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#231e1a]/90 via-[#231e1a]/25 to-transparent pointer-events-none" />

                  {/* Category Tag (Top Left) */}
                  <div className="absolute top-3 sm:top-4 left-3 sm:left-4 z-20">
                    <span className="inline-block px-3 sm:px-3.5 py-1 rounded-full bg-[#f8f1e9]/95 backdrop-blur-md border border-[#d8c8b8] text-[10px] sm:text-[11px] font-semibold uppercase tracking-wider text-[#4a3f35] shadow-xs">
                      {currentItem.categoryLabel}
                    </span>
                  </div>

                  {/* Zoom Lightbox Trigger (Top Right) */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onOpenLightbox(currentItem);
                    }}
                    className="absolute top-3 sm:top-4 right-3 sm:right-4 z-20 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-[#f8f1e9]/95 backdrop-blur-md border border-[#d8c8b8] flex items-center justify-center text-[#231e1a] hover:bg-[#8d7966] hover:text-[#f8f1e9] hover:border-[#8d7966] transition-all duration-300 shadow"
                    title="Ver detalhes em tela cheia"
                  >
                    <Eye className="w-4 h-4" />
                  </button>

                  {/* Bottom Information Card inside showcase */}
                  <div className="absolute bottom-0 inset-x-0 p-4 sm:p-7 text-[#f8f1e9] z-20 flex flex-col space-y-1.5 sm:space-y-2">
                    <span className="text-[9px] sm:text-[10px] font-mono tracking-widest text-[#d8c8b8] uppercase">
                      {currentItem.protocolNumber || "DESTAQUE DO ATELIÊ"}
                    </span>
                    <h3 className="font-serif text-lg sm:text-2xl font-medium tracking-tight text-white line-clamp-1">
                      {currentItem.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-[#e2ddd9]/90 line-clamp-2 font-light">
                      {currentItem.shortDescription}
                    </p>

                    <div className="pt-1.5 sm:pt-2 flex items-center justify-between">
                      <a
                        href={buildProductWhatsAppUrl(currentItem.title, currentItem.categoryLabel)}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="inline-flex items-center space-x-1.5 sm:space-x-2 text-[11px] sm:text-xs font-semibold uppercase tracking-wider text-[#d8c8b8] hover:text-white group/btn py-1"
                      >
                        <span>Quero uma peça assim</span>
                        <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform" />
                      </a>

                      <span className="text-[11px] sm:text-xs font-mono text-[#d8c8b8]/80">
                        {String(currentIndex + 1).padStart(2, "0")} / {String(items.length).padStart(2, "0")}
                      </span>
                    </div>
                  </div>
                </div>
              ) : null}

              {/* Carousel Controls Bar */}
              <div className="mt-3 flex items-center justify-between px-1 sm:px-2">
                <div className="flex items-center space-x-1.5 sm:space-x-2 py-1">
                  {items.map((item, idx) => (
                    <button
                      key={item.id}
                      onClick={() => setCurrentIndex(idx)}
                      aria-label={`Ir para slide ${idx + 1}`}
                      className={`h-2 rounded-full transition-all duration-300 ${
                        idx === currentIndex ? "w-7 sm:w-8 bg-[#8d7966]" : "w-2.5 sm:w-2 bg-[#d8c8b8] hover:bg-[#a8a39d]"
                      }`}
                    />
                  ))}
                </div>

                <div className="flex items-center space-x-1.5 sm:space-x-2">
                  <button
                    onClick={handlePrev}
                    className="w-9 h-9 rounded-md bg-[#f8f1e9] border border-[#d8c8b8] flex items-center justify-center text-[#4a3f35] hover:bg-[#8d7966] hover:text-[#f8f1e9] hover:border-[#8d7966] active:scale-95 transition-all"
                    aria-label="Item anterior"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <button
                    onClick={handleNext}
                    className="w-9 h-9 rounded-md bg-[#f8f1e9] border border-[#d8c8b8] flex items-center justify-center text-[#4a3f35] hover:bg-[#8d7966] hover:text-[#f8f1e9] hover:border-[#8d7966] active:scale-95 transition-all"
                    aria-label="Próximo item"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
