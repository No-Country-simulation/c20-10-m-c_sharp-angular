import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CarouselModule } from 'primeng/carousel';
import { ButtonModule  } from 'primeng/button';
import { TagModule } from 'primeng/tag';

@Component({
  selector: 'app-categories-carousel',
  standalone: true,
  imports: [CommonModule, CarouselModule, ButtonModule, TagModule ],
  templateUrl:"./categories-carousel.component.html",
  styles: `
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CategoriesCarouselComponent {
  items = [{}, {}, {}, {}];

  products : any = [
    {
      id: '1000',
      code: 'f230fh0g3',
      name: 'Hogar',
      description: 'Hogar',
      image: 'assets/images/landing-page/HOGAR.png',
      price: 65,
      category: 'Accessories',
      quantity: 24,
      inventoryStatus: 'INSTOCK',
      rating: 5
    },
    {
      id: '1000',
      code: 'f230fh0g3',
      name: 'Belleza',
      description: 'Belleza',
      image: 'assets/images/landing-page/Belleza.png',
      price: 65,
      category: 'Accessories',
      quantity: 24,
      inventoryStatus: 'INSTOCK',
      rating: 5
    }
  ];

    responsiveOptions: any[] | undefined;

    constructor() {}

    ngOnInit() {
        // this.productService.getProductsSmall().then((products) => {
        //     this.products = products;
        // });

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
