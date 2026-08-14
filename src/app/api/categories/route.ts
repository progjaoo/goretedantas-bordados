import { addCategory, getCategoriesAsync } from "@/data/categoriesStore";
import { isAuthenticated } from "@/lib/auth";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  try {
    const categories = await getCategoriesAsync();
    return NextResponse.json({ categories });
  } catch (err) {
    console.error("Error fetching categories:", err);
    return NextResponse.json({ error: "Erro ao buscar categorias" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const authed = await isAuthenticated();
    if (!authed) {
      return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
    }

    const body = await req.json();
    if (!body.label) {
      return NextResponse.json({ error: "O nome da categoria é obrigatório" }, { status: 400 });
    }

    const newCategory = await addCategory({
      label: body.label.trim(),
      tag: body.tag?.trim() || "Personalizado",
      description: body.description?.trim() || "",
      icon: body.icon || "Sparkles",
    });

    return NextResponse.json({ success: true, category: newCategory }, { status: 201 });
  } catch (err) {
    console.error("Error creating category:", err);
    return NextResponse.json({ error: "Erro ao criar categoria" }, { status: 500 });
  }
}
