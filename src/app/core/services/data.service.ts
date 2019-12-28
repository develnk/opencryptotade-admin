import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import { environment } from '../../../environments/environment';
import {NbAuthService} from '../nebular-auth/services/auth.service';
import {NbAuthOAuth2Token} from '../nebular-auth/services/token/token';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) {}

  getUser() {
    return this.http.get(environment.server_accounts + 'current');
  }
}
