import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  template: `<p>Home works!</p>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class HomeComponent {}
