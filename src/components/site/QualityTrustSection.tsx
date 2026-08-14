"use client";

import WhatsAppIcon from "@/components/ui/WhatsAppIcon";
import { buildWhatsAppUrl } from "@/lib/utils";
import { Award, Feather, Heart, ShieldCheck } from "lucide-react";
import Image from "next/image";

export default function QualityTrustSection() {
  const trustPoints = [
    {
      icon: <Award className="w-5 h-5 text-[#d8c8b8]" />,
      title: "Matrizes de Alta Densidade",
      description: "Bordados com contagem elevada de pontos, garantindo definição perfeita em letras miúdas, monogramas e desenhos ricos.",
    },
    {
      icon: <ShieldCheck className="w-5 h-5 text-[#d8c8b8]" />,
      title: "Fios que Não Desbotam",
      description: "Linhas 100% poliéster trilobal com brilho contínuo, laváveis repetidas vezes sem descolorir ou repuxar.",
    },
    {
      icon: <Feather className="w-5 h-5 text-[#d8c8b8]" />,
      title: "Toque Aveludado & Antialérgico",
      description: "Seleção rigorosa de toalhas 100% algodão de marcas líderes e materiais macios que não agridem a pele do bebê.",
    },
    {
      icon: <Heart className="w-5 h-5 text-[#d8c8b8]" />,
      title: "Feito com Dedicação Individual",
      description: "Cada peça recebe arremate manual cuidadoso e carinho em todas as etapas de produção.",
    },
  ];

  return (
    <section id="atelie" className="w-full bg-[#231e1a] text-[#f8f1e9] overflow-hidden">
      <div className="max-w-[1440px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[640px]">
          {/* Left: 6 Columns - Deep Dark Content */}
          <div className="lg:col-span-6 p-8 sm:p-12 lg:p-16 xl:p-20 flex flex-col justify-center space-y-8">
            <div className="flex flex-col space-y-3">
              <span className="text-[11px] font-mono uppercase tracking-[0.25em] text-[#d8c8b8] font-medium">
                04. MANIFESTO DO ATELIÊ
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-white leading-[1.15] tracking-tight">
                O afeto está em cada <span className="italic text-[#d8c8b8]">ponto</span> bordado.
              </h2>
              <p className="text-sm sm:text-base text-[#e2ddd9]/90 font-light leading-relaxed pt-2">
                Não entregamos apenas toalhas ou estojos; entregamos celebrações, acolhimento e homenagens inesquecíveis.
              </p>
            </div>

            {/* Icon-led list */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
              {trustPoints.map((point, idx) => (
                <div key={idx} className="flex flex-col space-y-2">
                  <div className="w-10 h-10 rounded-md bg-white/10 border border-white/15 flex items-center justify-center">
                    {point.icon}
                  </div>
                  <h4 className="font-serif text-base font-medium text-white">{point.title}</h4>
                  <p className="text-xs text-[#e2ddd9]/70 leading-relaxed font-light">{point.description}</p>
                </div>
              ))}
            </div>

            {/* Contact CTA */}
            <div className="pt-4">
              <a
                href={buildWhatsAppUrl("Olá, Gorete! Gostaria de conversar sobre uma encomenda de bordado personalizado.")}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-3 px-7 py-3.5 bg-[#8d7966] hover:bg-[#a8907b] text-white text-xs font-semibold uppercase tracking-widest rounded-md transition-all duration-300 shadow-md"
              >
                <WhatsAppIcon className="w-4 h-4 text-white" />
                <span>Envie uma mensagem</span>
              </a>
            </div>
          </div>

          {/* Right: 6 Columns - Craftsmanship Image with luminosity blending */}
          <div className="lg:col-span-6 relative min-h-[400px] lg:min-h-full bg-[#1c1917]">
            <Image
              src="/images/portfolio/743992557_18383435056201125_2665605754153811949_n.jpg"
              alt="Ateliê Gorete Bordados de Afeto"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover opacity-90 mix-blend-luminosity hover:mix-blend-normal transition-all duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#231e1a] via-transparent to-transparent hidden lg:block" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#231e1a] via-transparent to-transparent lg:hidden" />

            <div className="absolute bottom-6 right-6 z-10 bg-[#231e1a]/90 backdrop-blur-md p-4 rounded-md border border-white/10 max-w-xs text-left">
              <span className="text-[10px] font-mono uppercase tracking-widest text-[#d8c8b8] block">
                PEÇA EM DESTAQUE
              </span>
              <p className="font-serif text-sm text-white font-medium">
                Kit Luciana: Necessaire Rosé + Toalha Menta Bordada
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
