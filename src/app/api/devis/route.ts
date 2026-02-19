import { NextRequest, NextResponse } from "next/server";

/* ============================================
   POST /api/devis
   Receives the quote form data, builds a WhatsApp
   message, and returns it so the client can open wa.me.

   Future: add email via Resend/Nodemailer,
   WhatsApp Business Cloud API, CRM webhook, etc.
   ============================================ */

const WHATSAPP_NUMBER = "33676765511";

interface QuotePayload {
  serviceType: "aviation" | "yacht";
  // Aviation
  type?: string;
  departure?: string;
  destination?: string;
  date?: string;
  returnDate?: string;
  passengers?: string;
  flexibility?: boolean;
  category?: string;
  catering?: string;
  pets?: boolean;
  specialLuggage?: boolean;
  transfer?: string;
  specialNeeds?: string;
  // Yacht
  navigationZone?: string;
  embarkationDate?: string;
  disembarkationDate?: string;
  numberOfGuests?: string;
  durationDays?: string;
  yachtCategory?: string;
  desiredCabins?: string;
  crew?: string;
  waterActivities?: string[];
  yachtCatering?: string;
  yachtSpecialNeeds?: string;
  // Contact
  lastName?: string;
  firstName?: string;
  email?: string;
  phone?: string;
  company?: string;
  source?: string;
}

function buildWhatsAppMessage(data: QuotePayload): string {
  const ref = `SKY-${Date.now().toString().slice(-6)}`;
  const lines: string[] = [];

  lines.push(`*NEW QUOTE REQUEST*`);
  lines.push(`Ref: #${ref}`);
  lines.push(`${new Date().toLocaleString("en-US", { timeZone: "Europe/Paris" })}`);
  lines.push("");

  if (data.serviceType === "yacht") {
    lines.push("*YACHT CHARTER*");
    lines.push("");
    if (data.navigationZone) lines.push(`Zone: ${data.navigationZone}`);
    if (data.embarkationDate) lines.push(`Embarkation: ${data.embarkationDate}`);
    if (data.disembarkationDate) lines.push(`Disembarkation: ${data.disembarkationDate}`);
    if (data.numberOfGuests) lines.push(`Guests: ${data.numberOfGuests}`);
    if (data.durationDays) lines.push(`Duration: ${data.durationDays} days`);
    if (data.yachtCategory) lines.push(`Category: ${data.yachtCategory}`);
    if (data.crew) lines.push(`Crew: ${data.crew}`);
    if (data.waterActivities && data.waterActivities.length > 0) {
      lines.push(`Activities: ${data.waterActivities.join(", ")}`);
    }
    if (data.yachtCatering && data.yachtCatering !== "without") lines.push(`Catering: ${data.yachtCatering}`);
    if (data.yachtSpecialNeeds) lines.push(`Notes: ${data.yachtSpecialNeeds}`);
  } else {
    lines.push("*PRIVATE AVIATION*");
    lines.push("");
    if (data.type) lines.push(`Type: ${data.type}`);
    if (data.departure || data.destination) lines.push(`Route: ${data.departure || "—"} → ${data.destination || "—"}`);
    if (data.date) {
      if (data.type === "round-trip" && data.returnDate) {
        lines.push(`Dates: ${data.date} → ${data.returnDate}`);
      } else {
        lines.push(`Date: ${data.date}`);
      }
    }
    if (data.passengers) lines.push(`Passengers: ${data.passengers}`);
    if (data.flexibility) lines.push(`Flexible dates: Yes`);
    if (data.category) lines.push(`Category: ${data.category}`);
    if (data.catering && data.catering !== "none") lines.push(`Catering: ${data.catering}`);
    if (data.pets) lines.push(`Pets: Yes`);
    if (data.specialLuggage) lines.push(`Special luggage: Yes`);
    if (data.transfer && data.transfer !== "none") lines.push(`Transfer: ${data.transfer}`);
    if (data.specialNeeds) lines.push(`Notes: ${data.specialNeeds}`);
  }

  lines.push("");
  lines.push("*CONTACT*");
  const fullName = `${data.firstName || ""} ${data.lastName || ""}`.trim();
  if (fullName) lines.push(`Name: ${fullName}`);
  if (data.email) lines.push(`Email: ${data.email}`);
  if (data.phone) lines.push(`Phone: ${data.phone}`);
  if (data.company) lines.push(`Company: ${data.company}`);
  if (data.source) lines.push(`Source: ${data.source}`);

  return lines.join("\n");
}

export async function POST(request: NextRequest) {
  try {
    const data: QuotePayload = await request.json();

    // Build WhatsApp message
    const message = buildWhatsAppMessage(data);
    const ref = `SKY-${Date.now().toString().slice(-6)}`;

    // Build wa.me URL
    const waUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;

    // ── Future integrations ──
    // 1. Email notification via Resend/Nodemailer
    // 2. WhatsApp Business Cloud API (auto-send without user click)
    // 3. CRM webhook (HubSpot, Salesforce, etc.)
    // 4. Database storage (Supabase, Prisma, etc.)

    return NextResponse.json({
      success: true,
      ref,
      waUrl,
      message,
    });
  } catch (error) {
    console.error("Quote API error:", error);
    return NextResponse.json(
      { success: false, error: "Error processing the request" },
      { status: 500 }
    );
  }
}
