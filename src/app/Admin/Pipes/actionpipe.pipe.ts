import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'actionpipe'
})
export class ActionpipePipe implements PipeTransform {

  transform(value: number): string {
    switch (value) {
      case 1:
        return 'CREATE';
      case 2:
        return 'READ';
      case 3:
        return 'UPDATE';
      case 4:
        return 'DELETE';
      default:
        // return value;
        throw new Error('Undefined case');
    }
  }

}
