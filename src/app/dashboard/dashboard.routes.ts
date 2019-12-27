import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { BasicComponent } from './pages/basic/basic.component';
import { DepartmentComponent } from './pages/department/department.component';
import { SmtpComponent } from './pages/smtp/smtp.component';
import { RegionalComponent } from './pages/regional/regional.component';
import { DaemonsComponent } from './pages/daemons/daemons.component';
import { AuthGuard } from '../core/auth/auth-guard.service';
import {PageNotFoundComponent} from './pages/page-not-found/page-not-found.component';

export const dashboardRoutes: Routes = [
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'basic',
        component: BasicComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'department',
        component: DepartmentComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'smtp',
        component: SmtpComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'regional',
        component: RegionalComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'daemons',
        component: DaemonsComponent,
        canActivate: [AuthGuard],
      }
    ]
  },
  { path: '**', component: PageNotFoundComponent },
];
