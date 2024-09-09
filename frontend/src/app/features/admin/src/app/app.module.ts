import { NgModule } from '@angular/core';
import { HashLocationStrategy, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { AppComponent } from './app.component';
import { UserService } from './demo/service/user.service';
import { RouterOutlet } from '@angular/router';
import { NavigationComponent } from "./demo/components/navigation/navigation.component";
import { TableModule } from 'primeng/table';
import { RouterModule } from '@angular/router';
import { UsuariosDashboardDemoComponent } from './demo/components/usuarios-dashboard/usuarios-dashboard.component';

@NgModule({
    declarations: [AppComponent],
    providers: [
        { provide: LocationStrategy, useClass: PathLocationStrategy },
        UserService
        
    ],
    imports:[RouterOutlet, TableModule, RouterModule,NavigationComponent],
    bootstrap: [AppComponent],
})
export class AppModule {}
