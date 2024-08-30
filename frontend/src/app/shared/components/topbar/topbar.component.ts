import { Component, inject } from '@angular/core';
import { Button, ButtonDirective } from 'primeng/button';
import { SidebarModule } from 'primeng/sidebar';
import { AuthService } from '../../../core/services';
import { ThemesService } from '../../../core/themes';
import { ToolbarModule } from 'primeng/toolbar';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-topbar',
  standalone: true,
  imports: [
    ButtonDirective,
    Button,
    SidebarModule,
    ToolbarModule,
    RouterLink,
  ],
  templateUrl: './topbar.component.html',
})
export class TopbarComponent {

  public readonly authService = inject(AuthService);
  public readonly themesService = inject(ThemesService);

  visibleSidebarTheme = false;

}
