import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { dashboardRoutes } from './dashboard.routes';
import { AuthGuard } from '../core/guards/auth-guard.service';
import { RoleGuard } from '../core/guards/role-guard.service';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { TopNavComponent } from './components/topnav/topnav.component';
import { DashboardComponent } from './dashboard.component';
import { MainComponent } from './components/main/main.component';
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
