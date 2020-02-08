import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { DataService } from '../../../@core/services/data.service';
import { SMTPService } from './smtp.service';

@Component({
  selector: 'app-smtp',
  templateUrl: './smtp.component.html',
  styleUrls: ['./smtp.component.scss']
})
export class SMTPComponent implements OnInit {

  smtpForm: FormGroup;
  private userName: string;
  private password: string;
  private host: string;
  private port: string;
  private encryption: number;

  constructor(
      private dataService: DataService,
      private smtpService: SMTPService,
      private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.createFormGroup();
    this.onChanges();
  }

  save() {

  }

  createFormGroup() {
    this.smtpForm = this.fb.group({
      userName: ['', [Validators.required]],
      password: ['', [Validators.required]],
      smtpHost: ['', [Validators.required]],
      smtpPort: ['', [Validators.required]],
      encryption: ['', [Validators.required]],
    });
  }

  onChanges() {
    this.smtpForm.get('userName').valueChanges.subscribe(userName => this.userName = userName);
    this.smtpForm.get('password').valueChanges.subscribe(password => this.password = password);
    this.smtpForm.get('smtpHost').valueChanges.subscribe(smtpHost => this.host = smtpHost);
    this.smtpForm.get('smtpPort').valueChanges.subscribe(smtpPort => this.port = smtpPort);
    this.smtpForm.get('encryption').valueChanges.subscribe(encryption => this.encryption = encryption);
  }

  changeEncryption(event) {

  }
}
