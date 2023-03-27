import { AfterViewInit, Component, Inject, Input, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import * as fromRoot from '../../../store/reducers';
import { logout, refreshToken } from 'src/app/store/actions';
import { Subscription } from 'rxjs';
import { SessionTimerService } from '../../services/session-timer/session-timer.service';

@Component({
  selector: 'app-session-expiration-modal',
  templateUrl: './session-expiration-modal.component.html',
  styleUrls: ['./session-expiration-modal.component.scss']
})
export class SessionExpirationModalComponent implements OnInit, AfterViewInit {

  @Input() alertAt ? = 30;

  @ViewChild('sessionExpirationModal', { static: true }) sessionExpirationModal: TemplateRef<any>;
  private sessionExpirationModalRef: MatDialogRef<TemplateRef<any>>;

  expired = false;
  private sessionTimerSubscription!: Subscription;

  remainSeconds: number;

  constructor(public sessionTimerService: SessionTimerService, private store: Store<fromRoot.State>, public dialog: MatDialog) { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    if (!this.sessionTimerSubscription) {
      this.trackSessionTime();
    }
  }

  private trackSessionTime() {
    this.sessionTimerService.startTimer();
    this.expired = false;
    this.sessionTimerSubscription = this.sessionTimerService.remainSeconds$.subscribe(
      (t) => {
        this.remainSeconds = t;

        if (t === this.alertAt) {
          this.open();
        }
        if (t === 0) {
          this.expired = true;
          this.cleanUp();
          this.store.dispatch(logout());
        }
      }
    );
  }

  open() {
    this.sessionExpirationModalRef = this.dialog.open(this.sessionExpirationModal, { disableClose: true });
  }

  cleanUp() {
    this.sessionTimerService.stopTimer();
    if (this.sessionTimerSubscription) {
      this.sessionTimerSubscription.unsubscribe();
    }
  }

  ngOnDestroy(): void {
    if (this.sessionExpirationModalRef) {
      this.dialog.closeAll();
      this.cleanUp();
    }
  }

  extendSession() {
    this.store.dispatch(refreshToken());
    this.sessionExpirationModalRef.close();
    this.sessionTimerService.resetTimer();
  }

  logout() {
    this.store.dispatch(logout());
  }

}
