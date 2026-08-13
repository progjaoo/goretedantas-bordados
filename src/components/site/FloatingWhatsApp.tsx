"use client";

import { buildWhatsAppUrl } from "@/lib/utils";
import { MessageCircle, X } from "lucide-react";
import { useEffect, useState } from "react";

export default function FloatingWhatsApp() {
  const [showTooltip, setShowTooltip] = useState(false);

  useEffect(() => {
    // Show greeting tooltip after 2 seconds
    const timer = setTimeout(() => {
      setShowTooltip(true);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end space-y-2">
      {/* Tooltip bubble */}
      {showTooltip && (
        <div className="relative bg-white text-[#231e1a] p-3.5 rounded-[10px] shadow-xl border border-[#d8c8b8] max-w-[240px] text-xs animate-in fade-in slide-in-from-bottom-2 duration-300">
          <button
            onClick={() => setShowTooltip(false)}
            className="absolute top-1.5 right-1.5 p-1 text-[#a8a39d] hover:text-[#231e1a]"
            aria-label="Fechar mensagem"
          >
            <X className="w-3 h-3" />
          </button>
          <div className="flex items-center space-x-2 mb-1">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="font-serif font-semibold text-[13px] text-[#8d7966]">
              Dona Gorete
            </span>
          </div>
          <p className="text-[11px] text-[#4a3f35] leading-relaxed">
            Olá! Quer ajuda para escolher ou personalizar seu bordado?
          </p>
        </div>
      )}

      {/* Main WhatsApp Floating Button */}
      <a
        href={buildWhatsAppUrl("Olá, Dona Gorete! Estou no seu site e gostaria de tirar uma dúvida sobre os bordados.")}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chamar no WhatsApp (+55 24 99935-6139)"
        className="relative group flex items-center justify-center w-14 h-14 bg-[#25D366] hover:bg-[#20ba59] text-white rounded-full shadow-2xl transition-all duration-300 hover:scale-110 active:scale-95 focus:outline-none ring-4 ring-[#25D366]/20"
      >
        {/* Soft pulse ripple */}
        <span className="absolute -inset-1 rounded-full bg-[#25D366]/40 animate-ping pointer-events-none opacity-75" />

        <MessageCircle className="w-7 h-7 fill-white text-[#25D366] relative z-10" />

        {/* Text tag on hover (Desktop) */}
        <span className="hidden lg:block absolute right-16 bg-[#231e1a] text-white text-xs font-semibold px-3 py-1.5 rounded-md whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none shadow-md">
          WhatsApp: (24) 99935-6139
        </span>
      </a>
    </div>
  );
}
