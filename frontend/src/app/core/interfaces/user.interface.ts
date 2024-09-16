import { MessageResponse } from './message.interface';
import { UserSpeciality } from './user-specialities.intefaces';

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  dni: string;
  birthDay: Date;
  country: string;
  state: string;
  location: string;
  cellphone: string;
  contactByPhone: boolean;
  contactByEmail: boolean;
  mercadoPago: boolean;
  creditCard: boolean;
  cash: boolean;
  userSpecialities: UserSpeciality[];
  srcImage: string;
}

export type UserUpdate = Omit<User, 'id' | 'email'>;
export interface UserMessages {
  id: number;
  idOtherUser: string;
  name: string;
  image: string;
  createdAt: Date;
  messages: MessageResponse[];
}
