import { Component, OnDestroy, OnInit, ViewContainerRef } from '@angular/core';
import { BackendService } from '../../../@core/services/backend.service';
import { UserFormComponent } from './user-form/user-form.component';
import { DepartmentService } from './department.service';
import { User } from './user';
import { NbWindowService } from '@nebular/theme';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-department',
  templateUrl: './department.component.html',
  styleUrls: ['./department.component.scss']
})
export class DepartmentComponent implements OnInit, OnDestroy {

  currentUser: User;

  private currentUserSubscription: Subscription;

  private usersSubscription: Subscription;

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

  constructor(private dataService: BackendService,
              public departmentService: DepartmentService,
              private windowService: NbWindowService,
              private viewContainer: ViewContainerRef) {

    this.usersSubscription = this.dataService.getUsers().subscribe(response => {
      const resultArray = Object.keys(response).map( index => {
        return response[index];
      });
      this.departmentService.source.load(resultArray);
    });
  }

  ngOnInit() {
    this.currentUserSubscription = this.departmentService.currentUser.subscribe(currentUser => this.currentUser = currentUser);
  }

  ngOnDestroy() {
    this.currentUserSubscription.unsubscribe();
    this.usersSubscription.unsubscribe();
  }

  updateUser(event) {
    this.departmentService.changeCurrentUser(event.data);
    this.departmentService.createUser = false;
    this.windowService.open(UserFormComponent, {
      title: 'User Department Edit',
      viewContainerRef: this.viewContainer,
    });
  }

  createUser() {
    this.departmentService.changeCurrentUser(DepartmentService.defaultUser);
    this.departmentService.createUser = true;
    this.windowService.open(UserFormComponent, {
      title: 'Create User',
      viewContainerRef: this.viewContainer
    });
  }

}
