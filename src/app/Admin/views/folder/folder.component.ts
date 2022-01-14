import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { map } from 'rxjs/operators';

import { FORM_CLIENT } from 'src/app/core/components/dynamic-inputs/angular';
import { SimpleDynamicFormComponent } from 'src/app/core/components/dynamic-inputs/angular/components/simple-dynamic-form/simple-form.component';
import { DynamicFormHelpers, FormsClient } from 'src/app/core/components/dynamic-inputs/core';
import { FolderService } from 'src/app/_services/api/folder.service';

@Component({
  selector: 'app-folder',
  templateUrl: './folder.component.html',
  styleUrls: ['./folder.component.css']
})
export class FolderComponent implements OnInit {

    ////////////////////////
    forms = this.formclient.get(12).pipe(
      map(data => DynamicFormHelpers.buildFormSync(data))
    );
    @ViewChild("formvalue") private formvalue!: SimpleDynamicFormComponent
    /////////////////////////
  
    constructor(@Inject(FORM_CLIENT) private formclient: FormsClient ,private toastr: ToastrService , private service: FolderService) { }
  
    data: any;
    folders: any;
  
    ngOnInit(): void {
        this.getData()
    }
  
    getData() {
      this.service.getData().subscribe((res) => {
        this.data = res;
        this.folders = this.data.data;
        console.log(this.folders);
      });
    }

    onSubmit(body: {[prop:string]: any}){
      console.log(body)
    }
  
    onComponentReadyChange(){
       console.log(this.formvalue?.formgroup)
    }
}
