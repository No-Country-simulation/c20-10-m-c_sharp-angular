import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CarouselModule } from 'primeng/carousel';
import { ButtonModule  } from 'primeng/button';
import { TagModule } from 'primeng/tag';

@Component({
  selector: 'app-opinion-carousel',
  standalone: true,
  imports: [CommonModule, CarouselModule, ButtonModule, TagModule ],
  templateUrl:"./opinion-carousel.component.html",
  styles: `
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OpinionCarouselComponent {
  items = [{}, {}, {}, {}];

   products: any[] = [
    {
      id: '1000',
      code: 'f230fh0g3',
      name: 'Hogar',
      description: 'Hogar',
      image: 'assets/images/landing-page/Ellipse202.png',
    },
    {
      id: '1001',
      code: 'f230fh0g3',
      name: 'José (Gasista)',
      description: 'La aplicación es muy útil. Conseguí diez nuevos clientes en menos de un mes José (Gasista)',
      image: 'assets/images/landing-page/Ellipse204.png',
    }
  ];

  responsiveOptions: any[] | undefined;

  constructor() {}

  ngOnInit() {
    this.responsiveOptions = [
      {
        breakpoint: '1199px',
        numVisible: 1,
        numScroll: 1
      },
      {
        breakpoint: '991px',
        numVisible: 2,
        numScroll: 1
      },
      {
        breakpoint: '767px',
        numVisible: 1,
        numScroll: 1
      }
    ];
  }

}
