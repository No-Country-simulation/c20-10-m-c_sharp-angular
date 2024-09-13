import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, OnInit, signal } from '@angular/core';
import { BrowserCardComponent } from '../../components/browser-card/browser-card.component';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-browser-speciality',
  standalone: true,
  imports: [CommonModule, BrowserCardComponent],
  template: `
    <div class="p-4">
      @for (item of data(); track $index) {
        <app-browser-card [data]="item" />
      } @empty {
        <h1 class="text-center">Aun no hay trabajadores aqui :(</h1>
      }
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class BrowserSpecialityComponent implements OnInit {
  private readonly activatedRoute = inject(ActivatedRoute);

  public data = signal<any>([]);

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(data => {
      console.log(data['data']);
      this.data.set(data['data']);
    });
  }
}
