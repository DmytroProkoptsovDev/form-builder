import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'normalizeCase'
})
export class NormalizeCasePipe implements PipeTransform {

  transform(str: string): string {
    return str.split('-')
      .map((word, idx) => idx === 0 ? word[0].toUpperCase() + word.slice(1) : word.toLowerCase())
      .join(' ');
  }
}
