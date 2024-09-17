import {ChangeDetectionStrategy, Component, inject, ViewEncapsulation} from '@angular/core';
import {JsonPipe, TitleCasePipe} from "@angular/common";
import {ButtonModule} from "primeng/button";
import {RippleModule} from "primeng/ripple";
import {RouterLink} from "@angular/router";
import {DividerModule} from "primeng/divider";
import {MessagesModule} from "primeng/messages";
import {StyleClassModule} from "primeng/styleclass";
import {ConfirmDialogModule} from "primeng/confirmdialog";
import {ToastModule} from "primeng/toast";

@Component({
  selector: 'app-products-grid-admin',
  standalone: true,
  imports: [
    TitleCasePipe,
    JsonPipe,
    ButtonModule,
    RippleModule,
    RouterLink,
    DividerModule,
    MessagesModule,
    StyleClassModule,
    ConfirmDialogModule,
    ToastModule,
  ],
  templateUrl: './oficios-grid.component.html',
  styleUrl: './oficios-grid.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.Emulated
})
export default class OficiosGridComponent {
  // productService = inject(ProductService);

  messageNotData = [
    { severity: 'info', summary: 'No hay productos que mostrar', detail: '' },
  ];


}
