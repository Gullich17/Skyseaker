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
    title: "Affrètement de jet privé",
    shortTitle: "Affrètement personnalisé",
    description: "L'affrètement de jet privé est notre cœur de métier. Nous mettons à votre disposition plus de 8 500 appareils certifiés à travers le monde pour vous offrir un vol parfaitement adapté à vos besoins. Que vous voyagiez pour affaires ou pour le plaisir, chaque détail est pensé pour vous : choix de l'appareil, horaires flexibles, catering sur mesure et transferts coordonnés. Notre équipe de conseillers dédiés vous accompagne 24h/24 pour garantir une expérience de vol exceptionnelle, de la demande de devis jusqu'à votre arrivée à destination. Nous travaillons exclusivement avec des opérateurs certifiés et audités régulièrement, assurant les plus hauts standards de sécurité et de qualité de service.",
    shortDescription: "Un vol sur mesure, adapté à vos moindres exigences, avec accès à plus de 8 500 appareils certifiés dans le monde entier.",
    icon: "plane",
    image: "/images/services/affretement.jpg",
    advantages: [
      { title: "Flexibilité totale", description: "Départ et arrivée selon vos horaires, modification jusqu'au dernier moment" },
      { title: "Choix illimité", description: "Accès à plus de 8 500 appareils certifiés dans le monde entier" },
      { title: "Service premium", description: "Conseiller dédié disponible 24/7, catering sur mesure, transferts inclus" },
      { title: "Sécurité maximale", description: "Opérateurs certifiés EASA, audits réguliers, assurances complètes" },
    ],
    steps: [
      { title: "Demande de devis", description: "Partagez vos besoins via notre formulaire ou par téléphone. Réponse sous 30 minutes." },
      { title: "Proposition personnalisée", description: "Recevez une sélection d'appareils adaptés avec tarifs détaillés et transparents." },
      { title: "Confirmation", description: "Validez votre choix. Notre équipe coordonne chaque détail de votre vol." },
      { title: "Jour J", description: "Arrivez au terminal VIP 15 minutes avant le départ. Décollage immédiat." },
    ],
    faq: [
      { question: "Combien coûte un vol en jet privé ?", answer: "Le prix varie selon la distance, le type d'appareil et la disponibilité. Un vol Paris-Nice débute autour de 4 800€, tandis qu'un Paris-New York se situe à partir de 65 000€. Demandez un devis personnalisé pour un tarif exact." },
      { question: "Quel est le délai minimum pour réserver ?", answer: "Nous pouvons organiser un vol en aussi peu que 2 heures dans les cas urgents. Pour un service optimal, nous recommandons un préavis de 24 à 48 heures." },
      { question: "Les animaux sont-ils acceptés à bord ?", answer: "Oui, la plupart des appareils acceptent les animaux de compagnie en cabine, sans restriction de taille ni cage obligatoire. Précisez-le lors de votre demande." },
      { question: "Le catering est-il inclus ?", answer: "Un service de boissons standard est inclus. Pour le catering gastronomique (chef à bord, menus sur mesure), des options premium sont disponibles sur demande." },
    ],
  },
  {
    id: "empty-legs",
    slug: "vols-a-vide-empty-legs",
    title: "Vols à vide — Empty Legs",
    shortTitle: "Vols à vide (Empty Legs)",
    description: "Les empty legs sont des vols de repositionnement : lorsqu'un jet privé doit se déplacer à vide pour rejoindre son prochain client ou retourner à sa base, nous proposons ces vols à des tarifs considérablement réduits, jusqu'à -75% par rapport à un affrètement classique. C'est l'opportunité idéale de voyager en jet privé à un prix accessible. Notre plateforme référence en temps réel des centaines de vols à vide disponibles chaque semaine sur toute l'Europe et au-delà. Vous pouvez également créer des alertes personnalisées pour être notifié dès qu'un vol correspond à vos critères.",
    shortDescription: "Profitez de nos repositionnements d'appareils pour voler en jet privé à tarif réduit, jusqu'à -75%.",
    icon: "tag",
    image: "/images/services/empty-legs.jpg",
    advantages: [
      { title: "Jusqu'à -75%", description: "Tarifs considérablement réduits par rapport à un affrètement classique" },
      { title: "Même qualité", description: "Service, confort et sécurité identiques à un vol charter standard" },
      { title: "Alertes personnalisées", description: "Recevez une notification dès qu'un vol correspond à vos critères" },
      { title: "Offres en temps réel", description: "Des centaines de vols disponibles mis à jour quotidiennement" },
    ],
    steps: [
      { title: "Consultez les offres", description: "Parcourez notre listing d'empty legs ou créez une alerte personnalisée." },
      { title: "Réservez rapidement", description: "Les empty legs partent vite. Confirmez votre réservation en ligne ou par téléphone." },
      { title: "Préparez votre vol", description: "Recevez tous les détails : terminal, horaire, appareil assigné." },
      { title: "Voyagez à prix réduit", description: "Profitez d'un vol en jet privé avec le même niveau de service premium." },
    ],
    faq: [
      { question: "Qu'est-ce qu'un empty leg exactement ?", answer: "Un empty leg (ou vol à vide) est un vol de repositionnement. Quand un jet privé doit voler sans passager pour rejoindre sa prochaine mission, nous commercialisons ce vol à tarif réduit." },
      { question: "Peut-on modifier les dates d'un empty leg ?", answer: "Les dates sont généralement fixes car liées au planning de l'appareil. Une légère flexibilité horaire est parfois possible, mais pas de changement de date." },
      { question: "Les empty legs sont-ils fiables ?", answer: "Les empty legs sont soumis à la confirmation du vol principal. En cas d'annulation (rare), nous vous proposons une alternative ou un remboursement intégral." },
    ],
  },
  {
    id: "groupe",
    slug: "voyage-groupe",
    title: "Voyages de groupe en jet privé",
    shortTitle: "Voyages de groupe",
    description: "Organiser un voyage de groupe en jet privé n'a jamais été aussi simple. Que ce soit pour un séminaire d'entreprise, un événement familial, un voyage incentive ou une tournée sportive, nous disposons d'appareils pouvant accueillir de 10 à 50+ passagers. Nos VIP airliners (Boeing BBJ, Airbus ACJ) offrent des espaces modulables avec salons, salles de réunion et zones de repos. Pour les groupes plus restreints, nos heavy jets comme le Global 6000 ou le Falcon 7X proposent un confort optimal avec une configuration flexible.",
    shortDescription: "Des solutions charter pour vos groupes de 10 à 50+ passagers : séminaires, événements, voyages incentive.",
    icon: "users",
    image: "/images/services/groupe.jpg",
    advantages: [
      { title: "Capacité flexible", description: "De 10 à 50+ passagers selon vos besoins, appareils modulables" },
      { title: "Logistique simplifiée", description: "Un seul interlocuteur pour tout organiser : vol, catering, transferts" },
      { title: "Productivité en vol", description: "Salles de réunion à bord, Wi-Fi, espaces de travail dédiés" },
      { title: "Tarif par siège avantageux", description: "Le coût par personne devient très compétitif pour les grands groupes" },
    ],
    steps: [
      { title: "Définissez vos besoins", description: "Nombre de passagers, dates, destinations, services souhaités à bord." },
      { title: "Recevez nos propositions", description: "Nous vous présentons les meilleures options d'appareils avec devis détaillé." },
      { title: "Personnalisez votre vol", description: "Configuration cabine, catering, branding à bord si souhaité." },
      { title: "Voyagez ensemble", description: "Votre groupe profite d'une expérience de vol inoubliable et cohésive." },
    ],
    faq: [
      { question: "Quel est le nombre maximum de passagers ?", answer: "Nos VIP airliners (Boeing BBJ, Airbus ACJ) peuvent accueillir jusqu'à 50 passagers en configuration VIP, et plus de 100 en configuration mixte." },
      { question: "Peut-on organiser un séminaire à bord ?", answer: "Absolument. Nos heavy jets et VIP airliners disposent de salles de réunion équipées, de systèmes de présentation et de connectivité Wi-Fi haut débit." },
    ],
  },
  {
    id: "fret",
    slug: "fret-urgent",
    title: "Fret aérien urgent",
    shortTitle: "Fret urgent",
    description: "Quand le temps est critique, notre service de fret aérien urgent assure la livraison de vos marchandises partout dans le monde dans les délais les plus courts. Pièces industrielles, documents confidentiels, œuvres d'art, matériel médical : nous transportons tout type de fret avec le plus grand soin. Nos avions cargo dédiés et notre réseau d'opérateurs spécialisés garantissent une prise en charge immédiate et un suivi en temps réel de votre envoi.",
    shortDescription: "Transport aérien express de fret urgent : pièces industrielles, documents, œuvres d'art, matériel médical.",
    icon: "package",
    image: "/images/services/fret.jpg",
    advantages: [
      { title: "Rapidité maximale", description: "Prise en charge en moins de 2 heures, livraison dans la journée en Europe" },
      { title: "Tous types de fret", description: "Pièces industrielles, médical, œuvres d'art, documents confidentiels" },
      { title: "Suivi en temps réel", description: "Tracking GPS de votre envoi du départ à la livraison" },
      { title: "Sécurité renforcée", description: "Emballage spécialisé, manipulation soignée, assurance complète" },
    ],
    steps: [
      { title: "Urgence identifiée", description: "Contactez-nous 24/7 avec les détails de votre envoi : nature, poids, dimensions, délai." },
      { title: "Solution immédiate", description: "Nous identifions l'appareil le plus adapté et le plus rapidement disponible." },
      { title: "Enlèvement express", description: "Prise en charge de votre fret et acheminement vers l'avion." },
      { title: "Livraison garantie", description: "Votre marchandise est livrée à destination dans les délais convenus." },
    ],
    faq: [
      { question: "Quel est le délai minimum pour un fret urgent ?", answer: "Nous pouvons organiser un vol cargo en aussi peu que 2 heures pour les urgences critiques, 24/7, 365 jours par an." },
      { question: "Quels types de marchandises pouvez-vous transporter ?", answer: "Pratiquement tout : pièces détachées, matériel médical, échantillons, documents, œuvres d'art, véhicules de luxe. Nous respectons toutes les réglementations douanières et de transport." },
    ],
  },
  {
    id: "conciergerie",
    slug: "conciergerie-lifestyle",
    title: "Conciergerie & Lifestyle",
    shortTitle: "Conciergerie & Lifestyle",
    description: "Notre service de conciergerie transforme votre vol en une expérience complète. Bien au-delà du simple transport aérien, nous orchestrons chaque aspect de votre voyage : réservation d'hôtels 5 étoiles, restaurants étoilés Michelin, transferts en voiture de luxe, yacht, hélicoptère, accès à des événements exclusifs, shopping privé, et bien plus encore. Notre réseau de partenaires premium à travers le monde nous permet de répondre à toute demande, même la plus exclusive.",
    shortDescription: "Un service de conciergerie complet : hôtels, restaurants, transferts, événements, shopping privé.",
    icon: "concierge",
    image: "/images/services/conciergerie.jpg",
    advantages: [
      { title: "Sur mesure intégral", description: "Chaque aspect de votre séjour est personnalisé selon vos préférences" },
      { title: "Réseau exclusif", description: "Accès aux meilleurs établissements et événements à travers le monde" },
      { title: "Interlocuteur unique", description: "Un seul contact pour l'intégralité de votre voyage" },
      { title: "Disponibilité 24/7", description: "Notre équipe est joignable à tout moment pendant votre séjour" },
    ],
    steps: [
      { title: "Partagez vos envies", description: "Décrivez votre voyage idéal : destinations, activités, préférences, budget." },
      { title: "Programme sur mesure", description: "Nous créons un itinéraire complet avec réservations et logistique coordonnées." },
      { title: "Validation", description: "Ajustez le programme selon vos souhaits. Chaque détail est modifiable." },
      { title: "Vivez l'expérience", description: "Profitez d'un voyage parfaitement orchestré, sans aucun souci logistique." },
    ],
    faq: [
      { question: "Quels services de conciergerie proposez-vous ?", answer: "Réservations d'hôtels et restaurants, transferts VIP (voiture, hélicoptère, yacht), accès événements, shopping privé, guides touristiques, soins spa, billets spectacles, et toute demande spéciale." },
      { question: "Le service de conciergerie est-il inclus dans le prix du vol ?", answer: "Un service de conciergerie basique (transferts, recommandations) est offert. Le service complet (réservations, organisation de séjour) est proposé en option ou inclus dans nos packages Expériences." },
    ],
  },
  {
    id: "transferts",
    slug: "transferts-vip",
    title: "Transferts VIP",
    shortTitle: "Transferts VIP",
    description: "Complétez votre expérience de vol avec nos transferts VIP. Nous assurons la liaison entre votre domicile, hôtel ou bureau et le terminal d'aviation privée avec une flotte de véhicules haut de gamme : berlines de luxe, SUV, limousines, vans VIP. Pour les destinations nécessitant un accès rapide, nos transferts en hélicoptère vous permettent de relier l'aéroport au centre-ville ou à votre destination finale en quelques minutes.",
    shortDescription: "Transferts sol-air en véhicules de luxe ou hélicoptère, du domicile au terminal privé.",
    icon: "car",
    image: "/images/services/transferts.jpg",
    advantages: [
      { title: "Porte-à-porte", description: "De votre domicile au terminal VIP, sans rupture de service" },
      { title: "Flotte premium", description: "Mercedes Classe S, Range Rover, Rolls-Royce, hélicoptère" },
      { title: "Chauffeurs expérimentés", description: "Professionnels discrets et bilingues, connaissance parfaite des trajets" },
      { title: "Ponctualité garantie", description: "Suivi en temps réel de votre vol pour ajuster l'heure de prise en charge" },
    ],
    steps: [
      { title: "Indiquez vos besoins", description: "Point de prise en charge, destination, nombre de passagers, bagages." },
      { title: "Choix du véhicule", description: "Sélectionnez votre véhicule parmi notre flotte premium." },
      { title: "Confirmation", description: "Recevez les coordonnées de votre chauffeur et les détails du transfert." },
      { title: "Transfert en toute sérénité", description: "Votre chauffeur vous attend à l'heure convenue pour un trajet sans stress." },
    ],
    faq: [
      { question: "Quels véhicules sont disponibles ?", answer: "Mercedes Classe S et V, BMW Série 7, Range Rover, Rolls-Royce Phantom, Bentley, et même des hélicoptères VIP pour les liaisons aéroport-ville." },
      { question: "Le transfert est-il inclus dans le prix du vol ?", answer: "Un transfert standard en berline est souvent inclus dans nos packages. Les options premium (Rolls-Royce, hélicoptère) sont disponibles en supplément." },
    ],
  },
  {
    id: "gestion",
    slug: "gestion-appareil",
    title: "Gestion d'appareil",
    shortTitle: "Gestion d'appareil",
    description: "Vous possédez un jet privé ? Notre service de gestion d'appareil optimise l'exploitation de votre investissement. Nous prenons en charge l'intégralité de la gestion opérationnelle : maintenance, planification des vols, gestion des équipages, conformité réglementaire, assurances et commercialisation de votre appareil pour générer des revenus locatifs quand vous ne l'utilisez pas. Notre expertise permet de réduire significativement vos coûts d'exploitation tout en maximisant la disponibilité de votre jet.",
    shortDescription: "Gestion complète de votre jet privé : maintenance, équipages, exploitation, revenus locatifs.",
    icon: "settings",
    image: "/images/services/gestion.jpg",
    advantages: [
      { title: "Réduction des coûts", description: "Optimisation des coûts d'exploitation et revenus locatifs pour compenser" },
      { title: "Gestion 360°", description: "Maintenance, équipages, assurances, réglementaire, tout est géré" },
      { title: "Disponibilité maximale", description: "Planification intelligente pour garantir votre appareil quand vous en avez besoin" },
      { title: "Revenus locatifs", description: "Commercialisation de votre jet quand vous ne l'utilisez pas" },
    ],
    steps: [
      { title: "Audit initial", description: "Évaluation complète de votre appareil, coûts actuels et potentiel d'optimisation." },
      { title: "Plan de gestion", description: "Proposition d'un plan de gestion sur mesure avec objectifs chiffrés." },
      { title: "Mise en œuvre", description: "Prise en charge opérationnelle complète de votre appareil." },
      { title: "Reporting régulier", description: "Rapports mensuels détaillés sur l'exploitation, les coûts et les revenus." },
    ],
    faq: [
      { question: "Combien peut rapporter la location de mon jet ?", answer: "Selon le type d'appareil et sa disponibilité, les revenus locatifs peuvent couvrir 40 à 70% des coûts fixes annuels de votre jet. Nous vous fournissons une estimation détaillée lors de l'audit initial." },
      { question: "Mon jet reste-t-il disponible quand j'en ai besoin ?", answer: "Absolument. Vous définissez vos priorités d'utilisation. Votre appareil est toujours disponible pour vos vols avec un préavis convenu ensemble." },
    ],
  },
  {
    id: "achat-vente",
    slug: "achat-vente-jet",
    title: "Achat & Vente de jet privé",
    shortTitle: "Achat/Vente de jet",
    description: "Que vous souhaitiez acquérir votre premier jet privé ou céder votre appareil actuel, notre département Achat & Vente vous accompagne à chaque étape de la transaction. Notre connaissance approfondie du marché, notre réseau international de propriétaires et d'acheteurs, et notre expertise technique vous garantissent une transaction sécurisée au meilleur prix. Nous proposons également des solutions de financement et de leasing adaptées à votre situation.",
    shortDescription: "Accompagnement complet pour l'acquisition ou la cession de votre jet privé.",
    icon: "handshake",
    image: "/images/services/achat-vente.jpg",
    advantages: [
      { title: "Expertise marché", description: "Connaissance approfondie des tendances, prix et opportunités du marché" },
      { title: "Réseau international", description: "Accès à un portefeuille d'appareils et d'acheteurs dans le monde entier" },
      { title: "Due diligence complète", description: "Inspection technique, vérification historique, conformité réglementaire" },
      { title: "Solutions de financement", description: "Leasing, crédit, solutions fiscales optimisées selon votre situation" },
    ],
    steps: [
      { title: "Définition du cahier des charges", description: "Vos besoins, budget, missions types, préférences de constructeur." },
      { title: "Recherche & Présélection", description: "Identification des appareils correspondants sur le marché mondial." },
      { title: "Inspection & Négociation", description: "Due diligence technique complète et négociation au meilleur prix." },
      { title: "Acquisition & Livraison", description: "Finalisation de la transaction, personnalisation et livraison de votre jet." },
    ],
    faq: [
      { question: "Combien coûte un jet privé ?", answer: "Les prix varient énormément selon la catégorie : de 2M€ pour un very light jet d'occasion à 70M€+ pour un ultra long range neuf. Nous trouvons l'appareil adapté à votre budget." },
      { question: "Neuf ou occasion, que recommandez-vous ?", answer: "Cela dépend de votre budget et de vos besoins. Un appareil d'occasion récent offre souvent le meilleur rapport qualité-prix. Un appareil neuf garantit les dernières technologies et une personnalisation complète." },
    ],
  },
];
