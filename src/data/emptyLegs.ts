export interface EmptyLeg {
  id: string;
  departure: string;
  departureCode: string;
  arrival: string;
  arrivalCode: string;
  date: string;
  aircraft: string;
  category: string;
  seats: number;
  originalPrice: number;
  emptyLegPrice: number;
  discount: number;
}

export const emptyLegs: EmptyLeg[] = [
  {
    id: "el-001",
    departure: "Paris",
    departureCode: "LFPB",
    arrival: "Nice",
    arrivalCode: "LFMN",
    date: "2026-03-15",
    aircraft: "Citation XLS+",
    category: "Super Light Jet",
    seats: 8,
    originalPrice: 5800,
    emptyLegPrice: 1950,
    discount: 66,
  },
  {
    id: "el-002",
    departure: "Geneva",
    departureCode: "LSGG",
    arrival: "London",
    arrivalCode: "EGGW",
    date: "2026-03-18",
    aircraft: "Phenom 300E",
    category: "Light Jet",
    seats: 7,
    originalPrice: 7200,
    emptyLegPrice: 2400,
    discount: 67,
  },
  {
    id: "el-003",
    departure: "Paris",
    departureCode: "LFPB",
    arrival: "Ibiza",
    arrivalCode: "LEIB",
    date: "2026-03-22",
    aircraft: "Challenger 350",
    category: "Super Midsize Jet",
    seats: 9,
    originalPrice: 14500,
    emptyLegPrice: 4800,
    discount: 67,
  },
  {
    id: "el-004",
    departure: "Milan",
    departureCode: "LIML",
    arrival: "Paris",
    arrivalCode: "LFPB",
    date: "2026-03-25",
    aircraft: "Citation Mustang",
    category: "Very Light Jet",
    seats: 4,
    originalPrice: 4200,
    emptyLegPrice: 1200,
    discount: 71,
  },
  {
    id: "el-005",
    departure: "London",
    departureCode: "EGLF",
    arrival: "Mykonos",
    arrivalCode: "LGMK",
    date: "2026-04-02",
    aircraft: "Praetor 500",
    category: "Midsize Jet",
    seats: 8,
    originalPrice: 18500,
    emptyLegPrice: 5200,
    discount: 72,
  },
  {
    id: "el-006",
    departure: "Paris",
    departureCode: "LFPB",
    arrival: "Marrakech",
    arrivalCode: "GMMX",
    date: "2026-04-05",
    aircraft: "Citation Latitude",
    category: "Midsize Jet",
    seats: 9,
    originalPrice: 14000,
    emptyLegPrice: 3500,
    discount: 75,
  },
  {
    id: "el-007",
    departure: "Dubai",
    departureCode: "OMDW",
    arrival: "Paris",
    arrivalCode: "LFPB",
    date: "2026-04-10",
    aircraft: "Global 6000",
    category: "Heavy Jet",
    seats: 13,
    originalPrice: 45000,
    emptyLegPrice: 15000,
    discount: 67,
  },
  {
    id: "el-008",
    departure: "Nice",
    departureCode: "LFMN",
    arrival: "Geneva",
    arrivalCode: "LSGG",
    date: "2026-03-20",
    aircraft: "Phenom 100EV",
    category: "Very Light Jet",
    seats: 4,
    originalPrice: 3200,
    emptyLegPrice: 980,
    discount: 69,
  },
];
