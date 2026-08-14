"use client";

import WhatsAppIcon from "@/components/ui/WhatsAppIcon";
import { buildWhatsAppUrl } from "@/lib/utils";
import { X } from "lucide-react";
import { useEffect, useState } from "react";

export default function FloatingWhatsApp() {
  const [showTooltip, setShowTooltip] = useState(false);

  useEffect(() => {
    // Show greeting tooltip after 2.5 seconds
    const timer = setTimeout(() => {
      setShowTooltip(true);
    }, 2500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-40 flex flex-col items-end space-y-2">
      {/* Tooltip bubble */}
      {showTooltip && (
        <div className="relative bg-white text-[#231e1a] p-3 sm:p-3.5 rounded-[10px] shadow-xl border border-[#d8c8b8] max-w-[210px] sm:max-w-[240px] text-xs animate-in fade-in slide-in-from-bottom-2 duration-300">
          <button
            onClick={() => setShowTooltip(false)}
            className="absolute top-1 right-1 p-1.5 text-[#a8a39d] hover:text-[#231e1a]"
            aria-label="Fechar mensagem"
          >
            <X className="w-3.5 h-3.5" />
          </button>
          <div className="flex items-center space-x-2 mb-1">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="font-serif font-semibold text-[12px] sm:text-[13px] text-[#8d7966]">
              Gorete
            </span>
          </div>
          <p className="text-[11px] text-[#4a3f35] leading-relaxed">
            Olá! Quer ajuda para escolher ou personalizar seu bordado?
          </p>
        </div>
      )}

      {/* Main WhatsApp Floating Button */}
      <a
        href={buildWhatsAppUrl("Olá, Gorete! Estou no seu site e gostaria de tirar uma dúvida sobre os bordados.")}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chamar no WhatsApp (+55 24 99935-6139)"
        className="relative group flex items-center justify-center w-13 h-13 sm:w-14 sm:h-14 bg-[#25D366] hover:bg-[#20ba59] active:scale-95 text-white rounded-full shadow-2xl transition-all duration-300 ring-4 ring-[#25D366]/20"
      >
        {/* Soft pulse ripple */}
        <span className="absolute -inset-1 rounded-full bg-[#25D366]/40 animate-ping pointer-events-none opacity-70" />

        <WhatsAppIcon className="w-6 h-6 sm:w-7 sm:h-7 text-white relative z-10" />

        {/* Text tag on hover (Desktop) */}
        <span className="hidden lg:block absolute right-16 bg-[#231e1a] text-white text-xs font-semibold px-3 py-1.5 rounded-md whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none shadow-md">
          WhatsApp: (24) 99935-6139
        </span>
      </a>
    </div>
  );
}
