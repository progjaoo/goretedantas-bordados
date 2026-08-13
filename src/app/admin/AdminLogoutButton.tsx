"use client";

import { LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function AdminLogoutButton() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogout = async () => {
    setLoading(true);
    try {
      await fetch("/api/auth", { method: "DELETE" });
      router.push("/admin/login");
      router.refresh();
    } catch (err) {
      console.error("Logout error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleLogout}
      disabled={loading}
      className="inline-flex items-center space-x-1.5 px-3 py-1.5 text-xs font-medium uppercase tracking-wider text-red-700 hover:bg-red-50 border border-red-200 rounded-md transition-colors"
      title="Sair do painel"
    >
      <LogOut className="w-3.5 h-3.5" />
      <span>{loading ? "Saindo..." : "Sair"}</span>
    </button>
  );
}
