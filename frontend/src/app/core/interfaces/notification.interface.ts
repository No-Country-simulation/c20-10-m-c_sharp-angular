export interface Notification {
  id: string;
  subject: string;
  url?: string;
  message: string;
  createdAt?: Date;
}

export type NotificationAdd = Omit<Notification, 'id'>;
