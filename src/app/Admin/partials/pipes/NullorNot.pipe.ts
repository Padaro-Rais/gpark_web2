import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: 'NullorNot'
})
export class NullorNot implements PipeTransform {
  transform(value: any): string {
    if(value = null){
      return 'nom précisé'
    }else{
     return value;
    }
  }
}
