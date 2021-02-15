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

  constructor(public userService: UserService, private store: Store) { }

  ngOnInit(): void {
  }

  logout() {
    this.store.dispatch(logout());
  }

}
