export interface Stop {
  id: string;
  position: number;
  name: string;
  lat: number;
  lng: number;
  address?: string;
  icon: string;
  teaser: string;
  story: string;
  radiusMeters: number;
}

export interface Journey {
  id: string;
  slug: string;
  title: string;
  theme: string;
  icon: string;
  accent: string;
  description: string;
  duration: string;
  distance: string;
  createdBy: string | null;
  stops: Stop[];
}
