import {animate, state, style, transition, trigger} from '@angular/animations';

export const shoppingListAnimation = [
  trigger('openClose', [
    state('closed', style({
      left: '100%',
    })),
    state('open', style({
      left: 'calc(100% - 300px)',
    })),
    transition('* => *', [
      animate('0.2s')
    ])
  ]),
  trigger('background_display', [
    state('closed', style({
      display: 'none',
    })),
    state('open', style({
      display: 'inline',
    })),
    transition('closed => open', [
      animate('0s'),
    ]),
    transition('open => closed', [
      animate('0.2s')
    ])
  ]),
  trigger('background_opacity', [
    state('closed', style({
      opacity: '0',
    })),
    state('open', style({
      opacity: '0.6',
    })),
    transition('* => *', [
      animate('0.2s 0s ease-in-out'),
    ])
  ])
];
