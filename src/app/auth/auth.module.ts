import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from '../app-routing.module';
import { ClarityModule } from '@clr/angular';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { AuthComponent } from './auth.component';
import { TestLoginComponent } from './test-login/test-login.component';


export const AuthRoute: Routes = [
  {
    path: '',
    component: AuthComponent,
    children: [
      {
        path: 'test',
        component: LoginComponent,
      },
      {
        path: 'login',
        component: TestLoginComponent,
      },
    ],
  },

];


@NgModule({
  declarations: [LoginComponent,AuthComponent, TestLoginComponent],
  imports: [CommonModule,
    RouterModule.forChild(AuthRoute),
    ClarityModule,
    NgSelectModule,
    FormsModule,
    ReactiveFormsModule,],
})
export class LoginModule { }
