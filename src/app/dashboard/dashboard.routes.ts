import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { BasicComponent } from './pages/basic/basic.component';
import { DepartmentComponent } from './pages/department/department.component';
import { SmtpComponent } from './pages/smtp/smtp.component';
import { RegionalComponent } from './pages/regional/regional.component';
import { DaemonsComponent } from './pages/daemons/daemons.component';
import { AuthGuard } from '../core/guards/auth-guard.service';
import {PageNotFoundComponent} from '../core/page-not-found/page-not-found.component';
import { RoleGuard } from '../core/guards/role-guard.service';

export const dashboardRoutes: Routes = [
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'basic',
        component: BasicComponent,
      },
      {
        path: 'department',
        component: DepartmentComponent,
        data: { role: 'ADMIN' },
        canActivate: [ RoleGuard ],
      },
      {
        path: 'smtp',
        component: SmtpComponent,
      },
      {
        path: 'regional',
        component: RegionalComponent,
      },
      {
        path: 'daemons',
        component: DaemonsComponent,
      }
    ]
  },
  { path: '**', component: PageNotFoundComponent },
];
