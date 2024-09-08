import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-layout-dashboard',
  standalone: true,
  imports: [
    RouterOutlet,
  ],
  templateUrl: './layout-dashboard.component.html',
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class LayoutDashboardComponent {

}
