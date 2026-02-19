"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Button from "@/components/ui/Button";

const faqCategories = ["All", "Booking", "Pricing", "Aircraft", "Safety", "Services", "General"];

const faqs = [
  { cat: "Booking", q: "How do I book a private jet?", a: "You can request a quote through our online form, by phone at +33 6 76 76 55 11, or via WhatsApp. Our team will respond within 30 minutes with a personalized proposal including several aircraft and pricing options." },
  { cat: "Booking", q: "What is the minimum lead time for booking?", a: "We can arrange a flight in as little as 2 hours in case of emergency. For optimal service with aircraft selection and customized catering, we recommend 24 to 48 hours' notice." },
  { cat: "Booking", q: "Can I modify or cancel a booking?", a: "Cancellation terms vary depending on the type of booking and the notice period. As a general rule, cancellations made more than 48 hours before the flight are free of charge. Contact your dedicated advisor for details specific to your booking." },
  { cat: "Booking", q: "What documents are required for travel?", a: "As with any flight, you will need a valid ID or passport. For international flights outside the Schengen area, a valid passport is mandatory. We handle all customs formalities on your behalf." },
  { cat: "Booking", q: "Can I book a flight for someone else?", a: "Yes, you can book a flight for a third party. You will simply need to provide the passengers' identification details at the time of confirmation." },
  { cat: "Pricing", q: "How much does a private jet flight cost?", a: "The price varies depending on the distance, aircraft type, availability, and season. As a guide: Paris-Nice from 4,800\u20AC, Paris-London from 5,800\u20AC, Paris-Dubai from 28,000\u20AC. Request a precise quote for your route." },
  { cat: "Pricing", q: "What is included in the price?", a: "The price includes: the flight, crew, fuel, airport taxes, VIP terminal access, standard parking fees, and an onboard beverage service. Premium catering and ground transfers are available as options." },
  { cat: "Pricing", q: "Are there any hidden fees?", a: "No. At Skyseaker, transparency is a core value. Your quote details every cost item. No surcharge will be added without your prior approval." },
  { cat: "Pricing", q: "What is an empty leg and how can I take advantage of one?", a: "An empty leg is a repositioning flight offered at a reduced rate (up to -75%). Check our Empty Legs page for available offers or set up a personalized alert to be notified." },
  { cat: "Pricing", q: "Do you offer payment plans?", a: "Yes, we accept bank transfers and credit cards, and offer financing solutions for regular clients through our prepaid flight hours card program." },
  { cat: "Aircraft", q: "How many aircraft do you have access to?", a: "We have access to over 8,500 certified aircraft worldwide, covering every category: from very light jets to VIP airliners, including helicopters." },
  { cat: "Aircraft", q: "Can I choose my aircraft?", a: "Absolutely. We present several aircraft options suited to your route. You can visit our Fleet page to explore available aircraft and use our comparison tool." },
  { cat: "Aircraft", q: "Do the aircraft have Wi-Fi?", a: "Most midsize and larger category aircraft are equipped with Wi-Fi. For light jets, availability varies. Please specify this requirement when making your request." },
  { cat: "Aircraft", q: "What is the difference between jet categories?", a: "The categories differ in size, range, and comfort. A light jet is suitable for 2-3 hour flights (4-8 pax), a midsize for 4-5 hours (8-9 pax), and a heavy jet for intercontinental flights (10-16 pax)." },
  { cat: "Safety", q: "How do you ensure flight safety?", a: "We work exclusively with operators certified by civil aviation authorities (EASA, FAA). Each operator is regularly audited and meets the strictest industry standards." },
  { cat: "Safety", q: "Are the pilots qualified?", a: "All pilots have thousands of flight hours and hold the required type ratings for the aircraft they operate. Our partner operators follow rigorous ongoing training programs." },
  { cat: "Safety", q: "What happens in case of bad weather?", a: "Safety is our absolute priority. In the event of adverse weather conditions, the captain may decide to delay the flight or alter the route. We inform you immediately and offer alternatives." },
  { cat: "Services", q: "Do you offer a concierge service?", a: "Yes, our concierge service organizes every aspect of your trip: hotels, restaurants, transfers, events, and activities. A single point of contact to coordinate everything." },
  { cat: "Services", q: "Are pets allowed on board?", a: "Yes, the vast majority of aircraft welcome pets in the cabin, with no size restrictions or mandatory cages. This is one of the great advantages of private aviation." },
  { cat: "Services", q: "Do you offer cargo / freight flights?", a: "Yes, we offer an urgent air freight service for all types of goods. Pickup in under 2 hours, same-day delivery across Europe." },
  { cat: "General", q: "What is the difference between charter and private aviation?", a: "Charter involves renting an entire aircraft for your flight. It is the most common form of private aviation. Unlike scheduled flights, you set the schedule and the destination." },
  { cat: "General", q: "Do I need to arrive long before departure?", a: "No, this is one of the great advantages of private jets. Simply arrive at the VIP terminal 15 minutes before departure. No queues, no lengthy security checks." },
  { cat: "General", q: "Is smoking allowed on board?", a: "This depends on the operator and the aircraft. Some operators permit electronic cigarettes. Specify this requirement when making your request and we will find a suitable aircraft." },
  { cat: "General", q: "How does your loyalty program work?", a: "Our program offers 4 tiers (Silver, Gold, Platinum, Diamond) with increasing benefits: preferential rates, upgrades, priority access, and dedicated concierge service. Contact us to learn more about the requirements for each tier." },
  { cat: "General", q: "Do you offer carbon offsetting?", a: "Yes, we offer a carbon offset program for every flight. We partner with certified organizations to invest in environmental projects that offset CO2 emissions." },
];

export default function FAQPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [search, setSearch] = useState("");
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const filtered = faqs.filter((f) => {
    const matchCat = activeCategory === "All" || f.cat === activeCategory;
    const matchSearch = search === "" || f.q.toLowerCase().includes(search.toLowerCase()) || f.a.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <>
      {/* Hero */}
      <section
        className="relative flex items-center justify-center overflow-hidden"
        style={{ minHeight: "50vh", paddingTop: "128px", paddingBottom: "48px" }}
      >
        <div className="absolute inset-0" style={{ zIndex: 0 }}>
          <Image
            src="/images/fleet/global-7500/main.png"
            alt="Private aviation FAQ"
            fill
            priority
            style={{ objectFit: "cover", objectPosition: "center 30%" }}
          />
          <div
            className="absolute inset-0"
            style={{
              background: "linear-gradient(135deg, rgba(14,32,45,0.9) 0%, rgba(19,42,58,0.8) 40%, rgba(18,40,56,0.85) 60%, rgba(14,32,45,0.95) 100%)",
            }}
          />
        </div>
        <div
          className="absolute inset-0"
          style={{
            zIndex: 1,
            background: "linear-gradient(to top, rgba(14,32,45,0.9) 0%, rgba(14,32,45,0.3) 50%, rgba(14,32,45,0.6) 100%)",
          }}
        />
        <div className="relative text-center" style={{ zIndex: 10, padding: "0 5vw", maxWidth: "1400px", margin: "0 auto" }}>
          <p
            style={{
              fontSize: "12px",
              textTransform: "uppercase",
              letterSpacing: "0.3em",
              marginBottom: "16px",
              fontFamily: "var(--font-montserrat)",
              fontWeight: 500,
              color: "#F4DDC3",
            }}
          >
            FAQ
          </p>
          <h1
            style={{
              fontSize: "clamp(36px, 5vw, 56px)",
              marginBottom: "16px",
              fontFamily: "var(--font-playfair)",
              fontWeight: 700,
              color: "#FFFFFF",
              lineHeight: 1.1,
            }}
          >
            Frequently Asked Questions
          </h1>
          <p
            style={{
              fontSize: "clamp(18px, 2.5vw, 22px)",
              fontFamily: "var(--font-cormorant)",
              fontStyle: "italic",
              color: "#A0A0A0",
              maxWidth: "600px",
              margin: "0 auto",
            }}
          >
            Quickly find answers to your questions about private aviation
          </p>
        </div>
      </section>

      <section className="section-padding" style={{ background: "#0E202D" }}>
        <div style={{ maxWidth: "900px", margin: "0 auto", padding: "0 5vw" }}>
          {/* Search */}
          <div style={{ marginBottom: "32px" }}>
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search for a question..."
              style={{
                width: "100%",
                padding: "16px 24px",
                fontSize: "14px",
                background: "transparent",
                border: "1px solid #1A3448",
                color: "#FFFFFF",
                fontFamily: "var(--font-montserrat)",
                fontWeight: 300,
                outline: "none",
              }}
            />
          </div>

          {/* Category Tabs */}
          <div className="flex flex-wrap" style={{ gap: "8px", marginBottom: "48px" }}>
            {faqCategories.map((cat) => (
              <button
                key={cat}
                onClick={() => { setActiveCategory(cat); setOpenIndex(null); }}
                style={{
                  padding: "8px 16px",
                  fontSize: "11px",
                  textTransform: "uppercase",
                  letterSpacing: "0.15em",
                  border: "1px solid",
                  borderColor: activeCategory === cat ? "#F4DDC3" : "#1A3448",
                  color: activeCategory === cat ? "#F4DDC3" : "#6B6B6B",
                  background: activeCategory === cat ? "rgba(244,221,195,0.1)" : "transparent",
                  fontFamily: "var(--font-montserrat)",
                  fontWeight: 500,
                  cursor: "pointer",
                  transition: "all 300ms",
                }}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Questions */}
          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            {filtered.map((faq, i) => (
              <div key={i} style={{ border: "1px solid #1A3448", background: openIndex === i ? "#132A3A" : "transparent" }}>
                <button
                  onClick={() => setOpenIndex(openIndex === i ? null : i)}
                  style={{
                    width: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: "20px 24px",
                    textAlign: "left",
                    background: "transparent",
                    border: "none",
                    cursor: "pointer",
                  }}
                >
                  <span style={{ fontSize: "15px", color: "#FFFFFF", paddingRight: "16px", fontFamily: "var(--font-montserrat)", fontWeight: 400 }}>
                    {faq.q}
                  </span>
                  <motion.svg
                    animate={{ rotate: openIndex === i ? 180 : 0 }}
                    style={{ flexShrink: 0 }}
                    width="16" height="16" fill="none" stroke="#F4DDC3" strokeWidth="2" viewBox="0 0 24 24"
                  >
                    <path d="M19 9l-7 7-7-7" />
                  </motion.svg>
                </button>
                <AnimatePresence>
                  {openIndex === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      style={{ overflow: "hidden" }}
                    >
                      <div style={{ padding: "0 24px 20px 24px" }}>
                        <div style={{ height: "1px", marginBottom: "16px", background: "#1A3448" }} />
                        <p style={{ fontSize: "14px", color: "#A0A0A0", lineHeight: 1.7, fontFamily: "var(--font-montserrat)", fontWeight: 300 }}>
                          {faq.a}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>

          {filtered.length === 0 && (
            <p style={{ textAlign: "center", color: "#6B6B6B", padding: "48px 0", fontFamily: "var(--font-montserrat)", fontWeight: 300 }}>
              No questions match your search.
            </p>
          )}

          {/* CTA */}
          <div style={{ textAlign: "center", marginTop: "64px", padding: "40px", background: "#132A3A", border: "1px solid #1A3448" }}>
            <h3 style={{ fontSize: "22px", marginBottom: "12px", fontFamily: "var(--font-playfair)", fontWeight: 600, color: "#FFFFFF" }}>
              Didn&apos;t find your answer?
            </h3>
            <p style={{ fontSize: "14px", color: "#A0A0A0", marginBottom: "24px", fontFamily: "var(--font-montserrat)", fontWeight: 300 }}>
              Our team is available 24/7 to answer all your questions
            </p>
            <Button href="/contact" variant="primary">Contact Us</Button>
          </div>
        </div>
      </section>

      {/* FAQ Schema */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: faqs.map((f) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: { "@type": "Answer", text: f.a },
        })),
      })}} />
    </>
  );
}
