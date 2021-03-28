import { UserService } from 'src/app/core/services/user/user.service';
import { Observable } from 'rxjs';
import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { User } from 'src/app/shared/models/user.model';
import * as fromRoot from './../../../store/index';
import { Store } from '@ngrx/store';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import * as fromUsers from './../../store';
import { getUsers } from '../../store/selectors/users.selectors';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit, AfterViewInit {
  users$: Observable<User[]>;

  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  displayedColumns = ['id', 'photoURL', 'displayName', 'email', 'phoneNumber', 'createdAt', 'lastLoginAt', 'roles', 'emailVerified'];
  users = new MatTableDataSource<User>();

  constructor(private store: Store<fromRoot.State>, private userService: UserService) {
    this.store.select(getUsers).pipe(
      filter(data => !!data),
    ).subscribe((users: User[]) => {
      this.users.data = users;
    });
  }

  ngOnInit(): void {
    // this.store.dispatch(fromUsers.getUsers());
  }

  ngAfterViewInit() {
    this.users.sort = this.sort;
    this.users.paginator = this.paginator;
  }

  applyFilter(filterValue: string) {
    this.users.filter = filterValue.trim().toLowerCase();
  }
}
