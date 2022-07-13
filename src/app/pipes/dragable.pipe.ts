import { Pipe, PipeTransform } from '@angular/core';
import { DragDrop } from '@angular/cdk/drag-drop';

@Pipe({
  name: 'dragable'
})
export class DragablePipe implements PipeTransform {

  constructor(private dragDrop: DragDrop) {}

  transform(htmElement: HTMLElement) {
    return this.dragDrop.createDrag(htmElement);
  }

}
