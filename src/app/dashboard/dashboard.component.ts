import { Component } from '@angular/core';

import { MENU_ITEMS } from './dashboard-menu';

@Component({
  selector: 'app-dashboard',
  template: `
    <main-layout>
      <nb-menu [items]="menu"></nb-menu>
      <router-outlet></router-outlet>
    </main-layout>
  `
})
export class DashboardComponent {

  menu = MENU_ITEMS;

}
