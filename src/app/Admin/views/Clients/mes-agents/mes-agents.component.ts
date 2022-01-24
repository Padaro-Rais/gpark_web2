import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { map } from 'rxjs/operators';
import { ConfirmDialogService } from 'src/app/Admin/helpers/confirm-dialog/confirm-dialog.service';
import { FORM_CLIENT } from 'src/app/core/components/dynamic-inputs/angular';
import { SimpleDynamicFormComponent } from 'src/app/core/components/dynamic-inputs/angular/components/simple-dynamic-form/simple-form.component';
import { DynamicFormHelpers, FormsClient } from 'src/app/core/components/dynamic-inputs/core';
import { AgentService } from 'src/app/_services/Clients/agent.service';
import { TokenStorageService } from 'src/app/_services/token-storage.service';

@Component({
  selector: 'app-mes-agents',
  templateUrl: './mes-agents.component.html',
  styleUrls: ['./mes-agents.component.css']
})
export class MesAgentsComponent implements OnInit {

  ////////////////////////
  forms = this.formclient.get(23).pipe(
    map(data => DynamicFormHelpers.buildFormSync(data))
  );
  @ViewChild("formvalue") private formvalue!: SimpleDynamicFormComponent
  /////////////////////////
  
  constructor(@Inject(FORM_CLIENT) private formclient: FormsClient ,private toastr: ToastrService , private service: AgentService, 
  private router: Router, private confirm: ConfirmDialogService, private tokenStorage: TokenStorageService) { }
  
  
  user: any = this.tokenStorage.getUser()
  init() {
    setTimeout(() => {
      console.log("Waite");
      this.formvalue.setControlValue('auteur', this.user.details.lastname+" "+ this.user.details.firstname);
    }, 1000);
  }
  
  data: any;
  agents: any;
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
      this.agents = this.data.data;
      console.log(this.agents);
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

  var data = {
    nom: body.nom,
    prenoms: body.prenoms,
    adresse: body.adresse,
    telephone: body.telephone,
    matricule_ent: this.user.Entreprise.matricule,
    entriprise_id: this.user.Entreprise.id,
    parking_id: body.parking_id
  }


  
  if (this.selectedValue) {
    this.update(body);
  
  } else {
    this.create(data);
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
      this.init()
  
    },
  
    (err) => {
      this.toastr.error(err.error.message);
      if (err.error.message === "Unauthorized") {
        this.router.navigateByUrl('/auth/login')
      }
      this.sniper = false
      this.init()
  
    }
  );
  }
  
  onEditAction(value: { [index: string]: any }) {
  this.selectedValue = value;
  if (this.formvalue) {
    this.formvalue.setControlValue('matricule', value.Entreprise.matricule);
    this.formvalue.setControlValue('name', value.Entreprise.name);
    this.formvalue.setControlValue('adresse', value.Entreprise.adresse);
    this.formvalue.setControlValue('telephone', value.Entreprise.telephone);
    this.formvalue.setControlValue('username', value.username);
    this.formvalue.setControlValue('email', value.email);
  
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
