import type { Translatable } from "@/lib/i18n-data";

export interface Service {
  id: string;
  slug: string;
  title: Translatable;
  shortTitle: Translatable;
  description: Translatable;
  shortDescription: Translatable;
  icon: string;
  image: string;
  advantages: { title: Translatable; description: Translatable }[];
  steps: { title: Translatable; description: Translatable }[];
  faq: { question: Translatable; answer: Translatable }[];
}

export const services: Service[] = [
  {
    id: "affretement",
    slug: "affretement-jet-prive",
    title: { fr: "Affrètement de jet privé", en: "Private Jet Charter" },
    shortTitle: { fr: "Affrètement personnalisé", en: "Bespoke Charter" },
    description: { fr: "L'affrètement de jet privé est notre cœur de métier. Nous mettons à votre disposition plus de 8 500 appareils certifiés à travers le monde pour vous offrir un vol parfaitement adapté à vos besoins. Que vous voyagiez pour affaires ou pour le plaisir, chaque détail est pensé pour vous : choix de l'appareil, horaires flexibles, catering sur mesure et transferts coordonnés. Notre équipe de conseillers dédiés vous accompagne 24h/24 pour garantir une expérience de vol exceptionnelle, de la demande de devis jusqu'à votre arrivée à destination. Nous travaillons exclusivement avec des opérateurs certifiés et audités régulièrement, assurant les plus hauts standards de sécurité et de qualité de service.", en: "Private jet charter is our core business. We provide access to over 8,500 certified aircraft worldwide to offer you a flight perfectly tailored to your needs. Whether you are travelling for business or pleasure, every detail is designed with you in mind: aircraft selection, flexible schedules, bespoke catering and coordinated transfers. Our team of dedicated advisors is available around the clock to ensure an exceptional flight experience, from the initial quote request to your arrival at your destination. We work exclusively with certified and regularly audited operators, guaranteeing the highest standards of safety and service quality." },
    shortDescription: { fr: "Un vol sur mesure, adapté à vos moindres exigences, avec accès à plus de 8 500 appareils certifiés dans le monde entier.", en: "A bespoke flight tailored to your every requirement, with access to over 8,500 certified aircraft worldwide." },
    icon: "plane",
    image: "/images/services/affretement.jpg",
    advantages: [
      { title: { fr: "Flexibilité totale", en: "Total Flexibility" }, description: { fr: "Départ et arrivée selon vos horaires, modification jusqu'au dernier moment", en: "Depart and arrive on your schedule, with changes possible up to the last minute" } },
      { title: { fr: "Choix illimité", en: "Unlimited Choice" }, description: { fr: "Accès à plus de 8 500 appareils certifiés dans le monde entier", en: "Access to over 8,500 certified aircraft worldwide" } },
      { title: { fr: "Service premium", en: "Premium Service" }, description: { fr: "Conseiller dédié disponible 24/7, catering sur mesure, transferts inclus", en: "Dedicated advisor available 24/7, bespoke catering, transfers included" } },
      { title: { fr: "Sécurité maximale", en: "Maximum Safety" }, description: { fr: "Opérateurs certifiés EASA, audits réguliers, assurances complètes", en: "EASA-certified operators, regular audits, comprehensive insurance" } },
    ],
    steps: [
      { title: { fr: "Demande de devis", en: "Request a Quote" }, description: { fr: "Partagez vos besoins via notre formulaire ou par téléphone. Réponse sous 30 minutes.", en: "Share your requirements via our form or by phone. Response within 30 minutes." } },
      { title: { fr: "Proposition personnalisée", en: "Personalised Proposal" }, description: { fr: "Recevez une sélection d'appareils adaptés avec tarifs détaillés et transparents.", en: "Receive a selection of suitable aircraft with detailed and transparent pricing." } },
      { title: { fr: "Confirmation", en: "Confirmation" }, description: { fr: "Validez votre choix. Notre équipe coordonne chaque détail de votre vol.", en: "Confirm your choice. Our team coordinates every detail of your flight." } },
      { title: { fr: "Jour J", en: "Departure Day" }, description: { fr: "Arrivez au terminal VIP 15 minutes avant le départ. Décollage immédiat.", en: "Arrive at the VIP terminal 15 minutes before departure. Immediate take-off." } },
    ],
    faq: [
      { question: { fr: "Combien coûte un vol en jet privé ?", en: "How much does a private jet flight cost?" }, answer: { fr: "Le prix varie selon la distance, le type d'appareil et la disponibilité. Un vol Paris-Nice débute autour de 4 800€, tandis qu'un Paris-New York se situe à partir de 65 000€. Demandez un devis personnalisé pour un tarif exact.", en: "The price varies depending on the distance, aircraft type and availability. A Paris-Nice flight starts from around 4,800 EUR, while a Paris-New York flight starts from 65,000 EUR. Request a personalised quote for an exact price." } },
      { question: { fr: "Quel est le délai minimum pour réserver ?", en: "What is the minimum lead time to book?" }, answer: { fr: "Nous pouvons organiser un vol en aussi peu que 2 heures dans les cas urgents. Pour un service optimal, nous recommandons un préavis de 24 à 48 heures.", en: "We can arrange a flight in as little as 2 hours in urgent cases. For optimal service, we recommend 24 to 48 hours notice." } },
      { question: { fr: "Les animaux sont-ils acceptés à bord ?", en: "Are pets allowed on board?" }, answer: { fr: "Oui, la plupart des appareils acceptent les animaux de compagnie en cabine, sans restriction de taille ni cage obligatoire. Précisez-le lors de votre demande.", en: "Yes, most aircraft allow pets in the cabin with no size restrictions or mandatory crates. Simply let us know when making your request." } },
      { question: { fr: "Le catering est-il inclus ?", en: "Is catering included?" }, answer: { fr: "Un service de boissons standard est inclus. Pour le catering gastronomique (chef à bord, menus sur mesure), des options premium sont disponibles sur demande.", en: "A standard beverage service is included. For gourmet catering (onboard chef, bespoke menus), premium options are available on request." } },
    ],
  },
  {
    id: "empty-legs",
    slug: "vols-a-vide-empty-legs",
    title: { fr: "Vols à vide — Empty Legs", en: "Empty Legs" },
    shortTitle: { fr: "Vols à vide (Empty Legs)", en: "Empty Legs" },
    description: { fr: "Les empty legs sont des vols de repositionnement : lorsqu'un jet privé doit se déplacer à vide pour rejoindre son prochain client ou retourner à sa base, nous proposons ces vols à des tarifs considérablement réduits, jusqu'à -75% par rapport à un affrètement classique. C'est l'opportunité idéale de voyager en jet privé à un prix accessible. Notre plateforme référence en temps réel des centaines de vols à vide disponibles chaque semaine sur toute l'Europe et au-delà. Vous pouvez également créer des alertes personnalisées pour être notifié dès qu'un vol correspond à vos critères.", en: "Empty legs are repositioning flights: when a private jet needs to fly empty to pick up its next client or return to base, we offer these flights at significantly reduced rates, up to 75% off compared to a standard charter. It is the ideal opportunity to fly by private jet at an accessible price. Our platform lists hundreds of available empty leg flights in real time every week across Europe and beyond. You can also set up personalised alerts to be notified as soon as a flight matches your criteria." },
    shortDescription: { fr: "Profitez de nos repositionnements d'appareils pour voler en jet privé à tarif réduit, jusqu'à -75%.", en: "Take advantage of our aircraft repositioning flights to fly by private jet at reduced rates, up to 75% off." },
    icon: "tag",
    image: "/images/services/empty-legs.jpg",
    advantages: [
      { title: { fr: "Jusqu'à -75%", en: "Up to 75% Off" }, description: { fr: "Tarifs considérablement réduits par rapport à un affrètement classique", en: "Significantly reduced rates compared to a standard charter" } },
      { title: { fr: "Même qualité", en: "Same Quality" }, description: { fr: "Service, confort et sécurité identiques à un vol charter standard", en: "Service, comfort and safety identical to a standard charter flight" } },
      { title: { fr: "Alertes personnalisées", en: "Personalised Alerts" }, description: { fr: "Recevez une notification dès qu'un vol correspond à vos critères", en: "Receive a notification as soon as a flight matches your criteria" } },
      { title: { fr: "Offres en temps réel", en: "Real-Time Offers" }, description: { fr: "Des centaines de vols disponibles mis à jour quotidiennement", en: "Hundreds of available flights updated daily" } },
    ],
    steps: [
      { title: { fr: "Consultez les offres", en: "Browse Offers" }, description: { fr: "Parcourez notre listing d'empty legs ou créez une alerte personnalisée.", en: "Explore our empty leg listings or set up a personalised alert." } },
      { title: { fr: "Réservez rapidement", en: "Book Quickly" }, description: { fr: "Les empty legs partent vite. Confirmez votre réservation en ligne ou par téléphone.", en: "Empty legs go fast. Confirm your booking online or by phone." } },
      { title: { fr: "Préparez votre vol", en: "Prepare for Your Flight" }, description: { fr: "Recevez tous les détails : terminal, horaire, appareil assigné.", en: "Receive all the details: terminal, schedule, assigned aircraft." } },
      { title: { fr: "Voyagez à prix réduit", en: "Fly at Reduced Rates" }, description: { fr: "Profitez d'un vol en jet privé avec le même niveau de service premium.", en: "Enjoy a private jet flight with the same level of premium service." } },
    ],
    faq: [
      { question: { fr: "Qu'est-ce qu'un empty leg exactement ?", en: "What exactly is an empty leg?" }, answer: { fr: "Un empty leg (ou vol à vide) est un vol de repositionnement. Quand un jet privé doit voler sans passager pour rejoindre sa prochaine mission, nous commercialisons ce vol à tarif réduit.", en: "An empty leg is a repositioning flight. When a private jet needs to fly without passengers to reach its next mission, we offer this flight at a reduced rate." } },
      { question: { fr: "Peut-on modifier les dates d'un empty leg ?", en: "Can the dates of an empty leg be changed?" }, answer: { fr: "Les dates sont généralement fixes car liées au planning de l'appareil. Une légère flexibilité horaire est parfois possible, mais pas de changement de date.", en: "Dates are generally fixed as they are tied to the aircraft schedule. Slight time flexibility is sometimes possible, but date changes are not." } },
      { question: { fr: "Les empty legs sont-ils fiables ?", en: "Are empty legs reliable?" }, answer: { fr: "Les empty legs sont soumis à la confirmation du vol principal. En cas d'annulation (rare), nous vous proposons une alternative ou un remboursement intégral.", en: "Empty legs are subject to confirmation of the primary flight. In the event of a cancellation (rare), we offer you an alternative or a full refund." } },
    ],
  },
  {
    id: "groupe",
    slug: "voyage-groupe",
    title: { fr: "Voyages de groupe en jet privé", en: "Group Travel by Private Jet" },
    shortTitle: { fr: "Voyages de groupe", en: "Group Travel" },
    description: { fr: "Organiser un voyage de groupe en jet privé n'a jamais été aussi simple. Que ce soit pour un séminaire d'entreprise, un événement familial, un voyage incentive ou une tournée sportive, nous disposons d'appareils pouvant accueillir de 10 à 50+ passagers. Nos VIP airliners (Boeing BBJ, Airbus ACJ) offrent des espaces modulables avec salons, salles de réunion et zones de repos. Pour les groupes plus restreints, nos heavy jets comme le Global 6000 ou le Falcon 7X proposent un confort optimal avec une configuration flexible.", en: "Organising group travel by private jet has never been easier. Whether for a corporate seminar, a family event, an incentive trip or a sports tour, we have aircraft that can accommodate from 10 to 50+ passengers. Our VIP airliners (Boeing BBJ, Airbus ACJ) offer modular spaces with lounges, meeting rooms and rest areas. For smaller groups, our heavy jets such as the Global 6000 or Falcon 7X provide optimal comfort with a flexible configuration." },
    shortDescription: { fr: "Des solutions charter pour vos groupes de 10 à 50+ passagers : séminaires, événements, voyages incentive.", en: "Charter solutions for your groups of 10 to 50+ passengers: seminars, events, incentive trips." },
    icon: "users",
    image: "/images/services/groupe.jpg",
    advantages: [
      { title: { fr: "Capacité flexible", en: "Flexible Capacity" }, description: { fr: "De 10 à 50+ passagers selon vos besoins, appareils modulables", en: "From 10 to 50+ passengers depending on your needs, with modular aircraft" } },
      { title: { fr: "Logistique simplifiée", en: "Simplified Logistics" }, description: { fr: "Un seul interlocuteur pour tout organiser : vol, catering, transferts", en: "A single point of contact to organise everything: flight, catering, transfers" } },
      { title: { fr: "Productivité en vol", en: "In-Flight Productivity" }, description: { fr: "Salles de réunion à bord, Wi-Fi, espaces de travail dédiés", en: "Onboard meeting rooms, Wi-Fi, dedicated workspaces" } },
      { title: { fr: "Tarif par siège avantageux", en: "Competitive Per-Seat Pricing" }, description: { fr: "Le coût par personne devient très compétitif pour les grands groupes", en: "The cost per person becomes highly competitive for large groups" } },
    ],
    steps: [
      { title: { fr: "Définissez vos besoins", en: "Define Your Needs" }, description: { fr: "Nombre de passagers, dates, destinations, services souhaités à bord.", en: "Number of passengers, dates, destinations, desired onboard services." } },
      { title: { fr: "Recevez nos propositions", en: "Receive Our Proposals" }, description: { fr: "Nous vous présentons les meilleures options d'appareils avec devis détaillé.", en: "We present you with the best aircraft options along with a detailed quote." } },
      { title: { fr: "Personnalisez votre vol", en: "Customise Your Flight" }, description: { fr: "Configuration cabine, catering, branding à bord si souhaité.", en: "Cabin configuration, catering, onboard branding if desired." } },
      { title: { fr: "Voyagez ensemble", en: "Travel Together" }, description: { fr: "Votre groupe profite d'une expérience de vol inoubliable et cohésive.", en: "Your group enjoys an unforgettable and cohesive flight experience." } },
    ],
    faq: [
      { question: { fr: "Quel est le nombre maximum de passagers ?", en: "What is the maximum number of passengers?" }, answer: { fr: "Nos VIP airliners (Boeing BBJ, Airbus ACJ) peuvent accueillir jusqu'à 50 passagers en configuration VIP, et plus de 100 en configuration mixte.", en: "Our VIP airliners (Boeing BBJ, Airbus ACJ) can accommodate up to 50 passengers in VIP configuration, and over 100 in mixed configuration." } },
      { question: { fr: "Peut-on organiser un séminaire à bord ?", en: "Can a seminar be held on board?" }, answer: { fr: "Absolument. Nos heavy jets et VIP airliners disposent de salles de réunion équipées, de systèmes de présentation et de connectivité Wi-Fi haut débit.", en: "Absolutely. Our heavy jets and VIP airliners feature fully equipped meeting rooms, presentation systems and high-speed Wi-Fi connectivity." } },
    ],
  },
  {
    id: "fret",
    slug: "fret-urgent",
    title: { fr: "Fret aérien urgent", en: "Urgent Air Freight" },
    shortTitle: { fr: "Fret urgent", en: "Urgent Freight" },
    description: { fr: "Quand le temps est critique, notre service de fret aérien urgent assure la livraison de vos marchandises partout dans le monde dans les délais les plus courts. Pièces industrielles, documents confidentiels, œuvres d'art, matériel médical : nous transportons tout type de fret avec le plus grand soin. Nos avions cargo dédiés et notre réseau d'opérateurs spécialisés garantissent une prise en charge immédiate et un suivi en temps réel de votre envoi.", en: "When time is critical, our urgent air freight service ensures delivery of your goods anywhere in the world within the shortest timeframes. Industrial parts, confidential documents, works of art, medical equipment: we transport all types of freight with the utmost care. Our dedicated cargo aircraft and our network of specialist operators guarantee immediate handling and real-time tracking of your shipment." },
    shortDescription: { fr: "Transport aérien express de fret urgent : pièces industrielles, documents, œuvres d'art, matériel médical.", en: "Express air transport of urgent freight: industrial parts, documents, works of art, medical equipment." },
    icon: "package",
    image: "/images/services/fret.jpg",
    advantages: [
      { title: { fr: "Rapidité maximale", en: "Maximum Speed" }, description: { fr: "Prise en charge en moins de 2 heures, livraison dans la journée en Europe", en: "Handling in under 2 hours, same-day delivery across Europe" } },
      { title: { fr: "Tous types de fret", en: "All Types of Freight" }, description: { fr: "Pièces industrielles, médical, œuvres d'art, documents confidentiels", en: "Industrial parts, medical supplies, works of art, confidential documents" } },
      { title: { fr: "Suivi en temps réel", en: "Real-Time Tracking" }, description: { fr: "Tracking GPS de votre envoi du départ à la livraison", en: "GPS tracking of your shipment from departure to delivery" } },
      { title: { fr: "Sécurité renforcée", en: "Enhanced Security" }, description: { fr: "Emballage spécialisé, manipulation soignée, assurance complète", en: "Specialist packaging, careful handling, comprehensive insurance" } },
    ],
    steps: [
      { title: { fr: "Urgence identifiée", en: "Urgency Identified" }, description: { fr: "Contactez-nous 24/7 avec les détails de votre envoi : nature, poids, dimensions, délai.", en: "Contact us 24/7 with the details of your shipment: nature, weight, dimensions, deadline." } },
      { title: { fr: "Solution immédiate", en: "Immediate Solution" }, description: { fr: "Nous identifions l'appareil le plus adapté et le plus rapidement disponible.", en: "We identify the most suitable and fastest available aircraft." } },
      { title: { fr: "Enlèvement express", en: "Express Collection" }, description: { fr: "Prise en charge de votre fret et acheminement vers l'avion.", en: "Your freight is collected and transported to the aircraft." } },
      { title: { fr: "Livraison garantie", en: "Guaranteed Delivery" }, description: { fr: "Votre marchandise est livrée à destination dans les délais convenus.", en: "Your goods are delivered to their destination within the agreed timeframe." } },
    ],
    faq: [
      { question: { fr: "Quel est le délai minimum pour un fret urgent ?", en: "What is the minimum lead time for urgent freight?" }, answer: { fr: "Nous pouvons organiser un vol cargo en aussi peu que 2 heures pour les urgences critiques, 24/7, 365 jours par an.", en: "We can arrange a cargo flight in as little as 2 hours for critical emergencies, 24/7, 365 days a year." } },
      { question: { fr: "Quels types de marchandises pouvez-vous transporter ?", en: "What types of goods can you transport?" }, answer: { fr: "Pratiquement tout : pièces détachées, matériel médical, échantillons, documents, œuvres d'art, véhicules de luxe. Nous respectons toutes les réglementations douanières et de transport.", en: "Virtually anything: spare parts, medical equipment, samples, documents, works of art, luxury vehicles. We comply with all customs and transport regulations." } },
    ],
  },
  {
    id: "conciergerie",
    slug: "conciergerie-lifestyle",
    title: { fr: "Conciergerie & Lifestyle", en: "Concierge & Lifestyle" },
    shortTitle: { fr: "Conciergerie & Lifestyle", en: "Concierge & Lifestyle" },
    description: { fr: "Notre service de conciergerie transforme votre vol en une expérience complète. Bien au-delà du simple transport aérien, nous orchestrons chaque aspect de votre voyage : réservation d'hôtels 5 étoiles, restaurants étoilés Michelin, transferts en voiture de luxe, yacht, hélicoptère, accès à des événements exclusifs, shopping privé, et bien plus encore. Notre réseau de partenaires premium à travers le monde nous permet de répondre à toute demande, même la plus exclusive.", en: "Our concierge service transforms your flight into a complete experience. Going far beyond simple air transport, we orchestrate every aspect of your trip: booking 5-star hotels, Michelin-starred restaurants, luxury car transfers, yachts, helicopters, access to exclusive events, private shopping, and much more. Our network of premium partners around the world allows us to fulfil any request, no matter how exclusive." },
    shortDescription: { fr: "Un service de conciergerie complet : hôtels, restaurants, transferts, événements, shopping privé.", en: "A comprehensive concierge service: hotels, restaurants, transfers, events, private shopping." },
    icon: "concierge",
    image: "/images/services/conciergerie.jpg",
    advantages: [
      { title: { fr: "Sur mesure intégral", en: "Fully Bespoke" }, description: { fr: "Chaque aspect de votre séjour est personnalisé selon vos préférences", en: "Every aspect of your stay is personalised to your preferences" } },
      { title: { fr: "Réseau exclusif", en: "Exclusive Network" }, description: { fr: "Accès aux meilleurs établissements et événements à travers le monde", en: "Access to the finest establishments and events around the world" } },
      { title: { fr: "Interlocuteur unique", en: "Single Point of Contact" }, description: { fr: "Un seul contact pour l'intégralité de votre voyage", en: "One contact for your entire trip" } },
      { title: { fr: "Disponibilité 24/7", en: "24/7 Availability" }, description: { fr: "Notre équipe est joignable à tout moment pendant votre séjour", en: "Our team is reachable at any time during your stay" } },
    ],
    steps: [
      { title: { fr: "Partagez vos envies", en: "Share Your Wishes" }, description: { fr: "Décrivez votre voyage idéal : destinations, activités, préférences, budget.", en: "Describe your ideal trip: destinations, activities, preferences, budget." } },
      { title: { fr: "Programme sur mesure", en: "Bespoke Programme" }, description: { fr: "Nous créons un itinéraire complet avec réservations et logistique coordonnées.", en: "We create a complete itinerary with coordinated bookings and logistics." } },
      { title: { fr: "Validation", en: "Approval" }, description: { fr: "Ajustez le programme selon vos souhaits. Chaque détail est modifiable.", en: "Adjust the programme to your liking. Every detail can be modified." } },
      { title: { fr: "Vivez l'expérience", en: "Live the Experience" }, description: { fr: "Profitez d'un voyage parfaitement orchestré, sans aucun souci logistique.", en: "Enjoy a perfectly orchestrated trip, free from any logistical concerns." } },
    ],
    faq: [
      { question: { fr: "Quels services de conciergerie proposez-vous ?", en: "What concierge services do you offer?" }, answer: { fr: "Réservations d'hôtels et restaurants, transferts VIP (voiture, hélicoptère, yacht), accès événements, shopping privé, guides touristiques, soins spa, billets spectacles, et toute demande spéciale.", en: "Hotel and restaurant bookings, VIP transfers (car, helicopter, yacht), event access, private shopping, tour guides, spa treatments, show tickets, and any special request." } },
      { question: { fr: "Le service de conciergerie est-il inclus dans le prix du vol ?", en: "Is the concierge service included in the flight price?" }, answer: { fr: "Un service de conciergerie basique (transferts, recommandations) est offert. Le service complet (réservations, organisation de séjour) est proposé en option ou inclus dans nos packages Expériences.", en: "A basic concierge service (transfers, recommendations) is complimentary. The full service (bookings, stay organisation) is available as an option or included in our Experience packages." } },
    ],
  },
  {
    id: "transferts",
    slug: "transferts-vip",
    title: { fr: "Transferts VIP", en: "VIP Transfers" },
    shortTitle: { fr: "Transferts VIP", en: "VIP Transfers" },
    description: { fr: "Complétez votre expérience de vol avec nos transferts VIP. Nous assurons la liaison entre votre domicile, hôtel ou bureau et le terminal d'aviation privée avec une flotte de véhicules haut de gamme : berlines de luxe, SUV, limousines, vans VIP. Pour les destinations nécessitant un accès rapide, nos transferts en hélicoptère vous permettent de relier l'aéroport au centre-ville ou à votre destination finale en quelques minutes.", en: "Complete your flight experience with our VIP transfers. We provide the connection between your home, hotel or office and the private aviation terminal with a fleet of high-end vehicles: luxury saloons, SUVs, limousines, VIP vans. For destinations requiring rapid access, our helicopter transfers allow you to travel from the airport to the city centre or your final destination in just minutes." },
    shortDescription: { fr: "Transferts sol-air en véhicules de luxe ou hélicoptère, du domicile au terminal privé.", en: "Ground-to-air transfers by luxury vehicle or helicopter, from your doorstep to the private terminal." },
    icon: "car",
    image: "/images/services/transferts.jpg",
    advantages: [
      { title: { fr: "Porte-à-porte", en: "Door-to-Door" }, description: { fr: "De votre domicile au terminal VIP, sans rupture de service", en: "From your home to the VIP terminal, with seamless service throughout" } },
      { title: { fr: "Flotte premium", en: "Premium Fleet" }, description: { fr: "Mercedes Classe S, Range Rover, Rolls-Royce, hélicoptère", en: "Mercedes S-Class, Range Rover, Rolls-Royce, helicopter" } },
      { title: { fr: "Chauffeurs expérimentés", en: "Experienced Chauffeurs" }, description: { fr: "Professionnels discrets et bilingues, connaissance parfaite des trajets", en: "Discreet, bilingual professionals with expert knowledge of all routes" } },
      { title: { fr: "Ponctualité garantie", en: "Guaranteed Punctuality" }, description: { fr: "Suivi en temps réel de votre vol pour ajuster l'heure de prise en charge", en: "Real-time flight tracking to adjust your pick-up time accordingly" } },
    ],
    steps: [
      { title: { fr: "Indiquez vos besoins", en: "Specify Your Needs" }, description: { fr: "Point de prise en charge, destination, nombre de passagers, bagages.", en: "Pick-up point, destination, number of passengers, luggage." } },
      { title: { fr: "Choix du véhicule", en: "Choose Your Vehicle" }, description: { fr: "Sélectionnez votre véhicule parmi notre flotte premium.", en: "Select your vehicle from our premium fleet." } },
      { title: { fr: "Confirmation", en: "Confirmation" }, description: { fr: "Recevez les coordonnées de votre chauffeur et les détails du transfert.", en: "Receive your chauffeur's details and the transfer information." } },
      { title: { fr: "Transfert en toute sérénité", en: "Stress-Free Transfer" }, description: { fr: "Votre chauffeur vous attend à l'heure convenue pour un trajet sans stress.", en: "Your chauffeur awaits you at the agreed time for a smooth journey." } },
    ],
    faq: [
      { question: { fr: "Quels véhicules sont disponibles ?", en: "What vehicles are available?" }, answer: { fr: "Mercedes Classe S et V, BMW Série 7, Range Rover, Rolls-Royce Phantom, Bentley, et même des hélicoptères VIP pour les liaisons aéroport-ville.", en: "Mercedes S-Class and V-Class, BMW 7 Series, Range Rover, Rolls-Royce Phantom, Bentley, and even VIP helicopters for airport-to-city transfers." } },
      { question: { fr: "Le transfert est-il inclus dans le prix du vol ?", en: "Is the transfer included in the flight price?" }, answer: { fr: "Un transfert standard en berline est souvent inclus dans nos packages. Les options premium (Rolls-Royce, hélicoptère) sont disponibles en supplément.", en: "A standard saloon transfer is often included in our packages. Premium options (Rolls-Royce, helicopter) are available at an additional cost." } },
    ],
  },
  {
    id: "gestion",
    slug: "gestion-appareil",
    title: { fr: "Gestion d'appareil", en: "Aircraft Management" },
    shortTitle: { fr: "Gestion d'appareil", en: "Aircraft Management" },
    description: { fr: "Vous possédez un jet privé ? Notre service de gestion d'appareil optimise l'exploitation de votre investissement. Nous prenons en charge l'intégralité de la gestion opérationnelle : maintenance, planification des vols, gestion des équipages, conformité réglementaire, assurances et commercialisation de votre appareil pour générer des revenus locatifs quand vous ne l'utilisez pas. Notre expertise permet de réduire significativement vos coûts d'exploitation tout en maximisant la disponibilité de votre jet.", en: "Do you own a private jet? Our aircraft management service optimises the return on your investment. We handle the entirety of operational management: maintenance, flight planning, crew management, regulatory compliance, insurance and marketing your aircraft to generate charter revenue when you are not using it. Our expertise allows you to significantly reduce your operating costs while maximising the availability of your jet." },
    shortDescription: { fr: "Gestion complète de votre jet privé : maintenance, équipages, exploitation, revenus locatifs.", en: "Complete management of your private jet: maintenance, crew, operations, charter revenue." },
    icon: "settings",
    image: "/images/services/gestion.jpg",
    advantages: [
      { title: { fr: "Réduction des coûts", en: "Cost Reduction" }, description: { fr: "Optimisation des coûts d'exploitation et revenus locatifs pour compenser", en: "Optimisation of operating costs and charter revenue to offset expenses" } },
      { title: { fr: "Gestion 360°", en: "360-Degree Management" }, description: { fr: "Maintenance, équipages, assurances, réglementaire, tout est géré", en: "Maintenance, crew, insurance, regulatory compliance - everything is handled" } },
      { title: { fr: "Disponibilité maximale", en: "Maximum Availability" }, description: { fr: "Planification intelligente pour garantir votre appareil quand vous en avez besoin", en: "Intelligent planning to ensure your aircraft is ready when you need it" } },
      { title: { fr: "Revenus locatifs", en: "Charter Revenue" }, description: { fr: "Commercialisation de votre jet quand vous ne l'utilisez pas", en: "Marketing your jet for charter when you are not using it" } },
    ],
    steps: [
      { title: { fr: "Audit initial", en: "Initial Audit" }, description: { fr: "Évaluation complète de votre appareil, coûts actuels et potentiel d'optimisation.", en: "Complete assessment of your aircraft, current costs and optimisation potential." } },
      { title: { fr: "Plan de gestion", en: "Management Plan" }, description: { fr: "Proposition d'un plan de gestion sur mesure avec objectifs chiffrés.", en: "Proposal of a bespoke management plan with measurable objectives." } },
      { title: { fr: "Mise en œuvre", en: "Implementation" }, description: { fr: "Prise en charge opérationnelle complète de votre appareil.", en: "Full operational takeover of your aircraft." } },
      { title: { fr: "Reporting régulier", en: "Regular Reporting" }, description: { fr: "Rapports mensuels détaillés sur l'exploitation, les coûts et les revenus.", en: "Detailed monthly reports on operations, costs and revenue." } },
    ],
    faq: [
      { question: { fr: "Combien peut rapporter la location de mon jet ?", en: "How much can chartering my jet generate?" }, answer: { fr: "Selon le type d'appareil et sa disponibilité, les revenus locatifs peuvent couvrir 40 à 70% des coûts fixes annuels de votre jet. Nous vous fournissons une estimation détaillée lors de l'audit initial.", en: "Depending on the aircraft type and its availability, charter revenue can cover 40 to 70% of your jet's annual fixed costs. We provide you with a detailed estimate during the initial audit." } },
      { question: { fr: "Mon jet reste-t-il disponible quand j'en ai besoin ?", en: "Does my jet remain available when I need it?" }, answer: { fr: "Absolument. Vous définissez vos priorités d'utilisation. Votre appareil est toujours disponible pour vos vols avec un préavis convenu ensemble.", en: "Absolutely. You set your usage priorities. Your aircraft is always available for your flights with an agreed notice period." } },
    ],
  },
  {
    id: "achat-vente",
    slug: "achat-vente-jet",
    title: { fr: "Achat & Vente de jet privé", en: "Jet Sales & Acquisitions" },
    shortTitle: { fr: "Achat/Vente de jet", en: "Jet Sales & Acquisitions" },
    description: { fr: "Que vous souhaitiez acquérir votre premier jet privé ou céder votre appareil actuel, notre département Achat & Vente vous accompagne à chaque étape de la transaction. Notre connaissance approfondie du marché, notre réseau international de propriétaires et d'acheteurs, et notre expertise technique vous garantissent une transaction sécurisée au meilleur prix. Nous proposons également des solutions de financement et de leasing adaptées à votre situation.", en: "Whether you wish to acquire your first private jet or sell your current aircraft, our Sales & Acquisitions department supports you at every stage of the transaction. Our in-depth market knowledge, international network of owners and buyers, and technical expertise guarantee you a secure transaction at the best price. We also offer financing and leasing solutions tailored to your situation." },
    shortDescription: { fr: "Accompagnement complet pour l'acquisition ou la cession de votre jet privé.", en: "Full support for the acquisition or sale of your private jet." },
    icon: "handshake",
    image: "/images/services/achat-vente.jpg",
    advantages: [
      { title: { fr: "Expertise marché", en: "Market Expertise" }, description: { fr: "Connaissance approfondie des tendances, prix et opportunités du marché", en: "In-depth knowledge of market trends, prices and opportunities" } },
      { title: { fr: "Réseau international", en: "International Network" }, description: { fr: "Accès à un portefeuille d'appareils et d'acheteurs dans le monde entier", en: "Access to a portfolio of aircraft and buyers worldwide" } },
      { title: { fr: "Due diligence complète", en: "Comprehensive Due Diligence" }, description: { fr: "Inspection technique, vérification historique, conformité réglementaire", en: "Technical inspection, history verification, regulatory compliance" } },
      { title: { fr: "Solutions de financement", en: "Financing Solutions" }, description: { fr: "Leasing, crédit, solutions fiscales optimisées selon votre situation", en: "Leasing, credit, optimised tax solutions tailored to your situation" } },
    ],
    steps: [
      { title: { fr: "Définition du cahier des charges", en: "Requirements Definition" }, description: { fr: "Vos besoins, budget, missions types, préférences de constructeur.", en: "Your needs, budget, typical missions, manufacturer preferences." } },
      { title: { fr: "Recherche & Présélection", en: "Search & Shortlisting" }, description: { fr: "Identification des appareils correspondants sur le marché mondial.", en: "Identification of matching aircraft on the global market." } },
      { title: { fr: "Inspection & Négociation", en: "Inspection & Negotiation" }, description: { fr: "Due diligence technique complète et négociation au meilleur prix.", en: "Comprehensive technical due diligence and negotiation for the best price." } },
      { title: { fr: "Acquisition & Livraison", en: "Acquisition & Delivery" }, description: { fr: "Finalisation de la transaction, personnalisation et livraison de votre jet.", en: "Finalisation of the transaction, customisation and delivery of your jet." } },
    ],
    faq: [
      { question: { fr: "Combien coûte un jet privé ?", en: "How much does a private jet cost?" }, answer: { fr: "Les prix varient énormément selon la catégorie : de 2M€ pour un very light jet d'occasion à 70M€+ pour un ultra long range neuf. Nous trouvons l'appareil adapté à votre budget.", en: "Prices vary significantly by category: from 2M EUR for a pre-owned very light jet to 70M+ EUR for a new ultra-long-range aircraft. We find the aircraft that suits your budget." } },
      { question: { fr: "Neuf ou occasion, que recommandez-vous ?", en: "New or pre-owned, what do you recommend?" }, answer: { fr: "Cela dépend de votre budget et de vos besoins. Un appareil d'occasion récent offre souvent le meilleur rapport qualité-prix. Un appareil neuf garantit les dernières technologies et une personnalisation complète.", en: "It depends on your budget and needs. A recent pre-owned aircraft often offers the best value for money. A new aircraft guarantees the latest technology and full customisation." } },
    ],
  },
];
