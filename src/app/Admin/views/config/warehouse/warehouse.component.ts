import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { map } from 'rxjs/operators';
import { ConfirmDialogService } from 'src/app/Admin/helpers/confirm-dialog/confirm-dialog.service';
import { FORM_CLIENT } from 'src/app/core/components/dynamic-inputs/angular';
import { SimpleDynamicFormComponent } from 'src/app/core/components/dynamic-inputs/angular/components/simple-dynamic-form/simple-form.component';
import { DynamicFormHelpers, FormsClient } from 'src/app/core/components/dynamic-inputs/core';
import { WarehouseService } from 'src/app/_services/api/config/warehouse.service';
import { TokenStorageService } from 'src/app/_services/token-storage.service';

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

  constructor(@Inject(FORM_CLIENT) private formclient: FormsClient, private toastr: ToastrService, private service: WarehouseService, 
  private router: Router, private confirm: ConfirmDialogService, private tokenStorage : TokenStorageService) { }


  user: any = this.tokenStorage.getUser()
  init() {
    setTimeout(() => {
      console.log("Waite");
      this.formvalue.setControlValue('auteur', this.user.details.lastname+" "+ this.user.details.firstname);
    }, 1000);
  }

  data: any;
  warehouses: any;
  sniper: boolean = true;

  cancel: boolean = false;

  id: any;
  selectedValue: any;


  ngOnInit(): void {
    this.getData()
    this.init()

  }

  getData() {
    this.sniper = true
    this.service.get().subscribe(
      (res) => {
        this.data = res;
        this.warehouses = this.data.data;
        console.log(this.warehouses);
        this.sniper = false
      },

      (err) => {
        this.toastr.error(err.error.message);
        if (err.error.message === "Unauthorized") {
          this.router.navigateByUrl('/auth/login')
        }
        this.sniper = false
      }
    );
  }


  onSubmit(body: { [prop: string]: any }) {
    console.log(body.label)
    this.sniper = true

    if (this.selectedValue) {
      this.updateWareHouse(body);

    } else {
      this.createWareHouse(body);
    }
  }

  private createWareHouse(value: { [index: string]: any }) {
    this.service.post(value).subscribe(
      (res) => {
        this.toastr.success('sauvegarde réussie !');
        this.formvalue.reset()
        this.getData()
        this.sniper = false
      },

      (err) => {
        this.toastr.error(err.error.message);
        if (err.error.message === "Unauthorized") {
          this.router.navigateByUrl('/auth/login')
        }
      }
    );
  }

  private updateWareHouse(value: { [index: string]: any }) {
    this.service.put(this.id, value).subscribe(
      (res) => {
        this.toastr.success('modification réussie !');
        this.formvalue.reset()
        this.getData()
        this.sniper = false
        this.cancel = false
        this.selectedValue = ""
        this.id = ""
      },

      (err) => {
        this.toastr.error(err.error.message);
        if (err.error.message === "Unauthorized") {
          this.router.navigateByUrl('/auth/login')
        }
        this.sniper = false
      }
    );
  }

  onEditAction(value: { [index: string]: any }) {
    this.selectedValue = value;
    if (this.formvalue) {
      this.formvalue.setControlValue('label', value.label);
      console.log(value.id)
      this.id = value.id
      this.cancel = true
    }
  }

  onCanselAction() {
    this.formvalue.reset()
    this.selectedValue = ""
    this.id = ""
    this.cancel = false
  }

  onDelete(_id: any) {


    this.confirm
      .confirmDialog(
        'Veuillez cliquer sur OK pour confirmer'
      )
      .afterClosed()
      .subscribe((res) => {
        console.log(res);
        if (res) {
          this.sniper = true

          this.service.delete(_id).subscribe(
            (res) => {
              this.toastr.success('suppression réussi !');
              this.getData()
              this.sniper = false
            },

            (err) => {
              this.toastr.error(err.error.message);
              if (err.error.message === "Unauthorized") {
                this.router.navigateByUrl('/auth/login')
              }
              this.sniper = false
            }
          );
        }
      });


  }

  onComponentReadyChange() {
    console.log(this.formvalue?.formgroup)
  }
}
