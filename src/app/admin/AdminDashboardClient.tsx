"use client";

import { CATEGORIES } from "@/lib/constants";
import { PortfolioItem, ProductCategory } from "@/types/portfolio";
import {
  CheckCircle,
  Eye,
  Image as ImageIcon,
  Layers,
  Plus,
  Search,
  Sparkles,
  Star,
  Trash2,
  Upload,
  X,
} from "lucide-react";
import Image from "next/image";
import { useRef, useState } from "react";

interface AdminDashboardClientProps {
  initialItems: PortfolioItem[];
}

export default function AdminDashboardClient({ initialItems }: AdminDashboardClientProps) {
  const [items, setItems] = useState<PortfolioItem[]>(initialItems);
  const [activeTab, setActiveTab] = useState<"galeria" | "novo">("galeria");
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<string>("todos");
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Form State for New Item
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState<ProductCategory>("toalhas-monograma");
  const [shortDescription, setShortDescription] = useState("");
  const [fullDescription, setFullDescription] = useState("");
  const [isHeroFeatured, setIsHeroFeatured] = useState(true);
  const [tecido, setTecido] = useState("100% Algodão Premium Aveludado (480g/m²)");
  const [linha, setLinha] = useState("Poliéster Trilobal de Alto Brilho");
  const [acabamento, setAcabamento] = useState("Renda Guipir / Barra Canelada com Friso");
  const [personalizacao, setPersonalizacao] = useState("Nome e temas sob medida");

  // File Upload State
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Delete State
  const [itemToDelete, setItemToDelete] = useState<PortfolioItem | null>(null);
  const [deleting, setDeleting] = useState(false);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleToggleHero = async (item: PortfolioItem) => {
    const newStatus = !item.isHeroFeatured;
    try {
      const res = await fetch(`/api/portfolio/${item.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isHeroFeatured: newStatus }),
      });

      if (res.ok) {
        setItems((prev) =>
          prev.map((i) => (i.id === item.id ? { ...i, isHeroFeatured: newStatus } : i))
        );
        showToast(
          newStatus
            ? `"${item.title}" agora aparece no Carrossel da Página Inicial!`
            : `"${item.title}" foi removido do Carrossel.`
        );
      }
    } catch (err) {
      showToast("Erro ao atualizar o item");
    }
  };

  const handleDeleteItem = async () => {
    if (!itemToDelete) return;
    setDeleting(true);
    try {
      const res = await fetch(`/api/portfolio/${itemToDelete.id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        setItems((prev) => prev.filter((i) => i.id !== itemToDelete.id));
        showToast("Peça removida do catálogo com sucesso!");
        setItemToDelete(null);
      } else {
        showToast("Erro ao excluir peça");
      }
    } catch (err) {
      showToast("Erro ao excluir peça");
    } finally {
      setDeleting(false);
    }
  };

  const handleCreateItem = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title) {
      showToast("Por favor informe o título da peça");
      return;
    }

    if (!selectedFile && !previewUrl) {
      showToast("Por favor selecione uma foto da peça");
      return;
    }

    setUploading(true);
    let finalImageUrl = previewUrl || "";

    try {
      // 1. Upload image if file selected
      if (selectedFile) {
        const formData = new FormData();
        formData.append("file", selectedFile);

        const uploadRes = await fetch("/api/upload", {
          method: "POST",
          body: formData,
        });

        if (!uploadRes.ok) {
          throw new Error("Erro no upload da imagem");
        }

        const uploadData = await uploadRes.json();
        finalImageUrl = uploadData.url;
      }

      // 2. Create portfolio item
      const categoryObj = CATEGORIES.find((c) => c.id === category);

      const res = await fetch("/api/portfolio", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          category,
          categoryLabel: categoryObj?.label || "Bordado Personalizado",
          shortDescription: shortDescription || "Peça personalizada bordada com acabamento fino.",
          fullDescription: fullDescription || shortDescription,
          image: finalImageUrl,
          isHeroFeatured,
          specifications: {
            tecido,
            linha,
            acabamento,
            personalizacao,
          },
          tags: [categoryObj?.tag || "Bordado", "Personalizado", category],
        }),
      });

      if (!res.ok) {
        throw new Error("Erro ao salvar no catálogo");
      }

      const data = await res.json();
      setItems((prev) => [data.item, ...prev]);
      showToast("Nova peça publicada com sucesso no site!");

      // Reset form
      setTitle("");
      setShortDescription("");
      setFullDescription("");
      setSelectedFile(null);
      setPreviewUrl(null);
      setActiveTab("galeria");
    } catch (err: any) {
      showToast(err.message || "Erro ao publicar nova peça");
    } finally {
      setUploading(false);
    }
  };

  const filteredItems = items.filter((item) => {
    const matchCategory =
      categoryFilter === "todos" || item.category === categoryFilter;
    const matchSearch =
      !searchQuery ||
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.shortDescription.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCategory && matchSearch;
  });

  const featuredCount = items.filter((i) => i.isHeroFeatured).length;

  return (
    <div className="space-y-8">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-20 right-6 z-50 bg-[#231e1a] text-white px-5 py-3 rounded-lg shadow-xl border border-[#8d7966] text-xs font-mono flex items-center space-x-2 animate-in fade-in slide-in-from-top-2">
          <CheckCircle className="w-4 h-4 text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Summary KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-[10px] border border-[#d8c8b8] editorial-shadow flex items-center space-x-4">
          <div className="w-12 h-12 rounded-lg bg-[#e2ddd9] flex items-center justify-center text-[#8d7966]">
            <ImageIcon className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[11px] font-mono uppercase tracking-wider text-[#4a3f35]">
              Total de Fotos Ativas
            </span>
            <p className="font-serif text-3xl font-semibold text-[#231e1a]">{items.length}</p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-[10px] border border-[#d8c8b8] editorial-shadow flex items-center space-x-4">
          <div className="w-12 h-12 rounded-lg bg-[#8d7966]/15 flex items-center justify-center text-[#8d7966]">
            <Star className="w-6 h-6 fill-[#8d7966]" />
          </div>
          <div>
            <span className="text-[11px] font-mono uppercase tracking-wider text-[#4a3f35]">
              No Carrossel Principal
            </span>
            <p className="font-serif text-3xl font-semibold text-[#8d7966]">{featuredCount}</p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-[10px] border border-[#d8c8b8] editorial-shadow flex items-center space-x-4">
          <div className="w-12 h-12 rounded-lg bg-[#e2ddd9] flex items-center justify-center text-[#4a3f35]">
            <Layers className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[11px] font-mono uppercase tracking-wider text-[#4a3f35]">
              Categorias Ativas
            </span>
            <p className="font-serif text-3xl font-semibold text-[#231e1a]">{CATEGORIES.length}</p>
          </div>
        </div>
      </div>

      {/* Tabs Navigation */}
      <div className="flex items-center justify-between border-b border-[#d8c8b8] pb-4">
        <div className="flex space-x-3">
          <button
            onClick={() => setActiveTab("galeria")}
            className={`px-5 py-2.5 rounded-md text-xs font-semibold uppercase tracking-wider transition-all ${
              activeTab === "galeria"
                ? "bg-[#8d7966] text-white shadow-sm"
                : "bg-white text-[#4a3f35] border border-[#d8c8b8] hover:bg-[#e2ddd9]"
            }`}
          >
            Gerenciar Galeria ({items.length})
          </button>
          <button
            onClick={() => setActiveTab("novo")}
            className={`px-5 py-2.5 rounded-md text-xs font-semibold uppercase tracking-wider transition-all flex items-center space-x-2 ${
              activeTab === "novo"
                ? "bg-[#8d7966] text-white shadow-sm"
                : "bg-white text-[#4a3f35] border border-[#d8c8b8] hover:bg-[#e2ddd9]"
            }`}
          >
            <Plus className="w-4 h-4" />
            <span>Adicionar Nova Foto</span>
          </button>
        </div>
      </div>

      {/* TAB 1: GALERIA LIST */}
      {activeTab === "galeria" && (
        <div className="space-y-6">
          {/* Filters Bar */}
          <div className="flex flex-col sm:flex-row gap-4 justify-between bg-white p-4 rounded-[8px] border border-[#d8c8b8]">
            <div className="relative flex-1 max-w-md">
              <Search className="w-4 h-4 absolute left-3.5 top-3.5 text-[#a8a39d]" />
              <input
                type="text"
                placeholder="Buscar por título ou descrição..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 text-xs rounded-md bg-[#f8f1e9] border border-[#d8c8b8] focus:outline-none focus:border-[#8d7966]"
              />
            </div>

            <div className="flex items-center space-x-2">
              <span className="text-xs font-mono text-[#4a3f35]">Categoria:</span>
              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="px-3 py-2 text-xs rounded-md bg-[#f8f1e9] border border-[#d8c8b8] text-[#231e1a] focus:outline-none focus:border-[#8d7966]"
              >
                <option value="todos">Todas as Categorias</option>
                {CATEGORIES.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Grid of Items */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredItems.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-[10px] border border-[#d8c8b8] overflow-hidden editorial-shadow flex flex-col justify-between"
              >
                <div className="relative aspect-[4/3] w-full bg-[#e2ddd9]">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover"
                  />
                  <div className="absolute top-3 left-3">
                    <span className="px-2.5 py-1 rounded-full bg-[#f8f1e9]/95 text-[10px] font-semibold tracking-wider uppercase text-[#4a3f35] border border-[#d8c8b8]">
                      {item.categoryLabel}
                    </span>
                  </div>

                  {item.isHeroFeatured && (
                    <div className="absolute top-3 right-3">
                      <span className="px-2.5 py-1 rounded-full bg-[#8d7966] text-[10px] font-semibold tracking-wider uppercase text-white shadow flex items-center space-x-1">
                        <Star className="w-3 h-3 fill-white" />
                        <span>Carrossel Hero</span>
                      </span>
                    </div>
                  )}
                </div>

                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    <h3 className="font-serif text-lg font-medium text-[#231e1a] leading-snug">
                      {item.title}
                    </h3>
                    <p className="text-xs text-[#4a3f35]/80 mt-1 line-clamp-2 font-light">
                      {item.shortDescription}
                    </p>
                  </div>

                  {/* Actions */}
                  <div className="pt-3 border-t border-[#e2ddd9] flex items-center justify-between">
                    <button
                      onClick={() => handleToggleHero(item)}
                      className={`px-3 py-1.5 rounded text-[11px] font-semibold uppercase tracking-wider transition-colors flex items-center space-x-1.5 ${
                        item.isHeroFeatured
                          ? "bg-[#8d7966]/15 text-[#8d7966] hover:bg-[#8d7966]/25"
                          : "bg-[#e2ddd9] text-[#4a3f35] hover:bg-[#d8c8b8]"
                      }`}
                    >
                      <Star className={`w-3.5 h-3.5 ${item.isHeroFeatured ? "fill-[#8d7966]" : ""}`} />
                      <span>{item.isHeroFeatured ? "No Carrossel" : "+ Pôr no Carrossel"}</span>
                    </button>

                    <button
                      onClick={() => setItemToDelete(item)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-md transition-colors"
                      title="Excluir peça"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 2: NOVO ITEM FORM */}
      {activeTab === "novo" && (
        <div className="bg-white rounded-[12px] p-6 sm:p-10 border border-[#d8c8b8] editorial-shadow max-w-3xl mx-auto">
          <div className="mb-8">
            <h2 className="font-serif text-2xl font-medium text-[#231e1a]">
              Publicar Nova Foto no Catálogo
            </h2>
            <p className="text-xs text-[#4a3f35]/80 font-light mt-1">
              Envie a foto do seu trabalho, dê um título e selecione a categoria correspondente.
            </p>
          </div>

          <form onSubmit={handleCreateItem} className="space-y-6">
            {/* Upload Box */}
            <div className="space-y-2">
              <label className="block text-xs font-mono uppercase tracking-wider text-[#4a3f35]">
                Foto da Peça (Bordado) *
              </label>

              <div
                onClick={() => fileInputRef.current?.click()}
                className={`relative border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${
                  previewUrl
                    ? "border-[#8d7966] bg-[#f8f1e9]/50"
                    : "border-[#d8c8b8] hover:border-[#8d7966] bg-[#f8f1e9]/30"
                }`}
              >
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="hidden"
                />

                {previewUrl ? (
                  <div className="flex flex-col items-center space-y-3">
                    <div className="relative w-48 h-48 rounded-lg overflow-hidden border border-[#d8c8b8] shadow-sm">
                      <Image src={previewUrl} alt="Preview" fill className="object-cover" />
                    </div>
                    <span className="text-xs text-[#8d7966] font-semibold underline">
                      Clique para trocar a foto
                    </span>
                  </div>
                ) : (
                  <div className="flex flex-col items-center space-y-3">
                    <div className="w-12 h-12 rounded-full bg-[#8d7966]/10 flex items-center justify-center text-[#8d7966]">
                      <Upload className="w-6 h-6" />
                    </div>
                    <div className="space-y-1">
                      <p className="text-xs font-semibold text-[#231e1a]">
                        Clique para escolher a foto do computador ou celular
                      </p>
                      <p className="text-[11px] text-[#a8a39d]">JPG, PNG ou WEBP até 10MB</p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Title & Category */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="block text-xs font-mono uppercase tracking-wider text-[#4a3f35]">
                  Título da Peça *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Ex: Toalha Batizado Jardim Encantado"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-md bg-[#f8f1e9] border border-[#d8c8b8] text-xs text-[#231e1a] focus:outline-none focus:border-[#8d7966]"
                />
              </div>

              <div className="space-y-1">
                <label className="block text-xs font-mono uppercase tracking-wider text-[#4a3f35]">
                  Categoria *
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value as ProductCategory)}
                  className="w-full px-4 py-2.5 rounded-md bg-[#f8f1e9] border border-[#d8c8b8] text-xs text-[#231e1a] focus:outline-none focus:border-[#8d7966]"
                >
                  {CATEGORIES.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Hero Carousel Switch */}
            <div className="p-4 bg-[#e2ddd9]/60 rounded-md border border-[#d8c8b8] flex items-center justify-between">
              <div>
                <span className="font-serif font-medium text-sm text-[#231e1a] block">
                  Exibir no Carrossel Principal da Página Inicial?
                </span>
                <span className="text-[11px] text-[#4a3f35]/80 font-light">
                  Aparecerá com destaque logo no topo do site para os visitantes.
                </span>
              </div>
              <button
                type="button"
                onClick={() => setIsHeroFeatured(!isHeroFeatured)}
                className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full transition-colors duration-200 ease-in-out ${
                  isHeroFeatured ? "bg-[#8d7966]" : "bg-[#d8c8b8]"
                }`}
              >
                <span
                  className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-sm ring-0 transition duration-200 ease-in-out mt-0.5 ml-0.5 ${
                    isHeroFeatured ? "translate-x-5" : "translate-x-0"
                  }`}
                />
              </button>
            </div>

            {/* Descriptions */}
            <div className="space-y-1">
              <label className="block text-xs font-mono uppercase tracking-wider text-[#4a3f35]">
                Descrição do Bordado e Detalhes
              </label>
              <textarea
                rows={3}
                placeholder="Ex: Toalha de veludo branca com monograma dourado, entremeio de renda guipir e fita de cetim."
                value={shortDescription}
                onChange={(e) => setShortDescription(e.target.value)}
                className="w-full px-4 py-2.5 rounded-md bg-[#f8f1e9] border border-[#d8c8b8] text-xs text-[#231e1a] focus:outline-none focus:border-[#8d7966]"
              />
            </div>

            {/* Specifications Details */}
            <div className="pt-2 border-t border-[#e2ddd9] space-y-4">
              <span className="text-[11px] font-mono uppercase tracking-widest text-[#8d7966] font-bold block">
                Detalhes dos Materiais (Opcional / Padrões do Ateliê)
              </span>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="block text-[11px] font-mono text-[#4a3f35]">Tecido da Peça</label>
                  <input
                    type="text"
                    value={tecido}
                    onChange={(e) => setTecido(e.target.value)}
                    className="w-full px-3 py-2 rounded-md bg-[#f8f1e9] border border-[#d8c8b8] text-xs"
                  />
                </div>
                <div className="space-y-1">
                  <label className="block text-[11px] font-mono text-[#4a3f35]">Acabamento / Renda</label>
                  <input
                    type="text"
                    value={acabamento}
                    onChange={(e) => setAcabamento(e.target.value)}
                    className="w-full px-3 py-2 rounded-md bg-[#f8f1e9] border border-[#d8c8b8] text-xs"
                  />
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-4 flex justify-end space-x-3">
              <button
                type="button"
                onClick={() => setActiveTab("galeria")}
                className="px-6 py-3 border border-[#d8c8b8] text-xs uppercase tracking-wider font-semibold text-[#4a3f35] rounded-md hover:bg-[#e2ddd9]"
              >
                Cancelar
              </button>
              <button
                type="submit"
                disabled={uploading}
                className="px-8 py-3 bg-[#8d7966] hover:bg-[#786655] text-white text-xs uppercase tracking-widest font-semibold rounded-md shadow-md transition-all disabled:opacity-50 flex items-center space-x-2"
              >
                {uploading ? (
                  <span>Publicando...</span>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4" />
                    <span>Publicar Peça no Catálogo</span>
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {itemToDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#231e1a]/70 backdrop-blur-sm">
          <div className="bg-white rounded-[10px] p-6 max-w-sm w-full border border-[#d8c8b8] shadow-2xl space-y-4">
            <h3 className="font-serif text-lg font-medium text-[#231e1a]">
              Confirmar Exclusão
            </h3>
            <p className="text-xs text-[#4a3f35] leading-relaxed">
              Tem certeza que deseja remover a foto de{" "}
              <strong>"{itemToDelete.title}"</strong> do catálogo do site?
            </p>
            <div className="pt-3 flex justify-end space-x-2">
              <button
                onClick={() => setItemToDelete(null)}
                className="px-4 py-2 border border-[#d8c8b8] text-xs font-semibold rounded-md"
              >
                Cancelar
              </button>
              <button
                onClick={handleDeleteItem}
                disabled={deleting}
                className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-xs font-semibold rounded-md transition-colors"
              >
                {deleting ? "Excluindo..." : "Sim, Excluir"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
