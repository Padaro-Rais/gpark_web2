import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { AdminComponent } from './admin.component'
import { RouterModule, Routes } from '@angular/router'
import { DashbordComponent } from './views/home/dashbord/dashbord.component'
import { ClarityModule } from '@clr/angular'
import { HttpClientModule } from '@angular/common/http'
import { NgSelectModule } from '@ng-select/ng-select'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { HeaderComponent } from './layout/header/header.component'
import { SeadbarComponent } from './layout/seadbar/seadbar.component'
import { HomeComponent } from './views/home/home.component'

// import modules
import { FullCalendarModule } from '@fullcalendar/angular';
import { NgxChartModule } from 'ngx-chart'
import { PipeModule } from './partials/pipe.module'
import { ConfirmDialogComponent } from './helpers/confirm-dialog/confirm-dialog.component';
import { TestFormComponent } from './views/test-form/test-form.component'




export const AdminRoute: Routes = [
  {
    path: '',
    component: AdminComponent,
    children: [
      { path: 'statistiques', component: HomeComponent },
      { path: 'dashbord', component: DashbordComponent },
      { path: 'testform', component: TestFormComponent },
    ],
  },
]


@NgModule({
  declarations: [
    AdminComponent,
    DashbordComponent,
    HeaderComponent,
    SeadbarComponent,
    HomeComponent,
    TestFormComponent,
    ConfirmDialogComponent,
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
  ],
})
export class AdminModule {}
