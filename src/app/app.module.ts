import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { APP_BASE_HREF } from '@angular/common';
import { NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NotificationAnimationType, SimpleNotificationsModule } from 'angular2-notifications';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { ThemeModule } from './@theme/theme.module';
import { NgxAuthModule } from './@core/auth/auth.module';
import { CoreModule } from './@core/core.module';
import { HttpErrorInterceptor } from './@core/interceptors/httpError.interceptor';
import { HeaderInterceptor } from './@core/interceptors/header.interceptor';
import { PageNotFoundComponent } from './@core/page-not-found/page-not-found.component';
import { NbLayoutModule, NbMenuModule, NbSidebarModule, NbWindowModule } from '@nebular/theme';

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
    NbLayoutModule,
    SimpleNotificationsModule.forRoot({
      position: ['top', 'right'],
      timeOut: 5000,
      maxLength: 20,
      lastOnBottom: true,
      showProgressBar: true,
      pauseOnHover: true,
      clickToClose: true,
      animate: NotificationAnimationType.FromRight
    }),
    ThemeModule.forRoot(),
    NbSidebarModule.forRoot(),
    NbMenuModule.forRoot(),
    NbWindowModule.forRoot(),
    AppRoutingModule,
    CoreModule.forRoot()
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS,  useClass: HttpErrorInterceptor,  multi: true },
    { provide: HTTP_INTERCEPTORS,  useClass: HeaderInterceptor,  multi: true },
    { provide: APP_BASE_HREF, useValue: '/' }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
