"use client";

import WhatsAppIcon from "@/components/ui/WhatsAppIcon";
import { buildWhatsAppUrl } from "@/lib/utils";
import { Menu, Sparkles, X } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

interface HeaderProps {
  onOpenLoginModal?: () => void;
}

export default function Header({ onOpenLoginModal }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: "Coleções", href: "#colecoes" },
    { label: "Protocolos", href: "#protocolos" },
    { label: "Galeria", href: "#galeria" },
    { label: "O Ateliê", href: "#atelie" },
    { label: "Como Encomendar", href: "#como-funciona" },
    { label: "Dúvidas", href: "#faq" },
  ];

  return (
    <header
      className={`sticky top-0 z-40 w-full transition-all duration-300 ${
        isScrolled
          ? "h-20 bg-[#f8f1e9]/95 backdrop-blur-md shadow-sm border-b border-[#d8c8b8]/50"
          : "h-24 bg-[#f8f1e9]/90 backdrop-blur-sm border-b border-[#e2ddd9]/60"
      }`}
    >
      <div className="max-w-[1440px] mx-auto h-full px-6 lg:px-12 flex items-center justify-between">
        {/* Left: Logo */}
        <Link href="/" className="group flex items-center space-x-3">
          <div className="w-10 h-10 rounded-full bg-[#8d7966]/10 border border-[#8d7966]/20 flex items-center justify-center text-[#8d7966] group-hover:scale-105 transition-transform duration-300">
            <Sparkles className="w-5 h-5" />
          </div>
          <div className="flex flex-col">
            <span className="font-serif text-2xl lg:text-3xl font-medium tracking-tight text-[#231e1a]">
              Ateliê Gorete
            </span>
            <span className="text-[10px] tracking-[0.25em] uppercase text-[#8d7966] font-medium -mt-1">
              Bordados de Afeto
            </span>
          </div>
        </Link>

        {/* Center: Nav links */}
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
        <div className="flex items-center space-x-4">
          <a
            href={buildWhatsAppUrl("Olá, Gorete! Gostaria de encomendar um bordado personalizado.")}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center space-x-2 px-5 py-2.5 bg-[#8d7966] hover:bg-[#786655] text-[#f8f1e9] text-xs font-medium uppercase tracking-widest rounded-md shadow-sm transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
          >
            <WhatsAppIcon className="w-4 h-4 text-white" />
            <span className="hidden sm:inline">Fazer Encomenda</span>
            <span className="sm:hidden">WhatsApp</span>
          </a>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-[#4a3f35] hover:text-[#8d7966] rounded-md"
            aria-label="Abrir menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-x-0 top-[96px] bg-[#f8f1e9] border-b border-[#d8c8b8] px-6 py-8 shadow-xl flex flex-col space-y-4 animate-in slide-in-from-top-2 duration-300 z-50">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="text-base font-serif font-medium text-[#231e1a] hover:text-[#8d7966] py-2 border-b border-[#e2ddd9]"
            >
              {link.label}
            </a>
          ))}
          <div className="pt-4 flex flex-col space-y-3">
            <a
              href={buildWhatsAppUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center space-x-2 py-3.5 bg-[#8d7966] text-[#f8f1e9] text-xs uppercase tracking-widest font-semibold rounded-md shadow"
            >
              <WhatsAppIcon className="w-4 h-4 text-white" />
              <span>Chamar no WhatsApp (+55 24 99935-6139)</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
