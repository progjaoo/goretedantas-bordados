"use client";

import WhatsAppIcon from "@/components/ui/WhatsAppIcon";
import { SITE_CONFIG } from "@/lib/constants";
import { buildWhatsAppUrl } from "@/lib/utils";
import { Heart, Sparkles } from "lucide-react";

export default function Footer() {
  return (
    <footer className="w-full bg-[#231e1a] text-[#f8f1e9] border-t border-white/10 pt-16 pb-12">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 pb-14 border-b border-white/10">
          {/* Brand Info (4 cols) */}
          <div className="lg:col-span-4 flex flex-col space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center text-[#d8c8b8]">
                <Sparkles className="w-4 h-4" />
              </div>
              <span className="font-serif text-2xl font-medium tracking-tight text-white">
                Ateliê Gorete
              </span>
            </div>
            <p className="text-xs sm:text-sm text-[#e2ddd9]/75 leading-relaxed font-light max-w-sm">
              Bordados computadorizados e artesanais confeccionados com rigor, afeto e matérias-primas
              nobres. Toalhas de banho, necessaires e enxovais personalizados sob medida.
            </p>
            <div className="flex items-center space-x-3 pt-2">
              <a
                href={buildWhatsAppUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-[#8d7966] flex items-center justify-center text-[#f8f1e9] transition-colors"
                title="WhatsApp Ateliê Gorete"
              >
                <WhatsAppIcon className="w-4 h-4 text-white" />
              </a>
              <a
                href={SITE_CONFIG.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-[#8d7966] flex items-center justify-center text-[#f8f1e9] transition-colors"
                title="Instagram @goretedantasbordados"
              >
                <svg
                  className="w-4 h-4 fill-current"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links (4 cols) */}
          <div className="lg:col-span-4 flex flex-col space-y-3 text-xs">
            <span className="font-mono text-[10px] uppercase tracking-widest text-[#d8c8b8] font-semibold mb-1">
              NAVEGAÇÃO RÁPIDA
            </span>
            <a href="#colecoes" className="text-[#e2ddd9]/80 hover:text-white transition-colors">
              Coleções & Linhas
            </a>
            <a href="#protocolos" className="text-[#e2ddd9]/80 hover:text-white transition-colors">
              Protocolos de Confecção
            </a>
            <a href="#galeria" className="text-[#e2ddd9]/80 hover:text-white transition-colors">
              Catálogo de Peças
            </a>
            <a href="#como-funciona" className="text-[#e2ddd9]/80 hover:text-white transition-colors">
              Como Encomendar
            </a>
            <a href="#faq" className="text-[#e2ddd9]/80 hover:text-white transition-colors">
              Dúvidas Frequentes
            </a>
          </div>

          {/* Contact & Orders (4 cols) */}
          <div className="lg:col-span-4 flex flex-col space-y-3 text-xs">
            <span className="font-mono text-[10px] uppercase tracking-widest text-[#d8c8b8] font-semibold mb-1">
              CONTATO & ENCOMENDAS
            </span>
            <p className="text-[#e2ddd9]/80">
              <strong className="text-white font-medium block">WhatsApp Direto:</strong>
              <a
                href={buildWhatsAppUrl()}
                className="text-[#d8c8b8] hover:underline"
              >
                {SITE_CONFIG.phoneDisplay}
              </a>
            </p>
            <p className="text-[#e2ddd9]/80">
              <strong className="text-white font-medium block">Localização:</strong>
              {SITE_CONFIG.location}
            </p>
            <p className="text-[#e2ddd9]/80">
              <strong className="text-white font-medium block">Horário de Atendimento:</strong>
              Segunda a Sábado, das 09h às 19h
            </p>
          </div>
        </div>

        {/* Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-[11px] text-[#a8a39d] font-light space-y-3 sm:space-y-0">
          <p>© {new Date().getFullYear()} Ateliê Gorete Bordados. Todos os direitos reservados.</p>
          <p className="flex items-center space-x-1">
            <span>Bordado com</span>
            <Heart className="w-3 h-3 text-[#8d7966] fill-[#8d7966]" />
            <span>para momentos inesquecíveis.</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
