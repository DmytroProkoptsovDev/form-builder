import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'toString'
})
export class ToStringPipe implements PipeTransform {

  transform(obj: {[key: string]: string}): string {
    const keys: string[] = Object.keys(obj);
    const str = keys.reduce((acc, key) => {
        const stringified = `${key}:${obj[key]};`;
        acc += stringified;

        return acc;
    }, '');
    
    return str;
  }
}
