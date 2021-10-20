import { FormGroup } from "@angular/forms";
import { Observable } from "rxjs";

export interface CreateFormComponentInterface {
  /**
   * @description Handle update implementation
   * @param value
   */
  handleSubmitButtonClick(
    requestURL: string,
    formgroup: FormGroup
  ): Observable<any> | any;
}
