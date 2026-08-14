"use client";

import CategoryIcon, { AVAILABLE_CATEGORY_ICONS } from "@/components/ui/CategoryIcon";
import { CategoryItem, PortfolioItem } from "@/types/portfolio";
import { upload } from "@vercel/blob/client";
import {
  AlertCircle,
  CheckCircle,
  Edit2,
  FolderPlus,
  Image as ImageIcon,
  Layers,
  Plus,
  Search,
  Sparkles,
  Star,
  Tag,
  Trash2,
  Upload,
  X,
} from "lucide-react";
import Image from "next/image";
import { useRef, useState } from "react";

interface AdminDashboardClientProps {
  initialItems: PortfolioItem[];
  initialCategories: CategoryItem[];
}

export default function AdminDashboardClient({
  initialItems,
  initialCategories,
}: AdminDashboardClientProps) {
  const [items, setItems] = useState<PortfolioItem[]>(initialItems);
  const [categories, setCategories] = useState<CategoryItem[]>(initialCategories);
  const [activeTab, setActiveTab] = useState<"galeria" | "categorias" | "novo">("galeria");
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<string>("todos");
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Form State for New Item
  const [title, setTitle] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>(
    categories[0]?.id || "toalhas-monograma"
  );
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

  // Delete Item State
  const [itemToDelete, setItemToDelete] = useState<PortfolioItem | null>(null);
  const [deletingItem, setDeletingItem] = useState(false);

  // Edit Item State (Change category, title, description, materials)
  const [itemToEdit, setItemToEdit] = useState<PortfolioItem | null>(null);
  const [editTitle, setEditTitle] = useState("");
  const [editCategory, setEditCategory] = useState("");
  const [editShortDescription, setEditShortDescription] = useState("");
  const [editTecido, setEditTecido] = useState("");
  const [editAcabamento, setEditAcabamento] = useState("");
  const [editIsHero, setEditIsHero] = useState(false);
  const [savingEditItem, setSavingEditItem] = useState(false);

  // Category Modal State (Add or Edit)
  const [categoryModalOpen, setCategoryModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<CategoryItem | null>(null);
  const [categoryLabel, setCategoryLabel] = useState("");
  const [categoryTag, setCategoryTag] = useState("");
  const [categoryDesc, setCategoryDesc] = useState("");
  const [categoryIcon, setCategoryIcon] = useState("Sparkles");
  const [savingCategory, setSavingCategory] = useState(false);
  const [categoryToDelete, setCategoryToDelete] = useState<CategoryItem | null>(null);
  const [deletingCategory, setDeletingCategory] = useState(false);

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

  // Toggle Hero Carousel
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
      showToast("Erro ao atualizar o status do item");
    }
  };

  // Open Edit Item Modal
  const handleOpenEditItem = (item: PortfolioItem) => {
    setItemToEdit(item);
    setEditTitle(item.title);
    setEditCategory(item.category);
    setEditShortDescription(item.shortDescription || "");
    setEditTecido(item.specifications?.tecido || "100% Algodão Premium");
    setEditAcabamento(item.specifications?.acabamento || "Acabamento Artesanal");
    setEditIsHero(Boolean(item.isHeroFeatured));
  };

  // Save Item Edits
  const handleSaveItemEdit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!itemToEdit) return;

    setSavingEditItem(true);
    try {
      const targetCategoryObj = categories.find((c) => c.id === editCategory);
      const res = await fetch(`/api/portfolio/${itemToEdit.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: editTitle.trim(),
          category: editCategory,
          categoryLabel: targetCategoryObj?.label || editCategory,
          shortDescription: editShortDescription.trim(),
          isHeroFeatured: editIsHero,
          specifications: {
            ...itemToEdit.specifications,
            tecido: editTecido.trim(),
            acabamento: editAcabamento.trim(),
          },
        }),
      });

      if (!res.ok) {
        throw new Error("Erro ao salvar alterações da peça");
      }

      const data = await res.json();
      setItems((prev) => prev.map((i) => (i.id === itemToEdit.id ? data.item : i)));
      showToast(`Peça "${editTitle}" atualizada com sucesso!`);
      setItemToEdit(null);
    } catch (err: any) {
      showToast(err.message || "Erro ao salvar alterações");
    } finally {
      setSavingEditItem(false);
    }
  };

  // Delete Item
  const handleDeleteItem = async () => {
    if (!itemToDelete) return;
    setDeletingItem(true);
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
      setDeletingItem(false);
    }
  };

  // Create Item
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
        try {
          const newBlob = await upload(`portfolio/${selectedFile.name}`, selectedFile, {
            access: "public",
            handleUploadUrl: "/api/upload",
          });
          finalImageUrl = newBlob.url;
        } catch (blobErr) {
          console.warn("Vercel Blob client upload fallback to local API:", blobErr);
          const formData = new FormData();
          formData.append("file", selectedFile);

          const uploadRes = await fetch("/api/upload/local", {
            method: "POST",
            body: formData,
          });

          if (!uploadRes.ok) {
            throw new Error("Erro no upload da imagem");
          }

          const uploadData = await uploadRes.json();
          finalImageUrl = uploadData.url;
        }
      }

      // 2. Create portfolio item
      const categoryObj = categories.find((c) => c.id === selectedCategory);

      const res = await fetch("/api/portfolio", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          category: selectedCategory,
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
          tags: [categoryObj?.tag || "Bordado", "Personalizado", selectedCategory],
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

  // Open Category Create Modal
  const handleOpenAddCategory = () => {
    setEditingCategory(null);
    setCategoryLabel("");
    setCategoryTag("Personalizado");
    setCategoryDesc("");
    setCategoryIcon("Sparkles");
    setCategoryModalOpen(true);
  };

  // Open Category Edit Modal
  const handleOpenEditCategory = (cat: CategoryItem) => {
    setEditingCategory(cat);
    setCategoryLabel(cat.label);
    setCategoryTag(cat.tag || "");
    setCategoryDesc(cat.description || "");
    setCategoryIcon(cat.icon || "Sparkles");
    setCategoryModalOpen(true);
  };

  // Save Category (Create or Update)
  const handleSaveCategory = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!categoryLabel.trim()) {
      showToast("Por favor informe o nome da categoria");
      return;
    }

    setSavingCategory(true);
    try {
      if (editingCategory) {
        // Update existing category
        const res = await fetch(`/api/categories/${editingCategory.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            label: categoryLabel.trim(),
            tag: categoryTag.trim(),
            description: categoryDesc.trim(),
            icon: categoryIcon,
          }),
        });

        if (!res.ok) {
          const errData = await res.json();
          throw new Error(errData.error || "Erro ao atualizar categoria");
        }

        const data = await res.json();
        setCategories((prev) =>
          prev.map((c) => (c.id === editingCategory.id ? data.category : c))
        );
        // Also update category label across items in state
        setItems((prev) =>
          prev.map((i) =>
            i.category === editingCategory.id
              ? { ...i, categoryLabel: data.category.label }
              : i
          )
        );
        showToast(`Categoria "${data.category.label}" atualizada!`);
      } else {
        // Create new category
        const res = await fetch("/api/categories", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            label: categoryLabel.trim(),
            tag: categoryTag.trim(),
            description: categoryDesc.trim(),
            icon: categoryIcon,
          }),
        });

        if (!res.ok) {
          const errData = await res.json();
          throw new Error(errData.error || "Erro ao criar categoria");
        }

        const data = await res.json();
        setCategories((prev) => [...prev, data.category]);
        showToast(`Nova categoria "${data.category.label}" criada com sucesso!`);
      }

      setCategoryModalOpen(false);
    } catch (err: any) {
      showToast(err.message || "Erro ao salvar categoria");
    } finally {
      setSavingCategory(false);
    }
  };

  // Delete Category
  const handleDeleteCategory = async () => {
    if (!categoryToDelete) return;
    setDeletingCategory(true);
    try {
      const res = await fetch(`/api/categories/${categoryToDelete.id}`, {
        method: "DELETE",
      });

      const data = await res.json();

      if (res.ok) {
        setCategories((prev) => prev.filter((c) => c.id !== categoryToDelete.id));
        showToast(`Categoria "${categoryToDelete.label}" excluída com sucesso!`);
        setCategoryToDelete(null);
      } else {
        showToast(data.error || "Não foi possível excluir a categoria");
      }
    } catch (err: any) {
      showToast(err.message || "Erro ao excluir categoria");
    } finally {
      setDeletingCategory(false);
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
    <div className="space-y-6 sm:space-y-8">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-20 right-4 sm:right-6 z-50 bg-[#231e1a] text-white px-4 sm:px-5 py-3 rounded-lg shadow-xl border border-[#8d7966] text-xs font-mono flex items-center space-x-2 animate-in fade-in slide-in-from-top-2">
          <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Summary KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
        <div className="bg-white p-5 sm:p-6 rounded-[10px] border border-[#d8c8b8] editorial-shadow flex items-center space-x-4">
          <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-lg bg-[#e2ddd9] flex items-center justify-center text-[#8d7966]">
            <ImageIcon className="w-5 h-5 sm:w-6 sm:h-6" />
          </div>
          <div>
            <span className="text-[10px] sm:text-[11px] font-mono uppercase tracking-wider text-[#4a3f35]">
              Total de Fotos Ativas
            </span>
            <p className="font-serif text-2xl sm:text-3xl font-semibold text-[#231e1a]">{items.length}</p>
          </div>
        </div>

        <div className="bg-white p-5 sm:p-6 rounded-[10px] border border-[#d8c8b8] editorial-shadow flex items-center space-x-4">
          <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-lg bg-[#8d7966]/15 flex items-center justify-center text-[#8d7966]">
            <Star className="w-5 h-5 sm:w-6 sm:h-6 fill-[#8d7966]" />
          </div>
          <div>
            <span className="text-[10px] sm:text-[11px] font-mono uppercase tracking-wider text-[#4a3f35]">
              No Carrossel da Home
            </span>
            <p className="font-serif text-2xl sm:text-3xl font-semibold text-[#8d7966]">{featuredCount}</p>
          </div>
        </div>

        <div className="bg-white p-5 sm:p-6 rounded-[10px] border border-[#d8c8b8] editorial-shadow flex items-center space-x-4">
          <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-lg bg-[#e2ddd9] flex items-center justify-center text-[#4a3f35]">
            <Layers className="w-5 h-5 sm:w-6 sm:h-6" />
          </div>
          <div>
            <span className="text-[10px] sm:text-[11px] font-mono uppercase tracking-wider text-[#4a3f35]">
              Categorias Criadas
            </span>
            <p className="font-serif text-2xl sm:text-3xl font-semibold text-[#231e1a]">{categories.length}</p>
          </div>
        </div>
      </div>

      {/* Tabs Navigation */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#d8c8b8] pb-4">
        <div className="flex flex-wrap gap-2 sm:gap-3">
          <button
            onClick={() => setActiveTab("galeria")}
            className={`px-4 sm:px-5 py-2.5 rounded-md text-xs font-semibold uppercase tracking-wider transition-all ${
              activeTab === "galeria"
                ? "bg-[#8d7966] text-white shadow-xs"
                : "bg-white text-[#4a3f35] border border-[#d8c8b8] hover:bg-[#e2ddd9]"
            }`}
          >
            Galeria ({items.length})
          </button>

          <button
            onClick={() => setActiveTab("categorias")}
            className={`px-4 sm:px-5 py-2.5 rounded-md text-xs font-semibold uppercase tracking-wider transition-all flex items-center space-x-1.5 ${
              activeTab === "categorias"
                ? "bg-[#8d7966] text-white shadow-xs"
                : "bg-white text-[#4a3f35] border border-[#d8c8b8] hover:bg-[#e2ddd9]"
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>Categorias ({categories.length})</span>
          </button>

          <button
            onClick={() => setActiveTab("novo")}
            className={`px-4 sm:px-5 py-2.5 rounded-md text-xs font-semibold uppercase tracking-wider transition-all flex items-center space-x-1.5 ${
              activeTab === "novo"
                ? "bg-[#8d7966] text-white shadow-xs"
                : "bg-white text-[#4a3f35] border border-[#d8c8b8] hover:bg-[#e2ddd9]"
            }`}
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Adicionar Foto</span>
          </button>
        </div>

        {activeTab === "categorias" && (
          <button
            onClick={handleOpenAddCategory}
            className="px-4 py-2 bg-[#231e1a] hover:bg-[#8d7966] text-white text-xs font-semibold uppercase tracking-wider rounded-md flex items-center space-x-2 transition-all shadow-xs"
          >
            <Plus className="w-4 h-4" />
            <span>Nova Categoria</span>
          </button>
        )}
      </div>

      {/* TAB 1: GALERIA LIST */}
      {activeTab === "galeria" && (
        <div className="space-y-6">
          {/* Filters Bar */}
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-between bg-white p-3.5 sm:p-4 rounded-[8px] border border-[#d8c8b8]">
            <div className="relative flex-1 max-w-md">
              <Search className="w-4 h-4 absolute left-3.5 top-3 text-[#a8a39d]" />
              <input
                type="text"
                placeholder="Buscar por título ou descrição..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 text-xs rounded-md bg-[#f8f1e9] border border-[#d8c8b8] focus:outline-none focus:border-[#8d7966]"
              />
            </div>

            <div className="flex items-center space-x-2">
              <span className="text-xs font-mono text-[#4a3f35] shrink-0">Categoria:</span>
              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="px-3 py-2 text-xs rounded-md bg-[#f8f1e9] border border-[#d8c8b8] text-[#231e1a] focus:outline-none focus:border-[#8d7966] w-full sm:w-auto"
              >
                <option value="todos">Todas as Categorias</option>
                {categories.map((c) => (
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
                  <div className="pt-3 border-t border-[#e2ddd9] flex items-center justify-between gap-2">
                    <button
                      onClick={() => handleToggleHero(item)}
                      className={`px-3 py-1.5 rounded text-[11px] font-semibold uppercase tracking-wider transition-colors flex items-center space-x-1.5 ${
                        item.isHeroFeatured
                          ? "bg-[#8d7966]/15 text-[#8d7966] hover:bg-[#8d7966]/25"
                          : "bg-[#e2ddd9] text-[#4a3f35] hover:bg-[#d8c8b8]"
                      }`}
                    >
                      <Star className={`w-3.5 h-3.5 ${item.isHeroFeatured ? "fill-[#8d7966]" : ""}`} />
                      <span>{item.isHeroFeatured ? "No Carrossel" : "+ Carrossel"}</span>
                    </button>

                    <div className="flex items-center space-x-1">
                      <button
                        onClick={() => handleOpenEditItem(item)}
                        className="p-2 text-[#4a3f35] hover:text-[#8d7966] hover:bg-[#e2ddd9]/50 rounded-md transition-colors"
                        title="Editar categoria ou informações da peça"
                      >
                        <Edit2 className="w-4 h-4" />
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
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 2: CATEGORIAS MANAGEMENT */}
      {activeTab === "categorias" && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-4 sm:p-6 rounded-[10px] border border-[#d8c8b8]">
            <div>
              <h3 className="font-serif text-xl font-medium text-[#231e1a]">
                Gestão de Categorias do Catálogo
              </h3>
              <p className="text-xs text-[#4a3f35]/80 font-light mt-1">
                Crie novas seções para organizar os trabalhos, edite nomes e ícones ou altere as existentes.
              </p>
            </div>

            <button
              onClick={handleOpenAddCategory}
              className="px-5 py-2.5 bg-[#8d7966] hover:bg-[#786655] text-white text-xs font-semibold uppercase tracking-wider rounded-md flex items-center justify-center space-x-2 transition-all shadow-xs shrink-0"
            >
              <Plus className="w-4 h-4" />
              <span>Adicionar Categoria</span>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {categories.map((cat) => {
              const countItems = items.filter((i) => i.category === cat.id).length;

              return (
                <div
                  key={cat.id}
                  className="bg-white rounded-[10px] p-6 border border-[#d8c8b8] editorial-shadow flex flex-col justify-between space-y-4"
                >
                  <div className="space-y-3">
                    <div className="flex items-start justify-between">
                      <div className="w-10 h-10 rounded-md bg-[#e2ddd9] text-[#8d7966] flex items-center justify-center">
                        <CategoryIcon iconName={cat.icon} className="w-5 h-5" />
                      </div>
                      <span className="text-[9px] font-mono uppercase tracking-wider px-2.5 py-1 rounded-full bg-[#e2ddd9]/70 text-[#4a3f35] border border-[#d8c8b8]/50">
                        {cat.tag || "Categoria"}
                      </span>
                    </div>

                    <div>
                      <h4 className="font-serif text-lg font-medium text-[#231e1a]">{cat.label}</h4>
                      <p className="text-xs text-[#4a3f35]/80 font-light mt-1 line-clamp-2">
                        {cat.description || "Sem descrição definida."}
                      </p>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-[#e2ddd9] flex items-center justify-between">
                    <span className="text-[11px] font-mono text-[#8d7966] font-semibold">
                      {countItems} {countItems === 1 ? "peça cadastrada" : "peças cadastradas"}
                    </span>

                    <div className="flex items-center space-x-1">
                      <button
                        onClick={() => handleOpenEditCategory(cat)}
                        className="p-2 text-[#4a3f35] hover:text-[#8d7966] hover:bg-[#e2ddd9]/50 rounded-md transition-colors"
                        title="Editar Categoria"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>

                      <button
                        onClick={() => setCategoryToDelete(cat)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-md transition-colors"
                        title="Excluir Categoria"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* TAB 3: NOVO ITEM FORM */}
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
                      <p className="text-[11px] text-[#a8a39d]">JPG, PNG ou WEBP (Upload direto para nuvem)</p>
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
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-md bg-[#f8f1e9] border border-[#d8c8b8] text-xs text-[#231e1a] focus:outline-none focus:border-[#8d7966]"
                >
                  {categories.map((c) => (
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

      {/* MODAL: EDIT ITEM (Change Category & Details) */}
      {itemToEdit && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#231e1a]/70 backdrop-blur-xs">
          <div className="bg-white rounded-[12px] p-6 sm:p-8 max-w-lg w-full border border-[#d8c8b8] shadow-2xl space-y-5 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-[#e2ddd9] pb-3">
              <h3 className="font-serif text-xl font-medium text-[#231e1a]">
                Editar Peça do Catálogo
              </h3>
              <button
                onClick={() => setItemToEdit(null)}
                className="p-1 text-[#a8a39d] hover:text-[#231e1a]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveItemEdit} className="space-y-4">
              <div className="space-y-1">
                <label className="block text-[11px] font-mono uppercase tracking-wider text-[#4a3f35]">
                  Título da Peça *
                </label>
                <input
                  type="text"
                  required
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                  className="w-full px-3 py-2 rounded-md bg-[#f8f1e9] border border-[#d8c8b8] text-xs"
                />
              </div>

              <div className="space-y-1">
                <label className="block text-[11px] font-mono uppercase tracking-wider text-[#4a3f35]">
                  Categoria da Peça *
                </label>
                <select
                  value={editCategory}
                  onChange={(e) => setEditCategory(e.target.value)}
                  className="w-full px-3 py-2 rounded-md bg-[#f8f1e9] border border-[#d8c8b8] text-xs font-medium"
                >
                  {categories.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.label}
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-1">
                <label className="block text-[11px] font-mono uppercase tracking-wider text-[#4a3f35]">
                  Descrição
                </label>
                <textarea
                  rows={2}
                  value={editShortDescription}
                  onChange={(e) => setEditShortDescription(e.target.value)}
                  className="w-full px-3 py-2 rounded-md bg-[#f8f1e9] border border-[#d8c8b8] text-xs"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="block text-[10px] font-mono text-[#4a3f35]">Tecido</label>
                  <input
                    type="text"
                    value={editTecido}
                    onChange={(e) => setEditTecido(e.target.value)}
                    className="w-full px-2.5 py-1.5 rounded-md bg-[#f8f1e9] border border-[#d8c8b8] text-xs"
                  />
                </div>
                <div className="space-y-1">
                  <label className="block text-[10px] font-mono text-[#4a3f35]">Acabamento</label>
                  <input
                    type="text"
                    value={editAcabamento}
                    onChange={(e) => setEditAcabamento(e.target.value)}
                    className="w-full px-2.5 py-1.5 rounded-md bg-[#f8f1e9] border border-[#d8c8b8] text-xs"
                  />
                </div>
              </div>

              <div className="p-3 bg-[#e2ddd9]/50 rounded-md border border-[#d8c8b8] flex items-center justify-between">
                <span className="text-xs font-serif text-[#231e1a]">Exibir no Carrossel da Home?</span>
                <button
                  type="button"
                  onClick={() => setEditIsHero(!editIsHero)}
                  className={`relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full transition-colors ${
                    editIsHero ? "bg-[#8d7966]" : "bg-[#d8c8b8]"
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white shadow mt-0.5 ml-0.5 transition ${
                      editIsHero ? "translate-x-4" : "translate-x-0"
                    }`}
                  />
                </button>
              </div>

              <div className="pt-3 flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setItemToEdit(null)}
                  className="px-4 py-2 border border-[#d8c8b8] text-xs font-semibold rounded-md"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={savingEditItem}
                  className="px-5 py-2 bg-[#8d7966] hover:bg-[#786655] text-white text-xs font-semibold uppercase tracking-wider rounded-md disabled:opacity-50"
                >
                  {savingEditItem ? "Salvando..." : "Salvar Alterações"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: ADD / EDIT CATEGORY */}
      {categoryModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#231e1a]/70 backdrop-blur-xs">
          <div className="bg-white rounded-[12px] p-6 sm:p-8 max-w-lg w-full border border-[#d8c8b8] shadow-2xl space-y-5 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-[#e2ddd9] pb-3">
              <h3 className="font-serif text-xl font-medium text-[#231e1a]">
                {editingCategory ? "Editar Categoria" : "Nova Categoria"}
              </h3>
              <button
                onClick={() => setCategoryModalOpen(false)}
                className="p-1 text-[#a8a39d] hover:text-[#231e1a]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveCategory} className="space-y-4">
              <div className="space-y-1">
                <label className="block text-[11px] font-mono uppercase tracking-wider text-[#4a3f35]">
                  Nome da Categoria *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Ex: Jogos de Banho & Lavabo"
                  value={categoryLabel}
                  onChange={(e) => setCategoryLabel(e.target.value)}
                  className="w-full px-3 py-2 rounded-md bg-[#f8f1e9] border border-[#d8c8b8] text-xs text-[#231e1a] focus:outline-none focus:border-[#8d7966]"
                />
              </div>

              <div className="space-y-1">
                <label className="block text-[11px] font-mono uppercase tracking-wider text-[#4a3f35]">
                  Etiqueta / Tag de Destaque
                </label>
                <input
                  type="text"
                  placeholder="Ex: Luxo & Bodas, Algodão Nobre, Presente"
                  value={categoryTag}
                  onChange={(e) => setCategoryTag(e.target.value)}
                  className="w-full px-3 py-2 rounded-md bg-[#f8f1e9] border border-[#d8c8b8] text-xs text-[#231e1a]"
                />
              </div>

              <div className="space-y-1">
                <label className="block text-[11px] font-mono uppercase tracking-wider text-[#4a3f35]">
                  Descrição Breve da Categoria
                </label>
                <textarea
                  rows={2}
                  placeholder="Ex: Toalhas de banho aveludadas bordadas com monogramas e rendas finas."
                  value={categoryDesc}
                  onChange={(e) => setCategoryDesc(e.target.value)}
                  className="w-full px-3 py-2 rounded-md bg-[#f8f1e9] border border-[#d8c8b8] text-xs text-[#231e1a]"
                />
              </div>

              {/* Icon Selector Grid */}
              <div className="space-y-2">
                <label className="block text-[11px] font-mono uppercase tracking-wider text-[#4a3f35]">
                  Ícone da Categoria
                </label>
                <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                  {AVAILABLE_CATEGORY_ICONS.map((ico) => {
                    const isSelected = categoryIcon === ico.id;
                    const IconComp = ico.icon;

                    return (
                      <button
                        type="button"
                        key={ico.id}
                        onClick={() => setCategoryIcon(ico.id)}
                        className={`p-2 rounded-md border flex flex-col items-center space-y-1 text-center transition-all ${
                          isSelected
                            ? "bg-[#8d7966] text-white border-[#8d7966] shadow-xs"
                            : "bg-[#f8f1e9] text-[#4a3f35] border-[#d8c8b8] hover:bg-white"
                        }`}
                      >
                        <IconComp className="w-4 h-4" />
                        <span className="text-[9px] truncate max-w-full">{ico.id}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="pt-3 flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setCategoryModalOpen(false)}
                  className="px-4 py-2 border border-[#d8c8b8] text-xs font-semibold rounded-md"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={savingCategory}
                  className="px-5 py-2 bg-[#8d7966] hover:bg-[#786655] text-white text-xs font-semibold uppercase tracking-wider rounded-md disabled:opacity-50"
                >
                  {savingCategory ? "Salvando..." : "Salvar Categoria"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: DELETE CATEGORY CONFIRMATION */}
      {categoryToDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#231e1a]/70 backdrop-blur-xs">
          <div className="bg-white rounded-[10px] p-6 max-w-sm w-full border border-[#d8c8b8] shadow-2xl space-y-4">
            <div className="flex items-center space-x-2 text-red-600">
              <AlertCircle className="w-5 h-5" />
              <h3 className="font-serif text-lg font-medium text-[#231e1a]">
                Excluir Categoria
              </h3>
            </div>
            <p className="text-xs text-[#4a3f35] leading-relaxed">
              Deseja realmente excluir a categoria <strong>"{categoryToDelete.label}"</strong>?
            </p>
            <div className="pt-3 flex justify-end space-x-2">
              <button
                onClick={() => setCategoryToDelete(null)}
                className="px-4 py-2 border border-[#d8c8b8] text-xs font-semibold rounded-md"
              >
                Cancelar
              </button>
              <button
                onClick={handleDeleteCategory}
                disabled={deletingCategory}
                className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-xs font-semibold rounded-md transition-colors"
              >
                {deletingCategory ? "Excluindo..." : "Sim, Excluir"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL: DELETE ITEM CONFIRMATION */}
      {itemToDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#231e1a]/70 backdrop-blur-xs">
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
                disabled={deletingItem}
                className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-xs font-semibold rounded-md transition-colors"
              >
                {deletingItem ? "Excluindo..." : "Sim, Excluir"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
