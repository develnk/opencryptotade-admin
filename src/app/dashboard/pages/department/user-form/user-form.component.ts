import {Component, OnInit} from '@angular/core';
import { NbWindowRef } from '../../../../@core/nebular-theme/components/window/window-ref';
import { DepartmentService } from '../department.service';
import { User } from '../user';
import { DataService } from '../../../../@core/services/data.service';

@Component({
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent implements OnInit {

  selectedUser: User;
  unchangedUser: User;
  private submitClosed = false;

  constructor(private windowRef: NbWindowRef,
              private departmentService: DepartmentService,
              private dataService: DataService
  ) {}

  ngOnInit(): void {
    this.departmentService.currentUser.subscribe(selectedUser => {
      this.selectedUser = selectedUser;
      // Clone of selectedUser for revert changes if window closed without save changes.
      this.unchangedUser = JSON.parse(JSON.stringify(this.selectedUser));
    });
    this.windowRef.onClose.subscribe(() => {
      if (!this.submitClosed) {
        this.revertData();
      }
    });
  }

  close() {
    this.revertData();
    this.windowRef.close();
  }

  private revertData() {
    this.departmentService.source.getAll().then((users: Array<User>) => {
      const found = users.find(user => user.id === this.selectedUser.id);
      // Revert changes at selected row.
      this.departmentService.source.update(found, this.unchangedUser);
    });
  }

  submit() {
    // Send to server for update user fields.
    this.dataService.updateUser(this.selectedUser).subscribe(response => {
      console.log(response);
    });
    this.departmentService.source.refresh();
    this.submitClosed = true;
    this.windowRef.close();
  }
}
