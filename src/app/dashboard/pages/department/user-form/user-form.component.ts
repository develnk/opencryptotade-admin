import { Component } from '@angular/core';
import { NbWindowRef } from '../../../../@core/nebular-theme/components/window/window-ref';

@Component({
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent {

  constructor(public windowRef: NbWindowRef) {}

  close() {
    this.windowRef.close();
  }
}
