"use client";

import { CATEGORIES } from "@/lib/constants";
import { ProductCategory } from "@/types/portfolio";
import { Baby, Crown, Music, Shield, ShoppingBag, Sparkles } from "lucide-react";

interface RegimenSelectorProps {
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
}

export default function RegimenSelector({
  selectedCategory,
  onSelectCategory,
}: RegimenSelectorProps) {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case "Crown":
        return <Crown className="w-5 h-5" />;
      case "ShoppingBag":
        return <ShoppingBag className="w-5 h-5" />;
      case "Baby":
        return <Baby className="w-5 h-5" />;
      case "Sparkles":
        return <Sparkles className="w-5 h-5" />;
      case "Music":
        return <Music className="w-5 h-5" />;
      case "Shield":
        return <Shield className="w-5 h-5" />;
      default:
        return <Sparkles className="w-5 h-5" />;
    }
  };

  return (
    <section id="colecoes" className="w-full py-16 lg:py-24 bg-[#f8f1e9] border-t border-[#e2ddd9]/80">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div className="flex flex-col space-y-2">
            <span className="text-[11px] font-mono uppercase tracking-[0.25em] text-[#8d7966] font-semibold">
              01. SELEÇÃO DE LINHAS & COLEÇÕES
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-normal text-[#231e1a] tracking-tight">
              Escolha a linha ideal para o seu momento.
            </h2>
          </div>
          <p className="text-sm text-[#4a3f35]/80 max-w-md mt-3 md:mt-0 font-light">
            Navegue pelas categorias de bordados estruturados e personalizados. Cada peça confeccionada
            com rigor artesanal e matérias-primas nobres.
          </p>
        </div>

        {/* Bento Grid - 5 to 6 Cards Across */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 sm:gap-6">
          {CATEGORIES.slice(0, 5).map((cat) => {
            const isFeatured = selectedCategory === cat.id;

            return (
              <button
                key={cat.id}
                onClick={() => onSelectCategory(cat.id)}
                className={`relative text-left p-6 rounded-[8px] transition-all duration-300 cursor-pointer flex flex-col justify-between min-h-[220px] ${
                  isFeatured
                    ? "bg-[#4a3f35] text-[#f8f1e9] shadow-xl translate-y-[-4px] ring-2 ring-[#8d7966]"
                    : "bg-white/80 hover:bg-white text-[#231e1a] border border-[#e2ddd9] hover:border-[#d8c8b8] hover:translate-y-[-4px] shadow-sm hover:shadow-md"
                }`}
              >
                {/* Top: Icon + Tag */}
                <div className="flex items-start justify-between w-full">
                  <div
                    className={`w-10 h-10 rounded-md flex items-center justify-center ${
                      isFeatured
                        ? "bg-[#8d7966] text-[#f8f1e9]"
                        : "bg-[#e2ddd9] text-[#4a3f35]"
                    }`}
                  >
                    {getIcon(cat.icon)}
                  </div>
                  <span
                    className={`text-[9px] font-mono uppercase tracking-widest px-2.5 py-1 rounded-full ${
                      isFeatured
                        ? "bg-white/20 text-[#f8f1e9]"
                        : "bg-[#e2ddd9]/70 text-[#4a3f35] border border-[#d8c8b8]/50"
                    }`}
                  >
                    {cat.tag}
                  </span>
                </div>

                {/* Bottom: Title & Description */}
                <div className="mt-6 flex flex-col space-y-1.5">
                  <h3
                    className={`font-serif text-lg font-medium leading-snug ${
                      isFeatured ? "text-white" : "text-[#231e1a]"
                    }`}
                  >
                    {cat.label}
                  </h3>
                  <p
                    className={`text-xs leading-relaxed line-clamp-2 ${
                      isFeatured ? "text-[#e2ddd9]/90 font-light" : "text-[#4a3f35]/80 font-normal"
                    }`}
                  >
                    {cat.description}
                  </p>
                </div>

                {/* Micro indicator */}
                <div className="mt-4 pt-3 border-t border-current/15 flex items-center justify-between text-[10px] font-mono uppercase tracking-wider">
                  <span>{isFeatured ? "● Selecionado" : "Ver Peças"}</span>
                  <span>→</span>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
