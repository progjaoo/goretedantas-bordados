import { isAuthenticated } from "@/lib/auth";
import { ArrowLeft, LogOut, Sparkles } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";
import AdminLogoutButton from "./AdminLogoutButton";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const authed = await isAuthenticated();

  // If inside /admin (except /admin/login which has its own page), require auth
  // Note: /admin/login is a subroute, but Next.js nested layout applies to /admin and /admin/login unless grouped.
  // Let's make sure it handles gracefully.

  return (
    <div className="min-h-screen bg-[#f8f1e9] text-[#231e1a] flex flex-col">
      {/* Top Admin Bar */}
      <header className="h-16 bg-white border-b border-[#d8c8b8] px-6 lg:px-12 flex items-center justify-between sticky top-0 z-30 shadow-xs">
        <div className="flex items-center space-x-4">
          <Link href="/" className="flex items-center space-x-2 text-xs uppercase tracking-widest text-[#4a3f35] hover:text-[#8d7966] transition-colors">
            <ArrowLeft className="w-4 h-4" />
            <span className="hidden sm:inline">Ver Site Principal</span>
          </Link>
          <span className="text-[#d8c8b8]">|</span>
          <div className="flex items-center space-x-2">
            <Sparkles className="w-4 h-4 text-[#8d7966]" />
            <span className="font-serif font-medium text-base text-[#231e1a]">
              Painel de Gestão de Fotos
            </span>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <span className="text-xs text-[#4a3f35] hidden md:inline font-mono">
            Conectada como: <strong className="text-[#8d7966]">Dona Gorete</strong>
          </span>
          <AdminLogoutButton />
        </div>
      </header>

      <main className="flex-1 max-w-[1440px] w-full mx-auto p-6 lg:p-12">
        {children}
      </main>
    </div>
  );
}
