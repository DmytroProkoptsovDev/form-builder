import { Directive, Input, ElementRef, OnChanges, SimpleChanges  } from '@angular/core';

@Directive({
  selector: '[appToggleClass]',
})
export class ToggleClassDirective implements OnChanges {

  @Input() appToggleClass: string = '';
  @Input() condition!: boolean;

  constructor(private el: ElementRef) {}

  ngOnChanges(changes: SimpleChanges): void {
    if(changes['condition']) {
      const shouldAddClass = changes['condition'].currentValue;

      shouldAddClass
        ? this.el.nativeElement.classList.add(this.appToggleClass)
        : this.el.nativeElement.classList.remove(this.appToggleClass);
    }
  }
}
