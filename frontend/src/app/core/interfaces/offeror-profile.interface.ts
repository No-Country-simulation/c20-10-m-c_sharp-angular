export interface OfferorProfile {
  offerorId: number;
  name: string;
  lastName: string;
  subtitle: string;
  photo: string;
  averageRating: string;
  listRating: ListRating[];
  listSpecialities: ListSpeciality[];
  jobsPostedId: number[];
  experience: string;
  shedules: string;
  certificates: Certificate[];
  location: Location;
  whatsapp: Whatsapp;
}

export interface Certificate {
  id: number;
  src: string;
  alt: string;
}

export interface ListRating {
  title: string;
  value: number;
  totalReviews: string;
}

export interface ListSpeciality {
  name: string;
  categoryId: number;
  specialityId: number;
  isActive: boolean;
  createdAt: Date;
}

export interface Location {
  lat: number;
  lon: number;
  country: string;
  state: string;
  city: string;
  address: string;
}

export interface Whatsapp {
  isActive: boolean;
  area: string;
  number: string;
}
