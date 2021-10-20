import { NgModule } from "@angular/core";
import {
  MODULE_DECLARATIONS,
  AdminDashboardRoutingModule,
  COMPONENTS_PROVIDERS,
} from "./dashboard-routing.module";
import { RouterModule } from "@angular/router";
import { SharedModule } from "../../../shared.module";
import { FormsModule } from "../forms/forms.module";

@NgModule({
  imports: [
    AdminDashboardRoutingModule,
    SharedModule,
    RouterModule,
    FormsModule,
  ],
  declarations: [...MODULE_DECLARATIONS],
  exports: [...MODULE_DECLARATIONS],
  providers: [...COMPONENTS_PROVIDERS],
  entryComponents: [],
})
export class DashboardModule {
  constructor() {}
}
