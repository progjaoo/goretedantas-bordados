"use client";

import FloatingWhatsApp from "@/components/site/FloatingWhatsApp";
import Footer from "@/components/site/Footer";
import Header from "@/components/site/Header";
import HeroSection from "@/components/site/HeroSection";
import PhotoLightbox from "@/components/site/PhotoLightbox";
import ProductProtocolSection from "@/components/site/ProductProtocolSection";
import QualityTrustSection from "@/components/site/QualityTrustSection";
import RegimenSelector from "@/components/site/RegimenSelector";
import SafetyFAQSection from "@/components/site/SafetyFAQSection";
import TopReassuranceStrip from "@/components/site/TopReassuranceStrip";
import UsageTimeline from "@/components/site/UsageTimeline";
import { CategoryItem, PortfolioItem } from "@/types/portfolio";
import { useMemo, useState } from "react";

interface LandingPageClientProps {
  initialItems: PortfolioItem[];
  categories: CategoryItem[];
}

export default function LandingPageClient({
  initialItems,
  categories,
}: LandingPageClientProps) {
  const [items, setItems] = useState<PortfolioItem[]>(initialItems);
  const [selectedCategory, setSelectedCategory] = useState<string>("todos");
  const [activeLightboxItem, setActiveLightboxItem] = useState<PortfolioItem | null>(null);

  const featuredHeroItems = useMemo(() => {
    const featured = items.filter((item) => item.isHeroFeatured);
    return featured.length > 0 ? featured : items.slice(0, 5);
  }, [items]);

  const handleSelectCategory = (category: string) => {
    setSelectedCategory(category);
    // Smooth scroll to catalog
    const catalogElement = document.getElementById("protocolos");
    if (catalogElement) {
      catalogElement.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#f8f1e9] text-[#231e1a] selection:bg-[#8d7966]/20 selection:text-[#231e1a]">
      {/* 1. Top Reassurance Strip */}
      <TopReassuranceStrip />

      {/* 2. Sticky Header */}
      <Header />

      {/* 3. Main Content Flow */}
      <main className="flex-1">
        {/* Hero Section (12-col grid, Left 5 cols text/CTA, Right 7 cols 4:5 Showcase) */}
        <HeroSection
          featuredItems={featuredHeroItems}
          onOpenLightbox={(item) => setActiveLightboxItem(item)}
        />

        {/* Regimen Selector Bento Grid (Dynamic Categories) */}
        <RegimenSelector
          categories={categories}
          selectedCategory={selectedCategory}
          onSelectCategory={handleSelectCategory}
        />

        {/* Product Protocol Deep Dive & Interactive Catalog Grid */}
        <ProductProtocolSection
          items={items}
          categories={categories}
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
          onOpenLightbox={(item) => setActiveLightboxItem(item)}
        />

        {/* 3-Stage Process Timeline */}
        <UsageTimeline />

        {/* Quality & Trust Manifesto */}
        <QualityTrustSection />

        {/* Safety & FAQ Section */}
        <SafetyFAQSection />
      </main>

      {/* 4. Editorial Footer */}
      <Footer />

      {/* 5. Floating Interactive WhatsApp Button */}
      <FloatingWhatsApp />

      {/* 6. Photo Lightbox Modal */}
      <PhotoLightbox
        item={activeLightboxItem}
        onClose={() => setActiveLightboxItem(null)}
      />
    </div>
  );
}
