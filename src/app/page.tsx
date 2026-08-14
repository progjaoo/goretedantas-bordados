import { getPortfolioItemsAsync } from "@/data/portfolioStore";
import LandingPageClient from "./LandingPageClient";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const initialItems = await getPortfolioItemsAsync();

  return <LandingPageClient initialItems={initialItems} />;
}
