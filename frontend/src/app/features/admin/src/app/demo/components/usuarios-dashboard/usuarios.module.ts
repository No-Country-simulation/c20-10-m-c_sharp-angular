import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UsuariosDashboardDemoComponent } from './usuarios-dashboard.component';
import { UsuariosDemoRoutingModule } from './usuariosdemo-routing.module';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { RippleModule } from 'primeng/ripple';
import { MultiSelectModule } from 'primeng/multiselect';
import { DropdownModule } from 'primeng/dropdown';
import { ProgressBarModule } from 'primeng/progressbar';
import { ToastModule } from 'primeng/toast';
import { SliderModule } from 'primeng/slider';
import { RatingModule } from 'primeng/rating';
import { CommonModule } from '@angular/common'; 
//import { UsuariosDashboardComponent } from './usuarios-dashboard.component';

@NgModule({
	imports: [
		CommonModule,
		UsuariosDemoRoutingModule,
		FormsModule,
		TableModule,
		RatingModule,
		ButtonModule,
		SliderModule,
		InputTextModule,
		ToggleButtonModule,
		RippleModule,
		MultiSelectModule,
		DropdownModule,
		ProgressBarModule,
		ToastModule
	],
	declarations: [UsuariosDashboardDemoComponent]
})
export class UsuariosDemoComponent { }
