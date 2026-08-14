"use client";

import WhatsAppIcon from "@/components/ui/WhatsAppIcon";
import { buildWhatsAppUrl } from "@/lib/utils";
import { Menu, Sparkles, X } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 15);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [mobileMenuOpen]);

  const navLinks = [
    { label: "Coleções", href: "#colecoes" },
    { label: "Catálogo", href: "#protocolos" },
    { label: "O Ateliê", href: "#atelie" },
    { label: "Como Encomendar", href: "#como-funciona" },
    { label: "Dúvidas", href: "#faq" },
  ];

  return (
    <>
      <header
        className={`sticky top-0 z-40 w-full transition-all duration-300 ${
          isScrolled
            ? "h-16 sm:h-20 bg-[#f8f1e9]/95 backdrop-blur-md shadow-sm border-b border-[#d8c8b8]/60"
            : "h-18 sm:h-24 bg-[#f8f1e9]/90 backdrop-blur-sm border-b border-[#e2ddd9]/60"
        }`}
      >
        <div className="max-w-[1440px] mx-auto h-full px-4 sm:px-6 lg:px-12 flex items-center justify-between">
          {/* Left: Logo */}
          <Link href="/" className="group flex items-center space-x-2.5 sm:space-x-3">
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-[#8d7966]/10 border border-[#8d7966]/20 flex items-center justify-center text-[#8d7966] group-hover:scale-105 transition-transform duration-300 shrink-0">
              <Sparkles className="w-4 h-4 sm:w-5 sm:h-5" />
            </div>
            <div className="flex flex-col">
              <span className="font-serif text-xl sm:text-2xl lg:text-3xl font-medium tracking-tight text-[#231e1a] leading-tight">
                Ateliê Gorete
              </span>
              <span className="text-[9px] sm:text-[10px] tracking-[0.2em] sm:tracking-[0.25em] uppercase text-[#8d7966] font-medium">
                Bordados de Afeto
              </span>
            </div>
          </Link>

          {/* Center: Nav links (Desktop) */}
          <nav className="hidden lg:flex items-center space-x-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-[13px] uppercase tracking-wider font-medium text-[#4a3f35] hover:text-[#8d7966] transition-colors relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px] after:bg-[#8d7966] hover:after:w-full after:transition-all after:duration-300"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Right: Actions */}
          <div className="flex items-center space-x-2 sm:space-x-3">
            <a
              href={buildWhatsAppUrl("Olá, Gorete! Gostaria de encomendar um bordado personalizado.")}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center space-x-2 px-3.5 sm:px-5 py-2 sm:py-2.5 bg-[#8d7966] hover:bg-[#786655] active:scale-95 text-[#f8f1e9] text-[11px] sm:text-xs font-semibold uppercase tracking-wider rounded-md shadow-sm transition-all duration-300"
            >
              <WhatsAppIcon className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white" />
              <span className="hidden xs:inline">Pedir no WhatsApp</span>
              <span className="xs:hidden">WhatsApp</span>
            </a>

            {/* Mobile hamburger (44px touch target) */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden w-11 h-11 flex items-center justify-center text-[#4a3f35] hover:text-[#8d7966] active:bg-[#e2ddd9]/50 rounded-md transition-colors"
              aria-label={mobileMenuOpen ? "Fechar menu" : "Abrir menu"}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Menu & Backdrop */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex flex-col justify-between">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-[#231e1a]/60 backdrop-blur-xs transition-opacity duration-300"
            onClick={() => setMobileMenuOpen(false)}
          />

          {/* Drawer Content */}
          <div className="relative z-10 bg-[#f8f1e9] border-b border-[#d8c8b8] px-6 pt-6 pb-8 shadow-2xl flex flex-col space-y-4 animate-in slide-in-from-top-4 duration-300">
            <div className="flex items-center justify-between pb-3 border-b border-[#d8c8b8]">
              <span className="font-serif text-lg font-medium text-[#231e1a]">
                Menu de Navegação
              </span>
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="w-10 h-10 flex items-center justify-center text-[#4a3f35] hover:text-[#8d7966] rounded-full bg-[#e2ddd9]/60"
                aria-label="Fechar menu"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex flex-col space-y-1">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-base font-serif font-medium text-[#231e1a] hover:text-[#8d7966] py-3 border-b border-[#e2ddd9]/60 flex items-center justify-between"
                >
                  <span>{link.label}</span>
                  <span className="text-[#8d7966] text-xs">→</span>
                </a>
              ))}
            </div>

            <div className="pt-2 flex flex-col space-y-2.5">
              <a
                href={buildWhatsAppUrl("Olá, Gorete! Gostaria de tirar uma dúvida sobre uma encomenda personalizada.")}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full flex items-center justify-center space-x-2.5 py-3.5 bg-[#8d7966] active:bg-[#786655] text-white text-xs uppercase tracking-widest font-semibold rounded-md shadow-md"
              >
                <WhatsAppIcon className="w-4 h-4 text-white" />
                <span>Chamar Gorete no WhatsApp</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
