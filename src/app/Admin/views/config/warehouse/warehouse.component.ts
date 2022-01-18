import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { map } from 'rxjs/operators';
import { FORM_CLIENT } from 'src/app/core/components/dynamic-inputs/angular';
import { SimpleDynamicFormComponent } from 'src/app/core/components/dynamic-inputs/angular/components/simple-dynamic-form/simple-form.component';
import { DynamicFormHelpers, FormsClient } from 'src/app/core/components/dynamic-inputs/core';
import { WarehouseService } from 'src/app/_services/api/config/warehouse.service';

@Component({
  selector: 'app-warehouse',
  templateUrl: './warehouse.component.html',
  styleUrls: ['./warehouse.component.css']
})
export class WarehouseComponent implements OnInit {

   ////////////////////////
   forms = this.formclient.get(8).pipe(
    map(data => DynamicFormHelpers.buildFormSync(data))
  );
  @ViewChild("formvalue") private formvalue!: SimpleDynamicFormComponent
  /////////////////////////

  constructor(@Inject(FORM_CLIENT) private formclient: FormsClient ,private toastr: ToastrService , private service: WarehouseService, private router: Router,) { }

  data: any;
  warehouses: any;
  sniper : boolean = true;

  selectedValue: any;

  ngOnInit(): void {
      this.getData()
  }

  getData() {
    this.service.get().subscribe((res) => {
      this.data = res;
      this.warehouses = this.data.data;
      console.log(this.warehouses);
      this.sniper = false
    });
  }


  onSubmit(body: {[prop:string]: any}){
    console.log(body.label)
    this.sniper = true

    if(this.selectedValue) {
      this.toastr.success('modification');

    } else {
      this.createWareHouse(body);
    }
  }

  private createWareHouse(value: {[index:string]:any}) {
    this.service.post(value).subscribe(
      (res) => {
        this.toastr.success('sauvegarde réussi !');
        this.formvalue.reset()
        this.getData()
        this.sniper = false
      },

      (err) => {
        this.toastr.error(err.error.message);
        if(err.error.message==="Unauthorized"){
          this.router.navigateByUrl('/auth/login')
        }
      }
    );
  }

  onEditAction(value: {[index:string]:any}) {
    this.selectedValue = value;

    if(this.formvalue) {
      this.formvalue.setControlValue('label', value.label);
    }
  }

  onComponentReadyChange(){
     console.log(this.formvalue?.formgroup)
  }
}
