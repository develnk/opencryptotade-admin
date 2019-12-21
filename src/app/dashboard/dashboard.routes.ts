import { Routes } from '@angular/router';
import { AuthGuard } from '../core/guards/auth-guard.service';
import { RoleGuard } from '../core/guards/role-guard.service';
import {DashboardComponent} from './dashboard.component';

export const dashboardRoutes: Routes = [
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard],
    children: []
  }
];
