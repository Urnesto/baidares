import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { contact } from "@/mocks";

const resend = new Resend(process.env.RESENT_API_KEY);

export async function POST(req: NextRequest) {
  const { phone, email, route, boat, people, date } = await req.json();

  if (!phone) {
    return NextResponse.json({ error: "Phone is required" }, { status: 400 });
  }

  const { error } = await resend.emails.send({
    from: "Rezervacijos <onboarding@resend.dev>",
    to: "ernest20145@gmail.com",
    subject: `Nauja rezervacija ${route ?? "maršrutas nepasirinktas"}, ${date ?? "data nepasirinkta"}`,
    html: `
      <h2>Nauja rezervacija</h2>
      <table cellpadding="8" style="border-collapse:collapse;font-family:sans-serif;font-size:15px">
        <tr><td><strong>Telefonas</strong></td><td>${phone}</td></tr>
        ${email ? `<tr><td><strong>El. paštas</strong></td><td>${email}</td></tr>` : ""}
        ${route  ? `<tr><td><strong>Maršrutas</strong></td><td>${route}</td></tr>` : ""}
        ${boat   ? `<tr><td><strong>Paslauga</strong></td><td>${boat}</td></tr>` : ""}
        ${people ? `<tr><td><strong>Žmonių skaicius</strong></td><td>${people}</td></tr>` : ""}
        ${date   ? `<tr><td><strong>Data</strong></td><td>${date}</td></tr>` : ""}
      </table>
    `,
  });

  if (error) {
    console.error("Resend error:", JSON.stringify(error));
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
