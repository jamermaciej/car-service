import { getUser } from 'src/app/store/selectors/auth.selectors';
import { Role } from './../../../core/enums/roles';
import { updateUser } from './../../store/actions/users.actions';
import { combineLatest, Observable, Subject } from 'rxjs';
import {
  Component,
  AfterViewInit,
  ViewChild,
  OnDestroy,
} from '@angular/core';
import { User } from 'src/app/shared/models/user.model';
import * as fromRoot from './../../../store/index';
import * as fromUsers from './../../../admin/store/actions';
import { Store } from '@ngrx/store';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { getUsers } from '../../store/selectors/users.selectors';
import { filter, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent implements AfterViewInit, OnDestroy {
  destroySubject$: Subject<any> = new Subject();
  users$: Observable<User[]>;
  roles = Role;
  showRolesSelect: string;
  currentUserId: string;

  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  displayedColumns = [
    'id',
    'photo',
    'name',
    'email',
    'phoneNumber',
    'createdAt',
    'lastLoginAt',
    'roles',
    'emailVerified',
    'actions',
  ];
  users = new MatTableDataSource<User>();

  constructor(
    private store: Store<fromRoot.State>
  ) {
    this.store.dispatch(fromUsers.getUsers());

    combineLatest([this.store.select(getUser), this.store.select(getUsers)])
      .pipe(
        takeUntil(this.destroySubject$),
        filter(([user, users]) => !!user && !!users)
      )
      .subscribe(([user, users]) => {
        this.currentUserId = user._id;
        this.users.data = [
          users.find((u) => u._id === user._id),
          ...users.filter((u) => u._id !== user._id),
        ];
      });
  }

  addRole() {}

  editRole(id: string) {
    this.showRolesSelect = id;
  }

  updateRole(role: string, user: User) {
    const updatedUser: User = {
      ...user,
      roles: [role],
    };

    this.store.dispatch(updateUser({ user: updatedUser, alert: false }));
    this.showRolesSelect = null;
  }

  ngAfterViewInit() {
    this.users.sort = this.sort;
    this.users.paginator = this.paginator;
  }

  applyFilter(filterValue: string) {
    this.users.filter = filterValue.trim().toLowerCase();
  }

  deleteUser(userId: string) {
    this.store.dispatch(fromUsers.deleteUser({ userId }));
  }

  ngOnDestroy() {
    this.destroySubject$.next();
    this.destroySubject$.complete();
  }
}
