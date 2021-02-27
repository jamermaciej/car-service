import { User } from './../../../../shared/models/user.model';
import { Observable } from 'rxjs';
import { UserService } from './../../../../core/services/user/user.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  $users: Observable<User[]>;

  constructor(public userService: UserService) { }

  ngOnInit(): void {
    this.$users = this.userService.getUsersData();
  }

}
