import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { dashboardRoutes } from './dashboard.routes';
import { AuthGuard } from '../guards/auth-guard.service';
import { RoleGuard } from '../guards/role-guard.service';
import { SidebarComponent } from './sidebar/sidebar.component';
import { TopNavComponent } from './topnav/topnav.component';
import { DashboardComponent } from './dashboard.component';
import { MainComponent } from './main/main.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    DashboardComponent,
    TopNavComponent,
    SidebarComponent,
    MainComponent
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
