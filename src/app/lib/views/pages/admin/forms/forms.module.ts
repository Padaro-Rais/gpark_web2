import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { SharedModule } from "../../../shared.module";
import {
  ControlOptionsComponent,
  ControlOptionViewComponent,
} from "./control-options";
import { CreateFormComponent } from "./create-form/create-form.component";
import { FormControlPreviewComponent } from "./form-control/form-control-preview/form-control-preview.component";
import { FormControlComponent } from "./form-control/form-control/form-control.component";
import { FormControlsComponent } from "./form-control/form-controls.component";
import { FormsComponent } from "./forms.component";

@NgModule({
  declarations: [
    CreateFormComponent,
    FormsComponent,
    FormControlComponent,
    ControlOptionsComponent,
    ControlOptionViewComponent,
    FormControlPreviewComponent,
    FormControlComponent,
    FormControlsComponent,
  ],
  exports: [
    CreateFormComponent,
    FormsComponent,
    FormControlComponent,
    ControlOptionsComponent,
    ControlOptionViewComponent,
    FormControlPreviewComponent,
    FormControlsComponent,
    FormControlComponent,
  ],
  imports: [SharedModule, RouterModule],
})
export class FormsModule {}
