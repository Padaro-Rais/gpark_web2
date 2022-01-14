import { Component, Inject, OnInit, ViewChild } from '@angular/core';

import { ToastrService } from 'ngx-toastr';
import { map } from 'rxjs/operators';
import { FORM_CLIENT } from 'src/app/core/components/dynamic-inputs/angular';
import { SimpleDynamicFormComponent } from 'src/app/core/components/dynamic-inputs/angular/components/simple-dynamic-form/simple-form.component';
import { DynamicFormHelpers, FormsClient } from 'src/app/core/components/dynamic-inputs/core';
import { CategorieFolderService } from 'src/app/_services/api/config/categorie-folder.service';
import { GroupFileService } from 'src/app/_services/api/config/group-file.service';
import { WarehouseService } from 'src/app/_services/api/config/warehouse.service';

@Component({
  selector: 'app-group-folder',
  templateUrl: './group-folder.component.html',
  styleUrls: ['./group-folder.component.css']
})
export class GroupFolderComponent implements OnInit {

   ////////////////////////
   forms = this.formclient.get(15).pipe(
    map(data => DynamicFormHelpers.buildFormSync(data))
  );
  @ViewChild("formvalue") private formvalue!: SimpleDynamicFormComponent
  /////////////////////////

  constructor(@Inject(FORM_CLIENT) private formclient: FormsClient ,private toastr: ToastrService , private service: GroupFileService) { }

  data: any;
  groupes: any;

  ngOnInit(): void {
      this.getData()
  }

  getData() {
    this.service.getData().subscribe((res) => {
      this.data = res;
      this.groupes = this.data.data;
      console.log(this.groupes);
    });
  }


  onSubmit(body: {[prop:string]: any}){
    console.log(body)
  }

  onComponentReadyChange(){
     console.log(this.formvalue?.formgroup)
  }

}
