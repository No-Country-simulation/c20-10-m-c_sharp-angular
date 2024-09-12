import { Component, inject } from '@angular/core';
import { Button, ButtonDirective } from 'primeng/button';
import { SidebarModule } from 'primeng/sidebar';
import { AuthService } from '../../../core/services';
import { ThemesService } from '../../../core/themes';
import { ToolbarModule } from 'primeng/toolbar';
import { RouterLink } from '@angular/router';
import { SplitButtonModule } from 'primeng/splitbutton';


@Component({
  selector: 'app-topbar',
  standalone: true,
  imports: [
    ButtonDirective,
    Button,
    SidebarModule,
    ToolbarModule,
    RouterLink,
    SplitButtonModule
  ],
  templateUrl: './topbar.component.html',
})
export class TopbarComponent {

  public readonly authService = inject(AuthService);
  public readonly themesService = inject(ThemesService);

  visibleSidebarTheme = false;

  items = [
    {label: 'Actualizar', icon: 'pi pi-refresh', command: () => this.update()},
    {label: 'Eliminar', icon: 'pi pi-times', command: () => this.delete()},
    {label: 'Configuración', icon: 'pi pi-cog', routerLink: ['/settings']}
  ];

  save(type: string) {
    console.log(`${type} clicked`);
  }

  update() {
    console.log('Update clicked');
  }

  delete() {
    console.log('Delete clicked');
  }

}
