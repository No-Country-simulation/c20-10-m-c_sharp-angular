import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuModule } from 'primeng/menu';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { RatingModule } from 'primeng/rating';
import { CheckboxModule } from 'primeng/checkbox';


@Component({
  selector: 'app-share-post',
  standalone: true,
  imports: [
    CommonModule,
    MenuModule,
    FormsModule, 
    RatingModule,
    CheckboxModule,
  ],
  templateUrl: './share-post.component.html',
  styleUrls: ['./share-post.component.css'],
})
export default class SharePostComponent {
    value5: number = 5;
    value4: number = 4;
    value3: number = 3;
    value2: number = 2;
    value1: number = 1;
    
    selectedCategories: any[] = [];

    categories: any[] = [
        { name: 'Mercado Pago', key: 'M' },
        { name: 'Tarjeta de debito/credito', key: 'T' },
        { name: 'Dinero en efectivo', key: 'D' },
    ]

  isMenuVisible = false;
  images = [
    { itemImageSrc: 'imagen1.jpg', alt: 'Imagen 1' },
    { itemImageSrc: 'imagen2.jpg', alt: 'Imagen 2' },
    { itemImageSrc: 'imagen3.jpg', alt: 'Imagen 3' },
  ];
  activeImageIndex = 0;

  constructor(private router:Router) {
    
  }

  verPerfil() {
    console.log("quiso ver su perfil");
    this.router.navigateByUrl('perfil-publico');
  }

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
