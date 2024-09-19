export interface Address {
  street: Street;
  name: string;
  highlight: string;
  city: string;
  county: string;
  administrative: string;
  country: string;
  administrativecode: string;
  countrycode: string;
  countycode: string;
  zipcode: string[];
  population: number;
  lat: number;
  lng: number;
  coordinates: string;
  type: string;
}

export interface Street {
  number: string;
  suffix: string;
  name: string;
}

export interface Suggestions {
  value: Value;
  address: string;
}

export interface Value {
  lat: number;
  lng: number;
  area: string;
}

export interface Location {
  area: string;
  lat: number | string;
  lng: number | string;
}
