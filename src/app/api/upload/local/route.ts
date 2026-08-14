import { isAuthenticated } from "@/lib/auth";
import fs from "fs";
import { NextRequest, NextResponse } from "next/server";
import path from "path";

export async function POST(req: NextRequest) {
  try {
    const authed = await isAuthenticated();
    if (!authed) {
      return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
    }

    const formData = await req.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json({ error: "Nenhum arquivo enviado" }, { status: 400 });
    }

    const extension = path.extname(file.name) || ".jpg";
    const cleanBaseName = file.name.replace(/[^a-zA-Z0-9]/g, "_").slice(0, 20);
    const fileName = `${Date.now()}_${cleanBaseName}${extension}`;

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const uploadsDir = path.join(process.cwd(), "public/uploads");
    if (!fs.existsSync(uploadsDir)) {
      fs.mkdirSync(uploadsDir, { recursive: true });
    }

    const filePath = path.join(uploadsDir, fileName);
    fs.writeFileSync(filePath, buffer);

    const publicUrl = `/uploads/${fileName}`;

    return NextResponse.json({
      success: true,
      url: publicUrl,
      fileName,
      storage: "local",
    });
  } catch (err) {
    console.error("Local upload error:", err);
    return NextResponse.json({ error: "Erro ao salvar imagem localmente" }, { status: 500 });
  }
}
