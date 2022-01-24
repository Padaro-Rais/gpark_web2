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


import { ActionpipePipe } from './Pipes/actionpipe.pipe';
import { EntrepriseComponent } from './views/entreprise/entreprise.component';
import { ParkingComponent } from './views/parking/parking.component';
import { ClientComponent } from './views/client/client.component';
import { AfectationComponent } from './views/afectation/afectation.component';
import { DynamicFormControlModule } from '../core/components/dynamic-inputs/angular';
import { MatDialogModule } from '@angular/material/dialog';

export const AdminRoute: Routes = [
  {
    path: '',
    component: AdminComponent,
    children: [
      { path: 'statistiques', component: HomeComponent },
      { path: 'dashbord', component: DashbordComponent },

      { path: 'entreprises', component: EntrepriseComponent },
      { path: 'parkings', component: ParkingComponent },
      { path: 'affectations', component: AfectationComponent },
      { path: 'clients', component: ClientComponent },


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
    ConfirmDialogComponent,

    ActionpipePipe,
    EntrepriseComponent,
    ParkingComponent,
    ClientComponent,
    AfectationComponent,
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
