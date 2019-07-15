import {animate, keyframes, state, style, transition, trigger} from '@angular/animations';

export const toolbarAnimation = [
  trigger('newItem', [
    state('added', style({})),
    state('added2', style({})),
  transition('* => *', [
    animate('0.5s', keyframes([
      style({transform: 'scale(1.5)'}),
      style({transform: 'scale(0.8)'}),
      style({transform: 'scale(1)'})
    ]))
  ])
]),
];
