import { RouterModule,Routes } from '@angular/router';
import { OficiosDashboardComponent } from './demo/components/oficios-dashboard/oficios-dashboard.component'
import { NgModule } from '@angular/core';
import { TableModule } from 'primeng/table';
import { DashboardComponent } from './demo/components/dashboard/dashboard.component';
import { CategoriasDashboardComponent } from './demo/components/categorias-dashboard/categorias-dashboard.component';
import { UsuariosDashboardDemoComponent } from './demo/components/usuarios-dashboard/usuarios-dashboard.component';
export const routes: Routes =[
    { path: 'dashboard', component: DashboardComponent },
    { path: 'oficios-dashboard', component: OficiosDashboardComponent },
    { path: 'categorias-dashboard', component: CategoriasDashboardComponent },
     { path: 'usuarios-dashboard', component: UsuariosDashboardDemoComponent },

    ];

      
      @NgModule({
        imports: [RouterModule.forRoot(routes), TableModule],
        exports: [RouterModule]
      })
      export class AppRoutingModule { }