import { trigger, transition, style, animate } from '@angular/animations';

export const expandAnimation = trigger('expandAnimation', [
  transition(':enter', [
    style({ height: '0', opacity: 0, overflow: 'hidden' }),
    animate('0.35s ease-out', style({ height: '*', opacity: 1 })),
  ]),
  transition(':leave', [
    style({ height: '*', opacity: 1, overflow: 'hidden' }),
    animate('0.35s ease-in', style({ height: '0', opacity: 0 })),
  ]),
]);
