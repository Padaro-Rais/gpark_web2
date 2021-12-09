import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: 'mop'
})
export class MopPipe implements PipeTransform {
  transform(value: number): string {
    switch (value) {
      case 0:
        return 'Aucune Maintenance';
      case 1:
        return 'En maintenance';
      default:
        // return value;
        throw new Error('Undefined case');
    }

    ///
  }
}
