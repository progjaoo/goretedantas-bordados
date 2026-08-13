import { getPortfolioItems } from "@/data/portfolioStore";
import { isAuthenticated } from "@/lib/auth";
import { redirect } from "next/navigation";
import AdminDashboardClient from "./AdminDashboardClient";

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  const authed = await isAuthenticated();
  if (!authed) {
    redirect("/admin/login");
  }

  const items = getPortfolioItems();

  return <AdminDashboardClient initialItems={items} />;
}
