import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dragable'
})
export class DragablePipe implements PipeTransform {

  constructor(private dragDrop: DragDrop) {}

  transform(htmElement: HTMLElement) {
    return this.dragDrop.createDrag(htmElement);
  }

}
