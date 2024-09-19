import { trigger, transition, style, animate } from '@angular/animations';

export const crossfadeAnimation = trigger('crossfadeAnimation', [
  transition(':enter', [style({ opacity: 0 }), animate('0.35s ease', style({ opacity: 1 }))]),
  transition(':leave', [animate('0.5s ease', style({ opacity: 0 }))]),
]);
