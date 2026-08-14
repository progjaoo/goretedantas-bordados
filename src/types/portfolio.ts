export type ProductCategory = string;

export interface CategoryItem {
  id: string;
  label: string;
  tag: string;
  description: string;
  icon: string;
  order?: number;
}

export interface CraftSpecification {
  tecido: string;
  linha: string;
  acabamento: string;
  tamanhoAprox?: string;
  personalizacao: string;
}

export interface PortfolioItem {
  id: string;
  title: string;
  category: ProductCategory;
  categoryLabel: string;
  shortDescription: string;
  fullDescription: string;
  image: string;
  isHeroFeatured: boolean;
  featuredOrder?: number;
  protocolNumber?: string;
  specifications: CraftSpecification;
  tags: string[];
  createdAt: string;
}

export interface Testimonial {
  id: string;
  clientName: string;
  city: string;
  comment: string;
  productPurchased: string;
  rating: number;
}

export interface FAQItem {
  question: string;
  answer: string;
}
