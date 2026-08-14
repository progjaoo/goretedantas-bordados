"use client";

import WhatsAppIcon from "@/components/ui/WhatsAppIcon";
import { buildProductWhatsAppUrl } from "@/lib/utils";
import { PortfolioItem } from "@/types/portfolio";
import { ArrowRight, X } from "lucide-react";
import Image from "next/image";
import { useEffect } from "react";

interface PhotoLightboxProps {
  item: PortfolioItem | null;
  onClose: () => void;
}

export default function PhotoLightbox({ item, onClose }: PhotoLightboxProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (item) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.body.style.overflow = "auto";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [item, onClose]);

  if (!item) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="lightbox-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 lg:p-8 bg-[#231e1a]/85 backdrop-blur-md animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-4xl max-h-[90vh] bg-[#f8f1e9] rounded-[12px] shadow-2xl overflow-hidden border border-[#d8c8b8] flex flex-col md:flex-row"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-[#f8f1e9]/90 border border-[#d8c8b8] flex items-center justify-center text-[#231e1a] hover:bg-[#8d7966] hover:text-white transition-all shadow-md"
          aria-label="Fechar visualização"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Left: Image (High Resolution) */}
        <div className="relative w-full md:w-1/2 min-h-[320px] md:min-h-[480px] bg-[#e2ddd9]">
          <Image
            src={item.image}
            alt={item.title}
            fill
            priority
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover"
          />
          <div className="absolute top-4 left-4 z-10">
            <span className="px-3 py-1 rounded-full bg-[#f8f1e9]/95 text-[10px] font-semibold tracking-wider uppercase text-[#4a3f35] border border-[#d8c8b8] shadow-sm">
              {item.categoryLabel}
            </span>
          </div>
        </div>

        {/* Right: Rich Details & WhatsApp Button */}
        <div className="w-full md:w-1/2 p-6 sm:p-8 flex flex-col justify-between overflow-y-auto space-y-6">
          <div className="space-y-4">
            <span className="text-[10px] font-mono tracking-widest text-[#8d7966] uppercase block">
              {item.protocolNumber || "PROTOCOLO ARTESANAL EXCLUSIVO"}
            </span>

            <h2 id="lightbox-title" className="font-serif text-2xl sm:text-3xl font-medium text-[#231e1a] leading-tight">
              {item.title}
            </h2>

            <p className="text-xs sm:text-sm text-[#4a3f35]/90 leading-relaxed font-light">
              {item.fullDescription || item.shortDescription}
            </p>

            {/* Specifications Box */}
            <div className="p-4 bg-[#e2ddd9]/60 rounded-[8px] border border-[#d8c8b8] space-y-2 text-xs font-mono text-[#231e1a]">
              <span className="text-[10px] uppercase font-bold text-[#8d7966] tracking-wider block border-b border-[#d8c8b8]/80 pb-1">
                Especificações da Peça
              </span>
              <div className="flex justify-between">
                <span className="text-[#8d7966]">Tecido:</span>
                <span className="text-right max-w-[200px]">{item.specifications.tecido}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#8d7966]">Fios/Linha:</span>
                <span className="text-right max-w-[200px]">{item.specifications.linha}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#8d7966]">Acabamento:</span>
                <span className="text-right max-w-[200px]">{item.specifications.acabamento}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#8d7966]">Personalização:</span>
                <span className="text-right max-w-[200px]">{item.specifications.personalizacao}</span>
              </div>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-1.5 pt-1">
              {item.tags?.map((tag) => (
                <span
                  key={tag}
                  className="px-2 py-0.5 rounded bg-white text-[10px] text-[#4a3f35] border border-[#e2ddd9]"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>

          {/* Action Button */}
          <div className="pt-4 border-t border-[#e2ddd9]">
            <a
              href={buildProductWhatsAppUrl(item.title, item.categoryLabel)}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-4 px-6 bg-[#8d7966] hover:bg-[#786655] text-white text-xs font-semibold uppercase tracking-widest rounded-md shadow-md flex items-center justify-center space-x-3 transition-all hover:scale-[1.01]"
            >
              <WhatsAppIcon className="w-4 h-4 text-white" />
              <span>Encomendar esta Peça no WhatsApp</span>
              <ArrowRight className="w-4 h-4" />
            </a>
            <span className="text-[10px] text-center block text-[#4a3f35]/70 mt-2">
              Atendimento direto com a artesã Gorete
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
