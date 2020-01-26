import {Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import { DataService } from '../../../@core/services/data.service';
import { LocalDataSource } from '../../../@core/ng2-smart-table';
import { NbWindowService } from '../../../@core/nebular-theme/components/window/window.service';
import {UserFormComponent} from './user-form/user-form.component';

@Component({
  selector: 'app-department',
  templateUrl: './department.component.html',
  styleUrls: ['./department.component.scss']
})
export class DepartmentComponent implements OnInit {

  source: LocalDataSource;

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

  constructor(private dataService: DataService, private windowService: NbWindowService) {
    this.source = new LocalDataSource();

    this.dataService.getUsers().subscribe(response => {
      const resultArray = Object.keys(response).map( index => {
        return response[index];
      });
      this.source.load(resultArray);
    });
  }

  openWindowForm() {
    this.windowService.open(UserFormComponent, { title: `Window` });
  }

  ngOnInit() {
  }

}
