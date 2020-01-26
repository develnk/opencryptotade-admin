import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NbAuthComponent } from '../nebular-auth/components/auth.component';
import { NgxLoginComponent } from './login/login.component';
import { NbLogoutComponent } from '../nebular-auth/components/logout/logout.component';

export const routes: Routes = [
  {
    path: '',
    component: NbAuthComponent,
    children: [
      {
        path: 'login',
        component: NgxLoginComponent,
        pathMatch: 'full'
      },
      {
        path: 'logout',
        component: NbLogoutComponent,
        pathMatch: 'full'
      },
    ],
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NgxAuthRoutingModule {
}
