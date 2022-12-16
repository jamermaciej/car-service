import { Component, Output, EventEmitter } from '@angular/core';
import { Store } from '@ngrx/store';
import { Socket } from 'ngx-socket-io';
// import { updateUser } from 'src/app/profile/store/actions/profile.actions';
import { updateUser } from 'src/app/admin/store/actions/users.actions';
import { getUser } from 'src/app/admin/store/selectors/users.selectors';
import { Notification, User } from 'src/app/shared/models/user.model';
import { logout } from 'src/app/store/actions';
// import { getUser } from 'src/app/store/selectors/auth.selectors';
import { AlertService } from '../../services/alert/alert-service';
import * as fromRoot from './../../../store/reducers';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  @Output() toolbarMenuToggle = new EventEmitter<boolean>();
  isMenuOpen = true;

  showNotifications = false;

  notifications: Notification[] = [];
  user: User;
  notificationsCounter: number;

  unreadedNotifications: number;

  constructor(private store: Store<fromRoot.State>, private socket: Socket, private alertService: AlertService) {

    this.socket.emit('connected', JSON.parse(localStorage.getItem('user')).uid, (err: unknown) => {
      if (err) {
        console.error(err);
      }
    });

    // this.store.select(getUser)
    this.store.select(getUser, JSON.parse(localStorage.getItem('user')).uid).subscribe(user => {
      this.user = user;
      // if ( user?.notifications.length ) {
        this.notifications = user?.notifications;
        this.unreadedNotifications = this.notifications?.filter(n => !n.readed).length;
        this.notificationsCounter = user?.notificationsCounter;
      // }
    })

    this.socket.on('message', (notification: Notification) => {
      this.notifications = this.notifications ? [...this.notifications, notification] : [notification];

      // this.alertService.showAlert(notification.message, notification.notificationType)

      const u = {
        ...this.user,
        notifications: [...this.user.notifications, notification]
      }

      console.log(u)

      //this.store.dispatch(updateUser({ user: u, alert: false }))
      
    });
  }

  toggleNotifications() {
    if ( !this.notifications.length ) return false;

    this.showNotifications = !this.showNotifications;

    if ( this.showNotifications ) {
      const u = {
        ...this.user,
        notificationsCounter: 0
      }
      
      this.store.dispatch(updateUser({ user: u, alert: false }))
    }
  }

  clikedOutside(): void {
    this.showNotifications = false;
  }

  markAsReaded(notification: Notification) {
    if ( !!!notification.readed ) {
      const u = {
        ...this.user,
        notifications: this.user.notifications.map(n => n.id === notification.id ? { ...n, readed: true } : n)
      }
      this.store.dispatch(updateUser({ user: u, alert: false }))
    }
  }

  deleteNotification(notification: Notification) {
    if ( !!notification.readed ) {
      const u = {
        ...this.user,
        notifications: this.user.notifications.filter(n => n.id != notification.id)
      }
      console.log(u)
      this.store.dispatch(updateUser({ user: u, alert: false }))
    }
  }

  onToolbarMenuToggle() {
    this.isMenuOpen = !this.isMenuOpen;
    this.toolbarMenuToggle.emit(this.isMenuOpen);
  }

  logout() {
    this.store.dispatch(logout());
  }
}
