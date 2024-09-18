import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  inject,
  OnInit,
  signal,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';
import { Router } from '@angular/router';

import { ButtonModule } from 'primeng/button';

import { NotificationService } from '@app/core/services';
import { Notification } from '@app/core/interfaces';
import { revealAnimation } from '@app/shared/animations';

@Component({
  standalone: true,
  imports: [CommonModule, ButtonModule],
  animations: [revealAnimation],
  template: `
    <div class="layout-container">
      <h1 class="text-xl text-center mb-5">Mis notificaciones</h1>
      <div class="flex flex-column gap-3" [@revealAnimation]>
        @for (item of notificationsData(); track $index) {
          <button class="reset-btn" (click)="onNavigate(item.url)">
            <div class="flex flex-column border-1 border-round p-3">
              <div class="flex align-items-center justify-content-between">
                <span class="capitalize text-lg font-semibold">{{ item.subject }}</span>
                <p-button
                  class="align-self-end"
                  icon="text-color pi pi-times"
                  text="true"
                  (onClick)="onRemoveNotification(item.id)" />
              </div>
              <p class="m-0 flex-1">
                {{ item.message }}
              </p>
              <small class="text-color-secondary  mt-2">{{ item.createdAt | date: 'short' }}</small>
            </div>
          </button>
        } @empty {
          <div class="flex justify-content-center mt-5">
            <h2 class="text-lg text-color-secondary">No tienes notificaciones</h2>
          </div>
        }
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class NotificationsComponent implements OnInit {
  private readonly notificationService = inject(NotificationService);
  private readonly destroyRef = inject(DestroyRef);
  private readonly router = inject(Router);
  public readonly notificationsData = signal<Notification[]>([]);

  ngOnInit(): void {
    this.notificationService.notifications$
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        map(notifications =>
          notifications.map(notification => ({
            ...notification,
            message: this.truncateMessage(notification.message),
          }))
        )
      )
      .subscribe(res => {
        this.notificationsData.set(res);
      });
  }

  private truncateMessage(message: string): string {
    const maxLength = 85;
    return message.length > maxLength ? message.slice(0, maxLength) + '...' : message;
  }

  public onRemoveNotification(id: string): void {
    this.notificationService.removeNotification(id);
  }

  public onRemoveAllNotifications() {
    this.notificationService.removeAllNotifications();
  }

  public onNavigate(url: string | undefined) {
    if (url) {
      this.router.navigate([url]);
    }
  }
}
