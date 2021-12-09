import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: 'use'
})
export class StatutPipe implements PipeTransform {
  transform(value: number): string {
    switch (value) {
      case 0:
        return 'non utiliser';
      case 1:
        return 'En utilisation';
      default:
        // return value;
        throw new Error('Undefined case');
    }

    ///
  }
}
