export interface Notification {
  id: string;
  subject: string;
  url: string;
  message: string;
}

export type NotificationAdd = Omit<Notification, 'id'>;
