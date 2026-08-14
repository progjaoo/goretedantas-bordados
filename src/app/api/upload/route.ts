import { isAuthenticated } from "@/lib/auth";
import { handleUpload, type HandleUploadBody } from "@vercel/blob/client";
import { put } from "@vercel/blob";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest): Promise<NextResponse> {
  try {
    const authed = await isAuthenticated();
    if (!authed) {
      return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
    }

    const contentType = req.headers.get("content-type") || "";

    // 1. Client-side upload token generation for @vercel/blob/client (Direct Browser to Vercel Blob)
    if (contentType.includes("application/json")) {
      const body = (await req.json()) as HandleUploadBody;

      try {
        const jsonResponse = await handleUpload({
          body,
          request: req,
          onBeforeGenerateToken: async (pathname) => {
            return {
              allowedContentTypes: [
                "image/jpeg",
                "image/png",
                "image/webp",
                "image/gif",
                "image/heic",
              ],
              tokenPayload: JSON.stringify({
                uploadedAt: Date.now(),
              }),
            };
          },
          onUploadCompleted: async ({ blob }) => {
            console.log("Upload completed to Vercel Blob:", blob.url);
          },
        });

        return NextResponse.json(jsonResponse);
      } catch (err: any) {
        return NextResponse.json({ error: err.message }, { status: 400 });
      }
    }

    // 2. Server-side FormData upload fallback
    const formData = await req.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json({ error: "Nenhum arquivo enviado" }, { status: 400 });
    }

    if (process.env.BLOB_READ_WRITE_TOKEN) {
      const extension = file.name.split(".").pop() || "jpg";
      const cleanName = `${Date.now()}_upload.${extension}`;
      const blob = await put(`portfolio/${cleanName}`, file, {
        access: "public",
        addRandomSuffix: true,
      });

      return NextResponse.json({
        success: true,
        url: blob.url,
        fileName: cleanName,
        storage: "vercel-blob",
      });
    }

    return NextResponse.json({ error: "Storage Vercel Blob não configurado" }, { status: 500 });
  } catch (err: any) {
    console.error("Upload route error:", err);
    return NextResponse.json({ error: err.message || "Erro no upload" }, { status: 500 });
  }
}
