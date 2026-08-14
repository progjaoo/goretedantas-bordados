import { deleteCategory, updateCategory } from "@/data/categoriesStore";
import { getPortfolioItemsAsync } from "@/data/portfolioStore";
import { isAuthenticated } from "@/lib/auth";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const authed = await isAuthenticated();
    if (!authed) {
      return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
    }

    const { id } = await params;
    const body = await req.json();

    const updated = await updateCategory(id, {
      label: body.label?.trim(),
      tag: body.tag?.trim(),
      description: body.description?.trim(),
      icon: body.icon,
      order: body.order,
    });

    if (!updated) {
      return NextResponse.json({ error: "Categoria não encontrada" }, { status: 404 });
    }

    return NextResponse.json({ success: true, category: updated });
  } catch (err) {
    console.error("Error updating category:", err);
    return NextResponse.json({ error: "Erro ao atualizar categoria" }, { status: 500 });
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const authed = await isAuthenticated();
    if (!authed) {
      return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
    }

    const { id } = await params;

    // Check if there are active items in this category
    const items = await getPortfolioItemsAsync();
    const countInCat = items.filter((i) => i.category === id).length;
    if (countInCat > 0) {
      return NextResponse.json(
        {
          error: `Não é possível excluir esta categoria porque existem ${countInCat} foto(s) associadas a ela. Mude a categoria das fotos antes de excluir.`,
          count: countInCat,
        },
        { status: 400 }
      );
    }

    const deleted = await deleteCategory(id);
    if (!deleted) {
      return NextResponse.json({ error: "Categoria não encontrada" }, { status: 404 });
    }

    return NextResponse.json({ success: true, message: "Categoria excluída com sucesso" });
  } catch (err) {
    console.error("Error deleting category:", err);
    return NextResponse.json({ error: "Erro ao excluir categoria" }, { status: 500 });
  }
}
