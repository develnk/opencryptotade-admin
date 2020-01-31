import {Component, OnInit, ViewContainerRef } from '@angular/core';
import { DataService } from '../../../@core/services/data.service';
import { NbWindowService } from '../../../@core/nebular-theme/components/window/window.service';
import { UserFormComponent } from './user-form/user-form.component';
import { DepartmentService } from './department.service';
import { User } from './user';

@Component({
  selector: 'app-department',
  templateUrl: './department.component.html',
  styleUrls: ['./department.component.scss']
})
export class DepartmentComponent implements OnInit {

  currentUser: User;

  settings = {
    columns: {
      login: {
        title: 'Login',
        editable: false
      },
      firstName: {
        title: 'First Name',
        editable: false
      },
      lastName: {
        title: 'Last name',
        editable: false
      },
      email: {
        title: 'Email',
        editable: false
      },
      role: {
        title: 'Roles',
        editable: false
      },
      created: {
        title: 'Created',
        editable: false
      },
      updated: {
        title: 'Updated',
        editable: false
      }
    },
    actions: {
      edit: false,
      add: false,
      delete: false,
    },
    pager: {
      display: true,
      perPage: 10
    }
  };

  constructor(private dataService: DataService,
              public departmentService: DepartmentService,
              private windowService: NbWindowService,
              private viewContainer: ViewContainerRef) {

    this.dataService.getUsers().subscribe(response => {
      const resultArray = Object.keys(response).map( index => {
        return response[index];
      });
      this.departmentService.source.load(resultArray);
    });
  }

  openWindowForm(event) {
    this.departmentService.changeCurrentUser(event.data);
    this.windowService.open(UserFormComponent, { title: `User Department Edit`, hasBackdrop: true, viewContainerRef: this.viewContainer });
  }

  ngOnInit() {
    this.departmentService.currentUser.subscribe(currentUser => this.currentUser = currentUser);
  }

}
