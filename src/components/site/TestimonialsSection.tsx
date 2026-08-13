"use client";

import { TESTIMONIALS } from "@/lib/constants";
import { Quote, Star } from "lucide-react";

export default function TestimonialsSection() {
  return (
    <section className="w-full py-16 lg:py-24 bg-[#e2ddd9]/40 border-t border-[#d8c8b8]/60">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-14 flex flex-col space-y-2">
          <span className="text-[11px] font-mono uppercase tracking-[0.25em] text-[#8d7966] font-semibold">
            05. HISTÓRIAS REAIS & AVALIAÇÕES
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-normal text-[#231e1a] tracking-tight">
            O Carinho de Quem Já Recebeu
          </h2>
          <p className="text-sm text-[#4a3f35]/80 font-light">
            Depoimentos espontâneos de clientes que confiaram momentos e homenagens ao nosso ateliê.
          </p>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {TESTIMONIALS.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-[10px] p-6 border border-[#e2ddd9] editorial-shadow flex flex-col justify-between space-y-4 hover:border-[#8d7966] transition-all duration-300"
            >
              <div className="flex flex-col space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-1 text-[#8d7966]">
                    {[...Array(item.rating)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-[#8d7966]" />
                    ))}
                  </div>
                  <Quote className="w-5 h-5 text-[#d8c8b8]" />
                </div>

                <p className="text-xs text-[#231e1a]/90 font-light leading-relaxed italic">
                  "{item.comment}"
                </p>
              </div>

              <div className="pt-3 border-t border-[#e2ddd9]">
                <h4 className="font-serif text-sm font-medium text-[#231e1a]">{item.clientName}</h4>
                <p className="text-[10px] font-mono text-[#8d7966]">{item.city}</p>
                <span className="text-[10px] text-[#4a3f35]/70 block mt-0.5 truncate">
                  Peça: {item.productPurchased}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
