import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-landing-footer',
  standalone: true,
  imports: [CommonModule, ButtonModule],
  template: `
    <div class="container-c py-5">
      <div class="flex justify-content-start align-items-start w-full gap-5">
        @for (section of footer; track $index) {
          <div>
            <h2>{{ section.title }}</h2>
            <div class="flex flex-column">
              @for (item of section.items; track $index) {
                <p-button link="true">{{ item.label }}</p-button>
              }
            </div>
          </div>
        }
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LandingFooterComponent {
  public readonly footer = [
    {
      title: 'For Customers',
      items: [
        {
          label: 'Find a Professional',
        },
        {
          label: 'How it works',
        },
        {
          label: 'Login',
        },
      ],
    },
    {
      title: 'For Professionals',
      items: [
        {
          label: 'How it works',
        },
        {
          label: 'Join as a Professional',
        },
        {
          label: 'Help center',
        },
      ],
    },
    {
      title: 'About',
      items: [
        {
          label: 'About ContratApp',
        },
      ],
    },
  ];
}
