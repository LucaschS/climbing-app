export interface BoulderScale {
  band: string;
  font: string;
  score: number;
  v: string;
}

export interface RouteScale {
  band: string;
  ewbank: string;
  french: string;
  score: number;
  uiaa: string;
  yds: string;
}

export type Method = "put" | "post" | "patch" | "delete";

export interface GymsDetailPageRouteData {
  gym?: Gym;
  gyms?: Gym[];
}

export interface Gym {
  id: number;
  lat: number;
  lon: number;
  tags: {
    access: string;
    ["addr:city"]: string;
    ["ddr:housenumber"]: string;
    ["addr:postcode"]: string;
    ["addr:street"]: string;
    ["climbing:boulder"]: string;
    ["climbing:length"]: string;
    ["climbing:sport"]: string;
    ["climbing:toprope"]: string;
    ["climbing:traditional"]: string;
    indoor: string;
    leisure: string;
    name: string;
    opening_hours: string;
    phone: string;
    sport: string;
    url: string;
    website: string;
    note: string;
    source: string;
    sufrace: string;
  };
  type: string;
  cities: string[];
}
