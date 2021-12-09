import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: 'etat'
})
export class EtatPipe implements PipeTransform {
  transform(value: number): string {
    switch (value) {
      case 1:
        return 'bon etat';
      case 2:
        return 'inactif';
      case 3:
          return 'defectueux';
      default:
        // return value;
        throw new Error('Undefined case');
    }

    ///
  }
}
