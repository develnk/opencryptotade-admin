import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { DashboardComponent } from './dashboard.component';
import { BasicComponent } from './pages/basic/basic.component';
import { SmtpComponent } from './pages/smtp/smtp.component';
import { RegionalComponent } from './pages/regional/regional.component';
import { DaemonsComponent } from './pages/daemons/daemons.component';
import { AuthGuard } from '../@core/guards/auth-guard.service';
import { RoleGuard } from '../@core/guards/role-guard.service';
import { NbMenuModule } from '../@core/nebular-theme/components/menu/menu.module';
import { ThemeModule } from '../@theme/theme.module';
import { DashboardRoutingModule } from './dashboard-routing.module';

@NgModule({
  declarations: [
    DashboardComponent,
    BasicComponent,
    SmtpComponent,
    RegionalComponent,
    DaemonsComponent
  ],
  imports: [
    DashboardRoutingModule,
    ThemeModule,
    NbMenuModule,
    NgbModule,
    CommonModule
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
