import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './admin.component';
import { RouterModule, Routes } from '@angular/router';
import { DashbordComponent } from './views/home/dashbord/dashbord.component';
import { ClarityModule } from '@clr/angular';
import { HttpClientModule } from '@angular/common/http';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HeaderComponent } from './layout/header/header.component';
import { SeadbarComponent } from './layout/seadbar/seadbar.component';
import { HomeComponent } from './views/home/home.component';

// import modules
import { FullCalendarModule } from '@fullcalendar/angular';
import { NgxChartModule } from 'ngx-chart';
import { PipeModule } from './partials/pipe.module';
import { ConfirmDialogComponent } from './helpers/confirm-dialog/confirm-dialog.component';
import { TestFormComponent } from './views/test-form/test-form.component';
import { MatDialogModule } from '@angular/material/dialog';
import { DynamicFormControlModule } from '../core/components/dynamic-inputs/angular';
import { ContainerComponent } from './views/container/container.component';
import { AddContainerComponent } from './views/container/add-container/add-container.component';
import { DetailContainerComponent } from './views/container/detail-container/detail-container.component';
import { UpdateContainerComponent } from './views/container/update-container/update-container.component';
import { FolderComponent } from './views/folder/folder.component';
import { AddFolderComponent } from './views/folder/add-folder/add-folder.component';
import { UpdateFolderComponent } from './views/folder/update-folder/update-folder.component';
import { FileComponent } from './views/file/file.component';
import { AddFileComponent } from './views/file/add-file/add-file.component';
import { UpdateFileComponent } from './views/file/update-file/update-file.component';
import { UsersComponent } from './views/users/users.component';
import { AddUsersComponent } from './views/users/add-users/add-users.component';
import { UpdateUsersComponent } from './views/users/update-users/update-users.component';
import { LogsComponent } from './views/logs/logs.component';
import { WarehouseComponent } from './views/config/warehouse/warehouse.component';
import { TypeContainerComponent } from './views/config/type-container/type-container.component';
import { CategoryFolderComponent } from './views/config/category-folder/category-folder.component';
import { GroupFolderComponent } from './views/config/group-folder/group-folder.component';
import { ProfileComponent } from './views/config/profile/profile.component';
import { DepositComponent } from './views/deposit/deposit.component';
import { ActionpipePipe } from './Pipes/actionpipe.pipe';
import { EntrepriseComponent } from './views/entreprise/entreprise.component';
import { ParkingComponent } from './views/parking/parking.component';
import { ClientComponent } from './views/client/client.component';
import { AfectationComponent } from './views/afectation/afectation.component';
import { TransactionComponent } from './views/transaction/transaction.component';

export const AdminRoute: Routes = [
  {
    path: '',
    component: AdminComponent,
    children: [
      { path: 'statistiques', component: HomeComponent },
      { path: 'dashbord', component: DashbordComponent },
      { path: 'testform', component: TestFormComponent },

      { path: 'entreprises', component: EntrepriseComponent },
      { path: 'parkings', component: ParkingComponent },
      { path: 'affectations', component: AfectationComponent },
      { path: 'clients', component: ClientComponent },
      { path: 'transactions', component: TransactionComponent },


    ],
  },
];

@NgModule({
  declarations: [
    AdminComponent,
    DashbordComponent,
    HeaderComponent,
    SeadbarComponent,
    HomeComponent,
    TestFormComponent,
    ConfirmDialogComponent,
    ContainerComponent,
    AddContainerComponent,
    DetailContainerComponent,
    UpdateContainerComponent,
    FolderComponent,
    AddFolderComponent,
    UpdateFolderComponent,
    FileComponent,
    AddFileComponent,
    UpdateFileComponent,
    UsersComponent,
    AddUsersComponent,
    UpdateUsersComponent,
    LogsComponent,
    WarehouseComponent,
    TypeContainerComponent,
    CategoryFolderComponent,
    GroupFolderComponent,
    ProfileComponent,
    DepositComponent,
    ActionpipePipe,
    EntrepriseComponent,
    ParkingComponent,
    ClientComponent,
    AfectationComponent,
    TransactionComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(AdminRoute),
    ClarityModule,
    HttpClientModule,
    NgSelectModule,
    FormsModule,
    ReactiveFormsModule,
    FullCalendarModule,
    NgxChartModule,
    PipeModule,
    MatDialogModule,
    DynamicFormControlModule,
  ],
})
export class AdminModule {}
