
export type RouteDifficulty = "easy" | "moderate" | "hard";

export type LengthBucket = "short" | "mid" | "long";

export type River = "asveja" | "zeimena" | "sventoji" | "neris" | "mera";

export type RouteImage = "river" | "pine" | "sunset" | "forest" | "water" | "mist" | "aerial" | "canyon";

export interface Landmark {
  num: number;
  title: string;
  description: string;
}

export interface RouteMap {
  embedId: string;
  lat: number;
  lng: number;
  zoom: number;
}

export interface Route {
  id: number;
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  difficulty: RouteDifficulty;
  distanceKm: number;
  duration: string;
  route: string;
  river: string;
  image: RouteImage;
  price: number;
  includes: string[];
  landmarks: Landmark[];
  relatedSlugs: string[];
  map?: RouteMap;
}

export type BoatType = "kayak" | "canoe" | "raft" | "paddleboard";
