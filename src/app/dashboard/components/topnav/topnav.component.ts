import { Component, OnInit } from '@angular/core';
import { User } from '../../../core/models/user';
import {DataService} from '../../../core/services/data.service';

@Component({
  selector: 'app-topnav',
  templateUrl: './topnav.component.html',
  styleUrls: ['./topnav.component.scss'],
})
export class TopNavComponent implements OnInit {
  private user: any;

  constructor(private dataService: DataService) {
    this.showUsers();
  }

  ngOnInit() {
  }

  showUsers() {
    this.dataService.getUser().subscribe(response => {
      // Write your logic here to handle the data
      console.log(response);
    });
  }

}
