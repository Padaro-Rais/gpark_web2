import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { map } from 'rxjs/operators';

import { FORM_CLIENT } from 'src/app/core/components/dynamic-inputs/angular';
import { SimpleDynamicFormComponent } from 'src/app/core/components/dynamic-inputs/angular/components/simple-dynamic-form/simple-form.component';
import { DynamicFormHelpers, FormsClient } from 'src/app/core/components/dynamic-inputs/core';
import { LogService } from 'src/app/_services/api/log.service';

@Component({
  selector: 'app-logs',
  templateUrl: './logs.component.html',
  styleUrls: ['./logs.component.css']
})
export class LogsComponent implements OnInit {

   ////////////////////////
   forms = this.formclient.get(10).pipe(
    map(data => DynamicFormHelpers.buildFormSync(data))
  );
  @ViewChild("formvalue") private formvalue!: SimpleDynamicFormComponent
  /////////////////////////

  constructor(@Inject(FORM_CLIENT) private formclient: FormsClient ,private toastr: ToastrService , private service: LogService,private router: Router) { }

  data: any;
  logs: any;
  sniper: boolean = true;

  ngOnInit(): void {
      this.getData()
  }

  getData() {
    this.sniper = true
    this.service.getData().subscribe(
      (res) => {
        this.data = res;
        this.logs = this.data.data;
        console.log(this.logs);
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


  onSubmit(body: {[prop:string]: any}){
    console.log(body)
  }

  onComponentReadyChange(){
     console.log(this.formvalue?.formgroup)
  }

}
