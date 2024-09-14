import { Speciality } from './speciality.interface';
import { MessageResponse } from './message.interface';

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  dni:              string;
  birthDay:         Date;
  country:          string;
  state:            string;
  location:         string;
  userSpecialities: UserSpeciality[];
}

export type UserUpdate = Omit<User, 'id' | 'email'>;

export interface UserSpeciality {
  id:           number;
  isActive:     boolean;
  createdAt:    Date;
  idUser:       string;
  user:         string;
  idSpeciality: number;
  speciality:   Speciality;
  title:        string;
  text:         string;
  area:         string;
}

export interface UserMessages {
  id:        string;
  name:      string;
  image:     string;
  createdAt: Date;
  messages:  MessageResponse[];
}
