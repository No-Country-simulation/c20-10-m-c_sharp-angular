export interface User {
  id: string;
  nombre: string;
  apellido: string;
  email: string;
}

/*
firstName: ['', Validators.required],
lastName: ['', Validators.required],
birthDate: ['', Validators.required],
dni: ['', Validators.required],
country: ['', Validators.required],
city: ['', Validators.required],
phone: ['', Validators.required],
contactByPhone: [false],
email: ['', [Validators.required, Validators.email]],
contactByEmail: [false],
password: ['', Validators.required],
mercadoPago: [false],
creditCard: [false],
money: [false],
 */

export type UserUpdate = Omit<User, 'id' | 'email'>;

export interface UserMessage {
  message: string;
  createdAt: Date;
  user?: string;
}
