import {Directive, ElementRef, HostListener, Input} from '@angular/core';

@Directive({
  selector: '[appParallax]'
})
export class ParallaxDirective {
  // tslint:disable-next-line:no-input-rename
  @Input('ratio') parallaxRatio: number;
  // tslint:disable-next-line:no-input-rename
  @Input('top') initialTop: number;

  constructor(private eleRef: ElementRef) {
  }

  @HostListener('window:scroll', ['$event'])
  onWindowScroll() {
    this.eleRef.nativeElement.style.top = (this.initialTop - (window.scrollY * this.parallaxRatio)) + 'px';
  }

}
