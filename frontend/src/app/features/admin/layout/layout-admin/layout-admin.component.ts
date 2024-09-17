import { ChangeDetectionStrategy, Component } from '@angular/core';
import { LandingHeaderComponent } from '../../../landing/layout';
import { RouterOutlet } from '@angular/router';
import { SidebarComponent } from '../../components/sidebar/sidebar.component';

@Component({
  selector: 'app-layout-admin',
  standalone: true,
  imports: [LandingHeaderComponent, RouterOutlet, SidebarComponent],
  templateUrl: './layout-admin.component.html',
  styleUrl: './layout-admin.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class LayoutAdminComponent {}
