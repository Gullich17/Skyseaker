'use client';

import { useState, useMemo, useRef, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { emptyLegs, type EmptyLeg } from '@/data/emptyLegs';
import SectionTitle from '@/components/ui/SectionTitle';
import ScrollReveal from '@/components/ui/ScrollReveal';
import Button from '@/components/ui/Button';
import Badge from '@/components/ui/Badge';
import AnimatedCounter from '@/components/ui/AnimatedCounter';

/* ============================================
   CITIES & AIRPORTS DATABASE
   ============================================ */
interface Airport {
  name: string;
  code: string;
}

interface CityEntry {
  city: string;
  country: string;
  airports: Airport[];
}

const CITIES_DB: CityEntry[] = [
  // ── France ──
  { city: "Paris", country: "France", airports: [{ name: "Paris-Le Bourget", code: "LFPB" }, { name: "Paris-Orly", code: "LFPO" }, { name: "Paris-CDG", code: "LFPG" }] },
  { city: "Nice", country: "France", airports: [{ name: "Nice Côte d'Azur", code: "LFMN" }] },
  { city: "Cannes", country: "France", airports: [{ name: "Cannes-Mandelieu", code: "LFMD" }] },
  { city: "Saint-Tropez", country: "France", airports: [{ name: "La Môle Saint-Tropez", code: "LFTZ" }] },
  { city: "Lyon", country: "France", airports: [{ name: "Lyon-Bron", code: "LFLY" }, { name: "Lyon-Saint Exupéry", code: "LFLL" }] },
  { city: "Marseille", country: "France", airports: [{ name: "Marseille Provence", code: "LFML" }] },
  { city: "Toulouse", country: "France", airports: [{ name: "Toulouse-Blagnac", code: "LFBO" }] },
  { city: "Bordeaux", country: "France", airports: [{ name: "Bordeaux-Mérignac", code: "LFBD" }] },
  { city: "Strasbourg", country: "France", airports: [{ name: "Strasbourg-Entzheim", code: "LFST" }] },
  { city: "Nantes", country: "France", airports: [{ name: "Nantes Atlantique", code: "LFRS" }] },
  { city: "Biarritz", country: "France", airports: [{ name: "Biarritz-Anglet-Bayonne", code: "LFBZ" }] },
  { city: "Montpellier", country: "France", airports: [{ name: "Montpellier-Méditerranée", code: "LFMT" }] },
  { city: "Ajaccio", country: "France", airports: [{ name: "Ajaccio Napoléon Bonaparte", code: "LFKJ" }] },
  { city: "Figari", country: "France", airports: [{ name: "Figari Sud-Corse", code: "LFKF" }] },
  { city: "Bastia", country: "France", airports: [{ name: "Bastia-Poretta", code: "LFKB" }] },
  { city: "Calvi", country: "France", airports: [{ name: "Calvi Sainte-Catherine", code: "LFKC" }] },
  { city: "Courchevel", country: "France", airports: [{ name: "Courchevel Altiport", code: "LFLJ" }] },
  { city: "Chambéry", country: "France", airports: [{ name: "Chambéry-Savoie", code: "LFLB" }] },
  { city: "Grenoble", country: "France", airports: [{ name: "Grenoble-Isère", code: "LFLS" }] },
  { city: "Avignon", country: "France", airports: [{ name: "Avignon-Caumont", code: "LFMV" }] },
  { city: "La Rochelle", country: "France", airports: [{ name: "La Rochelle-Île de Ré", code: "LFBH" }] },
  { city: "Deauville", country: "France", airports: [{ name: "Deauville-Normandie", code: "LFRG" }] },
  { city: "Lille", country: "France", airports: [{ name: "Lille-Lesquin", code: "LFQQ" }] },
  { city: "Rennes", country: "France", airports: [{ name: "Rennes-Saint-Jacques", code: "LFRN" }] },
  { city: "Toulon", country: "France", airports: [{ name: "Toulon-Hyères", code: "LFTH" }] },
  { city: "Perpignan", country: "France", airports: [{ name: "Perpignan-Rivesaltes", code: "LFMP" }] },
  { city: "Pau", country: "France", airports: [{ name: "Pau-Pyrénées", code: "LFBP" }] },
  // ── Monaco ──
  { city: "Monaco", country: "Monaco", airports: [{ name: "Monaco Héliport", code: "LNMC" }, { name: "Nice Côte d'Azur", code: "LFMN" }] },
  // ── Suisse ──
  { city: "Genève", country: "Suisse", airports: [{ name: "Genève Aéroport", code: "LSGG" }] },
  { city: "Zurich", country: "Suisse", airports: [{ name: "Zürich Airport", code: "LSZH" }] },
  { city: "Berne", country: "Suisse", airports: [{ name: "Bern-Belp", code: "LSZB" }] },
  { city: "Bâle", country: "Suisse", airports: [{ name: "EuroAirport Basel-Mulhouse", code: "LFSB" }] },
  { city: "Lugano", country: "Suisse", airports: [{ name: "Lugano Airport", code: "LSZA" }] },
  { city: "Sion", country: "Suisse", airports: [{ name: "Sion Airport", code: "LSGS" }] },
  { city: "Saint-Moritz", country: "Suisse", airports: [{ name: "Samedan Engadin", code: "LSZS" }] },
  { city: "Gstaad", country: "Suisse", airports: [{ name: "Saanen-Gstaad", code: "LSGK" }] },
  // ── Royaume-Uni ──
  { city: "Londres", country: "Royaume-Uni", airports: [{ name: "London Luton", code: "EGGW" }, { name: "London Biggin Hill", code: "EGKB" }, { name: "Farnborough", code: "EGLF" }, { name: "London Stansted", code: "EGSS" }, { name: "London City", code: "EGLC" }, { name: "RAF Northolt", code: "EGWU" }] },
  { city: "Manchester", country: "Royaume-Uni", airports: [{ name: "Manchester Airport", code: "EGCC" }] },
  { city: "Édimbourg", country: "Royaume-Uni", airports: [{ name: "Edinburgh Airport", code: "EGPH" }] },
  { city: "Birmingham", country: "Royaume-Uni", airports: [{ name: "Birmingham Airport", code: "EGBB" }] },
  { city: "Oxford", country: "Royaume-Uni", airports: [{ name: "London Oxford", code: "EGTK" }] },
  { city: "Cambridge", country: "Royaume-Uni", airports: [{ name: "Cambridge Airport", code: "EGSC" }] },
  { city: "Jersey", country: "Royaume-Uni", airports: [{ name: "Jersey Airport", code: "EGJJ" }] },
  // ── Espagne ──
  { city: "Ibiza", country: "Espagne", airports: [{ name: "Ibiza Airport", code: "LEIB" }] },
  { city: "Barcelone", country: "Espagne", airports: [{ name: "Barcelona-El Prat", code: "LEBL" }] },
  { city: "Madrid", country: "Espagne", airports: [{ name: "Madrid-Barajas", code: "LEMD" }, { name: "Madrid-Torrejón", code: "LETO" }] },
  { city: "Majorque", country: "Espagne", airports: [{ name: "Palma de Mallorca", code: "LEPA" }] },
  { city: "Malaga", country: "Espagne", airports: [{ name: "Málaga-Costa del Sol", code: "LEMG" }] },
  { city: "Marbella", country: "Espagne", airports: [{ name: "Málaga-Costa del Sol", code: "LEMG" }] },
  { city: "Valence", country: "Espagne", airports: [{ name: "Valencia Airport", code: "LEVC" }] },
  { city: "Séville", country: "Espagne", airports: [{ name: "Sevilla-San Pablo", code: "LEZL" }] },
  { city: "Tenerife", country: "Espagne", airports: [{ name: "Tenerife Sur", code: "GCTS" }, { name: "Tenerife Norte", code: "GCXO" }] },
  { city: "Bilbao", country: "Espagne", airports: [{ name: "Bilbao Airport", code: "LEBB" }] },
  { city: "Saint-Jacques-de-Compostelle", country: "Espagne", airports: [{ name: "Santiago Airport", code: "LEST" }] },
  // ── Italie ──
  { city: "Milan", country: "Italie", airports: [{ name: "Milano Linate", code: "LIML" }, { name: "Milano Malpensa", code: "LIMC" }] },
  { city: "Rome", country: "Italie", airports: [{ name: "Roma Ciampino", code: "LIRA" }, { name: "Roma Fiumicino", code: "LIRF" }] },
  { city: "Sardaigne", country: "Italie", airports: [{ name: "Olbia Costa Smeralda", code: "LIEO" }] },
  { city: "Naples", country: "Italie", airports: [{ name: "Napoli Capodichino", code: "LIRN" }] },
  { city: "Venise", country: "Italie", airports: [{ name: "Venezia Marco Polo", code: "LIPZ" }, { name: "Venezia Lido", code: "LIPV" }] },
  { city: "Florence", country: "Italie", airports: [{ name: "Firenze Peretola", code: "LIRQ" }] },
  { city: "Turin", country: "Italie", airports: [{ name: "Torino Caselle", code: "LIMF" }] },
  { city: "Bologne", country: "Italie", airports: [{ name: "Bologna Guglielmo Marconi", code: "LIPE" }] },
  { city: "Pise", country: "Italie", airports: [{ name: "Pisa Galileo Galilei", code: "LIRP" }] },
  { city: "Côme", country: "Italie", airports: [{ name: "Milano Linate", code: "LIML" }] },
  { city: "Capri", country: "Italie", airports: [{ name: "Napoli Capodichino", code: "LIRN" }] },
  { city: "Palerme", country: "Italie", airports: [{ name: "Palermo Punta Raisi", code: "LICJ" }] },
  { city: "Catane", country: "Italie", airports: [{ name: "Catania-Fontanarossa", code: "LICC" }] },
  // ── Portugal ──
  { city: "Lisbonne", country: "Portugal", airports: [{ name: "Lisbon Humberto Delgado", code: "LPPT" }] },
  { city: "Porto", country: "Portugal", airports: [{ name: "Porto Francisco Sá Carneiro", code: "LPPR" }] },
  { city: "Faro", country: "Portugal", airports: [{ name: "Faro Airport", code: "LPFR" }] },
  { city: "Madère", country: "Portugal", airports: [{ name: "Madeira Cristiano Ronaldo", code: "LPMA" }] },
  // ── Allemagne ──
  { city: "Berlin", country: "Allemagne", airports: [{ name: "Berlin Brandenburg", code: "EDDB" }] },
  { city: "Munich", country: "Allemagne", airports: [{ name: "München Franz Josef Strauss", code: "EDDM" }, { name: "Oberpfaffenhofen", code: "EDMO" }] },
  { city: "Francfort", country: "Allemagne", airports: [{ name: "Frankfurt am Main", code: "EDDF" }, { name: "Egelsbach", code: "EDFE" }] },
  { city: "Hambourg", country: "Allemagne", airports: [{ name: "Hamburg Airport", code: "EDDH" }] },
  { city: "Düsseldorf", country: "Allemagne", airports: [{ name: "Düsseldorf Airport", code: "EDDL" }] },
  { city: "Stuttgart", country: "Allemagne", airports: [{ name: "Stuttgart Airport", code: "EDDS" }] },
  { city: "Cologne", country: "Allemagne", airports: [{ name: "Köln/Bonn", code: "EDDK" }] },
  // ── Autriche ──
  { city: "Vienne", country: "Autriche", airports: [{ name: "Wien-Schwechat", code: "LOWW" }] },
  { city: "Salzbourg", country: "Autriche", airports: [{ name: "Salzburg W. A. Mozart", code: "LOWS" }] },
  { city: "Innsbruck", country: "Autriche", airports: [{ name: "Innsbruck Kranebitten", code: "LOWI" }] },
  // ── Grèce ──
  { city: "Athènes", country: "Grèce", airports: [{ name: "Athens Eleftherios Venizelos", code: "LGAV" }] },
  { city: "Mykonos", country: "Grèce", airports: [{ name: "Mykonos Island National", code: "LGMK" }] },
  { city: "Santorin", country: "Grèce", airports: [{ name: "Santorini National", code: "LGSR" }] },
  { city: "Corfou", country: "Grèce", airports: [{ name: "Corfu Ioannis Kapodistrias", code: "LGKR" }] },
  { city: "Crète", country: "Grèce", airports: [{ name: "Héraklion Nikos Kazantzakis", code: "LGIR" }, { name: "Chania Daskalogiannis", code: "LGSA" }] },
  { city: "Rhodes", country: "Grèce", airports: [{ name: "Rhodes Diagoras", code: "LGRP" }] },
  { city: "Zakynthos", country: "Grèce", airports: [{ name: "Zakynthos Dionysios Solomos", code: "LGZA" }] },
  { city: "Skiathos", country: "Grèce", airports: [{ name: "Skiathos Alexandros Papadiamantis", code: "LGSK" }] },
  // ── Croatie ──
  { city: "Dubrovnik", country: "Croatie", airports: [{ name: "Dubrovnik Airport", code: "LDDU" }] },
  { city: "Split", country: "Croatie", airports: [{ name: "Split Airport", code: "LDSP" }] },
  // ── Monténégro ──
  { city: "Tivat", country: "Monténégro", airports: [{ name: "Tivat Airport", code: "LYTV" }] },
  { city: "Podgorica", country: "Monténégro", airports: [{ name: "Podgorica Airport", code: "LYPG" }] },
  // ── Turquie ──
  { city: "Istanbul", country: "Turquie", airports: [{ name: "Istanbul Airport", code: "LTFM" }, { name: "Sabiha Gökçen", code: "LTFJ" }] },
  { city: "Bodrum", country: "Turquie", airports: [{ name: "Bodrum-Milas", code: "LTFE" }] },
  { city: "Antalya", country: "Turquie", airports: [{ name: "Antalya Airport", code: "LTAI" }] },
  // ── Pays-Bas & Belgique ──
  { city: "Amsterdam", country: "Pays-Bas", airports: [{ name: "Schiphol", code: "EHAM" }, { name: "Rotterdam The Hague", code: "EHRD" }] },
  { city: "Bruxelles", country: "Belgique", airports: [{ name: "Brussels Airport", code: "EBBR" }, { name: "Brussels South Charleroi", code: "EBCI" }] },
  { city: "Anvers", country: "Belgique", airports: [{ name: "Antwerp Airport", code: "EBAW" }] },
  // ── Scandinavie ──
  { city: "Copenhague", country: "Danemark", airports: [{ name: "Copenhagen Kastrup", code: "EKCH" }] },
  { city: "Stockholm", country: "Suède", airports: [{ name: "Stockholm Bromma", code: "ESSB" }, { name: "Stockholm Arlanda", code: "ESSA" }] },
  { city: "Oslo", country: "Norvège", airports: [{ name: "Oslo Gardermoen", code: "ENGM" }] },
  { city: "Helsinki", country: "Finlande", airports: [{ name: "Helsinki-Vantaa", code: "EFHK" }] },
  // ── Europe de l'Est ──
  { city: "Prague", country: "République Tchèque", airports: [{ name: "Prague Václav Havel", code: "LKPR" }] },
  { city: "Varsovie", country: "Pologne", airports: [{ name: "Warsaw Chopin", code: "EPWA" }] },
  { city: "Budapest", country: "Hongrie", airports: [{ name: "Budapest Ferenc Liszt", code: "LHBP" }] },
  { city: "Bucarest", country: "Roumanie", airports: [{ name: "Bucharest Henri Coandă", code: "LROP" }] },
  // ── Russie & CEI ──
  { city: "Moscou", country: "Russie", airports: [{ name: "Vnukovo", code: "UUWW" }, { name: "Sheremetyevo", code: "UUEE" }, { name: "Domodedovo", code: "UUDD" }] },
  { city: "Saint-Pétersbourg", country: "Russie", airports: [{ name: "Pulkovo", code: "ULLI" }] },
  // ── Moyen-Orient ──
  { city: "Dubaï", country: "Émirats Arabes Unis", airports: [{ name: "Al Maktoum International", code: "OMDW" }, { name: "Dubai International", code: "OMDB" }] },
  { city: "Abu Dhabi", country: "Émirats Arabes Unis", airports: [{ name: "Abu Dhabi International", code: "OMAA" }, { name: "Al Bateen Executive", code: "OMAD" }] },
  { city: "Doha", country: "Qatar", airports: [{ name: "Hamad International", code: "OTHH" }] },
  { city: "Riyad", country: "Arabie Saoudite", airports: [{ name: "King Khalid International", code: "OERK" }] },
  { city: "Djeddah", country: "Arabie Saoudite", airports: [{ name: "King Abdulaziz International", code: "OEJN" }] },
  { city: "Bahreïn", country: "Bahreïn", airports: [{ name: "Bahrain International", code: "OBBI" }] },
  { city: "Koweït", country: "Koweït", airports: [{ name: "Kuwait International", code: "OKBK" }] },
  { city: "Oman", country: "Oman", airports: [{ name: "Muscat International", code: "OOMS" }] },
  { city: "Tel Aviv", country: "Israël", airports: [{ name: "Ben Gurion International", code: "LLBG" }, { name: "Sde Dov", code: "LLSD" }] },
  { city: "Amman", country: "Jordanie", airports: [{ name: "Queen Alia International", code: "OJAI" }] },
  { city: "Beyrouth", country: "Liban", airports: [{ name: "Rafic Hariri International", code: "OLBA" }] },
  // ── Afrique du Nord ──
  { city: "Marrakech", country: "Maroc", airports: [{ name: "Marrakech-Ménara", code: "GMMX" }] },
  { city: "Casablanca", country: "Maroc", airports: [{ name: "Mohammed V International", code: "GMMN" }] },
  { city: "Tanger", country: "Maroc", airports: [{ name: "Tanger Ibn Battouta", code: "GMTT" }] },
  { city: "Rabat", country: "Maroc", airports: [{ name: "Rabat-Salé", code: "GMME" }] },
  { city: "Agadir", country: "Maroc", airports: [{ name: "Agadir Al Massira", code: "GMAD" }] },
  { city: "Tunis", country: "Tunisie", airports: [{ name: "Tunis-Carthage", code: "DTTA" }] },
  { city: "Djerba", country: "Tunisie", airports: [{ name: "Djerba-Zarzis", code: "DTTJ" }] },
  { city: "Alger", country: "Algérie", airports: [{ name: "Houari Boumediene", code: "DAAG" }] },
  { city: "Le Caire", country: "Égypte", airports: [{ name: "Cairo International", code: "HECA" }] },
  { city: "Charm el-Cheikh", country: "Égypte", airports: [{ name: "Sharm El Sheikh International", code: "HESH" }] },
  // ── Afrique subsaharienne ──
  { city: "Dakar", country: "Sénégal", airports: [{ name: "Blaise Diagne International", code: "GOBD" }] },
  { city: "Abidjan", country: "Côte d'Ivoire", airports: [{ name: "Félix-Houphouët-Boigny", code: "DIAP" }] },
  { city: "Lagos", country: "Nigeria", airports: [{ name: "Murtala Muhammed", code: "DNMM" }] },
  { city: "Nairobi", country: "Kenya", airports: [{ name: "Jomo Kenyatta International", code: "HKJK" }, { name: "Wilson Airport", code: "HKNW" }] },
  { city: "Le Cap", country: "Afrique du Sud", airports: [{ name: "Cape Town International", code: "FACT" }] },
  { city: "Johannesburg", country: "Afrique du Sud", airports: [{ name: "O.R. Tambo International", code: "FAOR" }, { name: "Lanseria International", code: "FALA" }] },
  { city: "Luanda", country: "Angola", airports: [{ name: "Quatro de Fevereiro", code: "FNLU" }] },
  { city: "Kinshasa", country: "RD Congo", airports: [{ name: "N'Djili International", code: "FZAA" }] },
  { city: "Addis-Abeba", country: "Éthiopie", airports: [{ name: "Bole International", code: "HAAB" }] },
  // ── Océan Indien ──
  { city: "Maldives", country: "Maldives", airports: [{ name: "Velana International", code: "VRMM" }] },
  { city: "Maurice", country: "Maurice", airports: [{ name: "Sir Seewoosagur Ramgoolam", code: "FIMP" }] },
  { city: "Seychelles", country: "Seychelles", airports: [{ name: "Seychelles International", code: "FSIA" }] },
  { city: "Madagascar", country: "Madagascar", airports: [{ name: "Ivato International", code: "FMMI" }] },
  { city: "La Réunion", country: "France", airports: [{ name: "Roland Garros", code: "FMEE" }] },
  // ── Amérique du Nord ──
  { city: "New York", country: "États-Unis", airports: [{ name: "Teterboro", code: "KTEB" }, { name: "Westchester County", code: "KHPN" }, { name: "Republic Airport", code: "KFRG" }] },
  { city: "Los Angeles", country: "États-Unis", airports: [{ name: "Van Nuys", code: "KVNY" }, { name: "Santa Monica", code: "KSMO" }, { name: "Burbank", code: "KBUR" }] },
  { city: "Miami", country: "États-Unis", airports: [{ name: "Miami Opa-Locka", code: "KOPF" }, { name: "Fort Lauderdale Executive", code: "KFXE" }, { name: "Fort Lauderdale-Hollywood", code: "KFLL" }] },
  { city: "Las Vegas", country: "États-Unis", airports: [{ name: "Henderson Executive", code: "KHND" }, { name: "Las Vegas McCarran", code: "KLAS" }] },
  { city: "Chicago", country: "États-Unis", airports: [{ name: "Chicago Midway", code: "KMDW" }, { name: "DuPage Airport", code: "KDPA" }] },
  { city: "San Francisco", country: "États-Unis", airports: [{ name: "San Francisco International", code: "KSFO" }, { name: "San Carlos", code: "KSQL" }] },
  { city: "Washington", country: "États-Unis", airports: [{ name: "Dulles International", code: "KIAD" }, { name: "Reagan National", code: "KDCA" }] },
  { city: "Dallas", country: "États-Unis", airports: [{ name: "Dallas Love Field", code: "KDAL" }, { name: "Addison Airport", code: "KADS" }] },
  { city: "Houston", country: "États-Unis", airports: [{ name: "William P. Hobby", code: "KHOU" }, { name: "Sugar Land", code: "KSGR" }] },
  { city: "Denver", country: "États-Unis", airports: [{ name: "Centennial Airport", code: "KAPA" }, { name: "Rocky Mountain Metro", code: "KBJC" }] },
  { city: "Aspen", country: "États-Unis", airports: [{ name: "Aspen-Pitkin County", code: "KASE" }] },
  { city: "Palm Beach", country: "États-Unis", airports: [{ name: "Palm Beach International", code: "KPBI" }] },
  { city: "Scottsdale", country: "États-Unis", airports: [{ name: "Scottsdale Airport", code: "KSDL" }] },
  { city: "Boston", country: "États-Unis", airports: [{ name: "Boston Logan", code: "KBOS" }, { name: "Hanscom Field", code: "KBED" }] },
  { city: "Atlanta", country: "États-Unis", airports: [{ name: "DeKalb-Peachtree", code: "KPDK" }] },
  { city: "Seattle", country: "États-Unis", airports: [{ name: "Boeing Field", code: "KBFI" }] },
  { city: "Montréal", country: "Canada", airports: [{ name: "Montréal-Trudeau", code: "CYUL" }, { name: "Saint-Hubert", code: "CYHU" }] },
  { city: "Toronto", country: "Canada", airports: [{ name: "Toronto Pearson", code: "CYYZ" }, { name: "Billy Bishop Toronto City", code: "CYTZ" }] },
  { city: "Vancouver", country: "Canada", airports: [{ name: "Vancouver International", code: "CYVR" }] },
  // ── Caraïbes ──
  { city: "Saint-Barthélemy", country: "France", airports: [{ name: "Gustaf III", code: "TFFJ" }] },
  { city: "Saint-Martin", country: "France", airports: [{ name: "Grand Case-Espérance", code: "TFFG" }, { name: "Princess Juliana", code: "TNCM" }] },
  { city: "Guadeloupe", country: "France", airports: [{ name: "Pôle Caraïbes", code: "TFFR" }] },
  { city: "Martinique", country: "France", airports: [{ name: "Aimé Césaire", code: "TFFF" }] },
  { city: "Nassau", country: "Bahamas", airports: [{ name: "Lynden Pindling International", code: "MYNN" }] },
  { city: "Turks-et-Caïcos", country: "Turks-et-Caïcos", airports: [{ name: "Providenciales International", code: "MBPV" }] },
  { city: "La Barbade", country: "Barbade", airports: [{ name: "Grantley Adams International", code: "TBPB" }] },
  { city: "Îles Caïmans", country: "Îles Caïmans", airports: [{ name: "Owen Roberts International", code: "MWCR" }] },
  // ── Amérique Latine ──
  { city: "Mexico", country: "Mexique", airports: [{ name: "Mexico City International", code: "MMMX" }, { name: "Toluca International", code: "MMTO" }] },
  { city: "Cancún", country: "Mexique", airports: [{ name: "Cancún International", code: "MMUN" }] },
  { city: "São Paulo", country: "Brésil", airports: [{ name: "Congonhas", code: "SBSP" }, { name: "Guarulhos", code: "SBGR" }] },
  { city: "Rio de Janeiro", country: "Brésil", airports: [{ name: "Santos Dumont", code: "SBRJ" }, { name: "Galeão", code: "SBGL" }] },
  { city: "Buenos Aires", country: "Argentine", airports: [{ name: "Jorge Newbery Aeroparque", code: "SABE" }, { name: "Ezeiza", code: "SAEZ" }] },
  { city: "Bogotá", country: "Colombie", airports: [{ name: "El Dorado", code: "SKBO" }] },
  { city: "Panama", country: "Panama", airports: [{ name: "Tocumen International", code: "MPTO" }] },
  // ── Asie ──
  { city: "Singapour", country: "Singapour", airports: [{ name: "Changi Airport", code: "WSSS" }, { name: "Seletar Airport", code: "WSSL" }] },
  { city: "Hong Kong", country: "Chine", airports: [{ name: "Hong Kong International", code: "VHHH" }] },
  { city: "Tokyo", country: "Japon", airports: [{ name: "Haneda", code: "RJTT" }, { name: "Narita", code: "RJAA" }] },
  { city: "Séoul", country: "Corée du Sud", airports: [{ name: "Gimpo International", code: "RKSS" }] },
  { city: "Shanghai", country: "Chine", airports: [{ name: "Hongqiao", code: "ZSSS" }, { name: "Pudong", code: "ZSPD" }] },
  { city: "Pékin", country: "Chine", airports: [{ name: "Capital International", code: "ZBAA" }, { name: "Daxing", code: "ZBAD" }] },
  { city: "Mumbai", country: "Inde", airports: [{ name: "Chhatrapati Shivaji Maharaj", code: "VABB" }] },
  { city: "New Delhi", country: "Inde", airports: [{ name: "Indira Gandhi International", code: "VIDP" }] },
  { city: "Bangkok", country: "Thaïlande", airports: [{ name: "Don Mueang", code: "VTBD" }, { name: "Suvarnabhumi", code: "VTBS" }] },
  { city: "Bali", country: "Indonésie", airports: [{ name: "Ngurah Rai International", code: "WADD" }] },
  { city: "Kuala Lumpur", country: "Malaisie", airports: [{ name: "Sultan Abdul Aziz Shah", code: "WMSA" }, { name: "KLIA", code: "WMKK" }] },
  // ── Océanie ──
  { city: "Sydney", country: "Australie", airports: [{ name: "Sydney Kingsford Smith", code: "YSSY" }, { name: "Bankstown", code: "YSBK" }] },
  { city: "Melbourne", country: "Australie", airports: [{ name: "Essendon Fields", code: "YMEN" }, { name: "Melbourne Tullamarine", code: "YMML" }] },
  { city: "Auckland", country: "Nouvelle-Zélande", airports: [{ name: "Auckland Airport", code: "NZAA" }] },
];

/* ============================================
   ICONS
   ============================================ */
function PlaneIcon({ size = 16 }: { size?: number }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      style={{ width: size, height: size }}
    >
      <path d="M17.8 19.2L16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.3c.4-.2.6-.6.5-1.1z" />
    </svg>
  );
}

function PlaneTakeoffIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      style={{ width: 20, height: 20 }}
    >
      <path d="M2 22h20" />
      <path d="M6.36 17.4L4 17l-2-4 1.1-.55a2 2 0 011.8 0l.17.1a2 2 0 001.8 0L8 12 5 6l1.1-.55a2 2 0 011.8 0l.17.1a2 2 0 001.8 0L12 4l5 6 3.5-2a2 2 0 012.5 1v.5a2 2 0 01-1.1 1.8l-16 8" />
    </svg>
  );
}

function ArrowRightLongIcon() {
  return (
    <svg
      viewBox="0 0 40 12"
      fill="none"
      style={{ width: 40, height: 12, flexShrink: 0 }}
    >
      <line x1="0" y1="6" x2="34" y2="6" stroke="#F4DDC3" strokeWidth="1" strokeDasharray="4 3" />
      <path d="M32 2 L38 6 L32 10" stroke="#F4DDC3" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function CalendarIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      style={{ width: 15, height: 15 }}
    >
      <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
      <line x1="16" y1="2" x2="16" y2="6" />
      <line x1="8" y1="2" x2="8" y2="6" />
      <line x1="3" y1="10" x2="21" y2="10" />
    </svg>
  );
}

function UsersIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      style={{ width: 15, height: 15 }}
    >
      <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 00-3-3.87" />
      <path d="M16 3.13a4 4 0 010 7.75" />
    </svg>
  );
}

function BellIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="#F4DDC3"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      style={{ width: 28, height: 28 }}
    >
      <path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9" />
      <path d="M13.73 21a2 2 0 01-3.46 0" />
    </svg>
  );
}

function SearchIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      style={{ width: 40, height: 40 }}
    >
      <circle cx="11" cy="11" r="8" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
  );
}

function FilterIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      style={{ width: 16, height: 16 }}
    >
      <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
    </svg>
  );
}

function TagIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ width: 32, height: 32 }}>
      <path d="M20.59 13.41l-7.17 7.17a2 2 0 01-2.83 0L2 12V2h10l8.59 8.59a2 2 0 010 2.82z" />
      <line x1="7" y1="7" x2="7.01" y2="7" />
    </svg>
  );
}

function ShieldIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ width: 32, height: 32 }}>
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    </svg>
  );
}

function ClockIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ width: 32, height: 32 }}>
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  );
}

function CheckCircleIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: 48, height: 48 }}>
      <path d="M22 11.08V12a10 10 0 11-5.93-9.14" />
      <polyline points="22 4 12 14.01 9 11.01" />
    </svg>
  );
}

/* ============================================
   CITY AUTOCOMPLETE COMPONENT
   ============================================ */
function CityAutocomplete({
  value,
  onChange,
  placeholder,
  label,
}: {
  value: string;
  onChange: (val: string) => void;
  placeholder: string;
  label: string;
}) {
  const [open, setOpen] = useState(false);
  const [focused, setFocused] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const suggestions = useMemo(() => {
    if (!value || value.length < 1) return [];
    const q = value.toLowerCase();
    return CITIES_DB.filter(
      (c) =>
        c.city.toLowerCase().includes(q) ||
        c.country.toLowerCase().includes(q) ||
        c.airports.some(
          (a) =>
            a.name.toLowerCase().includes(q) ||
            a.code.toLowerCase().includes(q)
        )
    ).slice(0, 8);
  }, [value]);

  const handleClickOutside = useCallback((e: MouseEvent) => {
    if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
      setOpen(false);
    }
  }, []);

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [handleClickOutside]);

  const selectCity = (city: string) => {
    onChange(city);
    setOpen(false);
  };

  return (
    <div ref={wrapperRef} style={{ position: 'relative' }}>
      <label style={labelStyle}>{label}</label>
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={(e) => {
          onChange(e.target.value);
          setOpen(true);
        }}
        onFocus={(e) => {
          setFocused(true);
          e.currentTarget.style.borderColor = 'rgba(244,221,195,0.4)';
          if (value.length >= 1) setOpen(true);
        }}
        onBlur={(e) => {
          setFocused(false);
          e.currentTarget.style.borderColor = 'rgba(244,221,195,0.12)';
        }}
        style={inputStyle}
        autoComplete="off"
      />
      <AnimatePresence>
        {open && suggestions.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.2 }}
            style={{
              position: 'absolute',
              top: '100%',
              left: 0,
              right: 0,
              zIndex: 50,
              marginTop: '4px',
              backgroundColor: '#0E202D',
              border: '1px solid rgba(244,221,195,0.15)',
              maxHeight: '280px',
              overflowY: 'auto',
              boxShadow: '0 20px 60px rgba(0,0,0,0.5)',
            }}
            className="scrollbar-hide"
          >
            {suggestions.map((entry) => (
              <button
                key={entry.city}
                type="button"
                onMouseDown={(e) => {
                  e.preventDefault();
                  selectCity(entry.city);
                }}
                style={{
                  width: '100%',
                  display: 'block',
                  padding: '12px 16px',
                  textAlign: 'left',
                  background: 'transparent',
                  border: 'none',
                  borderBottom: '1px solid rgba(244,221,195,0.06)',
                  cursor: 'pointer',
                  transition: 'background-color 0.2s ease',
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.backgroundColor = 'rgba(244,221,195,0.06)';
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.backgroundColor = 'transparent';
                }}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <span
                      style={{
                        fontFamily: 'var(--font-montserrat), Montserrat, sans-serif',
                        fontWeight: 500,
                        fontSize: '14px',
                        color: '#FFFFFF',
                      }}
                    >
                      {entry.city}
                    </span>
                    <span
                      style={{
                        fontFamily: 'var(--font-montserrat), Montserrat, sans-serif',
                        fontWeight: 300,
                        fontSize: '12px',
                        color: '#6B6B6B',
                        marginLeft: '8px',
                      }}
                    >
                      {entry.country}
                    </span>
                  </div>
                </div>
                <div
                  className="flex flex-wrap gap-2 mt-1"
                >
                  {entry.airports.map((apt) => (
                    <span
                      key={apt.code}
                      style={{
                        fontFamily: 'var(--font-montserrat), Montserrat, sans-serif',
                        fontWeight: 400,
                        fontSize: '11px',
                        color: '#F4DDC3',
                        backgroundColor: 'rgba(244,221,195,0.08)',
                        padding: '2px 8px',
                        borderRadius: '2px',
                        letterSpacing: '0.03em',
                      }}
                    >
                      {apt.code} — {apt.name}
                    </span>
                  ))}
                </div>
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ============================================
   SHARED STYLES
   ============================================ */
const inputStyle: React.CSSProperties = {
  width: '100%',
  padding: '14px 16px',
  backgroundColor: 'rgba(14, 32, 45, 0.6)',
  border: '1px solid rgba(244, 221, 195, 0.12)',
  color: '#FFFFFF',
  fontFamily: 'var(--font-montserrat), Montserrat, sans-serif',
  fontWeight: 300,
  fontSize: '14px',
  outline: 'none',
  transition: 'border-color 0.3s ease, background-color 0.3s ease',
  borderRadius: '2px',
};

const labelStyle: React.CSSProperties = {
  fontFamily: 'var(--font-montserrat), Montserrat, sans-serif',
  fontWeight: 500,
  fontSize: '10px',
  textTransform: 'uppercase',
  letterSpacing: '0.18em',
  color: '#F4DDC3',
  marginBottom: '10px',
  display: 'block',
};

/* ============================================
   PRICE FORMATTER
   ============================================ */
function formatPrice(price: number): string {
  return new Intl.NumberFormat('fr-FR', {
    style: 'currency',
    currency: 'EUR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price);
}

function formatDate(dateStr: string): string {
  const date = new Date(dateStr);
  return new Intl.DateTimeFormat('fr-FR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(date);
}

function formatDateShort(dateStr: string): string {
  const date = new Date(dateStr);
  return new Intl.DateTimeFormat('fr-FR', {
    day: 'numeric',
    month: 'short',
  }).format(date);
}

/* ============================================
   UNIQUE CATEGORIES
   ============================================ */
const categories = Array.from(
  new Set(emptyLegs.map((el) => el.category))
).sort();

/* ============================================
   HERO SECTION
   ============================================ */
function HeroSection() {
  return (
    <section
      className="relative flex items-center justify-center overflow-hidden"
      style={{ minHeight: 'clamp(500px, 70vh, 700px)' }}
    >
      {/* Background image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="https://images.unsplash.com/photo-1540962351504-03099e0a754b?w=1920&q=80"
          alt="Jet privé"
          fill
          className="object-cover"
          priority
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(to bottom, rgba(14,32,45,0.75) 0%, rgba(14,32,45,0.55) 40%, rgba(14,32,45,0.9) 100%)',
          }}
        />
      </div>

      {/* Decorative gold lines */}
      <div
        className="absolute top-1/3 left-0 right-0 h-[1px] opacity-[0.06]"
        style={{
          background: 'linear-gradient(90deg, transparent, #F4DDC3, transparent)',
        }}
      />

      {/* Content */}
      <div
        className="relative z-10 w-full text-center"
        style={{ maxWidth: '900px', margin: '0 auto', padding: 'clamp(120px, 18vh, 180px) 24px clamp(60px, 10vh, 100px)' }}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number] }}
          className="flex justify-center mb-8"
        >
          <div
            style={{
              width: 72,
              height: 72,
              border: '1px solid rgba(244,221,195,0.25)',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#F4DDC3',
            }}
          >
            <PlaneTakeoffIcon />
          </div>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number] }}
          style={{
            fontFamily: 'var(--font-montserrat), Montserrat, sans-serif',
            fontWeight: 500,
            fontSize: '12px',
            textTransform: 'uppercase',
            letterSpacing: '0.3em',
            color: '#F4DDC3',
            marginBottom: '20px',
          }}
        >
          Empty Legs
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3, ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number] }}
          style={{
            fontFamily: 'var(--font-playfair), "Playfair Display", serif',
            fontWeight: 700,
            color: '#FFFFFF',
            lineHeight: 1.1,
            fontSize: 'clamp(36px, 5.5vw, 64px)',
            marginBottom: '24px',
          }}
        >
          VOLS À VIDE
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5, ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number] }}
          style={{
            fontFamily: 'var(--font-cormorant), "Cormorant Garamond", serif',
            fontStyle: 'italic',
            fontSize: 'clamp(20px, 3vw, 28px)',
            color: '#F4DDC3',
            lineHeight: 1.4,
            marginBottom: '20px',
          }}
        >
          Jusqu&apos;à -75% sur votre jet privé
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6, ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number] }}
          style={{
            fontFamily: 'var(--font-montserrat), Montserrat, sans-serif',
            fontWeight: 300,
            fontSize: 'clamp(15px, 1.8vw, 17px)',
            color: '#A0A0A0',
            lineHeight: 1.7,
            maxWidth: '560px',
            margin: '0 auto',
          }}
        >
          Profitez des repositionnements d&apos;appareils pour voyager en jet privé
          à des tarifs exceptionnels.
        </motion.p>

        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1, delay: 0.8, ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number] }}
          className="mx-auto mt-10"
          style={{
            width: '80px',
            height: '1px',
            background: 'linear-gradient(90deg, transparent, #F4DDC3, transparent)',
          }}
        />
      </div>
    </section>
  );
}

/* ============================================
   STATS SECTION
   ============================================ */
function StatsSection() {
  const stats = [
    { value: 75, suffix: '%', label: "d'économie maximale" },
    { value: emptyLegs.length, suffix: '+', label: 'vols disponibles' },
    { value: 30, suffix: 'min', label: 'temps de réponse' },
    { value: 24, suffix: 'h/24', label: 'disponibilité' },
  ];

  return (
    <section
      style={{
        backgroundColor: '#132A3A',
        borderTop: '1px solid rgba(244,221,195,0.08)',
        borderBottom: '1px solid rgba(244,221,195,0.08)',
        padding: 'clamp(40px, 6vw, 60px) 0',
      }}
    >
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px' }}>
        <div
          className="grid grid-cols-2 md:grid-cols-4"
          style={{ gap: 'clamp(20px, 3vw, 40px)' }}
        >
          {stats.map((stat, i) => (
            <AnimatedCounter
              key={i}
              value={stat.value}
              suffix={stat.suffix}
              label={stat.label}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============================================
   ADVANTAGES SECTION
   ============================================ */
function AdvantagesSection() {
  const advantages = [
    {
      icon: <TagIcon />,
      title: 'Prix réduits',
      description: "Économisez jusqu'à 75% par rapport à un affrètement classique. Même appareil, même service, tarif exceptionnel.",
    },
    {
      icon: <ShieldIcon />,
      title: 'Service identique',
      description: 'Vous bénéficiez exactement du même niveau de confort, de sécurité et de service qu\'un vol privé standard.',
    },
    {
      icon: <ClockIcon />,
      title: 'Disponibilité immédiate',
      description: 'Les appareils sont déjà programmés pour voler. Confirmez votre place et embarquez sans délai.',
    },
  ];

  return (
    <section className="section-padding" style={{ backgroundColor: '#0E202D' }}>
      <div className="container-luxury">
        <SectionTitle
          preTitle="Comment ça fonctionne"
          title="Qu'est-ce qu'un Empty Leg ?"
          subtitle="Un vol à vide correspond au repositionnement d'un jet privé vers sa prochaine mission. Plutôt que de voler sans passager, profitez-en à prix réduit."
          centered
        />

        <div
          className="grid grid-cols-1 md:grid-cols-3 mt-16"
          style={{ gap: 'clamp(24px, 3vw, 40px)' }}
        >
          {advantages.map((adv, i) => (
            <ScrollReveal key={i} delay={i * 0.12}>
              <div
                className="text-center"
                style={{
                  padding: 'clamp(32px, 4vw, 48px) clamp(24px, 3vw, 36px)',
                  backgroundColor: '#132A3A',
                  border: '1px solid rgba(244,221,195,0.08)',
                  transition: 'border-color 0.4s ease, transform 0.4s ease',
                  height: '100%',
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor = 'rgba(244,221,195,0.2)';
                  (e.currentTarget as HTMLElement).style.transform = 'translateY(-4px)';
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor = 'rgba(244,221,195,0.08)';
                  (e.currentTarget as HTMLElement).style.transform = 'translateY(0)';
                }}
              >
                <div
                  className="flex items-center justify-center mx-auto mb-6"
                  style={{
                    width: 64,
                    height: 64,
                    border: '1px solid rgba(244,221,195,0.2)',
                    borderRadius: '50%',
                    color: '#F4DDC3',
                  }}
                >
                  {adv.icon}
                </div>
                <h3
                  style={{
                    fontFamily: 'var(--font-playfair), "Playfair Display", serif',
                    fontWeight: 600,
                    fontSize: 'clamp(18px, 2.5vw, 22px)',
                    color: '#FFFFFF',
                    marginBottom: '14px',
                  }}
                >
                  {adv.title}
                </h3>
                <p
                  style={{
                    fontFamily: 'var(--font-montserrat), Montserrat, sans-serif',
                    fontWeight: 300,
                    fontSize: '14px',
                    color: '#A0A0A0',
                    lineHeight: 1.8,
                  }}
                >
                  {adv.description}
                </p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============================================
   FILTER SECTION + LISTING
   ============================================ */
function FilterAndListingSection() {
  const [departure, setDeparture] = useState('');
  const [arrival, setArrival] = useState('');
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');
  const [category, setCategory] = useState('');
  const [maxBudget, setMaxBudget] = useState('');

  const filteredLegs = useMemo(() => {
    return emptyLegs.filter((leg) => {
      if (
        departure &&
        !leg.departure.toLowerCase().includes(departure.toLowerCase())
      ) {
        return false;
      }
      if (
        arrival &&
        !leg.arrival.toLowerCase().includes(arrival.toLowerCase())
      ) {
        return false;
      }
      if (dateFrom && leg.date < dateFrom) {
        return false;
      }
      if (dateTo && leg.date > dateTo) {
        return false;
      }
      if (category && leg.category !== category) {
        return false;
      }
      if (maxBudget && leg.emptyLegPrice > Number(maxBudget)) {
        return false;
      }
      return true;
    });
  }, [departure, arrival, dateFrom, dateTo, category, maxBudget]);

  const resetFilters = () => {
    setDeparture('');
    setArrival('');
    setDateFrom('');
    setDateTo('');
    setCategory('');
    setMaxBudget('');
  };

  const hasFilters = departure || arrival || dateFrom || dateTo || category || maxBudget;

  return (
    <section
      className="section-padding"
      style={{
        backgroundColor: '#132A3A',
        borderTop: '1px solid rgba(244,221,195,0.08)',
      }}
    >
      <div className="container-luxury">
        <SectionTitle
          preTitle="Offres disponibles"
          title="Trouvez votre vol à vide"
          subtitle="Filtrez parmi nos empty legs disponibles et réservez au meilleur prix."
          centered
        />

        {/* Filters */}
        <ScrollReveal>
          <div
            className="mt-14"
            style={{
              backgroundColor: 'rgba(14, 32, 45, 0.6)',
              backdropFilter: 'blur(10px)',
              WebkitBackdropFilter: 'blur(10px)',
              border: '1px solid rgba(244,221,195,0.1)',
              padding: 'clamp(24px, 4vw, 40px)',
            }}
          >
            <div className="flex items-center gap-3 mb-8">
              <div style={{ color: '#F4DDC3' }}>
                <FilterIcon />
              </div>
              <p
                style={{
                  fontFamily: 'var(--font-montserrat), Montserrat, sans-serif',
                  fontWeight: 600,
                  fontSize: '11px',
                  textTransform: 'uppercase',
                  letterSpacing: '0.18em',
                  color: '#F4DDC3',
                }}
              >
                Filtrer les résultats
              </p>
              {hasFilters && (
                <button
                  onClick={resetFilters}
                  className="cursor-pointer ml-auto"
                  style={{
                    background: 'none',
                    border: 'none',
                    fontFamily: 'var(--font-montserrat), Montserrat, sans-serif',
                    fontWeight: 400,
                    fontSize: '11px',
                    color: '#6B6B6B',
                    textDecoration: 'underline',
                    textUnderlineOffset: '3px',
                    transition: 'color 0.3s ease',
                  }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = '#F4DDC3'; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = '#6B6B6B'; }}
                >
                  Réinitialiser
                </button>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-5">
              {/* Departure */}
              <CityAutocomplete
                value={departure}
                onChange={setDeparture}
                placeholder="Ville de départ"
                label="Départ"
              />

              {/* Arrival */}
              <CityAutocomplete
                value={arrival}
                onChange={setArrival}
                placeholder="Ville d'arrivée"
                label="Arrivée"
              />

              {/* Date from */}
              <div>
                <label style={labelStyle}>Date début</label>
                <input
                  type="date"
                  value={dateFrom}
                  onChange={(e) => setDateFrom(e.target.value)}
                  style={{ ...inputStyle, colorScheme: 'dark' }}
                  onFocus={(e) => { e.currentTarget.style.borderColor = 'rgba(244,221,195,0.4)'; }}
                  onBlur={(e) => { e.currentTarget.style.borderColor = 'rgba(244,221,195,0.12)'; }}
                />
              </div>

              {/* Date to */}
              <div>
                <label style={labelStyle}>Date fin</label>
                <input
                  type="date"
                  value={dateTo}
                  onChange={(e) => setDateTo(e.target.value)}
                  style={{ ...inputStyle, colorScheme: 'dark' }}
                  onFocus={(e) => { e.currentTarget.style.borderColor = 'rgba(244,221,195,0.4)'; }}
                  onBlur={(e) => { e.currentTarget.style.borderColor = 'rgba(244,221,195,0.12)'; }}
                />
              </div>

              {/* Category */}
              <div>
                <label style={labelStyle}>Catégorie</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  style={{
                    ...inputStyle,
                    appearance: 'none',
                    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%23F4DDC3' stroke-width='2'%3E%3Cpolyline points='6 9 12 15 18 9'/%3E%3C/svg%3E")`,
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'right 14px center',
                    paddingRight: '36px',
                  }}
                  onFocus={(e) => { e.currentTarget.style.borderColor = 'rgba(244,221,195,0.4)'; }}
                  onBlur={(e) => { e.currentTarget.style.borderColor = 'rgba(244,221,195,0.12)'; }}
                >
                  <option value="">Toutes</option>
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>

              {/* Max budget */}
              <div>
                <label style={labelStyle}>Budget max (€)</label>
                <input
                  type="number"
                  placeholder="Ex: 5000"
                  value={maxBudget}
                  onChange={(e) => setMaxBudget(e.target.value)}
                  style={inputStyle}
                  min={0}
                  onFocus={(e) => { e.currentTarget.style.borderColor = 'rgba(244,221,195,0.4)'; }}
                  onBlur={(e) => { e.currentTarget.style.borderColor = 'rgba(244,221,195,0.12)'; }}
                />
              </div>
            </div>
          </div>
        </ScrollReveal>

        {/* Results count */}
        <div className="mt-10 mb-8 flex items-center justify-between">
          <p
            style={{
              fontFamily: 'var(--font-montserrat), Montserrat, sans-serif',
              fontWeight: 400,
              fontSize: '14px',
              color: '#6B6B6B',
            }}
          >
            <span style={{ color: '#F4DDC3', fontWeight: 600 }}>{filteredLegs.length}</span>{' '}
            vol{filteredLegs.length !== 1 ? 's' : ''} disponible{filteredLegs.length !== 1 ? 's' : ''}
          </p>
          <div
            style={{
              flex: 1,
              height: '1px',
              backgroundColor: 'rgba(244,221,195,0.08)',
              marginLeft: '20px',
            }}
          />
        </div>

        {/* Empty legs listing */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <AnimatePresence mode="popLayout">
            {filteredLegs.length === 0 ? (
              <motion.div
                key="empty"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
              >
                <div
                  className="py-20 text-center"
                  style={{
                    backgroundColor: 'rgba(14, 32, 45, 0.6)',
                    border: '1px solid rgba(244,221,195,0.08)',
                  }}
                >
                  <div className="flex justify-center mb-4" style={{ color: '#6B6B6B' }}>
                    <SearchIcon />
                  </div>
                  <p
                    className="mt-4"
                    style={{
                      fontFamily: 'var(--font-playfair), "Playfair Display", serif',
                      fontWeight: 600,
                      fontSize: '22px',
                      color: '#FFFFFF',
                    }}
                  >
                    Aucun vol disponible
                  </p>
                  <p
                    className="mt-3"
                    style={{
                      fontFamily: 'var(--font-montserrat), Montserrat, sans-serif',
                      fontWeight: 300,
                      fontSize: '14px',
                      color: '#6B6B6B',
                      maxWidth: '400px',
                      margin: '12px auto 0',
                    }}
                  >
                    Modifiez vos critères de recherche ou créez une alerte pour être notifié.
                  </p>
                </div>
              </motion.div>
            ) : (
              filteredLegs.map((leg, index) => (
                <motion.div
                  key={leg.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  layout
                >
                  <EmptyLegCard leg={leg} />
                </motion.div>
              ))
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

/* ============================================
   EMPTY LEG CARD
   ============================================ */
function EmptyLegCard({ leg }: { leg: EmptyLeg }) {
  return (
    <div
      style={{
        backgroundColor: 'rgba(14, 32, 45, 0.6)',
        border: '1px solid rgba(244,221,195,0.08)',
        transition: 'border-color 0.4s ease, box-shadow 0.4s ease, transform 0.4s ease',
        overflow: 'hidden',
      }}
      onMouseEnter={(e) => {
        const el = e.currentTarget as HTMLElement;
        el.style.borderColor = 'rgba(244,221,195,0.2)';
        el.style.boxShadow = '0 20px 60px rgba(0,0,0,0.3)';
        el.style.transform = 'translateY(-2px)';
      }}
      onMouseLeave={(e) => {
        const el = e.currentTarget as HTMLElement;
        el.style.borderColor = 'rgba(244,221,195,0.08)';
        el.style.boxShadow = 'none';
        el.style.transform = 'translateY(0)';
      }}
    >
      <div
        className="flex flex-col lg:flex-row"
        style={{ minHeight: '100%' }}
      >
        {/* Left: Route visual */}
        <div
          className="flex-1"
          style={{
            padding: 'clamp(24px, 3vw, 36px)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
          }}
        >
          {/* Route */}
          <div className="flex items-center gap-4 mb-5">
            <div>
              <p
                style={{
                  fontFamily: 'var(--font-playfair), "Playfair Display", serif',
                  fontWeight: 600,
                  fontSize: 'clamp(20px, 2.5vw, 26px)',
                  color: '#FFFFFF',
                  lineHeight: 1.2,
                }}
              >
                {leg.departure}
              </p>
              <p
                style={{
                  fontFamily: 'var(--font-montserrat), Montserrat, sans-serif',
                  fontWeight: 500,
                  fontSize: '11px',
                  color: '#6B6B6B',
                  letterSpacing: '0.12em',
                  marginTop: '2px',
                }}
              >
                {leg.departureCode}
              </p>
            </div>

            <ArrowRightLongIcon />

            <div>
              <p
                style={{
                  fontFamily: 'var(--font-playfair), "Playfair Display", serif',
                  fontWeight: 600,
                  fontSize: 'clamp(20px, 2.5vw, 26px)',
                  color: '#FFFFFF',
                  lineHeight: 1.2,
                }}
              >
                {leg.arrival}
              </p>
              <p
                style={{
                  fontFamily: 'var(--font-montserrat), Montserrat, sans-serif',
                  fontWeight: 500,
                  fontSize: '11px',
                  color: '#6B6B6B',
                  letterSpacing: '0.12em',
                  marginTop: '2px',
                }}
              >
                {leg.arrivalCode}
              </p>
            </div>
          </div>

          {/* Details row */}
          <div className="flex flex-wrap items-center gap-5">
            <div className="flex items-center gap-2" style={{ color: '#A0A0A0' }}>
              <CalendarIcon />
              <span
                style={{
                  fontFamily: 'var(--font-montserrat), Montserrat, sans-serif',
                  fontWeight: 400,
                  fontSize: '13px',
                  color: '#A0A0A0',
                }}
              >
                {formatDate(leg.date)}
              </span>
            </div>

            <div
              style={{
                width: '1px',
                height: '14px',
                backgroundColor: 'rgba(244,221,195,0.15)',
              }}
            />

            <div className="flex items-center gap-2" style={{ color: '#A0A0A0' }}>
              <PlaneIcon size={15} />
              <span
                style={{
                  fontFamily: 'var(--font-montserrat), Montserrat, sans-serif',
                  fontWeight: 400,
                  fontSize: '13px',
                  color: '#A0A0A0',
                }}
              >
                {leg.aircraft}
              </span>
            </div>

            <div
              style={{
                width: '1px',
                height: '14px',
                backgroundColor: 'rgba(244,221,195,0.15)',
              }}
            />

            <div className="flex items-center gap-2" style={{ color: '#A0A0A0' }}>
              <UsersIcon />
              <span
                style={{
                  fontFamily: 'var(--font-montserrat), Montserrat, sans-serif',
                  fontWeight: 400,
                  fontSize: '13px',
                  color: '#A0A0A0',
                }}
              >
                {leg.seats} places
              </span>
            </div>
          </div>
        </div>

        {/* Vertical separator (desktop) */}
        <div
          className="hidden lg:block"
          style={{
            width: '1px',
            alignSelf: 'stretch',
            backgroundColor: 'rgba(244,221,195,0.08)',
            margin: '20px 0',
          }}
        />

        {/* Horizontal separator (mobile) */}
        <div
          className="block lg:hidden"
          style={{
            height: '1px',
            backgroundColor: 'rgba(244,221,195,0.08)',
            margin: '0 clamp(24px, 3vw, 36px)',
          }}
        />

        {/* Right: Pricing & CTA */}
        <div
          style={{
            padding: 'clamp(24px, 3vw, 36px)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '16px',
            minWidth: '260px',
          }}
        >
          {/* Badges */}
          <div className="flex items-center gap-2">
            <Badge>{leg.category}</Badge>
          </div>

          {/* Pricing */}
          <div className="text-center">
            <p
              style={{
                fontFamily: 'var(--font-montserrat), Montserrat, sans-serif',
                fontWeight: 400,
                fontSize: '14px',
                color: '#6B6B6B',
                textDecoration: 'line-through',
                lineHeight: 1.3,
              }}
            >
              {formatPrice(leg.originalPrice)}
            </p>
            <p
              style={{
                fontFamily: 'var(--font-playfair), "Playfair Display", serif',
                fontWeight: 700,
                fontSize: 'clamp(28px, 3.5vw, 36px)',
                color: '#F4DDC3',
                lineHeight: 1.1,
                marginTop: '2px',
              }}
            >
              {formatPrice(leg.emptyLegPrice)}
            </p>
            <div
              className="mt-2 inline-flex items-center justify-center"
              style={{
                backgroundColor: 'rgba(45, 139, 111, 0.15)',
                border: '1px solid rgba(45, 139, 111, 0.3)',
                borderRadius: '2px',
                padding: '3px 10px',
              }}
            >
              <span
                style={{
                  fontFamily: 'var(--font-montserrat), Montserrat, sans-serif',
                  fontWeight: 600,
                  fontSize: '11px',
                  color: '#2D8B6F',
                  letterSpacing: '0.05em',
                }}
              >
                -{leg.discount}%
              </span>
            </div>
          </div>

          {/* CTA */}
          <Button href="/devis" size="sm">
            Réserver
          </Button>
        </div>
      </div>
    </div>
  );
}

/* ============================================
   ALERT SIGNUP SECTION
   ============================================ */
function AlertSignupSection() {
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [routes, setRoutes] = useState('');
  const [flexibleDates, setFlexibleDates] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section
      id="alertes"
      className="section-padding"
      style={{
        backgroundColor: '#0E202D',
        borderTop: '1px solid rgba(244,221,195,0.08)',
      }}
    >
      <div className="container-luxury">
        <div style={{ maxWidth: '700px', margin: '0 auto' }}>
          <ScrollReveal>
            <div className="text-center mb-12">
              <div className="flex justify-center mb-8">
                <div
                  className="flex items-center justify-center"
                  style={{
                    width: '72px',
                    height: '72px',
                    border: '1px solid rgba(244,221,195,0.2)',
                    borderRadius: '50%',
                    background: 'linear-gradient(135deg, rgba(244,221,195,0.06) 0%, transparent 100%)',
                  }}
                >
                  <BellIcon />
                </div>
              </div>

              <SectionTitle
                preTitle="Ne manquez aucune opportunité"
                title="Créer une alerte"
                subtitle="Recevez une notification dès qu'un vol à vide correspond à vos critères de recherche."
                centered
              />
            </div>

            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number] }}
                className="text-center py-16 px-8"
                style={{
                  backgroundColor: '#132A3A',
                  border: '1px solid rgba(244,221,195,0.2)',
                }}
              >
                <div className="flex justify-center mb-6" style={{ color: '#2D8B6F' }}>
                  <CheckCircleIcon />
                </div>
                <h3
                  className="mb-3"
                  style={{
                    fontFamily: 'var(--font-playfair), "Playfair Display", serif',
                    fontWeight: 600,
                    fontSize: '24px',
                    color: '#FFFFFF',
                  }}
                >
                  Alerte créée avec succès
                </h3>
                <p
                  style={{
                    fontFamily: 'var(--font-montserrat), Montserrat, sans-serif',
                    fontWeight: 300,
                    fontSize: '15px',
                    color: '#A0A0A0',
                    maxWidth: '400px',
                    margin: '0 auto',
                    lineHeight: 1.7,
                  }}
                >
                  Vous serez notifié dès qu&apos;un vol correspondant à vos critères sera disponible.
                </p>
              </motion.div>
            ) : (
              <form
                onSubmit={handleSubmit}
                style={{
                  backgroundColor: '#132A3A',
                  border: '1px solid rgba(244,221,195,0.1)',
                  padding: 'clamp(28px, 4vw, 48px)',
                }}
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Email */}
                  <div>
                    <label style={labelStyle}>
                      Email <span style={{ color: '#F4DDC3' }}>*</span>
                    </label>
                    <input
                      type="email"
                      placeholder="votre@email.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      style={inputStyle}
                      onFocus={(e) => { e.currentTarget.style.borderColor = 'rgba(244,221,195,0.4)'; }}
                      onBlur={(e) => { e.currentTarget.style.borderColor = 'rgba(244,221,195,0.12)'; }}
                    />
                  </div>

                  {/* Phone */}
                  <div>
                    <label style={labelStyle}>
                      Téléphone{' '}
                      <span
                        style={{
                          fontWeight: 300,
                          textTransform: 'none',
                          letterSpacing: '0',
                          color: '#6B6B6B',
                        }}
                      >
                        (optionnel)
                      </span>
                    </label>
                    <input
                      type="tel"
                      placeholder="+33 6 00 00 00 00"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      style={inputStyle}
                      onFocus={(e) => { e.currentTarget.style.borderColor = 'rgba(244,221,195,0.4)'; }}
                      onBlur={(e) => { e.currentTarget.style.borderColor = 'rgba(244,221,195,0.12)'; }}
                    />
                  </div>
                </div>

                {/* Routes */}
                <div className="mt-6">
                  <label style={labelStyle}>
                    Trajets souhaités <span style={{ color: '#F4DDC3' }}>*</span>
                  </label>
                  <textarea
                    placeholder="Ex: Paris → Nice, Genève → Londres, Paris → Ibiza..."
                    value={routes}
                    onChange={(e) => setRoutes(e.target.value)}
                    required
                    rows={3}
                    style={{
                      ...inputStyle,
                      resize: 'vertical',
                    }}
                    onFocus={(e) => { e.currentTarget.style.borderColor = 'rgba(244,221,195,0.4)'; }}
                    onBlur={(e) => { e.currentTarget.style.borderColor = 'rgba(244,221,195,0.12)'; }}
                  />
                </div>

                {/* Flexible dates toggle */}
                <div className="mt-6">
                  <label
                    className="flex items-center gap-3 cursor-pointer"
                    style={{ userSelect: 'none' }}
                  >
                    <div
                      onClick={() => setFlexibleDates(!flexibleDates)}
                      className="flex-shrink-0 cursor-pointer"
                      style={{
                        width: '44px',
                        height: '24px',
                        borderRadius: '12px',
                        backgroundColor: flexibleDates ? '#F4DDC3' : 'rgba(26, 52, 72, 0.8)',
                        transition: 'background-color 0.3s ease',
                        position: 'relative',
                      }}
                    >
                      <div
                        style={{
                          width: '18px',
                          height: '18px',
                          borderRadius: '50%',
                          backgroundColor: flexibleDates ? '#0E202D' : '#6B6B6B',
                          position: 'absolute',
                          top: '3px',
                          left: flexibleDates ? '23px' : '3px',
                          transition: 'left 0.3s ease, background-color 0.3s ease',
                        }}
                      />
                    </div>
                    <span
                      style={{
                        fontFamily: 'var(--font-montserrat), Montserrat, sans-serif',
                        fontWeight: 400,
                        fontSize: '14px',
                        color: '#A0A0A0',
                      }}
                    >
                      Dates flexibles (je suis ouvert à différentes dates)
                    </span>
                  </label>
                </div>

                {/* Submit */}
                <div className="mt-10 text-center">
                  <Button type="submit" size="lg">
                    Créer mon alerte
                  </Button>
                </div>
              </form>
            )}
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}

/* ============================================
   BOTTOM CTA SECTION
   ============================================ */
function BottomCtaSection() {
  return (
    <section
      className="relative overflow-hidden"
      style={{
        padding: 'clamp(80px, 12vw, 140px) 0',
        borderTop: '1px solid rgba(244,221,195,0.08)',
      }}
    >
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <Image
          src="https://images.unsplash.com/photo-1474302770737-173ee21bab63?w=1920&q=75"
          alt="Intérieur jet privé"
          fill
          className="object-cover"
        />
        <div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(to bottom, rgba(14,32,45,0.92) 0%, rgba(14,32,45,0.85) 50%, rgba(14,32,45,0.95) 100%)',
          }}
        />
      </div>

      <div className="container-luxury text-center relative z-10">
        <ScrollReveal>
          <SectionTitle
            preTitle="Besoin d'un vol sur mesure ?"
            title="L'empty leg ne correspond pas à vos besoins ?"
            subtitle="Demandez un devis personnalisé pour un affrètement classique. Notre équipe vous répond sous 30 minutes, 24h/24."
            centered
          />
          <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button href="/devis" size="lg">
              Demander un devis
            </Button>
            <Button href="/services/affretement-jet-prive" variant="secondary" size="lg">
              En savoir plus
            </Button>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}

/* ============================================
   PAGE EXPORT
   ============================================ */
export default function EmptyLegsPage() {
  return (
    <>
      <HeroSection />
      <StatsSection />
      <AdvantagesSection />
      <FilterAndListingSection />
      <AlertSignupSection />
      <BottomCtaSection />
    </>
  );
}
