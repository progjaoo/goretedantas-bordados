"use client";

import {
  Award,
  Baby,
  Crown,
  Gift,
  Heart,
  Music,
  Scissors,
  Shield,
  Shirt,
  ShoppingBag,
  Sparkles,
  Star,
  Tag,
} from "lucide-react";
import React from "react";

export const AVAILABLE_CATEGORY_ICONS = [
  { id: "Crown", label: "Coroa (Luxo / Casais)", icon: Crown },
  { id: "ShoppingBag", label: "Bolsa / Necessaire", icon: ShoppingBag },
  { id: "Baby", label: "Bebê / Infantil", icon: Baby },
  { id: "Sparkles", label: "Brilho / Especial", icon: Sparkles },
  { id: "Music", label: "Música / Clérigo", icon: Music },
  { id: "Shield", label: "Brasão / Times", icon: Shield },
  { id: "Heart", label: "Coração / Afeto", icon: Heart },
  { id: "Gift", label: "Presente / Kits", icon: Gift },
  { id: "Shirt", label: "Toalhas / Vestuário", icon: Shirt },
  { id: "Scissors", label: "Costura / Artesanal", icon: Scissors },
  { id: "Star", label: "Estrela / Destaque", icon: Star },
  { id: "Award", label: "Prêmio / Nobre", icon: Award },
];

export default function CategoryIcon({
  iconName,
  className = "w-5 h-5",
}: {
  iconName: string;
  className?: string;
}) {
  switch (iconName) {
    case "Crown":
      return <Crown className={className} />;
    case "ShoppingBag":
      return <ShoppingBag className={className} />;
    case "Baby":
      return <Baby className={className} />;
    case "Sparkles":
      return <Sparkles className={className} />;
    case "Music":
      return <Music className={className} />;
    case "Shield":
      return <Shield className={className} />;
    case "Heart":
      return <Heart className={className} />;
    case "Gift":
      return <Gift className={className} />;
    case "Shirt":
      return <Shirt className={className} />;
    case "Scissors":
      return <Scissors className={className} />;
    case "Star":
      return <Star className={className} />;
    case "Award":
      return <Award className={className} />;
    default:
      return <Sparkles className={className} />;
  }
}
