import { SimpleDynamicFormComponent } from '../../../core/components/dynamic-inputs/angular/components/simple-dynamic-form/simple-form.component';
import { DynamicFormHelpers } from '../../../core/components/dynamic-inputs/core/helpers/form';
import { map } from 'rxjs/operators';
import { FormsClient } from '../../../core/components/dynamic-inputs/core';
import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { FORM_CLIENT, ANGULAR_REACTIVE_FORM_BRIDGE ,AngularReactiveFormBuilderBridge} from 'src/app/core/components/dynamic-inputs/angular';

@Component({
  selector: 'app-test-form',
  templateUrl: './test-form.component.html',
  styleUrls: ['./test-form.component.css']
})
export class TestFormComponent implements OnInit {

  forms = this.formclient.get(3).pipe(
    map(data => DynamicFormHelpers.buildFormSync(data))
  );

  @ViewChild("formvalue") private formvalue!: SimpleDynamicFormComponent

  constructor(@Inject(FORM_CLIENT) private formclient: FormsClient ) { }

  ngOnInit(): void {

  }

  onSubmit(body: {[prop:string]: any}){
    console.log(body)
  }

  onComponentReadyChange(){
     console.log(this.formvalue?.formgroup)
  }
}
