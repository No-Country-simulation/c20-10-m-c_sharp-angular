export interface User {
  id: string;
  nombre: string;
  apellido: string;
  email: string;
}

export type UserUpdate = Omit<User, 'id' | 'email'>;

export interface UserMessage {
  message: string;
  createdAt: Date;
  user?: string;
}
