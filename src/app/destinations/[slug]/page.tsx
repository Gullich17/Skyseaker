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
      "Genève, nichée au bord du lac Léman avec les Alpes en toile de fond, est une destination incontournable pour les voyageurs en jet privé. Capitale mondiale de la diplomatie, elle accueille le siège européen des Nations Unies, le CERN et de nombreuses organisations internationales. La ville est également un centre névralgique de la haute horlogerie et de la finance privée, attirant une clientèle d'affaires internationale tout au long de l'année. L'aéroport de Genève dispose d'installations dédiées à l'aviation privée de premier plan, avec des terminaux VIP offrant des services de conciergerie personnalisés, un accès direct au tarmac et des formalités douanières accélérées. En quelques minutes, vous rejoignez le centre-ville et ses palaces légendaires comme le Beau-Rivage ou le Four Seasons Hôtel des Bergues. La proximité des stations de ski prestigieuses comme Verbier, Gstaad ou Courchevel fait de Genève un hub idéal pour les amateurs de sports d'hiver. En été, le lac offre des activités nautiques exclusives et les vignobles de Lavaux, classés au patrimoine mondial de l'UNESCO, sont à portée de main. Que vous veniez pour le Salon International de la Haute Horlogerie, une réunion au siège d'une banque privée ou un week-end dans les Alpes, le vol en jet privé vers Genève transforme chaque déplacement en une expérience raffinée et efficace.",
    timezone: "UTC+1 (CET)",
    recommendedAircraft: ["citation-mustang", "citation-cj3-plus", "phenom-300e"],
    priceRange: "4 200 - 8 500",
    faq: [
      {
        question: "Quel est le temps de vol Paris-Genève en jet privé ?",
        answer:
          "Le temps de vol entre Paris et Genève en jet privé est d'environ 55 minutes, selon les conditions météorologiques et le type d'appareil choisi.",
      },
      {
        question: "Quel type de jet recommandez-vous pour Paris-Genève ?",
        answer:
          "Pour un vol Paris-Genève, nous recommandons un Very Light Jet ou Light Jet comme le Citation Mustang ou le Phenom 300E, idéaux pour ce court trajet.",
      },
      {
        question: "Y a-t-il un terminal privé à l'aéroport de Genève ?",
        answer:
          "Oui, l'aéroport de Genève dispose de plusieurs FBO (Fixed Base Operators) dédiés à l'aviation privée, offrant des services VIP complets incluant salon privé, conciergerie et transfert direct au tarmac.",
      },
    ],
  },
  londres: {
    seoText:
      "Londres, métropole mondiale par excellence, est la destination numéro un en aviation privée au départ de Paris. La capitale britannique dispose du réseau d'aéroports dédiés à l'aviation d'affaires le plus dense d'Europe, permettant un accès rapide et flexible à toutes les zones de la ville. De Luton au nord à Biggin Hill au sud, en passant par Farnborough à l'ouest, chaque aéroport offre des terminaux VIP avec des services haut de gamme. Les voyageurs d'affaires apprécient particulièrement la possibilité d'éviter les terminaux commerciaux bondés de Heathrow et Gatwick, gagnant un temps précieux. La City de Londres, Canary Wharf et Mayfair sont accessibles en moins de 45 minutes depuis les terminaux privés. Londres est un centre financier mondial, abritant la Bourse de Londres, la Banque d'Angleterre et les sièges de nombreuses multinationales. La ville attire également pour sa scène culturelle exceptionnelle avec le West End, ses musées de renommée mondiale et sa gastronomie étoilée. Pour les amateurs de sport, Wimbledon, Ascot et les matchs de Premier League sont des rendez-vous incontournables. Le vol en jet privé vers Londres vous offre une flexibilité totale sur les horaires et le choix de l'aéroport d'arrivée, optimisant chaque minute de votre séjour dans la capitale britannique.",
    timezone: "UTC+0 (GMT) / UTC+1 (BST)",
    recommendedAircraft: ["citation-cj3-plus", "phenom-300e", "citation-xls-plus"],
    priceRange: "5 800 - 12 000",
    faq: [
      {
        question: "Quel aéroport privé choisir à Londres ?",
        answer:
          "Le choix dépend de votre destination finale. Farnborough est idéal pour l'ouest de Londres et le Surrey, Luton pour le nord et la City, Biggin Hill pour le sud-est. Nos conseillers vous recommanderont le meilleur choix.",
      },
      {
        question: "Combien coûte un vol Paris-Londres en jet privé ?",
        answer:
          "Un vol Paris-Londres en jet privé coûte à partir de 5 800 euros en aller simple sur un Light Jet. Le prix varie selon le type d'appareil, la disponibilité et le choix de l'aéroport.",
      },
      {
        question: "Faut-il un passeport pour voler en jet privé vers Londres ?",
        answer:
          "Oui, depuis le Brexit, un passeport en cours de validité est requis pour voyager au Royaume-Uni, y compris en aviation privée. Les contrôles douaniers sont effectués directement au terminal privé.",
      },
    ],
  },
  mykonos: {
    seoText:
      "Mykonos, la perle des Cyclades, est devenue la destination estivale par excellence des voyageurs en jet privé. Cette île grecque mythique offre un mélange envoûtant de plages paradisiaques aux eaux cristallines, de villages blancs et bleus pittoresques, et d'une vie nocturne légendaire qui attire la jet-set internationale. L'aéroport de Mykonos, bien que compact, dispose de services dédiés à l'aviation privée avec un accueil VIP et un transfert rapide vers les complexes hôteliers de luxe de l'île. De juin à septembre, Mykonos vibre au rythme des beach clubs exclusifs comme Nammos et Scorpios, des restaurants gastronomiques en bord de mer et des boutiques de créateurs dans les ruelles de Chora. L'île offre également un patrimoine culturel riche avec les moulins à vent emblématiques, la Petite Venise et l'île sacrée de Délos à quelques encablures. Les voyageurs les plus discrets trouveront leur bonheur dans les villas privées avec piscine à débordement surplombant la mer Égée, accessibles uniquement par des chemins privés. Le vol en jet privé vers Mykonos est particulièrement apprécié car il permet d'éviter les correspondances souvent nécessaires en vol commercial. En environ trois heures depuis Paris, vous posez le pied sur cette île enchanteresse, prêt à profiter de chaque instant de votre séjour méditerranéen.",
    timezone: "UTC+2 (EET) / UTC+3 (EEST)",
    recommendedAircraft: ["phenom-300e", "citation-xls-plus", "praetor-500"],
    priceRange: "15 500 - 28 000",
    faq: [
      {
        question: "Quelle est la meilleure période pour voler vers Mykonos ?",
        answer:
          "La haute saison s'étend de juin à septembre, avec un pic en juillet-août. Mai et octobre offrent un climat agréable avec moins de monde. Nous recommandons de réserver tôt en haute saison.",
      },
      {
        question: "L'aéroport de Mykonos accepte-t-il les jets privés ?",
        answer:
          "Oui, l'aéroport de Mykonos (LGMK) accueille les jets privés avec des créneaux dédiés. En haute saison, les créneaux sont très demandés et doivent être réservés à l'avance.",
      },
      {
        question: "Un transfert hélicoptère est-il disponible depuis Mykonos ?",
        answer:
          "Oui, nous organisons des transferts en hélicoptère depuis Mykonos vers les îles voisines comme Santorin, Paros ou Naxos, ainsi que vers des yachts en mer.",
      },
    ],
  },
  dubai: {
    seoText:
      "Dubaï est le hub mondial du luxe et de l'aviation privée au Moyen-Orient. Cette métropole futuriste, érigée au cœur du désert, fascine par son audace architecturale, ses expériences de shopping incomparables et son art de vivre où l'excellence est la norme. Les deux aéroports de Dubaï offrent des installations de classe mondiale pour l'aviation privée, avec des terminaux VIP parmi les plus sophistiqués de la planète. Al Maktoum International, en particulier, est conçu pour accueillir les plus grands jets privés dans des conditions optimales. Dubaï attire les voyageurs d'affaires grâce à la Dubai International Financial Centre (DIFC), à sa position de carrefour entre l'Europe, l'Asie et l'Afrique, et à son environnement fiscal avantageux. Les amateurs de luxe trouveront leur bonheur dans les boutiques de la Dubai Mall, les restaurants étoilés du Burj Al Arab et les plages privées de Palm Jumeirah. L'émirat propose aussi des expériences uniques : safaris dans le désert en 4x4 de luxe, courses de chameaux, golf sur des parcours dessinés par les plus grands architectes, et croisières en yacht dans le golfe Persique. Le vol en jet privé vers Dubaï depuis Paris dure environ 6h30, permettant de voyager dans un confort absolu avec un service de restauration gastronomique à bord. C'est la destination idéale pour combiner affaires et plaisir dans un cadre d'exception.",
    timezone: "UTC+4 (GST)",
    recommendedAircraft: ["challenger-350", "global-6000", "falcon-7x"],
    priceRange: "28 000 - 55 000",
    faq: [
      {
        question: "Quel jet recommandez-vous pour Paris-Dubaï ?",
        answer:
          "Pour un vol Paris-Dubaï sans escale, nous recommandons un Super Midsize Jet comme le Challenger 350 ou un Heavy Jet comme le Global 6000, offrant l'autonomie et le confort nécessaires pour ce trajet de 6h30.",
      },
      {
        question: "Faut-il un visa pour Dubaï en jet privé ?",
        answer:
          "Les ressortissants français bénéficient d'un visa à l'arrivée gratuit pour les séjours de moins de 90 jours aux Émirats Arabes Unis. Les formalités sont simplifiées au terminal privé.",
      },
      {
        question: "Quel aéroport choisir à Dubaï pour l'aviation privée ?",
        answer:
          "Al Maktoum International (DWC) est généralement préféré pour l'aviation privée grâce à ses infrastructures dédiées et sa proximité avec les zones résidentielles de luxe. Dubai International (DXB) reste une option pour sa centralité.",
      },
    ],
  },
  marrakech: {
    seoText:
      "Marrakech, la ville rouge, est une destination envoûtante qui séduit les voyageurs du monde entier par son mélange unique de traditions séculaires et de luxe contemporain. À seulement trois heures de vol de Paris en jet privé, cette perle marocaine offre un dépaysement total avec ses souks animés, ses palais somptueux et ses jardins secrets. L'aéroport Marrakech-Ménara dispose d'un terminal dédié à l'aviation privée offrant un accueil chaleureux et des formalités simplifiées. En quelques minutes, vous rejoignez les plus beaux riads et palaces de la médina ou de la Palmeraie. La ville impériale fascine par son patrimoine architectural exceptionnel : la Koutoubia, les tombeaux Saadiens, le palais de la Bahia et les jardins de Majorelle sont des merveilles à découvrir. La gastronomie marocaine, entre tagines raffinés et pâtisseries délicates, est une expérience culinaire inoubliable. Les amateurs de golf apprécieront les parcours prestigieux du Royal Golf et de l'Amelkis, tandis que les passionnés de nature pourront explorer les vallées de l'Atlas en excursion privée. Marrakech est aussi une destination de choix pour les événements et célébrations, avec des lieux de réception spectaculaires comme les palais privés et les domaines de la Palmeraie. L'accueil marocain légendaire et le rapport qualité-prix exceptionnel des services de luxe font de Marrakech une destination privilégiée de l'aviation privée.",
    timezone: "UTC+1 (CET)",
    recommendedAircraft: ["phenom-300e", "citation-xls-plus", "praetor-500"],
    priceRange: "14 000 - 24 000",
    faq: [
      {
        question: "Combien de temps dure le vol Paris-Marrakech en jet privé ?",
        answer:
          "Le vol Paris-Marrakech en jet privé dure environ 3 heures et 15 minutes, selon le type d'appareil et les conditions de vol.",
      },
      {
        question: "Quels documents sont nécessaires pour voler vers Marrakech ?",
        answer:
          "Les ressortissants français n'ont pas besoin de visa pour un séjour de moins de 90 jours au Maroc. Un passeport en cours de validité suffit. Les formalités sont effectuées directement au terminal privé.",
      },
      {
        question: "Peut-on organiser un transfert depuis l'aéroport de Marrakech ?",
        answer:
          "Oui, nous organisons des transferts VIP en véhicule de luxe depuis le terminal privé de Marrakech-Ménara vers votre hôtel, riad ou villa privée, avec accueil personnalisé.",
      },
    ],
  },
  ibiza: {
    seoText:
      "Ibiza, l'île Blanche des Baléares, est bien plus qu'une destination festive. Si ses clubs légendaires comme Pacha, Amnesia et Ushuaïa continuent d'attirer la jet-set internationale, l'île révèle aussi un visage plus intime fait de criques secrètes, de villages perchés et d'une gastronomie méditerranéenne raffinée. À moins de deux heures de vol de Paris en jet privé, Ibiza offre une escapade idéale pour un week-end prolongé ou des vacances estivales. L'aéroport d'Ibiza accueille les jets privés avec des services VIP dédiés et un accès rapide aux différentes zones de l'île. Le nord de l'île, plus sauvage et préservé, abrite des hôtels-boutiques intimistes et des restaurants de ferme-à-table. Le sud et l'ouest concentrent les beach clubs glamour et les couchers de soleil spectaculaires de Café del Mar et Sunset Ashram. Les amateurs de bien-être trouveront à Ibiza une offre exceptionnelle de spas, retraites de yoga et centres holistiques. L'île est également réputée pour son marché hippie de Las Dalias et sa scène artistique dynamique. La location de yachts, les excursions vers Formentera en bateau privé et les visites de la vieille ville classée UNESCO complètent une offre touristique qui répond à toutes les envies. Le vol en jet privé vers Ibiza est la garantie d'un voyage sans stress, avec la liberté de partir et revenir selon votre rythme.",
    timezone: "UTC+1 (CET) / UTC+2 (CEST)",
    recommendedAircraft: ["citation-mustang", "phenom-100ev", "citation-cj3-plus"],
    priceRange: "9 800 - 16 000",
    faq: [
      {
        question: "Quelle est la meilleure saison pour voler vers Ibiza ?",
        answer:
          "La saison principale s'étend de mai à octobre. Juin et septembre offrent un excellent compromis entre beau temps et fréquentation raisonnable. Juillet et août sont les mois les plus animés.",
      },
      {
        question: "Peut-on atterrir à Formentera en jet privé ?",
        answer:
          "Non, Formentera ne dispose pas d'aéroport. Vous atterrissez à Ibiza et nous organisons un transfert en bateau rapide privé vers Formentera en 25 minutes environ.",
      },
      {
        question: "Combien coûte un vol Paris-Ibiza en jet privé ?",
        answer:
          "Un vol Paris-Ibiza en jet privé est disponible à partir de 9 800 euros en aller simple sur un Very Light Jet. Le prix varie selon la catégorie d'appareil et la période.",
      },
    ],
  },
  nice: {
    seoText:
      "Nice et la Côte d'Azur constituent la destination la plus emblématique de l'aviation privée en France. Entre le glamour du Festival de Cannes, l'adrénaline du Grand Prix de Monaco et le charme intemporel de Saint-Tropez, la Riviera française attire l'élite mondiale tout au long de l'année. L'aéroport Nice Côte d'Azur, deuxième aéroport de France, dispose d'excellentes installations pour l'aviation privée avec plusieurs FBO offrant des services VIP complets. Sa situation géographique exceptionnelle, en bord de mer à quelques minutes du centre-ville, en fait l'un des aéroports les plus agréables du monde. Nice séduit par sa Promenade des Anglais, son vieux Nice pittoresque et ses musées consacrés à Matisse et Chagall. La ville est aussi un point de départ idéal pour explorer l'arrière-pays niçois, les villages perchés de l'Esterel et les parfumeries de Grasse. La gastronomie locale, mêlant influences provençales et italiennes, est célébrée dans de nombreux restaurants étoilés. Les amateurs de yachting apprécieront la proximité du port de Nice, d'Antibes et de Monaco. En hiver, les stations de ski de l'arrière-pays comme Isola 2000 et Auron sont accessibles en moins d'une heure. Le vol en jet privé vers Nice offre une flexibilité totale et un gain de temps considérable, vous permettant de profiter pleinement de chaque instant sur la Côte d'Azur.",
    timezone: "UTC+1 (CET) / UTC+2 (CEST)",
    recommendedAircraft: ["citation-mustang", "phenom-100ev", "phenom-300e"],
    priceRange: "4 800 - 9 000",
    faq: [
      {
        question: "Quel est le temps de vol Paris-Nice en jet privé ?",
        answer:
          "Le vol Paris-Nice en jet privé dure environ 1 heure et 15 minutes, un gain de temps considérable par rapport aux vols commerciaux incluant les temps d'attente à l'aéroport.",
      },
      {
        question: "Un transfert hélicoptère est-il possible depuis Nice ?",
        answer:
          "Oui, nous proposons des transferts en hélicoptère depuis Nice vers Monaco (7 minutes), Saint-Tropez (20 minutes), Cannes (10 minutes) et les stations de ski de l'arrière-pays.",
      },
      {
        question: "Peut-on accéder à Monaco en jet privé ?",
        answer:
          "Monaco ne dispose pas d'aéroport. Le moyen le plus rapide est d'atterrir à Nice et de poursuivre en hélicoptère (7 minutes) ou en véhicule de luxe (30 minutes).",
      },
    ],
  },
  "new-york": {
    seoText:
      "New York, la ville qui ne dort jamais, est la destination transatlantique par excellence en aviation privée. Rejoindre Manhattan depuis Paris en jet privé est une expérience incomparable qui transforme un trajet de 8 heures en un voyage de pur confort et de productivité. Les aéroports dédiés à l'aviation privée, notamment Teterboro dans le New Jersey et Westchester County au nord, offrent un accès bien plus rapide à Manhattan que les aéroports commerciaux de JFK ou Newark. Teterboro, situé à seulement 20 minutes de Midtown, est le choix privilégié des voyageurs d'affaires avec ses multiples FBO offrant des services de premier plan. Un transfert en hélicoptère depuis Teterboro vers le Downtown Manhattan Heliport réduit encore le temps de trajet à quelques minutes. New York est un centre névralgique mondial pour la finance, la mode, l'art et la technologie. Wall Street, le Garment District, les galeries de Chelsea et les startups de SoHo coexistent dans une énergie créatrice unique. Les restaurants étoilés Michelin, les spectacles de Broadway, les musées comme le Met et le MoMA, et le shopping sur la Cinquième Avenue offrent des expériences infinies. Pour un vol Paris-New York en jet privé, nous recommandons un Heavy Jet ou Ultra Long Range comme le Global 6000 ou le Gulfstream G650ER, offrant l'espace et le confort nécessaires pour un vol transatlantique, avec la possibilité de se reposer dans une vraie suite à bord.",
    timezone: "UTC-5 (EST) / UTC-4 (EDT)",
    recommendedAircraft: ["global-6000", "falcon-7x", "gulfstream-g650er"],
    priceRange: "65 000 - 120 000",
    faq: [
      {
        question: "Combien de temps dure le vol Paris-New York en jet privé ?",
        answer:
          "Le vol Paris-New York en jet privé dure environ 8 heures vers l'ouest et 7 heures au retour, selon les vents et le type d'appareil. Un vol sans escale est possible avec un Heavy Jet ou Ultra Long Range.",
      },
      {
        question: "Quel aéroport choisir à New York pour l'aviation privée ?",
        answer:
          "Teterboro (TEB) est le choix numéro un pour sa proximité avec Manhattan (20 minutes). Westchester County (HPN) est idéal si votre destination est dans le nord de Manhattan ou le Connecticut.",
      },
      {
        question: "Quelles formalités douanières pour un vol privé vers les USA ?",
        answer:
          "Un ESTA ou visa valide est requis. Les formalités douanières américaines sont effectuées directement au FBO à votre arrivée. Nous vous assistons dans toutes les démarches administratives préalables au vol.",
      },
    ],
  },
  milan: {
    seoText:
      "Milan, capitale de la mode, du design et des affaires en Italie, est une destination prisée des voyageurs en jet privé pour sa richesse culturelle et économique. À seulement 1h20 de vol de Paris, cette métropole dynamique allie élégance italienne et modernité internationale. L'aéroport de Milano Linate, situé à quelques kilomètres du centre-ville, est le choix idéal pour les voyageurs d'affaires cherchant un accès rapide au quartier financier et au Quadrilatero della Moda. Malpensa, plus éloigné, offre des installations plus spacieuses pour l'aviation privée. Milan est le siège de la Bourse italienne, de grandes maisons de mode comme Armani, Prada et Versace, et accueille des événements majeurs comme la Fashion Week et le Salone del Mobile. La ville séduit aussi par son patrimoine architectural, du Duomo majestueux à La Scala, en passant par la Cène de Léonard de Vinci. La gastronomie milanaise, du risotto alla milanese à la cotoletta, se déguste dans des restaurants étoilés et des trattorias authentiques. Les lacs de Côme et de Garde, à moins d'une heure, offrent des escapades romantiques dans un cadre naturel spectaculaire. Le vol en jet privé vers Milan maximise votre temps et vous permet de combiner affaires et découvertes dans cette ville fascinante.",
    timezone: "UTC+1 (CET) / UTC+2 (CEST)",
    recommendedAircraft: ["citation-mustang", "phenom-100ev", "citation-cj3-plus"],
    priceRange: "5 200 - 10 000",
    faq: [
      {
        question: "Quel aéroport choisir à Milan ?",
        answer:
          "Linate est idéal pour un accès rapide au centre-ville (15 minutes). Malpensa est plus adapté si vous vous dirigez vers le lac de Côme ou le Piémont.",
      },
      {
        question: "Combien de temps dure le vol Paris-Milan en jet privé ?",
        answer:
          "Le vol Paris-Milan en jet privé dure environ 1 heure et 20 minutes sur un Light Jet, offrant un gain de temps significatif par rapport aux vols commerciaux.",
      },
      {
        question: "Peut-on voler vers le lac de Côme en jet privé ?",
        answer:
          "Le lac de Côme ne dispose pas d'aéroport, mais Milano Malpensa est situé à environ 45 minutes en voiture. Nous pouvons également organiser un transfert en hélicoptère.",
      },
    ],
  },
  sardaigne: {
    seoText:
      "La Sardaigne, et plus particulièrement la Costa Smeralda, est le rendez-vous estival de la jet-set internationale. Cette île méditerranéenne offre des paysages à couper le souffle : eaux turquoise, plages de sable blanc, rochers de granit sculptés par le vent et maquis parfumé. L'aéroport d'Olbia Costa Smeralda est la porte d'entrée idéale vers ce paradis, avec des installations modernes pour l'aviation privée et un accès direct aux plus beaux établissements de la côte. Porto Cervo, cœur battant de la Costa Smeralda, concentre les boutiques de luxe, les restaurants gastronomiques et les clubs nautiques les plus exclusifs de Méditerranée. Le port accueille chaque été les plus grands yachts du monde, créant une atmosphère unique de glamour décontracté. Au-delà de la Costa Smeralda, la Sardaigne recèle des trésors naturels et culturels : les grottes de Neptune, les vestiges nuraghiques millénaires, les villages de bergers de la Barbagia et les vignobles du Cannonau. La gastronomie sarde, mêlant produits de la mer et spécialités pastorales, est une découverte culinaire authentique. Le vol en jet privé vers la Sardaigne, d'environ 1h50 depuis Paris, offre la liberté de profiter de cette île exceptionnelle à votre rythme, loin des contraintes des vols commerciaux souvent surchargés en haute saison.",
    timezone: "UTC+1 (CET) / UTC+2 (CEST)",
    recommendedAircraft: ["phenom-300e", "citation-xls-plus", "citation-cj3-plus"],
    priceRange: "10 500 - 18 000",
    faq: [
      {
        question: "Quel est le meilleur aéroport pour la Costa Smeralda ?",
        answer:
          "L'aéroport d'Olbia Costa Smeralda (LIEO) est le plus proche, situé à seulement 20 minutes de Porto Cervo. Il dispose d'un terminal dédié à l'aviation privée.",
      },
      {
        question: "La Sardaigne est-elle accessible toute l'année en jet privé ?",
        answer:
          "Oui, l'aéroport d'Olbia est ouvert toute l'année. La haute saison s'étend de juin à septembre, mais le printemps et l'automne offrent un climat idéal pour découvrir l'île plus calmement.",
      },
      {
        question: "Peut-on organiser un transfert en yacht depuis l'aéroport ?",
        answer:
          "Oui, nous pouvons organiser un transfert direct depuis l'aéroport d'Olbia vers votre yacht ancré dans la marina de Porto Cervo ou ailleurs sur la côte.",
      },
    ],
  },
  maldives: {
    seoText:
      "Les Maldives représentent l'évasion ultime pour les voyageurs en jet privé. Cet archipel de 1 190 îles coralliennes, dispersées dans l'océan Indien, offre une expérience paradisiaque incomparable : villas sur pilotis au-dessus d'eaux turquoise cristallines, plages de sable blanc immaculé et récifs coralliens regorgeant de vie marine. Le voyage en jet privé vers les Maldives depuis Paris est une aventure en soi, avec environ 10h30 de vol vers Malé, suivies d'un transfert en hydravion ou en bateau rapide vers votre resort. L'aéroport international Velana de Malé accueille les jets privés avec des services VIP dédiés, simplifiant les formalités d'arrivée dans ce pays insulaire. Les resorts de luxe des Maldives sont parmi les plus exclusifs au monde : Soneva Fushi, One&Only Reethi Rah, Cheval Blanc Randheli et Waldorf Astoria proposent des expériences sur mesure dans un cadre naturel exceptionnel. Chaque resort occupe son propre atoll, garantissant une intimité absolue. Les activités sont infinies : plongée sous-marine dans des sites mondialement réputés, pêche au gros, spa surplombant l'océan, dîners privés sur un banc de sable et excursions en dolphin watching. Les Maldives sont la destination idéale pour les lunes de miel, les anniversaires et toute occasion méritant un cadre véritablement extraordinaire. Le vol en jet privé ajoute une dimension supplémentaire à cette expérience, avec un confort de vol optimal pour arriver reposé au paradis.",
    timezone: "UTC+5 (MVT)",
    recommendedAircraft: ["global-6000", "gulfstream-g650er", "global-7500"],
    priceRange: "85 000 - 160 000",
    faq: [
      {
        question: "Peut-on voler directement de Paris aux Maldives en jet privé ?",
        answer:
          "Oui, avec un Ultra Long Range Jet comme le Gulfstream G650ER ou le Global 7500, le vol Paris-Malé est réalisable sans escale en environ 10h30. Avec un Heavy Jet, une escale technique peut être nécessaire.",
      },
      {
        question: "Comment rejoint-on son resort depuis l'aéroport de Malé ?",
        answer:
          "Selon la localisation de votre resort, le transfert se fait en hydravion (15 à 60 minutes), en bateau rapide (10 à 90 minutes) ou en vol domestique. Nous organisons l'intégralité de la logistique.",
      },
      {
        question: "Quelle est la meilleure période pour les Maldives ?",
        answer:
          "La saison sèche, de novembre à avril, offre le meilleur ensoleillement et les eaux les plus claires. Décembre à mars est la période la plus demandée. La mousson d'été (mai-octobre) offre des tarifs plus avantageux.",
      },
    ],
  },
  "saint-tropez": {
    seoText:
      "Saint-Tropez incarne le glamour et l'art de vivre à la française comme nulle autre destination. Ce petit village de pêcheurs devenu mythique attire chaque été les plus grandes fortunes du monde, séduits par ses plages dorées, ses yachts majestueux et son atmosphère unique mêlant décontraction et sophistication. L'aéroport de La Môle, situé à quelques kilomètres du village, est un atout majeur pour les voyageurs en jet privé. Cette petite piste, nichée entre les collines du Var, permet d'atterrir au plus près de Saint-Tropez, évitant les embouteillages souvent redoutables sur la route du littoral en été. Toutefois, sa piste courte limite l'accès aux appareils légers et turbopropulseurs. Pour les jets plus grands, l'aéroport de Nice constitue une alternative avec un transfert en hélicoptère de 20 minutes. Les plages de Pampelonne, avec leurs clubs mythiques comme le Club 55 et Nikki Beach, sont le théâtre de journées mémorables entre bains de soleil et déjeuners les pieds dans le sable. Le vieux port de Saint-Tropez, ses ruelles pavées et la Place des Lices conservent un charme authentique derrière le glamour apparent. La gastronomie tropézienne, entre poissons grillés et tarte du même nom, se déguste dans des adresses légendaires. Le vol en jet privé vers Saint-Tropez est la promesse d'un voyage exclusif, du décollage à Paris jusqu'à l'arrivée dans ce village de légende.",
    timezone: "UTC+1 (CET) / UTC+2 (CEST)",
    recommendedAircraft: ["citation-mustang", "phenom-100ev", "pilatus-pc-12"],
    priceRange: "5 500 - 10 000",
    faq: [
      {
        question: "Peut-on atterrir directement à Saint-Tropez en jet privé ?",
        answer:
          "L'aéroport de La Môle (LFTZ) accepte les petits jets et turbopropulseurs. Pour les appareils plus grands, nous recommandons Nice avec un transfert en hélicoptère (20 minutes) vers Saint-Tropez.",
      },
      {
        question: "Quelle est la haute saison à Saint-Tropez ?",
        answer:
          "La haute saison s'étend de mi-juin à mi-septembre, avec un pic autour du 14 juillet et du 15 août. Il est recommandé de réserver les créneaux d'atterrissage à La Môle plusieurs semaines à l'avance.",
      },
      {
        question: "Un transfert en hélicoptère depuis Nice est-il disponible ?",
        answer:
          "Oui, nous organisons des transferts en hélicoptère de Nice à Saint-Tropez en 20 minutes environ, avec atterrissage au plus près de votre lieu de séjour.",
      },
    ],
  },
};

/* ============================================
   DEFAULT SEO CONTENT (fallback)
   ============================================ */
function getDefaultSeoContent(dest: (typeof destinations)[0]) {
  return {
    seoText: dest.description + " " + dest.description + " Skyseaker vous propose des vols en jet privé vers " + dest.name + " avec un service sur mesure et une attention portée aux moindres détails. Nos experts en aviation privée sélectionnent les meilleurs appareils et équipages pour garantir un voyage exceptionnel. Que vous voyagiez pour affaires ou pour le plaisir, nous adaptons chaque aspect de votre vol à vos préférences personnelles. Notre service de conciergerie peut également organiser vos transferts terrestres, réservations d'hôtels et activités sur place pour une expérience complète et sans souci. Contactez-nous pour obtenir un devis personnalisé pour votre prochain vol vers " + dest.name + ".",
    timezone: "—",
    recommendedAircraft: ["phenom-300e", "citation-xls-plus", "challenger-350"],
    priceRange: dest.priceFrom + "+",
    faq: [
      {
        question: `Quel est le temps de vol vers ${dest.name} en jet privé ?`,
        answer: `Le temps de vol depuis Paris vers ${dest.name} est d'environ ${dest.flightTimeFromParis}, selon le type d'appareil et les conditions météorologiques.`,
      },
      {
        question: `Quel type de jet recommandez-vous pour ${dest.name} ?`,
        answer: `Le choix de l'appareil dépend du nombre de passagers, de vos préférences de confort et de votre budget. Nos conseillers vous guideront vers le meilleur choix.`,
      },
      {
        question: `Comment réserver un vol privé vers ${dest.name} ?`,
        answer: `Contactez notre équipe disponible 24/7 par téléphone ou via notre formulaire de devis en ligne. Nous vous transmettrons une proposition détaillée sous 30 minutes.`,
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
    return { title: "Destination non trouvée" };
  }

  return {
    title: `Vol privé ${destination.name} (${destination.country}) — Jet privé depuis Paris`,
    description: `Réservez votre vol en jet privé vers ${destination.name}, ${destination.country}. Temps de vol depuis Paris : ${destination.flightTimeFromParis}. À partir de ${destination.priceFrom}€. Disponible 24/7.`,
    openGraph: {
      title: `Vol privé vers ${destination.name} | Skyseaker`,
      description: `Jet privé Paris-${destination.name} en ${destination.flightTimeFromParis}. À partir de ${destination.priceFrom}€.`,
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
