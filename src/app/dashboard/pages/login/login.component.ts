import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  private username: string;
  private password: string;

  constructor(private authService: AuthService) { }

  ngOnInit() {
  }

  loginAdmin() {
    this.authService.loginAdmin();
  }

  login() {
    this.authService.login();
  }

}
