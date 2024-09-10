import { Component, inject } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { DashboardComponent } from "../dashboard/dashboard.component";
import { OficiosDashboardComponent } from "../oficios-dashboard/oficios-dashboard.component";
import { UsuariosDashboardDemoComponent } from '../usuarios-dashboard/usuarios-dashboard.component';
import { CategoriasDashboardComponent } from '../categorias-dashboard/categorias-dashboard.component';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';
import { TableModule } from 'primeng/table';
import { MenubarModule } from 'primeng/menubar';
import { SidebarModule } from 'primeng/sidebar';
import { ButtonModule } from 'primeng/button';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css'],
  standalone: true,
  imports: [
    SidebarModule,
    MenubarModule,
    ButtonModule,
    AsyncPipe,
    DashboardComponent,
    OficiosDashboardComponent,
    CategoriasDashboardComponent,

    RouterModule, 
    TableModule
  ]
})
export class NavigationComponent {
  private breakpointObserver = inject(BreakpointObserver);

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );
 // Nueva propiedad booleana para manejar el estado del dispositivo móvil
 isHandset: boolean = false;

 sidebarVisible: boolean = false;
 

  // Menu items
  menuItems: MenuItem[] = [
    { label: 'Inicio', routerLink: ['/dashboard'] },
    { label: 'Categorias', routerLink: ['/categorias-dashboard'] },
    { label: 'Oficios', routerLink: ['/oficios-dashboard'] },
    { label: 'Usuarios', routerLink: ['/usuarios-dashboard'] }
  ];

  // Toggle sidebar for mobile devices
  toggleSidebar() {
    this.sidebarVisible = !this.sidebarVisible;
  }
}
