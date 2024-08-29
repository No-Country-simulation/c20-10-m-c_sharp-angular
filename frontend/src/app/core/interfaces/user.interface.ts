export interface User {
  id: string;
  email: string;
  nombre: string;
  apellido: string;
}

export type UserUpdate = Omit<User, 'id' | 'email'>;
