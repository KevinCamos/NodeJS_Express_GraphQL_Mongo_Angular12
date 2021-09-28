//Tutorial Carousel https://medium.com/showpad-engineering/angular-animations-lets-create-a-carousel-with-reusable-animations-81c0dd8847e8

import {
  style,
  animate,
  animation
} from "@angular/animations";


// =========================
// Fade
// =========================
export const fadeIn = animation([
  style({ opacity: 0 }), // start state
  animate('600ms', style({ opacity: 1 }))
]);

export const fadeOut = animation([
  animate('600ms', style({ opacity: 0 }))
]);
