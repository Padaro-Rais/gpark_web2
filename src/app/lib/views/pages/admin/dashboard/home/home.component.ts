import { Component, Input } from "@angular/core";
import { AuthService } from "../../../../../core/auth/core";
import { defaultPath } from "../../../../partials/partials-configs";
import { RoutesMap } from "src/app/lib/core/routes";
import { environment } from "src/environments/environment";

@Component({
  selector: "app-admin-dashboard-home",
  templateUrl: "./home.component.html",
  styles: [],
})
export class AdminDashboardHomeComponent {
  public navbarRoutesMap: RoutesMap[];
  public navbarRouteDefinitions: { [index: string]: string };
  listUserRoutePath = `/${defaultPath}/${environment.appRoutes.managementsRoute}/${environment.appRoutes.listUsersRoute}`;
  manageRolesPath = `/${defaultPath}/${environment.appRoutes.managementsRoute}/${environment.appRoutes.rolesManagementRoute}`;
  manageFormsPath = `/${defaultPath}/${environment.appRoutes.managementsRoute}/${environment.appRoutes.forms}`;
  manageModulesPath = `/${defaultPath}/${environment.appRoutes.managementsRoute}/${environment.appRoutes.modulesManagementRoute}`;
  manageDepartmentsPath = `/${defaultPath}/${environment.appRoutes.managementsRoute}/${environment.appRoutes.departmentManagementRoute}`;
  manageGeneralConfigPath = `/${defaultPath}/${environment.appRoutes.globalConfigurationsRoute}`;

  // Inputs
  @Input() users: boolean = environment.isUsersWorkspaceEnabled;
  @Input() forms: boolean = environment.isFormsWorkspaceEnabled;
  @Input() departments: boolean = environment.isDepartmentWorkspaceEnabled;
  @Input() configurations: boolean = environment.isConfigurationWorkspaceEnabled;
  @Input() modules: boolean = environment.isModulesWorkspaceEnabled;

}
