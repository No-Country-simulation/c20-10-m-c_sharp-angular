import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-forgot',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './forgot.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class ForgotComponent {}
