"use client";

import { CATEGORIES } from "@/lib/constants";
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
    <section id="colecoes" className="w-full py-12 sm:py-16 lg:py-24 bg-[#f8f1e9] border-t border-[#e2ddd9]/80">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 sm:mb-12">
          <div className="flex flex-col space-y-2">
            <span className="text-[10px] sm:text-[11px] font-mono uppercase tracking-[0.2em] sm:tracking-[0.25em] text-[#8d7966] font-semibold">
              01. SELEÇÃO DE LINHAS & COLEÇÕES
            </span>
            <h2 className="font-serif text-2xl xs:text-3xl sm:text-4xl font-normal text-[#231e1a] tracking-tight">
              Escolha a linha ideal para o seu momento.
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-[#4a3f35]/80 max-w-md mt-2 md:mt-0 font-light leading-relaxed">
            Navegue pelas categorias de bordados estruturados e personalizados com matérias-primas nobres.
          </p>
        </div>

        {/* Responsive Bento Grid - 1 col on XS, 2 col on SM, 3 col on LG, 6 col on 2XL */}
        <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-3.5 sm:gap-5">
          {CATEGORIES.map((cat) => {
            const isFeatured = selectedCategory === cat.id;

            return (
              <button
                key={cat.id}
                onClick={() => onSelectCategory(cat.id)}
                className={`relative text-left p-5 sm:p-6 rounded-[10px] transition-all duration-300 cursor-pointer flex flex-col justify-between min-h-[190px] sm:min-h-[220px] active:scale-[0.98] ${
                  isFeatured
                    ? "bg-[#4a3f35] text-[#f8f1e9] shadow-xl ring-2 ring-[#8d7966]"
                    : "bg-white/90 hover:bg-white text-[#231e1a] border border-[#e2ddd9] hover:border-[#d8c8b8] shadow-xs hover:shadow-md"
                }`}
              >
                {/* Top: Icon + Tag */}
                <div className="flex items-start justify-between w-full">
                  <div
                    className={`w-9 h-9 sm:w-10 sm:h-10 rounded-md flex items-center justify-center ${
                      isFeatured
                        ? "bg-[#8d7966] text-[#f8f1e9]"
                        : "bg-[#e2ddd9] text-[#4a3f35]"
                    }`}
                  >
                    {getIcon(cat.icon)}
                  </div>
                  <span
                    className={`text-[9px] font-mono uppercase tracking-wider px-2 py-0.5 rounded-full ${
                      isFeatured
                        ? "bg-white/20 text-[#f8f1e9]"
                        : "bg-[#e2ddd9]/70 text-[#4a3f35] border border-[#d8c8b8]/50"
                    }`}
                  >
                    {cat.tag}
                  </span>
                </div>

                {/* Bottom: Title & Description */}
                <div className="mt-4 flex flex-col space-y-1">
                  <h3
                    className={`font-serif text-base sm:text-lg font-medium leading-snug ${
                      isFeatured ? "text-white" : "text-[#231e1a]"
                    }`}
                  >
                    {cat.label}
                  </h3>
                  <p
                    className={`text-[11px] sm:text-xs leading-relaxed line-clamp-2 ${
                      isFeatured ? "text-[#e2ddd9]/90 font-light" : "text-[#4a3f35]/80 font-normal"
                    }`}
                  >
                    {cat.description}
                  </p>
                </div>

                {/* Micro indicator */}
                <div className="mt-3 pt-2.5 border-t border-current/15 flex items-center justify-between text-[10px] font-mono uppercase tracking-wider">
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
