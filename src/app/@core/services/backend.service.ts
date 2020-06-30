import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { ENDPOINTS as ep } from './services-endpoints';

@Injectable({
  providedIn: 'root'
})
export class BackendService {

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

  createUser(user) {
    return this.http.post(ep.base_url + ep.accounts, JSON.stringify(user));
  }

  updateSmtpSettings(data) {
    return this.http.put(ep.base_url + ep.smtp, JSON.stringify(data));
  }

  getSmtpSettings() {
    return this.http.get(ep.base_url + ep.smtp);
  }

  getAllEmailTriggers() {
    return this.http.post(ep.base_url + ep.template_builder_triggers, JSON.stringify([]));
  }

  getAllFolders() {
    return this.http.get(ep.base_url + ep.template_builder_folder);
  }

  createFolder(name) {
    return this.http.post(ep.base_url + ep.template_builder_folder, JSON.stringify({name: name}));
  }

  updateFolder(data) {
    return this.http.put(ep.base_url + ep.template_builder_folder, JSON.stringify(data));
  }

  deleteFolder(id) {
    return this.http.delete(ep.base_url + ep.template_builder_folder + '/' + id, {responseType: 'text'});
  }

  getTemplateBuilderBlocks() {
    return this.http.get(ep.base_url + ep.template_builder_blocks);
  }

  updateTemplateBuilderBlock(value) {
    return this.http.put(ep.base_url + ep.template_builder_blocks, JSON.stringify(value));
  }

}
