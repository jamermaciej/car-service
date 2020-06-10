import { UserService } from './../../../../core/services/user/user.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor(public userService: UserService) { }

  ngOnInit(): void {
  }

}
