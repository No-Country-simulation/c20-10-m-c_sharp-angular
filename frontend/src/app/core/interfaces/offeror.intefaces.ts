import { Speciality } from './speciality.interface';

export interface Offeror {
  id: string;
  geolocation: string;
  offerorSpecialities: OfferorSpeciality[];
}

export interface OfferorSpeciality {
  id: number;
  isActive: boolean;
  createdAt: Date;
  idOfferor: string;
  offeror: string;
  idSpeciality: number;
  speciality: Speciality;
  title: string;
  text: string;
  area: string;
}

export type OfferorFormValue = Omit<Offeror, 'id' | 'offerorSpecialities'>;
