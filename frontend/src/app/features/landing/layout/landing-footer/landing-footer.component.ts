import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-landing-footer',
  standalone: true,
  imports: [CommonModule, ButtonModule],
  template: `
    <footer class="footer-container py-5">
      <div class="footer-sections">
        <div *ngFor="let section of footer" class="footer-column">
          <h2 class="footer-title">{{ section.title }}</h2>
          <div class="footer-items">
            <p-button *ngFor="let item of section.items" link="true">{{ item.label }}</p-button>
          </div>
        </div>
      </div>
    </footer>
  `,
  styles: [
    `
      .footer-container {
        padding: 20px;
        background-color: #231f20;
        color: #fff;
      }

      .footer-sections {
        display: flex;
        justify-content: space-between;
        flex-wrap: wrap;
      }

      .footer-column {
        flex: 1;
        margin: 0 10px;
        min-width: 150px;
      }

      .footer-title {
        font-size: 1.2rem;
        margin-bottom: 15px;
        color: #ffcc00;
      }

      .footer-items p-button {
        font-size: 0.9rem;
        margin-bottom: 10px;
        color: #fff;
      }

      .footer-items p-button:hover {
        text-decoration: underline;
      }

      .footer-column {
        margin-bottom: 20px;
        text-align: center;
      }

      .footer-title {
        font-size: 1rem;
      }

      .footer-items p-button {
        font-size: 0.85rem;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LandingFooterComponent {
  public readonly footer = [
    {
      title: 'Para los clientes',
      items: [
        {
          label: 'Encontrar un profesional',
        },
        {
          label: '¿Cómo funciona?',
        },
        {
          label: 'Iniciar sesión',
        },
      ],
    },
    {
      title: 'Para profesionales',
      items: [
        {
          label: '¿Cómo funciona?',
        },
        {
          label: 'Ingresa como profesional',
        },
        {
          label: 'Centro de ayuda',
        },
      ],
    },
    {
      title: 'Sobre',
      items: [
        {
          label: 'Sobre ContratApp',
        },
      ],
    },
  ];
}
