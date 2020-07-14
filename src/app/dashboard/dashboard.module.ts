import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { DashboardComponent } from './dashboard.component';
import { BasicComponent } from './pages/basic/basic.component';
import { RegionalComponent } from './pages/regional/regional.component';
import { DaemonsComponent } from './pages/daemons/daemons.component';
import { AuthGuard } from '../@core/guards/auth-guard.service';
import { RoleGuard } from '../@core/guards/role-guard.service';
import { ThemeModule } from '../@theme/theme.module';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { NbMenuModule } from '@nebular/theme';
import { SimpleNotificationsModule } from 'angular2-notifications';

@NgModule({
  declarations: [
    DashboardComponent,
    BasicComponent,
    RegionalComponent,
    DaemonsComponent
  ],
  imports: [
    DashboardRoutingModule,
    ThemeModule,
    NbMenuModule,
    NgbModule,
    CommonModule,
    SimpleNotificationsModule,
  ],
  exports: [
    DashboardComponent,
  ],
  providers: [
    AuthGuard,
    RoleGuard
  ]
})
export class DashboardModule { }
