"use client";

import { ArrowLeft, Lock, Sparkles } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function AdminLoginPage() {
  const [username, setUsername] = useState("gorete");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();

      if (res.ok) {
        router.push("/admin");
      } else {
        setError(data.error || "Usuário ou senha incorretos");
      }
    } catch (err) {
      setError("Erro de conexão ao tentar fazer login");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f8f1e9] flex flex-col justify-center items-center px-4 py-12 relative overflow-hidden">
      {/* Background texture */}
      <div className="absolute inset-0 linen-texture opacity-30 pointer-events-none" />

      {/* Back to site */}
      <Link
        href="/"
        className="absolute top-8 left-8 inline-flex items-center space-x-2 text-xs uppercase tracking-widest text-[#4a3f35] hover:text-[#8d7966] transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Voltar ao Site Principal</span>
      </Link>

      <div className="w-full max-w-md bg-white rounded-[12px] p-8 sm:p-10 border border-[#d8c8b8] editorial-shadow relative z-10">
        {/* Header */}
        <div className="flex flex-col items-center text-center space-y-3 mb-8">
          <div className="w-12 h-12 rounded-full bg-[#8d7966]/10 border border-[#8d7966]/20 flex items-center justify-center text-[#8d7966]">
            <Lock className="w-5 h-5" />
          </div>
          <span className="font-mono text-[10px] uppercase tracking-widest text-[#8d7966] font-semibold">
            PAINEL DO ATELIÊ
          </span>
          <h1 className="font-serif text-2xl sm:text-3xl font-medium text-[#231e1a]">
            Acesso da Gorete
          </h1>
          <p className="text-xs text-[#4a3f35]/80 font-light max-w-xs">
            Entre para adicionar novas fotos de trabalhos, editar descrições e gerenciar o catálogo.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleLogin} className="space-y-4">
          {error && (
            <div className="p-3 rounded-md bg-red-50 border border-red-200 text-red-700 text-xs font-medium text-center">
              {error}
            </div>
          )}

          <div className="space-y-1">
            <label className="block text-[11px] font-mono uppercase tracking-wider text-[#4a3f35]">
              Usuário
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="w-full px-4 py-3 rounded-md bg-[#f8f1e9] border border-[#d8c8b8] text-sm text-[#231e1a] focus:outline-none focus:border-[#8d7966] focus:ring-1 focus:ring-[#8d7966]"
              placeholder="gorete"
            />
          </div>

          <div className="space-y-1">
            <label className="block text-[11px] font-mono uppercase tracking-wider text-[#4a3f35]">
              Senha de Acesso
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-3 rounded-md bg-[#f8f1e9] border border-[#d8c8b8] text-sm text-[#231e1a] focus:outline-none focus:border-[#8d7966] focus:ring-1 focus:ring-[#8d7966]"
              placeholder="••••••••"
            />
          </div>

          {/* Quick Helper for convenience */}
          <div className="p-3 bg-[#e2ddd9]/60 rounded-md border border-[#d8c8b8] text-[11px] text-[#4a3f35] font-mono space-y-1">
            <div className="flex items-center space-x-1 text-[#8d7966] font-bold">
              <Sparkles className="w-3 h-3" />
              <span>Senha Padrão Inicial:</span>
            </div>
            <p>
              Senha: <code className="bg-white px-1.5 py-0.5 rounded font-bold text-[#231e1a]">bordados2026</code>
            </p>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full mt-2 py-3.5 px-4 bg-[#8d7966] hover:bg-[#786655] text-white text-xs font-semibold uppercase tracking-widest rounded-md shadow transition-all duration-200 disabled:opacity-50"
          >
            {loading ? "Entrando..." : "Acessar Painel de Fotos"}
          </button>
        </form>
      </div>
    </div>
  );
}
