import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'normalizeCase'
})
export class NormalizeCasePipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}
