import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { map } from 'rxjs/operators';

import { FORM_CLIENT } from 'src/app/core/components/dynamic-inputs/angular';
import { SimpleDynamicFormComponent } from 'src/app/core/components/dynamic-inputs/angular/components/simple-dynamic-form/simple-form.component';
import { DynamicFormHelpers, FormsClient } from 'src/app/core/components/dynamic-inputs/core';
import { ContainerService } from 'src/app/_services/api/container.service';
import { UserService } from 'src/app/_services/user.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

    ////////////////////////
    forms = this.formclient.get(7).pipe(
      map(data => DynamicFormHelpers.buildFormSync(data))
    );
    @ViewChild("formvalue") private formvalue!: SimpleDynamicFormComponent
    /////////////////////////
  
    constructor(@Inject(FORM_CLIENT) private formclient: FormsClient ,private toastr: ToastrService , private service: UserService) { }
  
    data: any;
    users: any;
  
    ngOnInit(): void {
        this.getData()
    }
  
    getData() {
      this.service.getData().subscribe((res) => {
        this.data = res;
        this.users = this.data.data;
        console.log(this.users);
      });
    }
  
  
    onSubmit(body: {[prop:string]: any}){
      console.log(body)
    }
  
    onComponentReadyChange(){
       console.log(this.formvalue?.formgroup)
    }
  

}
