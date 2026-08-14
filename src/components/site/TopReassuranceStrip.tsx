"use client";

import { SITE_CONFIG } from "@/lib/constants";
import { buildWhatsAppUrl } from "@/lib/utils";

export default function TopReassuranceStrip() {
  return (
    <aside
      aria-label="Avisos do ateliê"
      className="w-full bg-[#e2ddd9] border-b border-[#d8c8b8]/60 py-2 px-3 sm:px-6 overflow-hidden text-center"
    >
      <div className="max-w-[1440px] mx-auto flex items-center justify-center flex-wrap gap-x-3 gap-y-1 text-[10px] sm:text-[11px] font-medium tracking-[0.12em] sm:tracking-[0.18em] uppercase text-[#4a3f35]">
        <span>Ateliê de Bordados Personalizados</span>
        <span className="text-[#8d7966] hidden xs:inline">•</span>
        <span className="hidden sm:inline">Toalhas & Enxovais</span>
        <span className="text-[#8d7966] hidden sm:inline">•</span>
        <span className="hidden md:inline">Envios para todo o Brasil</span>
        <span className="text-[#8d7966] hidden md:inline">•</span>
        <a
          href={buildWhatsAppUrl()}
          target="_blank"
          rel="noopener noreferrer"
          className="font-semibold text-[#8d7966] hover:underline inline-flex items-center"
        >
          <span>WhatsApp: (24) 99935-6139</span>
        </a>
      </div>
    </aside>
  );
}
