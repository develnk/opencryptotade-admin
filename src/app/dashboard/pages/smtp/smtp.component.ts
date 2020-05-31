import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DataService } from '../../../@core/services/data.service';
import { SMTPService } from './smtp.service';
import { Smtp } from '../../../@core/models/smtp';

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
  private from: string;
  private debug: boolean;
  encryption: string;

  constructor(
      private dataService: DataService,
      private smtpService: SMTPService,
      private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.dataService.getSmtpSettings().subscribe((response: Smtp) => {
      this.smtpForm.get('userName').setValue(response.userName);
      this.smtpForm.get('smtpHost').setValue(response.hostName);
      this.smtpForm.get('smtpPort').setValue(response.port);
      this.smtpForm.get('from').setValue(response.from);
      this.smtpForm.get('debug').setValue(response.debug);
      if (response.ssl) {
        this.encryption = '2';
      }
      else if (response.tls) {
        this.encryption = '3';
      }
      else {
        this.encryption = '1';
      }
    });

    this.createFormGroup();
    this.onChanges();
  }

  save() {
    let ssl = false;
    let tls = false;

    if (this.encryption === '2') {
      ssl = true;
    }
    else if (this.encryption === '3') {
      tls = true;
    }

    const dataToUpdate = {
      hostName: this.host,
      port: this.port,
      userName: this.userName,
      password: this.password,
      from: this.from,
      ssl: ssl,
      tls: tls,
      debug: this.debug
    };

    this.dataService.updateSmtpSettings(dataToUpdate).subscribe(response => {
      console.log('Settings updated');
    });
  }

  test() {

  }

  createFormGroup() {
    this.smtpForm = this.fb.group({
      userName: [this.userName, [Validators.required]],
      password: ['', [Validators.required]],
      smtpHost: [this.host, [Validators.required]],
      smtpPort: [this.port, [Validators.required, Validators.pattern('[0-9]*')]],
      from: [this.from, [Validators.required, Validators.email]],
      debug: [this.debug, [Validators.nullValidator]],
    });
  }

  onChanges() {
    this.smtpForm.get('userName').valueChanges.subscribe(userName => this.userName = userName);
    this.smtpForm.get('password').valueChanges.subscribe(password => this.password = password);
    this.smtpForm.get('smtpHost').valueChanges.subscribe(smtpHost => this.host = smtpHost);
    this.smtpForm.get('smtpPort').valueChanges.subscribe(smtpPort => this.port = smtpPort);
    this.smtpForm.get('from').valueChanges.subscribe(from => this.from = from);
    this.smtpForm.get('debug').valueChanges.subscribe(debug => this.debug = debug);
  }

  changeEncryption(value) {
    this.encryption = value;
  }
}
