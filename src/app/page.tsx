import { getPortfolioItems } from "@/data/portfolioStore";
import LandingPageClient from "./LandingPageClient";

export const dynamic = "force-dynamic";

export default function HomePage() {
  const initialItems = getPortfolioItems();

  return <LandingPageClient initialItems={initialItems} />;
}
