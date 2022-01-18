import { Component, Inject, OnInit, ViewChild } from '@angular/core';

import { ToastrService } from 'ngx-toastr';
import { map } from 'rxjs/operators';
import { FORM_CLIENT } from 'src/app/core/components/dynamic-inputs/angular';
import { SimpleDynamicFormComponent } from 'src/app/core/components/dynamic-inputs/angular/components/simple-dynamic-form/simple-form.component';
import { DynamicFormHelpers, FormsClient } from 'src/app/core/components/dynamic-inputs/core';
import { TypeContainerService } from 'src/app/_services/api/config/type-container.service';
import { WarehouseService } from 'src/app/_services/api/config/warehouse.service';
@Component({
  selector: 'app-type-container',
  templateUrl: './type-container.component.html',
  styleUrls: ['./type-container.component.css']
})
export class TypeContainerComponent implements OnInit {

   ////////////////////////
   forms = this.formclient.get(11).pipe(
    map(data => DynamicFormHelpers.buildFormSync(data))
  );
  @ViewChild("formvalue") private formvalue!: SimpleDynamicFormComponent
  /////////////////////////

  constructor(@Inject(FORM_CLIENT) private formclient: FormsClient ,private toastr: ToastrService , private service: TypeContainerService) { }

  data: any;
  typeContenaires: any;

  ngOnInit(): void {
      this.getData()
  }

  getData() {
    this.service.getData().subscribe((res) => {
      this.data = res;
      this.typeContenaires = this.data.data;
      console.log(this.typeContenaires);
    });
  }


  onSubmit(body: {[prop:string]: any}){
    console.log(body)
  }

  onComponentReadyChange(){
     console.log(this.formvalue?.formgroup)
  }

}
