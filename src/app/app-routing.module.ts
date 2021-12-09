import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from './auth/auth.guard';

import { NotfoundComponent } from './notfound/notfound.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'auth/login',
    pathMatch: 'full',
  },

  {
    path: 'auth',
    loadChildren: () =>
      import('src/app/auth/auth.module').then((m) => m.LoginModule),
  },

  {
    path: 'app',
    loadChildren: () =>
      import('src/app/Admin/admin.module').then((m) => m.AdminModule),
      canActivate: [AuthGuard],
  },

  {
    path: '**',
    component: NotfoundComponent,
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  // routermodule.forchild()
  exports: [RouterModule],
})
export class AppRoutingModule {}
