import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { map } from 'rxjs/operators';
import { FORM_CLIENT } from 'src/app/core/components/dynamic-inputs/angular';
import { SimpleDynamicFormComponent } from 'src/app/core/components/dynamic-inputs/angular/components/simple-dynamic-form/simple-form.component';
import { DynamicFormHelpers, FormsClient } from 'src/app/core/components/dynamic-inputs/core';
import { CategorieFolderService } from 'src/app/_services/api/config/categorie-folder.service';
import { WarehouseService } from 'src/app/_services/api/config/warehouse.service';

@Component({
  selector: 'app-category-folder',
  templateUrl: './category-folder.component.html',
  styleUrls: ['./category-folder.component.css']
})
export class CategoryFolderComponent implements OnInit {

  ////////////////////////
  forms = this.formclient.get(10).pipe(
    map(data => DynamicFormHelpers.buildFormSync(data))
  );
  @ViewChild("formvalue") private formvalue!: SimpleDynamicFormComponent
  /////////////////////////

  constructor(@Inject(FORM_CLIENT) private formclient: FormsClient ,private toastr: ToastrService , private service: CategorieFolderService) { }

  data: any;
  categories: any;

  ngOnInit(): void {
      this.getData()
  }

  getData() {
    this.service.getData().subscribe((res) => {
      this.data = res;
      this.categories = this.data.data;
      console.log(this.categories);
    });
  }


  onSubmit(body: {[prop:string]: any}){
    console.log(body)
  }

  onComponentReadyChange(){
     console.log(this.formvalue?.formgroup)
  }
}
