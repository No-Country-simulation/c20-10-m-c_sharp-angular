import { CommonModule, Location } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-btn-navigate-prev',
  standalone: true,
  imports: [CommonModule, ButtonModule],
  template: `
    <div class="mb-5">
      <p-button icon="text-color pi pi-chevron-left" text="true" (onClick)="onNavigatePrev()" />
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BtnNavigatePrevComponent {
  private readonly location = inject(Location);

  onNavigatePrev(): void {
    this.location.back();
  }
}
