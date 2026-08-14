import { getCategoriesAsync } from "@/data/categoriesStore";
import { getPortfolioItemsAsync } from "@/data/portfolioStore";
import LandingPageClient from "./LandingPageClient";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const [items, categories] = await Promise.all([
    getPortfolioItemsAsync(),
    getCategoriesAsync(),
  ]);

  return (
    <LandingPageClient
      initialItems={items}
      categories={categories}
    />
  );
}
