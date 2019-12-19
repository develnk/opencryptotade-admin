import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user';
import {AuthService} from '../../services/auth.service';

@Component({
  selector: 'app-topnav',
  templateUrl: './topnav.component.html',
  styleUrls: ['./topnav.component.scss']
})
export class TopNavComponent implements OnInit {
  private user: User;

  constructor(private authService: AuthService) { }

  ngOnInit() {
  }

  logout() {
    this.authService.logout();
  }

}
