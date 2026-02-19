export interface Service {
  id: string;
  slug: string;
  title: string;
  shortTitle: string;
  description: string;
  shortDescription: string;
  icon: string;
  image: string;
  advantages: { title: string; description: string }[];
  steps: { title: string; description: string }[];
  faq: { question: string; answer: string }[];
}

export const services: Service[] = [
  {
    id: "affretement",
    slug: "affretement-jet-prive",
    title: "Private Jet Charter",
    shortTitle: "Bespoke Charter",
    description: "Private jet charter is our core business. We provide access to over 8,500 certified aircraft worldwide to offer you a flight perfectly tailored to your needs. Whether you are travelling for business or pleasure, every detail is designed with you in mind: aircraft selection, flexible schedules, bespoke catering and coordinated transfers. Our team of dedicated advisors is available around the clock to ensure an exceptional flight experience, from the initial quote request to your arrival at your destination. We work exclusively with certified and regularly audited operators, guaranteeing the highest standards of safety and service quality.",
    shortDescription: "A bespoke flight tailored to your every requirement, with access to over 8,500 certified aircraft worldwide.",
    icon: "plane",
    image: "/images/services/affretement.jpg",
    advantages: [
      { title: "Total Flexibility", description: "Depart and arrive on your schedule, with changes possible up to the last minute" },
      { title: "Unlimited Choice", description: "Access to over 8,500 certified aircraft worldwide" },
      { title: "Premium Service", description: "Dedicated advisor available 24/7, bespoke catering, transfers included" },
      { title: "Maximum Safety", description: "EASA-certified operators, regular audits, comprehensive insurance" },
    ],
    steps: [
      { title: "Request a Quote", description: "Share your requirements via our form or by phone. Response within 30 minutes." },
      { title: "Personalised Proposal", description: "Receive a selection of suitable aircraft with detailed and transparent pricing." },
      { title: "Confirmation", description: "Confirm your choice. Our team coordinates every detail of your flight." },
      { title: "Departure Day", description: "Arrive at the VIP terminal 15 minutes before departure. Immediate take-off." },
    ],
    faq: [
      { question: "How much does a private jet flight cost?", answer: "The price varies depending on the distance, aircraft type and availability. A Paris-Nice flight starts from around 4,800 EUR, while a Paris-New York flight starts from 65,000 EUR. Request a personalised quote for an exact price." },
      { question: "What is the minimum lead time to book?", answer: "We can arrange a flight in as little as 2 hours in urgent cases. For optimal service, we recommend 24 to 48 hours notice." },
      { question: "Are pets allowed on board?", answer: "Yes, most aircraft allow pets in the cabin with no size restrictions or mandatory crates. Simply let us know when making your request." },
      { question: "Is catering included?", answer: "A standard beverage service is included. For gourmet catering (onboard chef, bespoke menus), premium options are available on request." },
    ],
  },
  {
    id: "empty-legs",
    slug: "vols-a-vide-empty-legs",
    title: "Empty Legs",
    shortTitle: "Empty Legs",
    description: "Empty legs are repositioning flights: when a private jet needs to fly empty to pick up its next client or return to base, we offer these flights at significantly reduced rates, up to 75% off compared to a standard charter. It is the ideal opportunity to fly by private jet at an accessible price. Our platform lists hundreds of available empty leg flights in real time every week across Europe and beyond. You can also set up personalised alerts to be notified as soon as a flight matches your criteria.",
    shortDescription: "Take advantage of our aircraft repositioning flights to fly by private jet at reduced rates, up to 75% off.",
    icon: "tag",
    image: "/images/services/empty-legs.jpg",
    advantages: [
      { title: "Up to 75% Off", description: "Significantly reduced rates compared to a standard charter" },
      { title: "Same Quality", description: "Service, comfort and safety identical to a standard charter flight" },
      { title: "Personalised Alerts", description: "Receive a notification as soon as a flight matches your criteria" },
      { title: "Real-Time Offers", description: "Hundreds of available flights updated daily" },
    ],
    steps: [
      { title: "Browse Offers", description: "Explore our empty leg listings or set up a personalised alert." },
      { title: "Book Quickly", description: "Empty legs go fast. Confirm your booking online or by phone." },
      { title: "Prepare for Your Flight", description: "Receive all the details: terminal, schedule, assigned aircraft." },
      { title: "Fly at Reduced Rates", description: "Enjoy a private jet flight with the same level of premium service." },
    ],
    faq: [
      { question: "What exactly is an empty leg?", answer: "An empty leg is a repositioning flight. When a private jet needs to fly without passengers to reach its next mission, we offer this flight at a reduced rate." },
      { question: "Can the dates of an empty leg be changed?", answer: "Dates are generally fixed as they are tied to the aircraft schedule. Slight time flexibility is sometimes possible, but date changes are not." },
      { question: "Are empty legs reliable?", answer: "Empty legs are subject to confirmation of the primary flight. In the event of a cancellation (rare), we offer you an alternative or a full refund." },
    ],
  },
  {
    id: "groupe",
    slug: "voyage-groupe",
    title: "Group Travel by Private Jet",
    shortTitle: "Group Travel",
    description: "Organising group travel by private jet has never been easier. Whether for a corporate seminar, a family event, an incentive trip or a sports tour, we have aircraft that can accommodate from 10 to 50+ passengers. Our VIP airliners (Boeing BBJ, Airbus ACJ) offer modular spaces with lounges, meeting rooms and rest areas. For smaller groups, our heavy jets such as the Global 6000 or Falcon 7X provide optimal comfort with a flexible configuration.",
    shortDescription: "Charter solutions for your groups of 10 to 50+ passengers: seminars, events, incentive trips.",
    icon: "users",
    image: "/images/services/groupe.jpg",
    advantages: [
      { title: "Flexible Capacity", description: "From 10 to 50+ passengers depending on your needs, with modular aircraft" },
      { title: "Simplified Logistics", description: "A single point of contact to organise everything: flight, catering, transfers" },
      { title: "In-Flight Productivity", description: "Onboard meeting rooms, Wi-Fi, dedicated workspaces" },
      { title: "Competitive Per-Seat Pricing", description: "The cost per person becomes highly competitive for large groups" },
    ],
    steps: [
      { title: "Define Your Needs", description: "Number of passengers, dates, destinations, desired onboard services." },
      { title: "Receive Our Proposals", description: "We present you with the best aircraft options along with a detailed quote." },
      { title: "Customise Your Flight", description: "Cabin configuration, catering, onboard branding if desired." },
      { title: "Travel Together", description: "Your group enjoys an unforgettable and cohesive flight experience." },
    ],
    faq: [
      { question: "What is the maximum number of passengers?", answer: "Our VIP airliners (Boeing BBJ, Airbus ACJ) can accommodate up to 50 passengers in VIP configuration, and over 100 in mixed configuration." },
      { question: "Can a seminar be held on board?", answer: "Absolutely. Our heavy jets and VIP airliners feature fully equipped meeting rooms, presentation systems and high-speed Wi-Fi connectivity." },
    ],
  },
  {
    id: "fret",
    slug: "fret-urgent",
    title: "Urgent Air Freight",
    shortTitle: "Urgent Freight",
    description: "When time is critical, our urgent air freight service ensures delivery of your goods anywhere in the world within the shortest timeframes. Industrial parts, confidential documents, works of art, medical equipment: we transport all types of freight with the utmost care. Our dedicated cargo aircraft and our network of specialist operators guarantee immediate handling and real-time tracking of your shipment.",
    shortDescription: "Express air transport of urgent freight: industrial parts, documents, works of art, medical equipment.",
    icon: "package",
    image: "/images/services/fret.jpg",
    advantages: [
      { title: "Maximum Speed", description: "Handling in under 2 hours, same-day delivery across Europe" },
      { title: "All Types of Freight", description: "Industrial parts, medical supplies, works of art, confidential documents" },
      { title: "Real-Time Tracking", description: "GPS tracking of your shipment from departure to delivery" },
      { title: "Enhanced Security", description: "Specialist packaging, careful handling, comprehensive insurance" },
    ],
    steps: [
      { title: "Urgency Identified", description: "Contact us 24/7 with the details of your shipment: nature, weight, dimensions, deadline." },
      { title: "Immediate Solution", description: "We identify the most suitable and fastest available aircraft." },
      { title: "Express Collection", description: "Your freight is collected and transported to the aircraft." },
      { title: "Guaranteed Delivery", description: "Your goods are delivered to their destination within the agreed timeframe." },
    ],
    faq: [
      { question: "What is the minimum lead time for urgent freight?", answer: "We can arrange a cargo flight in as little as 2 hours for critical emergencies, 24/7, 365 days a year." },
      { question: "What types of goods can you transport?", answer: "Virtually anything: spare parts, medical equipment, samples, documents, works of art, luxury vehicles. We comply with all customs and transport regulations." },
    ],
  },
  {
    id: "conciergerie",
    slug: "conciergerie-lifestyle",
    title: "Concierge & Lifestyle",
    shortTitle: "Concierge & Lifestyle",
    description: "Our concierge service transforms your flight into a complete experience. Going far beyond simple air transport, we orchestrate every aspect of your trip: booking 5-star hotels, Michelin-starred restaurants, luxury car transfers, yachts, helicopters, access to exclusive events, private shopping, and much more. Our network of premium partners around the world allows us to fulfil any request, no matter how exclusive.",
    shortDescription: "A comprehensive concierge service: hotels, restaurants, transfers, events, private shopping.",
    icon: "concierge",
    image: "/images/services/conciergerie.jpg",
    advantages: [
      { title: "Fully Bespoke", description: "Every aspect of your stay is personalised to your preferences" },
      { title: "Exclusive Network", description: "Access to the finest establishments and events around the world" },
      { title: "Single Point of Contact", description: "One contact for your entire trip" },
      { title: "24/7 Availability", description: "Our team is reachable at any time during your stay" },
    ],
    steps: [
      { title: "Share Your Wishes", description: "Describe your ideal trip: destinations, activities, preferences, budget." },
      { title: "Bespoke Programme", description: "We create a complete itinerary with coordinated bookings and logistics." },
      { title: "Approval", description: "Adjust the programme to your liking. Every detail can be modified." },
      { title: "Live the Experience", description: "Enjoy a perfectly orchestrated trip, free from any logistical concerns." },
    ],
    faq: [
      { question: "What concierge services do you offer?", answer: "Hotel and restaurant bookings, VIP transfers (car, helicopter, yacht), event access, private shopping, tour guides, spa treatments, show tickets, and any special request." },
      { question: "Is the concierge service included in the flight price?", answer: "A basic concierge service (transfers, recommendations) is complimentary. The full service (bookings, stay organisation) is available as an option or included in our Experience packages." },
    ],
  },
  {
    id: "transferts",
    slug: "transferts-vip",
    title: "VIP Transfers",
    shortTitle: "VIP Transfers",
    description: "Complete your flight experience with our VIP transfers. We provide the connection between your home, hotel or office and the private aviation terminal with a fleet of high-end vehicles: luxury saloons, SUVs, limousines, VIP vans. For destinations requiring rapid access, our helicopter transfers allow you to travel from the airport to the city centre or your final destination in just minutes.",
    shortDescription: "Ground-to-air transfers by luxury vehicle or helicopter, from your doorstep to the private terminal.",
    icon: "car",
    image: "/images/services/transferts.jpg",
    advantages: [
      { title: "Door-to-Door", description: "From your home to the VIP terminal, with seamless service throughout" },
      { title: "Premium Fleet", description: "Mercedes S-Class, Range Rover, Rolls-Royce, helicopter" },
      { title: "Experienced Chauffeurs", description: "Discreet, bilingual professionals with expert knowledge of all routes" },
      { title: "Guaranteed Punctuality", description: "Real-time flight tracking to adjust your pick-up time accordingly" },
    ],
    steps: [
      { title: "Specify Your Needs", description: "Pick-up point, destination, number of passengers, luggage." },
      { title: "Choose Your Vehicle", description: "Select your vehicle from our premium fleet." },
      { title: "Confirmation", description: "Receive your chauffeur's details and the transfer information." },
      { title: "Stress-Free Transfer", description: "Your chauffeur awaits you at the agreed time for a smooth journey." },
    ],
    faq: [
      { question: "What vehicles are available?", answer: "Mercedes S-Class and V-Class, BMW 7 Series, Range Rover, Rolls-Royce Phantom, Bentley, and even VIP helicopters for airport-to-city transfers." },
      { question: "Is the transfer included in the flight price?", answer: "A standard saloon transfer is often included in our packages. Premium options (Rolls-Royce, helicopter) are available at an additional cost." },
    ],
  },
  {
    id: "gestion",
    slug: "gestion-appareil",
    title: "Aircraft Management",
    shortTitle: "Aircraft Management",
    description: "Do you own a private jet? Our aircraft management service optimises the return on your investment. We handle the entirety of operational management: maintenance, flight planning, crew management, regulatory compliance, insurance and marketing your aircraft to generate charter revenue when you are not using it. Our expertise allows you to significantly reduce your operating costs while maximising the availability of your jet.",
    shortDescription: "Complete management of your private jet: maintenance, crew, operations, charter revenue.",
    icon: "settings",
    image: "/images/services/gestion.jpg",
    advantages: [
      { title: "Cost Reduction", description: "Optimisation of operating costs and charter revenue to offset expenses" },
      { title: "360-Degree Management", description: "Maintenance, crew, insurance, regulatory compliance - everything is handled" },
      { title: "Maximum Availability", description: "Intelligent planning to ensure your aircraft is ready when you need it" },
      { title: "Charter Revenue", description: "Marketing your jet for charter when you are not using it" },
    ],
    steps: [
      { title: "Initial Audit", description: "Complete assessment of your aircraft, current costs and optimisation potential." },
      { title: "Management Plan", description: "Proposal of a bespoke management plan with measurable objectives." },
      { title: "Implementation", description: "Full operational takeover of your aircraft." },
      { title: "Regular Reporting", description: "Detailed monthly reports on operations, costs and revenue." },
    ],
    faq: [
      { question: "How much can chartering my jet generate?", answer: "Depending on the aircraft type and its availability, charter revenue can cover 40 to 70% of your jet's annual fixed costs. We provide you with a detailed estimate during the initial audit." },
      { question: "Does my jet remain available when I need it?", answer: "Absolutely. You set your usage priorities. Your aircraft is always available for your flights with an agreed notice period." },
    ],
  },
  {
    id: "achat-vente",
    slug: "achat-vente-jet",
    title: "Jet Sales & Acquisitions",
    shortTitle: "Jet Sales & Acquisitions",
    description: "Whether you wish to acquire your first private jet or sell your current aircraft, our Sales & Acquisitions department supports you at every stage of the transaction. Our in-depth market knowledge, international network of owners and buyers, and technical expertise guarantee you a secure transaction at the best price. We also offer financing and leasing solutions tailored to your situation.",
    shortDescription: "Full support for the acquisition or sale of your private jet.",
    icon: "handshake",
    image: "/images/services/achat-vente.jpg",
    advantages: [
      { title: "Market Expertise", description: "In-depth knowledge of market trends, prices and opportunities" },
      { title: "International Network", description: "Access to a portfolio of aircraft and buyers worldwide" },
      { title: "Comprehensive Due Diligence", description: "Technical inspection, history verification, regulatory compliance" },
      { title: "Financing Solutions", description: "Leasing, credit, optimised tax solutions tailored to your situation" },
    ],
    steps: [
      { title: "Requirements Definition", description: "Your needs, budget, typical missions, manufacturer preferences." },
      { title: "Search & Shortlisting", description: "Identification of matching aircraft on the global market." },
      { title: "Inspection & Negotiation", description: "Comprehensive technical due diligence and negotiation for the best price." },
      { title: "Acquisition & Delivery", description: "Finalisation of the transaction, customisation and delivery of your jet." },
    ],
    faq: [
      { question: "How much does a private jet cost?", answer: "Prices vary significantly by category: from 2M EUR for a pre-owned very light jet to 70M+ EUR for a new ultra-long-range aircraft. We find the aircraft that suits your budget." },
      { question: "New or pre-owned, what do you recommend?", answer: "It depends on your budget and needs. A recent pre-owned aircraft often offers the best value for money. A new aircraft guarantees the latest technology and full customisation." },
    ],
  },
];
