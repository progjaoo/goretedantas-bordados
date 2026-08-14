import { getCategoriesAsync } from "@/data/categoriesStore";
import { deletePortfolioItem, updatePortfolioItem } from "@/data/portfolioStore";
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

    if (body.category && !body.categoryLabel) {
      const categories = await getCategoriesAsync();
      const found = categories.find((c) => c.id === body.category);
      if (found) {
        body.categoryLabel = found.label;
      }
    }

    const updated = await updatePortfolioItem(id, body);
    if (!updated) {
      return NextResponse.json({ error: "Item não encontrado" }, { status: 404 });
    }

    return NextResponse.json({ success: true, item: updated });
  } catch (err) {
    console.error("Error updating portfolio item:", err);
    return NextResponse.json({ error: "Erro ao atualizar item" }, { status: 500 });
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
    const deleted = await deletePortfolioItem(id);

    if (!deleted) {
      return NextResponse.json({ error: "Item não encontrado para exclusão" }, { status: 404 });
    }

    return NextResponse.json({ success: true, message: "Item excluído com sucesso" });
  } catch (err) {
    console.error("Error deleting portfolio item:", err);
    return NextResponse.json({ error: "Erro ao excluir item" }, { status: 500 });
  }
}
