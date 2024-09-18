import { Component, DestroyRef, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuModule } from 'primeng/menu';
import { Router, ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { RatingModule } from 'primeng/rating';
import { CheckboxModule } from 'primeng/checkbox';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { User, UserSpeciality } from '../../../../core/interfaces';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-share-post',
  standalone: true,
  imports: [CommonModule, MenuModule, FormsModule, RatingModule, CheckboxModule, ButtonModule],
  templateUrl: './share-post.component.html',
  styleUrls: ['./share-post.component.css'],
})
export default class SharePostComponent implements OnInit {
  ratingValue = 4;

  selectedCategories: any[] = [];

  categories: any[] = [
    { name: 'Mercado Pago', key: 'M' },
    { name: 'Tarjeta de debito/credito', key: 'T' },
    { name: 'Dinero en efectivo', key: 'D' },
  ];

  isMenuVisible = false;
  images = [
    { itemImageSrc: 'imagen1.jpg', alt: 'Imagen 1' },
    { itemImageSrc: 'imagen2.jpg', alt: 'Imagen 2' },
    { itemImageSrc: 'imagen3.jpg', alt: 'Imagen 3' },
  ];
  activeImageIndex = 0;
  jsonData: any;

  public readonly data = signal<UserSpeciality>({} as UserSpeciality);

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private destroyRef: DestroyRef
  ) {
    // this.activatedRoute.params.subscribe(params => {
    //   this.jsonData = params;
    // });
  }

  ngOnInit(): void {
    this.activatedRoute.data.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(res => {
      this.data.set(res[0]);
      console.log(res);
    });
  }

  onNavigatePrev() {}

  verPerfil(item: any) {
    console.log('quiso ver su perfil');
    this.router.navigate(['/perfil-publico', item]);
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
