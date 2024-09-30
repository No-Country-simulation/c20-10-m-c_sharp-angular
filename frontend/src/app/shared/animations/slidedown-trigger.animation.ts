import { trigger, transition, style, animate } from '@angular/animations';

export const slideDownAnimation = trigger('slideDownAnimation', [
  transition(':enter', [
    style({ transform: 'translateY(-100%)' }),
    animate('0.5s ease', style({ transform: 'translateY(0)' })),
  ]),
  transition(':leave', [animate('0.5s ease', style({ transform: 'translateY(-100%)' }))]),
]);
