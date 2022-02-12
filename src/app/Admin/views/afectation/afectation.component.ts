import { Component, Inject, OnInit, ViewChild } from '@angular/core';

import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { map } from 'rxjs/operators';


import { FORM_CLIENT } from 'src/app/core/components/dynamic-inputs/angular';
import { SimpleDynamicFormComponent } from 'src/app/core/components/dynamic-inputs/angular/components/simple-dynamic-form/simple-form.component';
import { DynamicFormHelpers, FormsClient, IHTMLFormControl, ISelectItem, SelectInput } from 'src/app/core/components/dynamic-inputs/core';
import { AffectationService } from 'src/app/_services/api/affectation.service';
import { EntrepriseService } from 'src/app/_services/api/entreprise.service';
import { ParkingService } from 'src/app/_services/api/parking.service';
import { TokenStorageService } from 'src/app/_services/token-storage.service';
import { ConfirmDialogService } from '../../helpers/confirm-dialog/confirm-dialog.service';

@Component({
  selector: 'app-afectation',
  templateUrl: './afectation.component.html',
  styleUrls: ['./afectation.component.css']
})
export class AfectationComponent implements OnInit {

////////////////////////
forms = this.formclient.get(22).pipe(
  map(data => DynamicFormHelpers.buildFormSync(data))
);
@ViewChild("formvalue") private formvalue!: SimpleDynamicFormComponent
/////////////////////////

constructor(@Inject(FORM_CLIENT) private formclient: FormsClient ,private toastr: ToastrService , private service: AffectationService, 
private router: Router, private confirm: ConfirmDialogService, private tokenStorage: TokenStorageService, private pservice: ParkingService, ) { }


user: any = this.tokenStorage.getUser()
init() {
  setTimeout(() => {
    console.log("Waite");
    this.formvalue.setControlValue('auteur', this.user.details.lastname+" "+ this.user.details.firstname);
  }, 1000);
}

data: any;
affectations: any;
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
    this.affectations = this.data.data;
    console.log(this.affectations);
    this.sniper = false

    this.getOptionPark()
    this.getOptionEnt()
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

getOptionPark() {
  this.pservice
    .get()
    .pipe(
      map((state) => {
        const { data } = state;

        console.log(data)

        if (!Array.isArray(data)) {
          return;
        }
        let config: IHTMLFormControl | undefined = undefined;
        if (this.formvalue) {
          config = this.formvalue.getControlConfig('parking_id');
        }

        if (config) {
          config = {
            ...config,
            clientBindings: undefined,
            items: data
              .map(
                (value: { nom: any; id: any; }) => (({ name: value.nom, value: value.id } as ISelectItem)))
          } as SelectInput;
          this.formvalue.setControlConfig(config);
        }

      })

    ).subscribe()
}


getOptionEnt() {
  this.pservice
    .getent()
    .pipe(
      map((state) => {
        const { data } = state;

        console.log(data)

        if (!Array.isArray(data)) {
          return;
        }
        let config: IHTMLFormControl | undefined = undefined;
        if (this.formvalue) {
          config = this.formvalue.getControlConfig('entriprise_id');
        }

        if (config) {
          config = {
            ...config,
            clientBindings: undefined,
            items: data
              .map(
                (value: { name: any; id: any; }) => (({ name: value.name, value: value.id } as ISelectItem)))
          } as SelectInput;
          this.formvalue.setControlConfig(config);
        }

      })

    ).subscribe()
}


onSubmit(body: { [prop: string]: any }) {
console.log(body)
this.sniper = true

if (this.selectedValue) {
  this.create(body);

} else {
  this.create(body);
}
}

private create(value: { [index: string]: any }) {
this.service.post(value).subscribe(
  (res) => {
    this.toastr.success('sauvegarde réussie !');
    this.formvalue.reset()
    this.getData()
    this.sniper = false
    this.init()

  },

  (err) => {
    this.toastr.error(err.error.message);
    if (err.error.message === "Unauthorized") {
      this.router.navigateByUrl('/auth/login')
    }
    this.init()

  }
);
}






onEditAction(value: { [index: string]: any }) {
this.selectedValue = value;
if (this.formvalue) {
  this.formvalue.setControlValue('entriprise_id', value.entreprise.id);
  this.formvalue.setControlValue('parking_id', value.parking.id);




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
