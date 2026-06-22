import { NextResponse } from "next/server";
import { google } from "googleapis";
import { GOOGLE_SERVICE_ACCOUNT, GOOGLE_SHEET_ID as EMBEDDED_SHEET_ID } from "@/lib/googleCredentials";

/* ============================================================
   POST /api/lead — запись заявки с формы сайта в Google Sheets.
   Авторизация — сервисный аккаунт (env GOOGLE_SERVICE_ACCOUNT_KEY).
   Таблица — env GOOGLE_SHEET_ID. Пишет строку в первый лист.
   ============================================================ */

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type LeadBody = {
  name?: string;
  company?: string;
  email?: string;
  phone?: string;
  message?: string;
  source?: string;
};

export async function POST(req: Request) {
  let body: LeadBody;
  try {
    body = (await req.json()) as LeadBody;
  } catch {
    return NextResponse.json({ ok: false, error: "bad_request" }, { status: 400 });
  }

  const name = (body.name ?? "").trim();
  const email = (body.email ?? "").trim();
  if (!name || !email) {
    return NextResponse.json({ ok: false, error: "name_and_email_required" }, { status: 400 });
  }

  // Приоритет — переменные окружения; если их нет, используем вшитые в репозиторий
  // значения (чтобы приложение работало сразу после переноса на сервер).
  const sheetId = process.env.GOOGLE_SHEET_ID || EMBEDDED_SHEET_ID;
  const credentials = process.env.GOOGLE_SERVICE_ACCOUNT_KEY
    ? JSON.parse(process.env.GOOGLE_SERVICE_ACCOUNT_KEY)
    : GOOGLE_SERVICE_ACCOUNT;

  try {
    const auth = new google.auth.GoogleAuth({
      credentials,
      scopes: ["https://www.googleapis.com/auth/spreadsheets"],
    });
    const sheets = google.sheets({ version: "v4", auth });

    // имя первого листа (может быть «Лист1»/«Sheet1» и т.п.)
    const meta = await sheets.spreadsheets.get({
      spreadsheetId: sheetId,
      fields: "sheets.properties.title",
    });
    const firstSheet = meta.data.sheets?.[0]?.properties?.title ?? "Sheet1";

    const now = new Date().toLocaleString("ru-RU", { timeZone: "Europe/Moscow" });

    await sheets.spreadsheets.values.append({
      spreadsheetId: sheetId,
      range: `${firstSheet}!A:G`,
      valueInputOption: "USER_ENTERED",
      insertDataOption: "INSERT_ROWS",
      requestBody: {
        values: [[
          now,
          name,
          body.company ?? "",
          email,
          body.phone ?? "",
          body.message ?? "",
          body.source ?? "",
        ]],
      },
    });

    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error("[lead] Sheets append failed:", e);
    return NextResponse.json({ ok: false, error: "append_failed" }, { status: 502 });
  }
}
