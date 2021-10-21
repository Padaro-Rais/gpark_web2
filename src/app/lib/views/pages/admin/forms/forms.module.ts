import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { SharedModule } from "../../../shared.module";
import {
  ControlOptionsComponent,
  ControlOptionViewComponent,
} from "./control-options";
import { CreateFormComponent } from "./create-form/create-form.component";
import { FormControlAddComponent } from "./form-control-add/form-control-add.component";
import { FormControlPreviewComponent } from "./form-control/form-control-preview/form-control-preview.component";
import { FormControlComponent } from "./form-control/form-control/form-control.component";
import { FormControlsComponent } from "./form-control/form-controls.component";
import { FormsViewComponent } from "./forms-view.component";
import { FormsComponent } from "./forms.component";
import { ListformsComponent } from "./listforms/listforms.component";

@NgModule({
  declarations: [
    CreateFormComponent,
    FormsComponent,
    ListformsComponent,
    FormControlAddComponent,
    FormControlComponent,
    FormsViewComponent,
    ControlOptionsComponent,
    ControlOptionViewComponent,
    FormControlPreviewComponent,
    FormControlComponent,
    FormControlsComponent
  ],
  exports: [
    CreateFormComponent,
    FormsComponent,
    ListformsComponent,
    FormControlAddComponent,
    FormControlComponent,
    FormsViewComponent,
    ControlOptionsComponent,
    ControlOptionViewComponent,
    FormControlPreviewComponent,
    FormControlsComponent,
    FormControlComponent
  ],
  imports: [SharedModule, RouterModule],
})
export class FormsModule {}
