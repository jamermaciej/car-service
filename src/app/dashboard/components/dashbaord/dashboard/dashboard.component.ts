import { User } from './../../../../shared/models/user.model';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { UserService } from './../../../../core/services/user/user.service';
import { Component, OnInit } from '@angular/core';
import { logout } from '../../../../store/actions/auth.actions';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  $users: Observable<User[]>;

  constructor(public userService: UserService, private store: Store) { }

  ngOnInit(): void {
    this.$users = this.userService.getUsersData();
  }

  logout() {
    this.store.dispatch(logout());
  }

}
