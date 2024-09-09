export interface User {
  id: string;
  email: string;
  nombre: string;
  apellido: string;
}

export type UserUpdate = Omit<User, 'id' | 'email'>;

export interface UserMessage {
  message: string;
  createdAt: Date;
  user?: string;
}
