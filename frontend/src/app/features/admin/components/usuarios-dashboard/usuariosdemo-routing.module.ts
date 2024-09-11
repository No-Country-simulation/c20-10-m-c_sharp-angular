import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { UsuariosDashboardDemoComponent } from './usuarios-dashboard.component';

@NgModule({
	imports: [RouterModule.forChild([
		{ path: '', component: UsuariosDashboardDemoComponent }
	])],
	exports: [RouterModule]
})
export class UsuariosDemoRoutingModule { }
