import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpErrorInterceptor } from './core/interceptors/httpError.interceptor';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppComponent } from './app.component';
import { AppRouting } from './app-routing.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { PageNotFoundComponent } from './core/page-not-found/page-not-found.component';
import { NgxAuthModule } from './core/auth/auth.module';

@NgModule({
  declarations: [
    AppComponent,
    PageNotFoundComponent
  ],
  imports: [
    HttpClientModule,
    NgbModule,
    BrowserModule,
    AppRouting,
    DashboardModule,
    NgxAuthModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS,  useClass: HttpErrorInterceptor,  multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
