import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { RatingModule } from 'primeng/rating';
import { CheckboxModule } from 'primeng/checkbox';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { UserSpeciality } from '../../../../core/interfaces';
import { ROUTES_PATH } from '@core/routes';
import { ButtonModule } from 'primeng/button';
import { CarouselModule } from 'primeng/carousel';
import { BtnNavigatePrevComponent } from '../../../../shared/components/btn-navigate-prev/btn-navigate-prev.component';
import { GoogleMapComponent } from '../../components';

const { DASHBOARD_HOME, DASHBOARD_MESSAGES, DASHBOARD_PUBLIC_PROFILE } = ROUTES_PATH;

@Component({
  selector: 'app-share-post',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RatingModule,
    CheckboxModule,
    ButtonModule,
    CarouselModule,
    BtnNavigatePrevComponent,
    GoogleMapComponent,
  ],
  templateUrl: './share-post.component.html',
  styleUrls: ['./share-post.component.css'],
})
export default class SharePostComponent implements OnInit {
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly destroyRef = inject(DestroyRef);
  private readonly router = inject(Router);

  public readonly data = signal<UserSpeciality>({} as UserSpeciality);
  public readonly routesPath = ROUTES_PATH;
  public readonly ratingValue = 4;
  public readonly carouselImage = [
    {
      id: 0,
      src: '/assets/images/landing-page/post-default-image.webp',
      alt: 'imagen por defecto',
    },
  ];
  public readonly categories = [
    { name: 'Mercado Pago', key: 'M' },
    { name: 'Tarjeta de debito/credito', key: 'T' },
    { name: 'Dinero en efectivo', key: 'D' },
  ];
  public selectedCategories: { name: string; key: string }[] = [];

  ngOnInit(): void {
    this.activatedRoute.data.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(res => {
      this.data.set(res[0]);
    });
    this.randomCheck();
  }

  public randomCheck() {
    const categoriesClone = [...this.categories];
    const categoriesToSelect = Math.min(3, categoriesClone.length);

    for (let i = 0; i < categoriesToSelect; i++) {
      const randomIndex = Math.floor(Math.random() * categoriesClone.length);
      this.selectedCategories.push(categoriesClone[randomIndex]);
      categoriesClone.splice(randomIndex, 1);
    }
  }

  public onProfileNavigate(id: string) {
    this.router.navigate([DASHBOARD_PUBLIC_PROFILE + '/' + id]);
  }

  public onChatNavigate(id: number | string) {
    this.router.navigate([DASHBOARD_HOME, DASHBOARD_MESSAGES, id]);
  }

  public get averageRating() {
    return this.ratingValue.toFixed(1);
  }
}
