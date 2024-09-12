import { Speciality } from './speciality.interface';

export interface OfferorSpecialities {
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
