import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dragable'
})
export class DragablePipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}
