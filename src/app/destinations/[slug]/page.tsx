import { Metadata } from "next";
import { notFound } from "next/navigation";
import { destinations } from "@/data/destinations";
import { fleet } from "@/data/fleet";
import DestinationPageClient from "./DestinationPageClient";

/* ============================================
   SEO CONTENT MAP
   ============================================ */
const seoContent: Record<
  string,
  {
    seoText: string;
    timezone: string;
    recommendedAircraft: string[];
    priceRange: string;
    faq: { question: string; answer: string }[];
  }
> = {
  geneve: {
    seoText:
      "Geneva, nestled on the shores of Lake Geneva with the Alps as a backdrop, is an essential destination for private jet travelers. As the world capital of diplomacy, it is home to the European headquarters of the United Nations, CERN, and numerous international organizations. The city is also a hub for fine watchmaking and private banking, attracting an international business clientele year-round. Geneva Airport features top-tier private aviation facilities, with VIP terminals offering personalized concierge services, direct tarmac access, and expedited customs clearance. Within minutes, you can reach the city center and its legendary palaces such as the Beau-Rivage or the Four Seasons Hotel des Bergues. The proximity to prestigious ski resorts like Verbier, Gstaad, and Courchevel makes Geneva an ideal hub for winter sports enthusiasts. In summer, the lake offers exclusive water activities, and the Lavaux vineyards, a UNESCO World Heritage Site, are within easy reach. Whether you are coming for the Salon International de la Haute Horlogerie, a meeting at a private bank headquarters, or a weekend in the Alps, flying by private jet to Geneva transforms every trip into a refined and efficient experience.",
    timezone: "UTC+1 (CET)",
    recommendedAircraft: ["citation-mustang", "citation-cj3-plus", "phenom-300e"],
    priceRange: "4,200 - 8,500",
    faq: [
      {
        question: "What is the flight time from Paris to Geneva by private jet?",
        answer:
          "The flight time between Paris and Geneva by private jet is approximately 55 minutes, depending on weather conditions and the type of aircraft chosen.",
      },
      {
        question: "What type of jet do you recommend for Paris to Geneva?",
        answer:
          "For a Paris-Geneva flight, we recommend a Very Light Jet or Light Jet such as the Citation Mustang or the Phenom 300E, ideal for this short route.",
      },
      {
        question: "Is there a private terminal at Geneva Airport?",
        answer:
          "Yes, Geneva Airport has several FBOs (Fixed Base Operators) dedicated to private aviation, offering comprehensive VIP services including a private lounge, concierge, and direct tarmac transfer.",
      },
    ],
  },
  londres: {
    seoText:
      "London, the ultimate global metropolis, is the number one private aviation destination from Paris. The British capital boasts Europe's densest network of business aviation airports, providing quick and flexible access to all areas of the city. From Luton in the north to Biggin Hill in the south, and Farnborough to the west, each airport offers VIP terminals with premium services. Business travelers particularly appreciate being able to bypass the crowded commercial terminals at Heathrow and Gatwick, saving valuable time. The City of London, Canary Wharf, and Mayfair are all accessible within 45 minutes from private terminals. London is a global financial center, home to the London Stock Exchange, the Bank of England, and the headquarters of numerous multinational corporations. The city also draws visitors with its exceptional cultural scene including the West End, world-renowned museums, and Michelin-starred dining. For sports enthusiasts, Wimbledon, Ascot, and Premier League matches are unmissable events. Flying by private jet to London gives you total flexibility on schedules and choice of arrival airport, optimizing every minute of your stay in the British capital.",
    timezone: "UTC+0 (GMT) / UTC+1 (BST)",
    recommendedAircraft: ["citation-cj3-plus", "phenom-300e", "citation-xls-plus"],
    priceRange: "5,800 - 12,000",
    faq: [
      {
        question: "Which private airport should I choose in London?",
        answer:
          "The choice depends on your final destination. Farnborough is ideal for west London and Surrey, Luton for the north and the City, Biggin Hill for the southeast. Our advisors will recommend the best option for you.",
      },
      {
        question: "How much does a Paris-London private jet flight cost?",
        answer:
          "A Paris-London private jet flight starts from 5,800 euros one-way on a Light Jet. The price varies depending on the aircraft type, availability, and airport choice.",
      },
      {
        question: "Do I need a passport to fly by private jet to London?",
        answer:
          "Yes, since Brexit, a valid passport is required to travel to the United Kingdom, including by private aviation. Customs checks are carried out directly at the private terminal.",
      },
    ],
  },
  mykonos: {
    seoText:
      "Mykonos, the pearl of the Cyclades, has become the ultimate summer destination for private jet travelers. This legendary Greek island offers a captivating blend of paradise beaches with crystal-clear waters, picturesque white-and-blue villages, and a legendary nightlife that attracts the international jet set. Mykonos Airport, although compact, provides dedicated private aviation services with VIP reception and quick transfer to the island's luxury hotel complexes. From June to September, Mykonos comes alive with exclusive beach clubs like Nammos and Scorpios, gourmet seaside restaurants, and designer boutiques in the alleys of Chora. The island also boasts a rich cultural heritage with its iconic windmills, Little Venice, and the sacred island of Delos just a short boat ride away. The most discerning travelers will find their haven in private villas with infinity pools overlooking the Aegean Sea, accessible only by private paths. Flying by private jet to Mykonos is particularly popular as it avoids the connections often required on commercial flights. In approximately three hours from Paris, you set foot on this enchanting island, ready to enjoy every moment of your Mediterranean getaway.",
    timezone: "UTC+2 (EET) / UTC+3 (EEST)",
    recommendedAircraft: ["phenom-300e", "citation-xls-plus", "praetor-500"],
    priceRange: "15,500 - 28,000",
    faq: [
      {
        question: "What is the best time to fly to Mykonos?",
        answer:
          "Peak season runs from June to September, with the busiest period in July-August. May and October offer pleasant weather with fewer crowds. We recommend booking early during peak season.",
      },
      {
        question: "Does Mykonos Airport accept private jets?",
        answer:
          "Yes, Mykonos Airport (LGMK) welcomes private jets with dedicated slots. During peak season, slots are in high demand and must be booked in advance.",
      },
      {
        question: "Is a helicopter transfer available from Mykonos?",
        answer:
          "Yes, we arrange helicopter transfers from Mykonos to neighboring islands such as Santorini, Paros, and Naxos, as well as to yachts at sea.",
      },
    ],
  },
  dubai: {
    seoText:
      "Dubai is the global hub for luxury and private aviation in the Middle East. This futuristic metropolis, rising from the heart of the desert, fascinates with its bold architecture, unparalleled shopping experiences, and a lifestyle where excellence is the norm. Dubai's two airports offer world-class private aviation facilities, with VIP terminals among the most sophisticated on the planet. Al Maktoum International, in particular, is designed to accommodate the largest private jets in optimal conditions. Dubai attracts business travelers thanks to the Dubai International Financial Centre (DIFC), its position as a crossroads between Europe, Asia, and Africa, and its favorable tax environment. Luxury enthusiasts will find delight in the boutiques of the Dubai Mall, the starred restaurants of the Burj Al Arab, and the private beaches of Palm Jumeirah. The emirate also offers unique experiences: luxury 4x4 desert safaris, camel racing, golf on courses designed by the world's top architects, and yacht cruises in the Persian Gulf. The private jet flight from Paris to Dubai takes approximately 6 hours 30 minutes, allowing you to travel in absolute comfort with gourmet dining on board. It is the ideal destination for combining business and pleasure in an exceptional setting.",
    timezone: "UTC+4 (GST)",
    recommendedAircraft: ["challenger-350", "global-6000", "falcon-7x"],
    priceRange: "28,000 - 55,000",
    faq: [
      {
        question: "Which jet do you recommend for Paris to Dubai?",
        answer:
          "For a nonstop Paris-Dubai flight, we recommend a Super Midsize Jet such as the Challenger 350 or a Heavy Jet such as the Global 6000, offering the range and comfort needed for this 6h30 journey.",
      },
      {
        question: "Do I need a visa for Dubai by private jet?",
        answer:
          "French nationals benefit from a free visa on arrival for stays under 90 days in the United Arab Emirates. Formalities are streamlined at the private terminal.",
      },
      {
        question: "Which airport should I choose in Dubai for private aviation?",
        answer:
          "Al Maktoum International (DWC) is generally preferred for private aviation thanks to its dedicated infrastructure and proximity to luxury residential areas. Dubai International (DXB) remains an option for its central location.",
      },
    ],
  },
  marrakech: {
    seoText:
      "Marrakech, the Red City, is a captivating destination that charms travelers from around the world with its unique blend of centuries-old traditions and contemporary luxury. Just three hours by private jet from Paris, this Moroccan gem offers a total change of scenery with its bustling souks, sumptuous palaces, and secret gardens. Marrakech-Menara Airport has a dedicated private aviation terminal offering a warm welcome and streamlined formalities. Within minutes, you reach the finest riads and palaces in the medina or the Palmeraie. The imperial city fascinates with its exceptional architectural heritage: the Koutoubia, the Saadian Tombs, the Bahia Palace, and the Majorelle Gardens are wonders to discover. Moroccan gastronomy, from refined tagines to delicate pastries, is an unforgettable culinary experience. Golf enthusiasts will appreciate the prestigious courses at the Royal Golf and Amelkis, while nature lovers can explore the Atlas valleys on private excursions. Marrakech is also a top choice for events and celebrations, with spectacular reception venues such as private palaces and Palmeraie estates. The legendary Moroccan hospitality and the exceptional value of luxury services make Marrakech a premier private aviation destination.",
    timezone: "UTC+1 (CET)",
    recommendedAircraft: ["phenom-300e", "citation-xls-plus", "praetor-500"],
    priceRange: "14,000 - 24,000",
    faq: [
      {
        question: "How long is the Paris-Marrakech flight by private jet?",
        answer:
          "The Paris-Marrakech private jet flight takes approximately 3 hours and 15 minutes, depending on the aircraft type and flight conditions.",
      },
      {
        question: "What documents are needed to fly to Marrakech?",
        answer:
          "French nationals do not need a visa for stays under 90 days in Morocco. A valid passport is sufficient. Formalities are handled directly at the private terminal.",
      },
      {
        question: "Can you arrange a transfer from Marrakech Airport?",
        answer:
          "Yes, we arrange VIP transfers in luxury vehicles from the Marrakech-Menara private terminal to your hotel, riad, or private villa, with personalized welcome.",
      },
    ],
  },
  ibiza: {
    seoText:
      "Ibiza, the White Island of the Balearics, is much more than a party destination. While its legendary clubs like Pacha, Amnesia, and Ushuaia continue to attract the international jet set, the island also reveals a more intimate side of secret coves, hilltop villages, and refined Mediterranean cuisine. Less than two hours by private jet from Paris, Ibiza offers an ideal escape for a long weekend or summer holiday. Ibiza Airport welcomes private jets with dedicated VIP services and quick access to different areas of the island. The wilder, more preserved north of the island is home to intimate boutique hotels and farm-to-table restaurants. The south and west concentrate glamorous beach clubs and the spectacular sunsets of Cafe del Mar and Sunset Ashram. Wellness enthusiasts will find an exceptional offering of spas, yoga retreats, and holistic centers in Ibiza. The island is also renowned for its Las Dalias hippie market and dynamic art scene. Yacht charters, private boat excursions to Formentera, and visits to the UNESCO-listed old town complete a tourism offering that caters to every desire. Flying by private jet to Ibiza guarantees a stress-free journey, with the freedom to depart and return on your own schedule.",
    timezone: "UTC+1 (CET) / UTC+2 (CEST)",
    recommendedAircraft: ["citation-mustang", "phenom-100ev", "citation-cj3-plus"],
    priceRange: "9,800 - 16,000",
    faq: [
      {
        question: "What is the best season to fly to Ibiza?",
        answer:
          "The main season runs from May to October. June and September offer an excellent balance between good weather and reasonable crowds. July and August are the liveliest months.",
      },
      {
        question: "Can I land in Formentera by private jet?",
        answer:
          "No, Formentera does not have an airport. You land in Ibiza and we arrange a private speedboat transfer to Formentera in approximately 25 minutes.",
      },
      {
        question: "How much does a Paris-Ibiza private jet flight cost?",
        answer:
          "A Paris-Ibiza private jet flight is available starting from 9,800 euros one-way on a Very Light Jet. The price varies depending on the aircraft category and time of year.",
      },
    ],
  },
  nice: {
    seoText:
      "Nice and the French Riviera are the most iconic private aviation destination in France. Between the glamour of the Cannes Film Festival, the adrenaline of the Monaco Grand Prix, and the timeless charm of Saint-Tropez, the French Riviera attracts the global elite year-round. Nice Cote d'Azur Airport, France's second-largest airport, features excellent private aviation facilities with several FBOs offering comprehensive VIP services. Its exceptional location, right by the sea and just minutes from the city center, makes it one of the most pleasant airports in the world. Nice captivates with its Promenade des Anglais, its picturesque Old Town, and museums dedicated to Matisse and Chagall. The city is also an ideal starting point for exploring the Nice hinterland, the hilltop villages of the Esterel, and the perfumeries of Grasse. The local gastronomy, blending Provencal and Italian influences, is celebrated in numerous Michelin-starred restaurants. Yachting enthusiasts will appreciate the proximity to the ports of Nice, Antibes, and Monaco. In winter, ski resorts in the backcountry such as Isola 2000 and Auron are accessible in under an hour. Flying by private jet to Nice offers total flexibility and significant time savings, allowing you to make the most of every moment on the French Riviera.",
    timezone: "UTC+1 (CET) / UTC+2 (CEST)",
    recommendedAircraft: ["citation-mustang", "phenom-100ev", "phenom-300e"],
    priceRange: "4,800 - 9,000",
    faq: [
      {
        question: "What is the flight time from Paris to Nice by private jet?",
        answer:
          "The Paris-Nice private jet flight takes approximately 1 hour and 15 minutes, a significant time saving compared to commercial flights including airport waiting times.",
      },
      {
        question: "Is a helicopter transfer possible from Nice?",
        answer:
          "Yes, we offer helicopter transfers from Nice to Monaco (7 minutes), Saint-Tropez (20 minutes), Cannes (10 minutes), and backcountry ski resorts.",
      },
      {
        question: "Can I access Monaco by private jet?",
        answer:
          "Monaco does not have an airport. The fastest way is to land in Nice and continue by helicopter (7 minutes) or luxury vehicle (30 minutes).",
      },
    ],
  },
  "new-york": {
    seoText:
      "New York, the city that never sleeps, is the quintessential transatlantic private aviation destination. Reaching Manhattan from Paris by private jet is an unparalleled experience that transforms an 8-hour journey into a voyage of pure comfort and productivity. Dedicated private aviation airports, notably Teterboro in New Jersey and Westchester County to the north, offer much faster access to Manhattan than the commercial airports of JFK or Newark. Teterboro, located just 20 minutes from Midtown, is the preferred choice for business travelers with its multiple FBOs offering top-tier services. A helicopter transfer from Teterboro to the Downtown Manhattan Heliport further reduces travel time to just minutes. New York is a global nerve center for finance, fashion, art, and technology. Wall Street, the Garment District, Chelsea galleries, and SoHo startups coexist in a unique creative energy. Michelin-starred restaurants, Broadway shows, museums like the Met and MoMA, and shopping on Fifth Avenue offer endless experiences. For a Paris-New York private jet flight, we recommend a Heavy Jet or Ultra Long Range such as the Global 6000 or the Gulfstream G650ER, providing the space and comfort needed for a transatlantic flight, with the option of resting in a real suite on board.",
    timezone: "UTC-5 (EST) / UTC-4 (EDT)",
    recommendedAircraft: ["global-6000", "falcon-7x", "gulfstream-g650er"],
    priceRange: "65,000 - 120,000",
    faq: [
      {
        question: "How long is the Paris-New York private jet flight?",
        answer:
          "The Paris-New York private jet flight takes approximately 8 hours westbound and 7 hours on the return, depending on winds and aircraft type. A nonstop flight is possible with a Heavy Jet or Ultra Long Range.",
      },
      {
        question: "Which airport should I choose in New York for private aviation?",
        answer:
          "Teterboro (TEB) is the number one choice for its proximity to Manhattan (20 minutes). Westchester County (HPN) is ideal if your destination is in northern Manhattan or Connecticut.",
      },
      {
        question: "What customs formalities are required for a private flight to the USA?",
        answer:
          "A valid ESTA or visa is required. US customs formalities are carried out directly at the FBO upon your arrival. We assist you with all administrative procedures prior to the flight.",
      },
    ],
  },
  milan: {
    seoText:
      "Milan, the capital of fashion, design, and business in Italy, is a prized destination for private jet travelers thanks to its cultural and economic richness. Just 1 hour 20 minutes by air from Paris, this dynamic metropolis combines Italian elegance with international modernity. Milano Linate Airport, located just a few kilometers from the city center, is the ideal choice for business travelers seeking quick access to the financial district and the Quadrilatero della Moda. Malpensa, further away, offers more spacious private aviation facilities. Milan is home to the Italian Stock Exchange, major fashion houses such as Armani, Prada, and Versace, and hosts major events like Fashion Week and the Salone del Mobile. The city also captivates with its architectural heritage, from the majestic Duomo to La Scala, and Leonardo da Vinci's Last Supper. Milanese gastronomy, from risotto alla milanese to cotoletta, is enjoyed in starred restaurants and authentic trattorias. Lakes Como and Garda, less than an hour away, offer romantic escapes in a spectacular natural setting. Flying by private jet to Milan maximizes your time and allows you to combine business and discovery in this fascinating city.",
    timezone: "UTC+1 (CET) / UTC+2 (CEST)",
    recommendedAircraft: ["citation-mustang", "phenom-100ev", "citation-cj3-plus"],
    priceRange: "5,200 - 10,000",
    faq: [
      {
        question: "Which airport should I choose in Milan?",
        answer:
          "Linate is ideal for quick access to the city center (15 minutes). Malpensa is more suitable if you are heading to Lake Como or Piedmont.",
      },
      {
        question: "How long is the Paris-Milan private jet flight?",
        answer:
          "The Paris-Milan private jet flight takes approximately 1 hour and 20 minutes on a Light Jet, offering significant time savings compared to commercial flights.",
      },
      {
        question: "Can I fly to Lake Como by private jet?",
        answer:
          "Lake Como does not have an airport, but Milano Malpensa is located approximately 45 minutes away by car. We can also arrange a helicopter transfer.",
      },
    ],
  },
  sardaigne: {
    seoText:
      "Sardinia, and the Costa Smeralda in particular, is the summer rendezvous of the international jet set. This Mediterranean island offers breathtaking landscapes: turquoise waters, white sand beaches, wind-sculpted granite rocks, and fragrant maquis shrubland. Olbia Costa Smeralda Airport is the ideal gateway to this paradise, with modern private aviation facilities and direct access to the finest establishments on the coast. Porto Cervo, the beating heart of the Costa Smeralda, concentrates the most exclusive luxury boutiques, gourmet restaurants, and yacht clubs in the Mediterranean. The port welcomes the world's largest yachts each summer, creating a unique atmosphere of casual glamour. Beyond the Costa Smeralda, Sardinia holds natural and cultural treasures: Neptune's Grotto, millennia-old Nuragic ruins, the shepherd villages of Barbagia, and the Cannonau vineyards. Sardinian gastronomy, blending seafood with pastoral specialties, is an authentic culinary discovery. The private jet flight to Sardinia, approximately 1 hour 50 minutes from Paris, offers the freedom to enjoy this exceptional island at your own pace, free from the constraints of commercial flights often overcrowded in peak season.",
    timezone: "UTC+1 (CET) / UTC+2 (CEST)",
    recommendedAircraft: ["phenom-300e", "citation-xls-plus", "citation-cj3-plus"],
    priceRange: "10,500 - 18,000",
    faq: [
      {
        question: "What is the best airport for the Costa Smeralda?",
        answer:
          "Olbia Costa Smeralda Airport (LIEO) is the closest, located just 20 minutes from Porto Cervo. It has a dedicated private aviation terminal.",
      },
      {
        question: "Is Sardinia accessible year-round by private jet?",
        answer:
          "Yes, Olbia Airport is open year-round. Peak season runs from June to September, but spring and autumn offer ideal weather for discovering the island at a more relaxed pace.",
      },
      {
        question: "Can you arrange a yacht transfer from the airport?",
        answer:
          "Yes, we can arrange a direct transfer from Olbia Airport to your yacht anchored in Porto Cervo marina or elsewhere along the coast.",
      },
    ],
  },
  maldives: {
    seoText:
      "The Maldives represent the ultimate escape for private jet travelers. This archipelago of 1,190 coral islands, scattered across the Indian Ocean, offers an incomparable paradise experience: overwater villas above crystal-clear turquoise waters, pristine white sand beaches, and coral reefs teeming with marine life. The private jet journey to the Maldives from Paris is an adventure in itself, with approximately 10 hours 30 minutes of flight to Male, followed by a seaplane or speedboat transfer to your resort. Velana International Airport in Male welcomes private jets with dedicated VIP services, simplifying arrival formalities in this island nation. The luxury resorts of the Maldives are among the most exclusive in the world: Soneva Fushi, One&Only Reethi Rah, Cheval Blanc Randheli, and Waldorf Astoria offer bespoke experiences in an exceptional natural setting. Each resort occupies its own atoll, guaranteeing absolute privacy. Activities are endless: scuba diving at world-renowned sites, deep-sea fishing, ocean-view spa treatments, private sandbank dinners, and dolphin watching excursions. The Maldives are the ideal destination for honeymoons, anniversaries, and any occasion deserving a truly extraordinary setting. Flying by private jet adds an extra dimension to this experience, with optimal in-flight comfort so you arrive refreshed in paradise.",
    timezone: "UTC+5 (MVT)",
    recommendedAircraft: ["global-6000", "gulfstream-g650er", "global-7500"],
    priceRange: "85,000 - 160,000",
    faq: [
      {
        question: "Can I fly directly from Paris to the Maldives by private jet?",
        answer:
          "Yes, with an Ultra Long Range Jet such as the Gulfstream G650ER or the Global 7500, the Paris-Male flight is achievable nonstop in approximately 10 hours 30 minutes. With a Heavy Jet, a technical stop may be necessary.",
      },
      {
        question: "How do I reach my resort from Male Airport?",
        answer:
          "Depending on your resort's location, the transfer is by seaplane (15 to 60 minutes), speedboat (10 to 90 minutes), or domestic flight. We handle the entire logistics.",
      },
      {
        question: "What is the best time to visit the Maldives?",
        answer:
          "The dry season, from November to April, offers the best sunshine and clearest waters. December to March is the most popular period. The summer monsoon (May-October) offers more competitive rates.",
      },
    ],
  },
  "saint-tropez": {
    seoText:
      "Saint-Tropez embodies French glamour and art de vivre like no other destination. This small fishing village turned legendary attracts the world's greatest fortunes each summer, drawn by its golden beaches, majestic yachts, and unique atmosphere blending laid-back style with sophistication. La Mole Airport, located just a few kilometers from the village, is a major asset for private jet travelers. This small runway, nestled among the hills of Var, allows you to land as close as possible to Saint-Tropez, avoiding the often daunting summer traffic along the coastal road. However, its short runway limits access to light aircraft and turboprops. For larger jets, Nice Airport offers an alternative with a 20-minute helicopter transfer. The beaches of Pampelonne, with their legendary clubs like Club 55 and Nikki Beach, are the setting for memorable days of sunbathing and seaside lunches. The old port of Saint-Tropez, its cobblestone lanes, and the Place des Lices retain an authentic charm behind the apparent glamour. Saint-Tropez gastronomy, from grilled fish to tarte Tropezienne, is enjoyed at legendary addresses. Flying by private jet to Saint-Tropez is the promise of an exclusive journey, from takeoff in Paris to arrival in this legendary village.",
    timezone: "UTC+1 (CET) / UTC+2 (CEST)",
    recommendedAircraft: ["citation-mustang", "phenom-100ev", "pilatus-pc-12"],
    priceRange: "5,500 - 10,000",
    faq: [
      {
        question: "Can I land directly in Saint-Tropez by private jet?",
        answer:
          "La Mole Airport (LFTZ) accepts small jets and turboprops. For larger aircraft, we recommend Nice with a helicopter transfer (20 minutes) to Saint-Tropez.",
      },
      {
        question: "When is peak season in Saint-Tropez?",
        answer:
          "Peak season runs from mid-June to mid-September, with the busiest period around July 14th and August 15th. It is recommended to book landing slots at La Mole several weeks in advance.",
      },
      {
        question: "Is a helicopter transfer from Nice available?",
        answer:
          "Yes, we arrange helicopter transfers from Nice to Saint-Tropez in approximately 20 minutes, landing as close as possible to your accommodation.",
      },
    ],
  },
};

/* ============================================
   DEFAULT SEO CONTENT (fallback)
   ============================================ */
function getDefaultSeoContent(dest: (typeof destinations)[0]) {
  return {
    seoText: dest.description + " " + dest.description + " Skyseaker offers private jet flights to " + dest.name + " with bespoke service and attention to the finest details. Our private aviation experts select the best aircraft and crews to ensure an exceptional journey. Whether you are traveling for business or pleasure, we tailor every aspect of your flight to your personal preferences. Our concierge service can also arrange ground transfers, hotel reservations, and on-site activities for a complete, worry-free experience. Contact us for a personalized quote for your next flight to " + dest.name + ".",
    timezone: "—",
    recommendedAircraft: ["phenom-300e", "citation-xls-plus", "challenger-350"],
    priceRange: dest.priceFrom + "+",
    faq: [
      {
        question: `What is the flight time to ${dest.name} by private jet?`,
        answer: `The flight time from Paris to ${dest.name} is approximately ${dest.flightTimeFromParis}, depending on the aircraft type and weather conditions.`,
      },
      {
        question: `What type of jet do you recommend for ${dest.name}?`,
        answer: `The choice of aircraft depends on the number of passengers, your comfort preferences, and your budget. Our advisors will guide you to the best option.`,
      },
      {
        question: `How do I book a private flight to ${dest.name}?`,
        answer: `Contact our team available 24/7 by phone or via our online quote form. We will send you a detailed proposal within 30 minutes.`,
      },
    ],
  };
}

/* ============================================
   STATIC PARAMS
   ============================================ */
export function generateStaticParams() {
  return destinations.map((dest) => ({
    slug: dest.id,
  }));
}

/* ============================================
   METADATA
   ============================================ */
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const destination = destinations.find((d) => d.id === slug);

  if (!destination) {
    return { title: "Destination Not Found" };
  }

  return {
    title: `Private Flight ${destination.name} (${destination.country}) — Private Jet from Paris`,
    description: `Book your private jet flight to ${destination.name}, ${destination.country}. Flight time from Paris: ${destination.flightTimeFromParis}. Starting from ${destination.priceFrom}€. Available 24/7.`,
    openGraph: {
      title: `Private Flight to ${destination.name} | Skyseaker`,
      description: `Private jet Paris-${destination.name} in ${destination.flightTimeFromParis}. Starting from ${destination.priceFrom}€.`,
      images: [{ url: destination.image, width: 1200, height: 630 }],
    },
  };
}

/* ============================================
   PAGE
   ============================================ */
export default async function DestinationPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const destination = destinations.find((d) => d.id === slug);

  if (!destination) {
    notFound();
  }

  const content = seoContent[slug] || getDefaultSeoContent(destination);

  const recommendedFleet = content.recommendedAircraft
    .map((id) => fleet.find((a) => a.id === id))
    .filter(Boolean);

  // FAQ Schema markup
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: content.faq.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <DestinationPageClient
        destination={destination}
        content={content}
        recommendedFleet={recommendedFleet as NonNullable<(typeof recommendedFleet)[0]>[]}
      />
    </>
  );
}
