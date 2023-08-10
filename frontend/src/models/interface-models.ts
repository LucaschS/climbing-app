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

export interface CountriesDetailPageRouteData {
  country: Country;
  countries: Country[];
  countryGyms: Gym[];
  gyms: Gym[];
  gym: Gym;
  countryCaves: Cave[];
  caves: Cave[];
  cave: Cave;
  routes: Route[];
  route: Route;
  countryRoutes: Route[];
  id: string;
}

export interface RoutesDetailPageRouteData {
  route: Route;
  routes: Route[];
}

export interface Route {
  type: string;
  id: number;
  lat: number;
  lon: number;
  tags: {
    ["access:conditional"]: string;
    alt_name: string;
    ["climbing:rock"]: string;
    ["climbing:grade:saxon:min"]: string;
    name: string;
    ["name:de"]: string;
    natural: string;
    ref: string;
    sport: string;
    website: string;
  };
  country: string[];
  rate: number[] | undefined;
  comments: {
    author: "string";
    email: "string";
    comment: "string";
  }[];
}

export interface Country {
  // id: number;
  name: string;
  ["alpha-2"]: string;
  ["alpha-3"]: string;
  ["country-code"]: string;
  ["iso_3166-2"]: string;
  region: string;
  ["sub-region"]: string;
  ["intermediate-region"]: string;
  ["region-code"]: string;
  ["sub-region-code"]: string;
  ["intermediate-region-code"]: string;
}

export type Method = "put" | "post" | "patch" | "delete";

export interface CavesDetailPageRouteData {
  cave: Cave;
  caves: Cave[];
}

export interface Cave {
  type: string;
  id: number;
  lat: number;
  lon: number;
  tags: {
    ["addr:city"]: string;
    ["depth"]: string;
    email: string;
    fee: string;
    heritage: string;
    ["heritage:operator"]: string;
    image: string;
    length: string;
    name: string;
    ["name:de"]: string;
    ["name:hu"]: string;
    ["name:pl"]: string;
    natural: string;
    opening_hours: string;
    phone: string;
    ["ref:whc"]: string;
    ["source:name"]: string;
    tourism: string;
    website: string;
    wikidata: string;
    wikipedia: string;
  };
  country: string[];
  rate: number[] | undefined;
  comments: {
    author: "string";
    email: "string";
    comment: "string";
  }[];
}

export interface GymsDetailPageRouteData {
  gym: Gym;
  gyms: Gym[];
  // countryGyms: Gym[];
}

export interface Gym {
  id: number;
  lat: number;
  lon: number;
  tags: {
    access: string;
    ["addr:city"]: string;
    ["addr:housenumber"]: string;
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
  country: string[];
  rate: number[] | undefined;
  comments: {
    author: "string";
    email: "string";
    comment: "string";
  }[];
}
