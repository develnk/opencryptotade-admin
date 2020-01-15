import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { dashboardRoutes } from './dashboard.routes';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { TopNavComponent } from './components/topnav/topnav.component';
import { DashboardComponent } from './dashboard.component';
import { MainComponent } from './components/main/main.component';
import { BasicComponent } from './pages/basic/basic.component';
import { DepartmentComponent } from './pages/department/department.component';
import { SmtpComponent } from './pages/smtp/smtp.component';
import { RegionalComponent } from './pages/regional/regional.component';
import { DaemonsComponent } from './pages/daemons/daemons.component';
import { AuthGuard } from '../core/guards/auth-guard.service';
import { RoleGuard } from '../core/guards/role-guard.service';

@NgModule({
  declarations: [
    DashboardComponent,
    TopNavComponent,
    SidebarComponent,
    BasicComponent,
    MainComponent,
    DepartmentComponent,
    SmtpComponent,
    RegionalComponent,
    DaemonsComponent
  ],
  imports: [
    NgbModule,
    CommonModule,
    RouterModule.forChild(dashboardRoutes)
  ],
  exports: [
    DashboardComponent,
    TopNavComponent,
    SidebarComponent
  ],
  providers: [
    AuthGuard,
    RoleGuard
  ]
})
export class DashboardModule { }
