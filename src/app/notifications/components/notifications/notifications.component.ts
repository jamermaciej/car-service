import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormGroupDirective, Validators } from '@angular/forms';
import { RequiredValidator } from 'src/app/shared/validators/required-validator';
import { NotificationReceiverType } from '../../enums/notification-receiver-type.enum';
import { NotificationType } from '../../enums/notification-type.enum';
import { State } from '../../../admin/store/reducer/users.reducer';
import { Store } from '@ngrx/store';
import { getUser, getUsers } from 'src/app/admin/store/selectors/users.selectors';
import { Observable, Observer, pipe, Subject } from 'rxjs';
import { User } from 'src/app/shared/models/user.model';
import { Customer } from 'src/app/shared/models/customer.model';
import { getCustomers } from 'src/app/customers/store/selectors/customers.selectors';
import { Role } from 'src/app/core/enums/roles';
import { Socket } from 'ngx-socket-io';
import { UserService } from './../../../core/services/user/user.service';
import { updateUser} from '../../../admin/store/actions/users.actions';
import { take, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss']
})
export class NotificationsComponent implements OnInit, OnDestroy {
  destroySubject$: Subject<any> = new Subject();
  @ViewChild(FormGroupDirective) formDirective: FormGroupDirective;
  notificationsForm: FormGroup;
  notificationReceiverType: typeof NotificationReceiverType = NotificationReceiverType;
  notificationType: typeof NotificationType = NotificationType;

  defaultNotificationType = this.notificationReceiverType.EMPLOYEE;

  customers$: Observable<Customer[]>;
  users$: Observable<User[]>;
  roles: typeof Role = Role;

  constructor(private fb: FormBuilder, private store: Store<State>, private socket: Socket, private userService: UserService) { }

  ngOnInit(): void {
    this.notificationsForm = this.fb.group({
      receiverType: ['', [RequiredValidator.required]],
      receivers: ['', [Validators.required]],
      notificationType: [''],
      message: ['', [RequiredValidator.required]]
    });


    this.customers$ = this.store.select(getCustomers);
    this.users$ = this.store.select(getUsers);
  }

  get receiverType() {
    return this.notificationsForm.get('receiverType');
  }

  get receivers() {
    return this.notificationsForm.get('receivers');
  }

  onSubmit() {
    const user = JSON.parse(localStorage.getItem('user'));
    const data = {
      ...this.notificationsForm.value,
      sender: user.uid,
      date: new Date().toString(),
      id: Math.random().toString(16).slice(2),
      readed: false
    }

    this.socket.emit('sendNotifications', data, callback => () => {} );

    for (let receiver of this.receivers.value) {
      this.store.select(getUser, receiver).pipe(
        takeUntil(this.destroySubject$),
        take(1),
      ).subscribe(user => {
        const u = {
          ...user,
          notifications: user.notifications ? [...user.notifications, data] : data,
          notificationsCounter: user.notificationsCounter + 1
        }

        this.store.dispatch(updateUser({ user : u, alert: false }))
      });
    }

    this.formDirective.resetForm();
  }

  changeReceiverType() {
    if ( this.receivers.value ) {
      this.receivers.setValue(null);
      this.receivers.markAsUntouched();

      // this.receivers.clearValidators();
      // this.receivers.updateValueAndValidity();
    }
  }

  ngOnDestroy() {
    this.destroySubject$.next();
    this.destroySubject$.complete();
  }
}
