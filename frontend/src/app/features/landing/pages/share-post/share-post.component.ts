import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { MenuModule } from 'primeng/menu';
import { Router, ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { RatingModule } from 'primeng/rating';
import { CheckboxModule } from 'primeng/checkbox';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { UserSpeciality } from '../../../../core/interfaces';
import { ROUTES_PATH } from '@core/routes';
import { ButtonModule } from 'primeng/button';

const { DASHBOARD_HOME, DASHBOARD_MESSAGES } = ROUTES_PATH;
@Component({
  selector: 'app-share-post',
  standalone: true,
  imports: [CommonModule, MenuModule, FormsModule, RatingModule, CheckboxModule, ButtonModule],
  templateUrl: './share-post.component.html',
  styleUrls: ['./share-post.component.css'],
})
export default class SharePostComponent implements OnInit {
  private readonly location = inject(Location);

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
    });
  }

  onNavigatePrev(): void {
    this.location.back();
  }

  verPerfil(item: any) {
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

  goToChat() {
    this.router.navigate([DASHBOARD_HOME + '/' + DASHBOARD_MESSAGES]);
  }
}
