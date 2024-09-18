import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { v4 as uuidv4 } from 'uuid';

import { Notification, NotificationAdd } from '../interfaces';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  private notifications: Notification[] = [];
  private notificationsSubject = new BehaviorSubject<Notification[]>(this.notifications);

  /**
   * Observable to get notifications
   */
  public notifications$ = this.notificationsSubject.asObservable();

  /**
   * Method to send a notification
   * @param notification
   * @example
   * {
   *   subject: 'Chat - Mariano',
   *   message: 'Hola',
   *   url: '/dashboard/mensajes/1',
   * }
   */
  public addNotification(notification: NotificationAdd) {
    const newNotification: Notification = {
      id: uuidv4(),
      message: notification.message,
      subject: notification.subject,
      url: notification.url,
    };

    this.notifications.push(newNotification);
    this.notificationsSubject.next(this.notifications);
  }

  public removeNotification(id: string) {
    this.notifications = this.notifications.filter(notification => notification.id !== id);
    this.notificationsSubject.next(this.notifications);
  }

  public removeAllNotifications() {
    this.notifications = [];
    this.notificationsSubject.next(this.notifications);
  }
}
