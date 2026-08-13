"use client";

import { CATEGORIES } from "@/lib/constants";
import { buildProductWhatsAppUrl } from "@/lib/utils";
import { PortfolioItem } from "@/types/portfolio";
import { ArrowRight, CheckCircle2, Eye, Filter, MessageCircle, Sparkles } from "lucide-react";
import Image from "next/image";
import { useMemo, useState } from "react";

interface ProductProtocolSectionProps {
  items: PortfolioItem[];
  selectedCategory: string;
  onSelectCategory: (cat: string) => void;
  onOpenLightbox: (item: PortfolioItem) => void;
}

export default function ProductProtocolSection({
  items,
  selectedCategory,
  onSelectCategory,
  onOpenLightbox,
}: ProductProtocolSectionProps) {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredItems = useMemo(() => {
    return items.filter((item) => {
      const matchCategory =
        selectedCategory === "todos" || item.category === selectedCategory;
      const matchQuery =
        !searchQuery ||
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.shortDescription.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchCategory && matchQuery;
    });
  }, [items, selectedCategory, searchQuery]);

  return (
    <section id="protocolos" className="w-full py-16 lg:py-24 bg-[#f8f1e9]">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
        {/* Editorial Protocol Header */}
        <div className="flex flex-col space-y-3 mb-10 text-center sm:text-left">
          <span className="font-serif italic text-[#8d7966] text-base lg:text-lg">
            02. O Catálogo de Peças & Protocolos de Confecção
          </span>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-[#231e1a] tracking-tight">
              Galeria de Obras do Ateliê
            </h2>
            <span className="text-xs font-mono uppercase tracking-widest text-[#4a3f35]/70 bg-[#e2ddd9] px-3 py-1.5 rounded-full w-fit">
              {filteredItems.length} {filteredItems.length === 1 ? "Peça disponível" : "Peças cadastradas"}
            </span>
          </div>
        </div>

        {/* Filter Navigation Bar */}
        <div id="galeria" className="mb-12 flex flex-wrap items-center gap-2 sm:gap-3 p-2 bg-[#e2ddd9]/60 rounded-[10px] border border-[#d8c8b8]">
          <button
            onClick={() => onSelectCategory("todos")}
            className={`px-4 py-2 text-xs font-medium uppercase tracking-wider rounded-[6px] transition-all duration-300 ${
              selectedCategory === "todos"
                ? "bg-[#8d7966] text-white shadow-sm"
                : "text-[#4a3f35] hover:bg-white/60"
            }`}
          >
            Todos os Trabalhos
          </button>
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => onSelectCategory(cat.id)}
              className={`px-4 py-2 text-xs font-medium uppercase tracking-wider rounded-[6px] transition-all duration-300 ${
                selectedCategory === cat.id
                  ? "bg-[#8d7966] text-white shadow-sm"
                  : "text-[#4a3f35] hover:bg-white/60"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* 3-Column Product Grid */}
        {filteredItems.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredItems.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-[10px] border border-[#e2ddd9] overflow-hidden editorial-shadow-hover flex flex-col group"
              >
                {/* Image Container with slow zoom */}
                <div className="relative aspect-[4/3.8] w-full bg-[#e2ddd9] overflow-hidden slow-zoom-container">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover slow-zoom-image"
                  />

                  {/* Badges */}
                  <div className="absolute top-3 left-3 z-10 flex flex-col gap-1.5">
                    <span className="px-2.5 py-1 rounded-full bg-[#f8f1e9]/95 backdrop-blur-sm text-[10px] font-semibold tracking-wider uppercase text-[#4a3f35] border border-[#d8c8b8] shadow-xs">
                      {item.categoryLabel}
                    </span>
                    {item.isHeroFeatured && (
                      <span className="px-2.5 py-0.5 rounded-full bg-[#8d7966] text-[9px] font-semibold tracking-widest uppercase text-white shadow-xs">
                        Destaque
                      </span>
                    )}
                  </div>

                  {/* Lightbox Quick View */}
                  <button
                    onClick={() => onOpenLightbox(item)}
                    className="absolute top-3 right-3 z-10 w-9 h-9 rounded-full bg-[#f8f1e9]/90 backdrop-blur-sm border border-[#d8c8b8] flex items-center justify-center text-[#231e1a] opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-[#8d7966] hover:text-white"
                    title="Ampliar detalhes"
                  >
                    <Eye className="w-4 h-4" />
                  </button>
                </div>

                {/* Content Section */}
                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div className="flex flex-col space-y-2">
                    <span className="text-[10px] font-mono tracking-widest text-[#8d7966] uppercase">
                      {item.protocolNumber || "PROTOCOLO ARTESANAL"}
                    </span>
                    <h3 className="font-serif text-xl font-medium text-[#231e1a] group-hover:text-[#8d7966] transition-colors leading-snug">
                      {item.title}
                    </h3>
                    <p className="text-xs text-[#4a3f35]/85 leading-relaxed line-clamp-2 font-normal">
                      {item.shortDescription}
                    </p>
                  </div>

                  {/* Micro Specs List */}
                  <div className="pt-3 border-t border-[#e2ddd9] text-[11px] font-mono text-[#4a3f35]/80 space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="text-[#8d7966]">Tecido:</span>
                      <span className="truncate max-w-[170px] text-right">{item.specifications.tecido}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-[#8d7966]">Acabamento:</span>
                      <span className="truncate max-w-[170px] text-right">{item.specifications.acabamento}</span>
                    </div>
                  </div>

                  {/* Protocol CTA Button (Superdesign Special UI Component) */}
                  <a
                    href={buildProductWhatsAppUrl(item.title, item.categoryLabel)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full mt-2 py-3.5 px-4 bg-[#231e1a] hover:bg-[#8d7966] text-[#f8f1e9] text-xs font-semibold uppercase tracking-wider rounded-[6px] transition-all duration-300 flex items-center justify-center space-x-2 text-center"
                  >
                    <span>Encomendar Peça</span>
                    <span className="text-[#d8c8b8] opacity-60">|</span>
                    <span className="text-[11px] font-normal text-[#d8c8b8]">WhatsApp</span>
                    <ArrowRight className="w-3.5 h-3.5 ml-1" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-white/60 rounded-[10px] border border-[#d8c8b8] p-8">
            <p className="text-base text-[#4a3f35] font-serif">Nenhuma peça encontrada nesta categoria.</p>
            <button
              onClick={() => onSelectCategory("todos")}
              className="mt-4 px-5 py-2 bg-[#8d7966] text-white text-xs font-semibold uppercase tracking-wider rounded-md"
            >
              Ver todas as peças
            </button>
          </div>
        )}

        {/* Superdesign Special Component: Craftsmanship & Material Fact Table */}
        <div className="mt-20 p-8 sm:p-10 bg-[#e2ddd9]/70 rounded-[12px] border border-[#d8c8b8] relative overflow-hidden">
          <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-8">
            {/* Left: Description */}
            <div className="lg:w-1/3 flex flex-col space-y-3">
              <span className="text-[10px] font-mono tracking-widest uppercase text-[#8d7966] font-semibold">
                FICHA TÉCNICA DO ATELIÊ
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl font-normal text-[#231e1a]">
                Transparência nos Materiais & Acabamento
              </h3>
              <p className="text-xs sm:text-sm text-[#4a3f35]/90 leading-relaxed font-light">
                Cada bordado nasce de um processo que alia a precisão das matrizes computadorizadas de alta
                densidade à delicadeza do acabamento manual de costura.
              </p>
            </div>

            {/* Right: Clinical / Craft Fact Table */}
            <div className="lg:w-2/3 bg-white/90 rounded-[8px] p-6 sm:p-8 border border-[#d8c8b8]/80 shadow-sm font-mono text-xs text-[#231e1a]">
              <div className="border-b border-[#d8c8b8] pb-3 mb-3 flex justify-between font-bold uppercase tracking-wider text-[#8d7966] text-[11px]">
                <span>Componente / Matéria-Prima</span>
                <span>Padrão do Ateliê Gorete</span>
              </div>

              <div className="divide-y divide-[#e2ddd9]">
                <div className="py-2.5 flex justify-between items-center">
                  <span className="font-normal text-[#4a3f35]">Gramatura das Toalhas</span>
                  <span className="font-semibold">480g/m² a 500g/m² (100% Algodão Dohler / Karsten)</span>
                </div>
                <div className="py-2.5 flex justify-between items-center">
                  <span className="font-normal text-[#4a3f35]">Linhas de Bordado</span>
                  <span className="font-semibold">Poliéster Trilobal Ultra Brilho (Resistente a Lavagens)</span>
                </div>
                <div className="py-2.5 flex justify-between items-center">
                  <span className="font-normal text-[#4a3f35]">Estrutura das Necessaires</span>
                  <span className="font-semibold">Couro Sintético Nobre com Forro Impermeável Lavável</span>
                </div>
                <div className="py-2.5 flex justify-between items-center">
                  <span className="font-normal text-[#4a3f35]">Guarnições & Rendas</span>
                  <span className="font-semibold">Renda Richelieu, Guipir e Fitas de Cetim com Passa-Fita</span>
                </div>
                <div className="py-2.5 flex justify-between items-center">
                  <span className="font-normal text-[#4a3f35]">Linha Infantil & Bebê</span>
                  <span className="font-semibold">Materiais Hipoalergênicos e Toque Aveludado Pluma</span>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-[#d8c8b8] flex flex-wrap items-center justify-between text-[10px] text-[#8d7966] uppercase tracking-widest font-semibold">
                <span>INTENCIONALMENTE LIVRE DE MATERIAIS SINTÉTICOS RÍGIDOS OU TINTAS QUE DESBOTAM</span>
                <span className="text-[#4a3f35]">100% PERSONALIZADO</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
