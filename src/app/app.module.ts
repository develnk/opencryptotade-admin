import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { PageNotFoundComponent } from './@core/page-not-found/page-not-found.component';
import { NgxAuthModule } from './@core/auth/auth.module';
import { NbWindowModule } from './@core/nebular-theme/components/window/window.module';
import { ThemeModule } from './@theme/theme.module';
import { NbMenuModule } from './@core/nebular-theme/components/menu/menu.module';
import { HttpErrorInterceptor } from './@core/interceptors/httpError.interceptor';
import { APP_BASE_HREF } from '@angular/common';
import { CoreModule } from './@core/core.module';
import { NbSidebarModule } from './@core/nebular-theme/components/sidebar/sidebar.module';

@NgModule({
  declarations: [
    AppComponent,
    PageNotFoundComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    NgbModule,
    DashboardModule,
    NgxAuthModule,
    ThemeModule.forRoot(),
    NbSidebarModule.forRoot(),
    NbMenuModule.forRoot(),
    NbWindowModule.forRoot(),
    AppRoutingModule,
    CoreModule.forRoot(),
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS,  useClass: HttpErrorInterceptor,  multi: true },
    { provide: APP_BASE_HREF, useValue: '/' }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
