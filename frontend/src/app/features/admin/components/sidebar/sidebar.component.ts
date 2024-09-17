import { ChangeDetectionStrategy, Component, computed, inject, signal, ViewEncapsulation } from '@angular/core';
import {RouterModule} from "@angular/router";
import {NgOptimizedImage, TitleCasePipe} from "@angular/common";
import {SidebarModule} from "primeng/sidebar";
import {ButtonModule} from "primeng/button";
import {AvatarModule} from "primeng/avatar";
import {RippleModule} from "primeng/ripple";
import {StyleClassModule} from "primeng/styleclass";
import adminRoutes from "../../admin.routes";
import { UserService } from '../../../dashboard/services/user.service';

@Component({
  selector: 'app-sidebar-admin',
  standalone: true,
  imports: [
    RouterModule,
    TitleCasePipe,
    SidebarModule,
    NgOptimizedImage,
    SidebarModule,
    ButtonModule,
    AvatarModule,
    RippleModule,
    StyleClassModule,
  ],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.Emulated
})
export class SidebarComponent {

  protected userService = inject(UserService);

  public menuItems = [
    { label: 'Oficios', routerLink: 'oficios', icon: 'pi-hammer' },
    { label: 'Categorías', routerLink: 'categorias', icon: 'pi-list' },
    { label: 'Usuarios', routerLink: 'usuarios', icon: 'pi-user' }
  ];

}
