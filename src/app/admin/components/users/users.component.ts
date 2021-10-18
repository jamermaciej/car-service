import { getUser } from 'src/app/store/selectors/auth.selectors';
import { Role } from './../../../core/enums/roles';
import { updateUser } from './../../store/actions/users.actions';
import { Observable, Subject } from 'rxjs';
import { Component, OnInit, AfterViewInit, ViewChild, OnDestroy } from '@angular/core';
import { User } from 'src/app/shared/models/user.model';
import * as fromRoot from './../../../store/index';
import { Store } from '@ngrx/store';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { getUsers } from '../../store/selectors/users.selectors';
import { filter, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit, AfterViewInit, OnDestroy {
  destroySubject$: Subject<any> = new Subject();
  users$: Observable<User[]>;
  roles = Role;
  showRolesSelect: string;

  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  displayedColumns = ['id', 'photoURL', 'displayName', 'email', 'phoneNumber', 'createdAt', 'lastLoginAt', 'roles', 'emailVerified'];
  users = new MatTableDataSource<User>();


  constructor(private store: Store<fromRoot.State>
            ) {
    this.store.select(getUsers).pipe(
      takeUntil(this.destroySubject$),
      filter(data => !!data),
    ).subscribe((users: User[]) => {
      this.users.data = users;
    });
  }

  ngOnInit(): void {

  }

  addRole() {

  }

  editRole(id: string) {
    this.showRolesSelect = id;
  }

  updateRole(role: string, user: User) {
    const updatedUser: User = {
      ...user,
      roles: [role]
    };

    this.store.dispatch(updateUser({ user: updatedUser }));
    this.showRolesSelect = null;
  }

  get loggedInUser() {
    return this.store.select(getUser);
  }

  ngAfterViewInit() {
    this.users.sort = this.sort;
    this.users.paginator = this.paginator;
  }

  applyFilter(filterValue: string) {
    this.users.filter = filterValue.trim().toLowerCase();
  }

  ngOnDestroy() {
    this.destroySubject$.next();
    this.destroySubject$.complete();
  }
}
