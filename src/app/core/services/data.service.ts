import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {ENDPOINTS} from './services-endpoints';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) {}

  getUser() {
    return this.http.get(ENDPOINTS.base_url + ENDPOINTS.current_account);
  }

}
