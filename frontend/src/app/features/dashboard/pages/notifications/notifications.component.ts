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
import { Router } from '@angular/router';
import { Notification } from '@app/core/interfaces';
import { NotificationService } from '@app/core/services';
import { revealAnimation } from '@app/shared/animations';
import { ButtonModule } from 'primeng/button';

@Component({
  standalone: true,
  imports: [CommonModule, ButtonModule],
  animations: [revealAnimation],
  template: `
    <div class="layout-container">
      <h1 class="text-xl mb-5">Mis notificaciones</h1>
      <div class="flex flex-column gap-3" [@revealAnimation]>
        @for (item of notificationsData(); track $index) {
          <button class="reset-btn" (click)="onNavigate(item.url)">
            <div class="flex flex-column border-1 border-round p-3">
              <div class="flex justify-content-between">
                <span>{{ item.subject }}</span>
                <p-button class="align-self-end" icon="text-color pi pi-times" text="true" />
              </div>
              <p class="m-0">
                {{ item.message }}
              </p>
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
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(res => this.notificationsData.set(res));
  }

  public onRemoveNotification(id: string): void {
    this.notificationService.removeNotification(id);
  }

  public onRemoveAllNotifications() {
    this.notificationService.removeAllNotifications();
  }

  public onNavigate(url: string) {
    this.router.navigate([url]);
  }
}
