import { createSession, destroySession, isAuthenticated, verifyCredentials } from "@/lib/auth";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { username, password } = await req.json();

    if (!username || !password) {
      return NextResponse.json({ error: "Informe usuário e senha" }, { status: 400 });
    }

    const isValid = await verifyCredentials(username, password);
    if (!isValid) {
      return NextResponse.json({ error: "Usuário ou senha incorretos" }, { status: 401 });
    }

    await createSession();
    return NextResponse.json({ success: true, message: "Login realizado com sucesso" });
  } catch (err) {
    console.error("Auth POST error:", err);
    return NextResponse.json({ error: "Erro interno no servidor" }, { status: 500 });
  }
}

export async function DELETE() {
  try {
    await destroySession();
    return NextResponse.json({ success: true, message: "Logout realizado com sucesso" });
  } catch (err) {
    console.error("Auth DELETE error:", err);
    return NextResponse.json({ error: "Erro ao deslogar" }, { status: 500 });
  }
}

export async function GET() {
  try {
    const authenticated = await isAuthenticated();
    return NextResponse.json({ authenticated });
  } catch (err) {
    return NextResponse.json({ authenticated: false });
  }
}
