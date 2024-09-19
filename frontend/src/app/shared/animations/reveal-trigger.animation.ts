import { trigger, transition, style, animate, query, stagger } from '@angular/animations';

export const revealAnimation = trigger('revealAnimation', [
  transition('* => *', [
    query(
      ':enter',
      [
        style({ opacity: 0, transform: 'translateY(24px)' }),
        stagger(100, [
          animate('500ms ease-out', style({ opacity: 1, transform: 'translateY(0)' })),
        ]),
      ],
      { optional: true }
    ),
  ]),
]);
