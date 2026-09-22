import { mkdir, readFile, writeFile } from "fs/promises";
import path from "path";
import { NextResponse } from "next/server";
import type { FeedbackEntry, NeedLevel } from "@/lib/feedback";

const FILE =
  process.env.VERCEL || process.env.AWS_LAMBDA_FUNCTION_NAME
    ? path.join("/tmp", "quietera-feedback.json")
    : path.join(process.cwd(), "data", "feedback.json");

async function load(): Promise<FeedbackEntry[]> {
  try {
    const raw = await readFile(FILE, "utf8");
    return JSON.parse(raw) as FeedbackEntry[];
  } catch {
    return [];
  }
}

async function save(rows: FeedbackEntry[]) {
  await mkdir(path.dirname(FILE), { recursive: true });
  await writeFile(FILE, JSON.stringify(rows, null, 2), "utf8");
}

export async function GET() {
  const rows = await load();
  return NextResponse.json({ entries: rows });
}

export async function POST(req: Request) {
  let body: Record<string, unknown>;
  try {
    body = (await req.json()) as Record<string, unknown>;
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const name = String(body.name ?? "").trim();
  const email = String(body.email ?? "").trim();
  const need = String(body.need ?? "") as NeedLevel;
  const problem = String(body.problem ?? "").trim();
  const nights = String(body.nights ?? "").trim();
  const message = String(body.message ?? "").trim();
  const sharePublic = Boolean(body.sharePublic);

  if (name.length < 2 || !email.includes("@")) {
    return NextResponse.json({ error: "Name and a valid email are required." }, { status: 400 });
  }
  if (!["yes", "maybe", "no"].includes(need)) {
    return NextResponse.json({ error: "Tell us if you need QuietEra." }, { status: 400 });
  }

  const entry: FeedbackEntry = {
    id: `FB-${Date.now()}`,
    createdAt: new Date().toISOString(),
    name,
    email,
    need,
    problem: problem || "unspecified",
    nights: nights || "unspecified",
    message,
    sharePublic,
  };

  const rows = await load();
  rows.unshift(entry);
  await save(rows.slice(0, 500));

  return NextResponse.json({ ok: true, id: entry.id });
}
