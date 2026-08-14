"use client";

import { Check, Edit3, HeartHandshake, PackageCheck, Send, Sparkles } from "lucide-react";

export default function UsageTimeline() {
  const steps = [
    {
      stepNumber: "ETAPA 01",
      title: "Escolha & Definição da Arte",
      description: "Tudo começa com a sua ideia ou inspiração do nosso catálogo.",
      bullets: [
        "Escolha a toalha, necessaire ou kit desejado",
        "Defina os nomes, datas, brasões ou temas ilustrados",
        "Selecione as cores de fios e estilo de tipografia",
        "Aprovação prévia da matriz digital antes de bordar",
      ],
      iconBg: "bg-[#e2ddd9] text-[#8d7966]",
      icon: <Edit3 className="w-5 h-5" />,
    },
    {
      stepNumber: "ETAPA 02",
      title: "Confecção & Ponto de Alta Precisão",
      description: "A arte ganha vida com fios nobres e acabamento manual.",
      bullets: [
        "Preparação do tecido aveludado e entretelas especiais",
        "Bordado computadorizado com alta contagem de pontos",
        "Aplicação de rendas guipir, lese e passa-fitas manuais",
        "Revisão minuciosa de cada arremate e limpeza de fios",
      ],
      iconBg: "bg-[#8d7966] text-[#f8f1e9]",
      icon: <Sparkles className="w-5 h-5" />,
    },
    {
      stepNumber: "ETAPA 03",
      title: "Embalagem & Envio",
      description: "Sua encomenda pronta e enviada com segurança até você.",
      bullets: [
        "Embalagem cuidadosa e reforçada para transporte",
        "Opção de embalagem especial para presente",
        "Envio rápido e seguro via Correios / transportadora",
        "Código de rastreio enviado direto no seu WhatsApp",
      ],
      iconBg: "bg-[#d8c8b8] text-[#231e1a]",
      icon: <PackageCheck className="w-5 h-5" />,
    },
  ];

  return (
    <section id="como-funciona" className="w-full py-16 lg:py-24 bg-[#f8f1e9] border-t border-[#e2ddd9]/80">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 flex flex-col space-y-3">
          <span className="font-mono text-xs uppercase tracking-[0.25em] text-[#8d7966] font-semibold">
            03. JORNADA DE PERSONALIZAÇÃO
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-[#231e1a] tracking-tight">
            Como Funciona a Sua Encomenda
          </h2>
          <p className="text-sm sm:text-base text-[#4a3f35]/85 font-light leading-relaxed">
            Um processo transparente, ágil e acolhedor para que você receba uma peça única feita sob medida.
          </p>
        </div>

        {/* 3-Stage Timeline */}
        <div className="relative">
          {/* Faint 1px horizontal connecting line (desktop only) */}
          <div className="hidden md:block absolute top-7 left-[15%] right-[15%] h-[1px] bg-[#d8c8b8] z-0" />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12 relative z-10">
            {steps.map((step, idx) => (
              <div
                key={step.stepNumber}
                className="bg-white/80 rounded-[10px] p-6 lg:p-8 border border-[#e2ddd9] editorial-shadow flex flex-col items-center text-center group hover:border-[#8d7966] transition-all duration-300"
              >
                {/* Centered Icon in Colored Circle */}
                <div
                  className={`w-14 h-14 rounded-full flex items-center justify-center ${step.iconBg} mb-6 shadow-sm group-hover:scale-110 transition-transform duration-300`}
                >
                  {step.icon}
                </div>

                <span className="text-[10px] font-mono tracking-widest text-[#8d7966] font-bold uppercase mb-1">
                  {step.stepNumber}
                </span>

                <h3 className="font-serif text-xl font-medium text-[#231e1a] mb-2 leading-snug">
                  {step.title}
                </h3>

                <p className="text-xs text-[#4a3f35]/80 mb-6 font-light">{step.description}</p>

                {/* Bulleted List */}
                <ul className="w-full text-left space-y-2.5 pt-4 border-t border-[#e2ddd9] text-xs text-[#4a3f35]/90">
                  {step.bullets.map((bullet, bIdx) => (
                    <li key={bIdx} className="flex items-start space-x-2">
                      <Check className="w-3.5 h-3.5 text-[#8d7966] shrink-0 mt-0.5" />
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
