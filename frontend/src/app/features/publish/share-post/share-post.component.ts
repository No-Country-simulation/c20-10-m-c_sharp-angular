import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuModule } from 'primeng/menu';  // Importa el módulo

@Component({
  selector: 'app-share-post',
  standalone: true,
  imports: [CommonModule, MenuModule],  // Añade MenuModule a las importaciones
  templateUrl: './share-post.component.html',
  styleUrls: ['./share-post.component.css']
})
export class SharePostComponent {
  isMenuVisible = false;
  images = [
    { itemImageSrc: 'imagen1.jpg', alt: 'Imagen 1' },
    { itemImageSrc: 'imagen2.jpg', alt: 'Imagen 2' },
    { itemImageSrc: 'imagen3.jpg', alt: 'Imagen 3' },
  ];
  activeImageIndex = 0;

  paymentMethods = [
    { name: 'Tarjeta de Crédito', selected: true },
    { name: 'PayPal', selected: true },
    { name: 'Transferencia Bancaria', selected: true }
  ];

  toggleMenu() {
    this.isMenuVisible = !this.isMenuVisible;
  }

  setActiveImage(index: number) {
    this.activeImageIndex = index;
  }

  getIndicatorStyle(index: number) {
    return index === this.activeImageIndex ? 'indicator active' : 'indicator';
  }
}
