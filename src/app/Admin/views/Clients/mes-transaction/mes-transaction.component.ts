import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { map } from 'rxjs/operators';
import { ConfirmDialogService } from 'src/app/Admin/helpers/confirm-dialog/confirm-dialog.service';
import { FORM_CLIENT } from 'src/app/core/components/dynamic-inputs/angular';
import { SimpleDynamicFormComponent } from 'src/app/core/components/dynamic-inputs/angular/components/simple-dynamic-form/simple-form.component';
import { DynamicFormHelpers, FormsClient } from 'src/app/core/components/dynamic-inputs/core';
import { TransactionService } from 'src/app/_services/Clients/transaction.service';
import { TokenStorageService } from 'src/app/_services/token-storage.service';

@Component({
  selector: 'app-mes-transaction',
  templateUrl: './mes-transaction.component.html',
  styleUrls: ['./mes-transaction.component.css']
})
export class MesTransactionComponent implements OnInit {

   ////////////////////////
 forms = this.formclient.get(20).pipe(
  map(data => DynamicFormHelpers.buildFormSync(data))
);
@ViewChild("formvalue") private formvalue!: SimpleDynamicFormComponent
/////////////////////////

constructor(@Inject(FORM_CLIENT) private formclient: FormsClient ,private toastr: ToastrService , private service: TransactionService, 
private router: Router, private confirm: ConfirmDialogService, private tokenStorage: TokenStorageService) { }


user: any = this.tokenStorage.getUser()
init() {
  setTimeout(() => {
    console.log("Waite");
    this.formvalue.setControlValue('auteur', this.user.details.lastname+" "+ this.user.details.firstname);
  }, 1000);
}

data: any;
transactions: any;
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
    this.transactions = this.data.data;
    console.log(this.transactions);
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

// getOptionType() {

//   this.typeService

//     .get()

//     .pipe(

//       map((state) => {

//         const { data } = state.items;

//         console.log("hihihi")

//         console.log(data);

//         // Check if the form property is defined

//         if (this.form) {

//           // TODO : REBUILD CONTROL WITH NAME hr_level_id ITEMS

//           this.form = rebuild_select_control_items(
//             this.form,
//             'type_id',

//             data

//               .map(

//                 (value) =>

//                   (({ name: value.label, value: value.id } as ISelectItem)),

//               )

//           )

//         }

//       })

//     ).subscribe()

// }




onSubmit(body: { [prop: string]: any }) {

}



onEditAction(value: { [index: string]: any }) {
this.selectedValue = value;
if (this.formvalue) {
  this.formvalue.setControlValue('nom', value.nom);
  this.formvalue.setControlValue('adresse', value.adresse);
  this.formvalue.setControlValue('quartier', value.quartier);
  this.formvalue.setControlValue('ville', value.ville);





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




onComponentReadyChange() {
console.log(this.formvalue?.formgroup)
}

}
