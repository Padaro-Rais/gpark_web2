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

export const AdminRoute: Routes = [
  {
    path: '',
    component: AdminComponent,
    children: [
      { path: 'statistiques', component: HomeComponent },
      { path: 'dashbord', component: DashbordComponent },
      { path: 'testform', component: TestFormComponent },

      { path: 'container', component: ContainerComponent },
      { path: 'add-container', component: AddContainerComponent },
      { path: 'Update-container/:id', component: UpdateContainerComponent },
      { path: 'detail-container/:id', component: DetailContainerComponent },

      { path: 'folder', component: FolderComponent },
      { path: 'add-folder', component: AddFolderComponent },
      { path: 'update-folder/:id', component: UpdateFolderComponent },

      { path: 'file', component: FileComponent },
      { path: 'add-file', component: AddFileComponent },
      { path: 'update-file/:id', component: UpdateFileComponent },

      { path: 'users', component: UsersComponent },
      { path: 'add-users', component: AddUsersComponent },
      { path: 'update-users/:id', component: UpdateUsersComponent },
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
