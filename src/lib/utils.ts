import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function buildWhatsAppUrl(message?: string) {
  const phoneNumber = "5524999356139";
  const defaultText = "Olá, Dona Gorete! Gostaria de fazer uma encomenda personalizada de bordado.";
  const text = encodeURIComponent(message || defaultText);
  return `https://wa.me/${phoneNumber}?text=${text}`;
}

export function buildProductWhatsAppUrl(productTitle: string, category: string) {
  const msg = `Olá, Dona Gorete! Vi no seu catálogo o trabalho "${productTitle}" (${category}) e gostaria de encomendar uma peça personalizada similar. Como podemos combinar?`;
  return buildWhatsAppUrl(msg);
}
