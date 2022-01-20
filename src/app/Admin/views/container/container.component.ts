import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { map } from 'rxjs/operators';
import { FORM_CLIENT } from 'src/app/core/components/dynamic-inputs/angular';
import { SimpleDynamicFormComponent } from 'src/app/core/components/dynamic-inputs/angular/components/simple-dynamic-form/simple-form.component';
import { DynamicFormHelpers, FormsClient, IDynamicForm } from 'src/app/core/components/dynamic-inputs/core';
import { rebuild_select_control_items } from 'src/app/_helpers/optionFunction';
import { TypeContainerService } from 'src/app/_services/api/config/type-container.service';
import { ContainerService } from 'src/app/_services/api/container.service';
import { TokenStorageService } from 'src/app/_services/token-storage.service';
import { ConfirmDialogService } from '../../helpers/confirm-dialog/confirm-dialog.service';

@Component({
  selector: 'app-container',
  templateUrl: './container.component.html',
  styleUrls: ['./container.component.css']
})



export class ContainerComponent implements OnInit {

  ////////////////////////
  forms = this.formclient.get(10).pipe(
    map(data => DynamicFormHelpers.buildFormSync(data))
  );
  @ViewChild("formvalue") private formvalue!: SimpleDynamicFormComponent
  /////////////////////////

  constructor(@Inject(FORM_CLIENT) private formclient: FormsClient, private toastr: ToastrService, private service: ContainerService,
   private typeService: TypeContainerService, private router: Router, private confirm: ConfirmDialogService, private tokenStorage : TokenStorageService) { }

  
   user: any = this.tokenStorage.getUser()
   init() {
     setTimeout(() => {
       console.log("Waite");
       this.formvalue.setControlValue('auteur', this.user.details.lastname+" "+ this.user.details.firstname);
     }, 1000);
   }

  data: any;
  containers: any;
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
        this.containers = this.data.data;
        console.log(this.containers);
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
    console.log(body)
    this.sniper = true

    if (this.selectedValue) {
      this.update(body);

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
      },

      (err) => {
        this.toastr.error(err.error.message);
        if (err.error.message === "Unauthorized") {
          this.router.navigateByUrl('/auth/login')
        }
      }
    );
  }

  private update(value: { [index: string]: any }) {
    console.log(value)
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
      this.formvalue.setControlValue('ref', value.ref);
      this.formvalue.setControlValue('label', value.label);
      this.formvalue.setControlValue('nb_case', value.nb_case);
      this.formvalue.setControlValue('level_description', value.level_description);
      this.formvalue.setControlValue('id_type', value.id_type);
      this.formvalue.setControlValue('id_warehouse', value.id_warehouse);
      this.formvalue.setControlValue('id_parent', value.id_parent);



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
