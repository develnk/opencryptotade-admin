import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import { ENDPOINTS as ep } from './services-endpoints';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) {}

  getUser() {
    return this.http.get(ep.base_url + ep.current_account);
  }

  getUsers() {
    return this.http.get(ep.base_url + ep.all_users);
  }

  updateUser(user) {
    return this.http.put(ep.base_url + ep.accounts, JSON.stringify(user));
  }

}
