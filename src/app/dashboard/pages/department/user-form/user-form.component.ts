import {Component, OnInit} from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DepartmentService } from '../department.service';
import { User } from '../user';
import { DataService } from '../../../../@core/services/data.service';
import { NbWindowRef } from '@nebular/theme';

@Component({
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent implements OnInit {

  selectedUser: User;
  unchangedUser: User;
  departmentForm: FormGroup;
  private submitClosed = false;
  private _buttonText = 'Update';
  readonly _roles: string[] = ['ADMIN', 'MANAGER', 'SALES'];

  get cpwd() {
    return this.departmentForm.get('confirm_password');
  }

  get pwd() {
    return this.departmentForm.get('password');
  }

  get role() {
    return this.departmentForm.get('role');
  }

  get buttonText(): string {
    return this._buttonText;
  }

  set buttonText(value: string) {
    this._buttonText = value;
  }

  constructor(private windowRef: NbWindowRef,
              private departmentService: DepartmentService,
              private dataService: DataService,
              private fb: FormBuilder
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

    this.createFormGroup();
    this.onChanges();
    this.onNewUser();
  }

  onChanges() {
    this.departmentForm.get('firstName').valueChanges.subscribe(firstName => this.selectedUser.firstName = firstName);
    this.departmentForm.get('lastName').valueChanges.subscribe(lastName => this.selectedUser.lastName = lastName);
    this.departmentForm.get('login').valueChanges.subscribe(login => this.selectedUser.login = login);
    this.departmentForm.get('email').valueChanges.subscribe(email => this.selectedUser.email = email);
    this.departmentForm.get('password').valueChanges.subscribe(passwd => {
      if (passwd !== this.cpwd.value) {
        this.departmentForm.get('confirm_password').setErrors({invalid: true});
      }
    });
    this.departmentForm.get('confirm_password').valueChanges.subscribe(passwd => {
      if (passwd === this.pwd.value) {
        this.selectedUser.password = passwd;
      }
    });
    this.departmentForm.get('role').valueChanges.subscribe(role => this.selectedUser.role = role);
    this.departmentForm.get('note').valueChanges.subscribe(note => this.selectedUser.note = note);
  }

  close() {
    this.revertData();
    this.windowRef.close();
  }

  revertData() {
    this.departmentService.source.getAll().then((users: Array<User>) => {
      const found = users.find(user => user.id === this.selectedUser.id);

      if (found) {
        // Revert changes at selected row.
        this.departmentService.source.update(found, this.unchangedUser);
      }
    });
  }

  submit() {
    if (this.departmentService.createUser) {
      this.dataService.createUser(this.selectedUser).subscribe(response => {
        // @TODO Need review response
        this.departmentService.source.add(this.selectedUser);
        this.departmentService.source.refresh();
      });
    } else {
      this.dataService.updateUser(this.selectedUser).subscribe(response => {
        // @TODO Need review response
        this.departmentService.source.refresh();
      });
    }
    this.submitClosed = true;
    this.windowRef.close();
  }

  createFormGroup() {
    this.departmentForm = this.fb.group({
      login: [this.selectedUser.login, [Validators.required]],
      firstName: [this.selectedUser.firstName, [Validators.required]],
      lastName: [this.selectedUser.lastName, [Validators.required]],
      email: [this.selectedUser.email, [Validators.required, Validators.email]],
      role: [this.selectedUser.role, [Validators.required, this.roleValidate]],
      password: ['', [Validators.minLength(6)]],
      confirm_password: ['', [this.duplicatePassword]],
      note: [this.selectedUser.note]
    });
  }

  duplicatePassword(control: AbstractControl) {
    if (!control.parent || !control) { return; }
    const pwd = control.parent.get('password');
    const cpwd = control.parent.get('confirm_password');

    if (!pwd || !cpwd) { return; }
    if (pwd.value !== cpwd.value) {
      return { invalid: true };
    }
  }

  roleValidate(control: AbstractControl) {
    if (!control.parent || !control) { return; }
    const selectedRoles = control.parent.get('role');

    if (selectedRoles.value === null) { return; }
    if (selectedRoles.value.length === 0) {
      return { invalid: true };
    }
  }

  onNewUser() {
    if (this.departmentService.createUser) {
      this.buttonText = 'Create';
      this.pwd.setValidators([Validators.required]);
      this.cpwd.setValidators([Validators.required]);
    }
  }

}
