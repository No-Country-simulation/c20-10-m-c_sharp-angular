import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { DataViewModule } from 'primeng/dataview';
import { RatingModule } from 'primeng/rating';
import { TagModule } from 'primeng/tag';

@Component({
  selector: 'app-my-works',
  standalone: true,
  imports: [CommonModule, DataViewModule, TagModule, RatingModule, ButtonModule, CommonModule],
  templateUrl: './my-works.component.html',
  styleUrl: './my-works.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class MyWorksComponent {
  layout: 'list' | 'grid' = 'list';

  products!: unknown[];

  getSeverity(product: any) {
    switch (product.inventoryStatus) {
      case 'INSTOCK':
        return 'success';

      case 'LOWSTOCK':
        return 'warning';

      case 'OUTOFSTOCK':
        return 'danger';

      default:
        return null;
    }
  }
}
