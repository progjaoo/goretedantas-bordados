import { getCategoriesAsync } from "@/data/categoriesStore";
import { addPortfolioItem, getPortfolioItemsAsync } from "@/data/portfolioStore";
import { isAuthenticated } from "@/lib/auth";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const category = searchParams.get("category");
    const heroOnly = searchParams.get("hero") === "true";

    let items = await getPortfolioItemsAsync();

    if (category && category !== "todos") {
      items = items.filter((i) => i.category === category);
    }

    if (heroOnly) {
      items = items.filter((i) => i.isHeroFeatured);
    }

    return NextResponse.json({ items });
  } catch (err) {
    console.error("Error fetching portfolio:", err);
    return NextResponse.json({ error: "Erro ao buscar itens do portfólio" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const authed = await isAuthenticated();
    if (!authed) {
      return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
    }

    const body = await req.json();
    if (!body.title || !body.image || !body.category) {
      return NextResponse.json({ error: "Título, categoria e imagem são obrigatórios" }, { status: 400 });
    }

    let categoryLabel = body.categoryLabel;
    if (!categoryLabel) {
      const categories = await getCategoriesAsync();
      const found = categories.find((c) => c.id === body.category);
      categoryLabel = found?.label || "Bordado Personalizado";
    }

    const newItem = await addPortfolioItem({
      title: body.title,
      category: body.category,
      categoryLabel,
      shortDescription: body.shortDescription || "Peça personalizada bordada com acabamento fino.",
      fullDescription: body.fullDescription || body.shortDescription || "",
      image: body.image,
      isHeroFeatured: Boolean(body.isHeroFeatured),
      featuredOrder: body.featuredOrder || 99,
      protocolNumber: body.protocolNumber || "01. PROTOCOLO PERSONALIZADO",
      specifications: body.specifications || {
        tecido: "100% Algodão Premium",
        linha: "Poliéster Trilobal de Alto Brilho",
        acabamento: "Acabamento Artesanal Fino",
        personalizacao: "Personalização sob medida",
      },
      tags: body.tags || [body.category],
    });

    return NextResponse.json({ success: true, item: newItem }, { status: 201 });
  } catch (err) {
    console.error("Error adding portfolio item:", err);
    return NextResponse.json({ error: "Erro ao criar item" }, { status: 500 });
  }
}
