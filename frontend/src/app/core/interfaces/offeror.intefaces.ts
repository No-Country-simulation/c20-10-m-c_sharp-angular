import { Speciality } from './speciality.interface';

export interface UserSpecialities {
  id: string;
  geolocation: string;
  offerorSpecialities: UserSpeciality[];
}

export interface UserSpeciality {
  id: number;
  isActive: boolean;
  createdAt: Date;
  idUser: string;
  offeror: string;
  idSpeciality: number;
  speciality: Speciality;
  title: string;
  text: string;
  area: string;
}

export type UserFormValue = Omit<UserSpecialities, 'id' | 'offerorSpecialities'>;
