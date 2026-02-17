import { NextRequest, NextResponse } from "next/server";

/* ============================================
   POST /api/devis
   Receives the quote form data, builds a WhatsApp
   message, and returns it so the client can open wa.me.

   Future: add email via Resend/Nodemailer,
   WhatsApp Business Cloud API, CRM webhook, etc.
   ============================================ */

const WHATSAPP_NUMBER = "33676765511";

interface DevisPayload {
  serviceType: "aviation" | "yacht";
  // Aviation
  type?: string;
  depart?: string;
  destination?: string;
  date?: string;
  dateRetour?: string;
  passagers?: string;
  flexibilite?: boolean;
  categorie?: string;
  catering?: string;
  animaux?: boolean;
  bagagesSpeciaux?: boolean;
  transfert?: string;
  besoins?: string;
  // Yacht
  zoneNavigation?: string;
  dateEmbarquement?: string;
  dateDebarquement?: string;
  nombreInvites?: string;
  dureeJours?: string;
  categorieYacht?: string;
  cabinesSouhaitees?: string;
  equipage?: string;
  activitesNautiques?: string[];
  cateringYacht?: string;
  besoinsYacht?: string;
  // Contact
  nom?: string;
  prenom?: string;
  email?: string;
  telephone?: string;
  entreprise?: string;
  source?: string;
}

function buildWhatsAppMessage(data: DevisPayload): string {
  const ref = `SKY-${Date.now().toString().slice(-6)}`;
  const lines: string[] = [];

  lines.push(`🔔 *NOUVELLE DEMANDE DE DEVIS*`);
  lines.push(`📋 Réf: #${ref}`);
  lines.push(`⏰ ${new Date().toLocaleString("fr-FR", { timeZone: "Europe/Paris" })}`);
  lines.push("");

  if (data.serviceType === "yacht") {
    lines.push("🛥️ *CHARTER NAUTIQUE*");
    lines.push("");
    if (data.zoneNavigation) lines.push(`📍 Zone: ${data.zoneNavigation}`);
    if (data.dateEmbarquement) lines.push(`📅 Embarquement: ${data.dateEmbarquement}`);
    if (data.dateDebarquement) lines.push(`📅 Débarquement: ${data.dateDebarquement}`);
    if (data.nombreInvites) lines.push(`👥 Invités: ${data.nombreInvites}`);
    if (data.dureeJours) lines.push(`⏱️ Durée: ${data.dureeJours} jours`);
    if (data.categorieYacht) lines.push(`🚢 Catégorie: ${data.categorieYacht}`);
    if (data.equipage) lines.push(`👨‍✈️ Équipage: ${data.equipage}`);
    if (data.activitesNautiques && data.activitesNautiques.length > 0) {
      lines.push(`🏄 Activités: ${data.activitesNautiques.join(", ")}`);
    }
    if (data.cateringYacht && data.cateringYacht !== "sans") lines.push(`🍽️ Catering: ${data.cateringYacht}`);
    if (data.besoinsYacht) lines.push(`📝 Notes: ${data.besoinsYacht}`);
  } else {
    lines.push("✈️ *AVIATION PRIVÉE*");
    lines.push("");
    if (data.type) lines.push(`🔄 Type: ${data.type}`);
    if (data.depart || data.destination) lines.push(`📍 Trajet: ${data.depart || "—"} → ${data.destination || "—"}`);
    if (data.date) {
      if (data.type === "aller-retour" && data.dateRetour) {
        lines.push(`📅 Dates: ${data.date} → ${data.dateRetour}`);
      } else {
        lines.push(`📅 Date: ${data.date}`);
      }
    }
    if (data.passagers) lines.push(`👥 Passagers: ${data.passagers}`);
    if (data.flexibilite) lines.push(`📆 Dates flexibles: Oui`);
    if (data.categorie) lines.push(`🛩️ Catégorie: ${data.categorie}`);
    if (data.catering && data.catering !== "aucun") lines.push(`🍽️ Catering: ${data.catering}`);
    if (data.animaux) lines.push(`🐾 Animaux: Oui`);
    if (data.bagagesSpeciaux) lines.push(`🧳 Bagages spéciaux: Oui`);
    if (data.transfert && data.transfert !== "aucun") lines.push(`🚗 Transfert: ${data.transfert}`);
    if (data.besoins) lines.push(`📝 Notes: ${data.besoins}`);
  }

  lines.push("");
  lines.push("👤 *CONTACT*");
  const fullName = `${data.prenom || ""} ${data.nom || ""}`.trim();
  if (fullName) lines.push(`Nom: ${fullName}`);
  if (data.email) lines.push(`Email: ${data.email}`);
  if (data.telephone) lines.push(`Tél: ${data.telephone}`);
  if (data.entreprise) lines.push(`Entreprise: ${data.entreprise}`);
  if (data.source) lines.push(`Source: ${data.source}`);

  return lines.join("\n");
}

export async function POST(request: NextRequest) {
  try {
    const data: DevisPayload = await request.json();

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
    console.error("Devis API error:", error);
    return NextResponse.json(
      { success: false, error: "Erreur lors du traitement de la demande" },
      { status: 500 }
    );
  }
}
