"use client";

import WhatsAppIcon from "@/components/ui/WhatsAppIcon";
import { FAQS } from "@/lib/constants";
import { buildWhatsAppUrl } from "@/lib/utils";
import { Check, ChevronDown, HelpCircle, ShieldCheck } from "lucide-react";
import { useState } from "react";

export default function SafetyFAQSection() {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const toggleFaq = (idx: number) => {
    setOpenFaqIndex(openFaqIndex === idx ? null : idx);
  };

  return (
    <section id="faq" className="w-full py-20 lg:py-28 bg-[#f8f1e9] border-t border-[#e2ddd9]">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left: 5 Columns - Safety, Quality & Guarantee Box */}
          <div className="lg:col-span-5 flex flex-col space-y-6">
            <div className="flex flex-col space-y-2">
              <span className="text-[11px] font-mono uppercase tracking-[0.25em] text-[#8d7966] font-semibold">
                05. SEGURANÇA & DÚVIDAS
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-normal text-[#231e1a] tracking-tight">
                Garantia de Qualidade & Atendimento Direto
              </h2>
            </div>

            {/* Box with border-l-4 Taupe Accent */}
            <div className="bg-white rounded-r-[10px] rounded-l-[4px] p-6 sm:p-8 border border-[#e2ddd9] border-l-4 border-l-[#8d7966] shadow-sm space-y-4">
              <div className="flex items-center space-x-2 text-[#8d7966]">
                <ShieldCheck className="w-5 h-5" />
                <span className="font-serif font-medium text-base text-[#231e1a]">
                  Compromisso do Ateliê
                </span>
              </div>

              <p className="text-xs sm:text-sm text-[#4a3f35]/90 leading-relaxed font-light">
                Não iniciamos o bordado sem que você aprove 100% da visualização da matriz e confira os nomes,
                cores e fontes. Nosso compromisso é entregar exatamente o que você sonhou.
              </p>

              <div className="pt-3 border-t border-[#e2ddd9] space-y-2 text-xs text-[#4a3f35]">
                <div className="flex items-center space-x-2">
                  <Check className="w-3.5 h-3.5 text-[#8d7966]" />
                  <span>Embalagens reforçadas para viagem e presente</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Check className="w-3.5 h-3.5 text-[#8d7966]" />
                  <span>Envio com código de rastreamento oficial</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Check className="w-3.5 h-3.5 text-[#8d7966]" />
                  <span>Suporte direto com a artesã por WhatsApp</span>
                </div>
              </div>

              <div className="pt-2">
                <a
                  href={buildWhatsAppUrl("Olá, Gorete! Gostaria de tirar uma dúvida sobre uma encomenda personalizada.")}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3 px-4 bg-[#8d7966] hover:bg-[#786655] text-white text-xs font-semibold uppercase tracking-wider rounded-md flex items-center justify-center space-x-2 transition-all shadow-sm"
                >
                  <WhatsAppIcon className="w-4 h-4 text-white" />
                  <span>Tirar Dúvida no WhatsApp</span>
                </a>
              </div>
            </div>
          </div>

          {/* Right: 7 Columns - FAQ Accordion */}
          <div className="lg:col-span-7 flex flex-col space-y-4">
            <div className="flex items-center space-x-2 text-xs font-mono text-[#8d7966] uppercase tracking-wider mb-2">
              <HelpCircle className="w-4 h-4" />
              <span>PERGUNTAS FREQUENTES</span>
            </div>

            <div className="divide-y divide-[#e2ddd9] bg-white rounded-[10px] border border-[#e2ddd9] p-4 sm:p-6 shadow-sm">
              {FAQS.map((faq, idx) => {
                const isOpen = openFaqIndex === idx;
                return (
                  <div key={idx} className="py-4 first:pt-0 last:pb-0">
                    <button
                      onClick={() => toggleFaq(idx)}
                      className="w-full flex items-center justify-between text-left group focus:outline-none"
                    >
                      <span className="font-serif text-base sm:text-lg font-medium text-[#231e1a] group-hover:text-[#8d7966] transition-colors pr-4">
                        {faq.question}
                      </span>
                      <div
                        className={`w-7 h-7 rounded-full bg-[#e2ddd9] flex items-center justify-center text-[#4a3f35] shrink-0 transition-transform duration-300 ${
                          isOpen ? "rotate-180 bg-[#8d7966] text-white" : ""
                        }`}
                      >
                        <ChevronDown className="w-4 h-4" />
                      </div>
                    </button>

                    {isOpen && (
                      <div className="mt-3 text-xs sm:text-sm text-[#4a3f35]/85 font-light leading-relaxed animate-in fade-in-50 duration-200">
                        <p>{faq.answer}</p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
