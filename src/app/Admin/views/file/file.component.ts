import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { map } from 'rxjs/operators';

import { FORM_CLIENT } from 'src/app/core/components/dynamic-inputs/angular';
import { SimpleDynamicFormComponent } from 'src/app/core/components/dynamic-inputs/angular/components/simple-dynamic-form/simple-form.component';
import {
  DynamicFormHelpers,
  FormsClient,
} from 'src/app/core/components/dynamic-inputs/core';
import { FileService } from 'src/app/_services/api/file.service';

@Component({
  selector: 'app-file',
  templateUrl: './file.component.html',
  styleUrls: ['./file.component.css'],
})
export class FileComponent implements OnInit {
  ////////////////////////
  forms = this.formclient
    .get(14)
    .pipe(map((data) => DynamicFormHelpers.buildFormSync(data)));
  @ViewChild('formvalue') private formvalue!: SimpleDynamicFormComponent;
  /////////////////////////

  constructor(
    @Inject(FORM_CLIENT) private formclient: FormsClient,
    private toastr: ToastrService,
    private service: FileService
  ) {}

  data: any;
  files: any;

  ngOnInit(): void {
    this.getData();
  }

  getData() {
    this.service.getData().subscribe((res) => {
      if (res) {
        this.data = res;
        this.files = this.data.data;
        console.log(this.files);
      }
    });
  }

  onSubmit(body: { [prop: string]: any }) {
    console.log(body);
  }

  onComponentReadyChange() {
    console.log(this.formvalue?.formgroup);
  }
}
