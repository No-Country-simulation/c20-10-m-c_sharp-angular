import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-logo',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div
      class="flex justify-content-center align-items-center backround-logo
      border-round cursor-pointer p-2
      w-{{ size() }}rem
      h-{{ size() }}rem"
      routerLink="/">
      <img class="select-none" src="/assets/icons/contratAppLogo.svg" alt="ContratApp Logo" />
    </div>
  `,
  styles: `
    .backround-logo {
      background-color: #18181b;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LogoComponent {
  public size = input.required<number>();
}
