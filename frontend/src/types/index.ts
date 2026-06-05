
export type RouteDifficulty = "easy" | "moderate" | "hard";

export type LengthBucket = "short" | "mid" | "long";

export type River = "asveja" | "zeimena" | "sventoji" | "neris" | "mera";

export type RouteImage = "river" | "pine" | "sunset" | "forest" | "water" | "mist" | "aerial" | "canyon";

export interface Landmark {
  num: number;
  title: string;
  description: string;
}

export interface Route {
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  difficulty: RouteDifficulty;
  distanceKm: number;
  duration: string;
  terrain: string;
  river: string;
  image: RouteImage;
  price: number;
  includes: string[];
  landmarks: Landmark[];
  relatedSlugs: string[];
}

export type BoatType = "kayak" | "canoe" | "raft" | "paddleboard";
