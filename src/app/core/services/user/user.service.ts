import { TranslocoService } from '@ngneat/transloco';
import { Roles } from './../../enums/roles';
import { FlowRoutes } from './../../enums/flow';
import { FirebaseErrors } from './../firebase-errors/firebase-errors.service';
import { RegisterData } from './../../../shared/models/register-data.model';
import { AngularFirestoreDocument, AngularFirestore } from '@angular/fire/firestore';
import { User } from '../../../shared/models/user.model';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { auth } from 'firebase';
import { Observable, of } from 'rxjs';
import { switchMap, take } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';
import * as firebase from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  user$: Observable<User>;
  userFirebase: firebase.User;

  constructor(private af: AngularFireAuth,
              private afs: AngularFirestore,
              private router: Router,
              private snackBar: MatSnackBar,
              private translocoService: TranslocoService) {
    this.user$ = this.af.authState.pipe(
      switchMap(user => {
        if (user) {
          return this.afs.doc<User>(`users/${user.uid}`).valueChanges();
        } else {
          return of(null);
        }
    }));
    this.af.authState.pipe(take(1)).subscribe(user => {
      if (user) {
        this.userFirebase = user;
        this.updateUser(user);
      }
    });
  }

  updateUser(user: firebase.User) {
    const userRef: AngularFirestoreDocument<User> = this.afs.doc(`users/${user.uid}`);
    userRef.ref.get().then(value => {
      if (value.exists) {
        const data: User = {
          uid: user.uid,
          email: user.email,
          displayName: user.displayName || value.get('displayName'),
          photoURL: user.photoURL,
          emailVerified: user.emailVerified,
          phoneNumber: user.phoneNumber || value.get('phoneNumber'),
          createdAt: user.metadata.creationTime,
          lastLoginAt: user.metadata.lastSignInTime,
          roles: value.get('roles')
        };
        this.updateUserData(data);
      }
    });
  }

  async signInWithGoogle() {
    const provider = new auth.GoogleAuthProvider();
    provider.addScope('profile');
    provider.addScope('email');
    const user = await this.af.signInWithPopup(provider);
    this.router.navigate([FlowRoutes.DASHBOARD]);
  }

  async register(registerData: RegisterData) {
    try {
      const { name, email, password } = registerData;
      const user = (await this.af.createUserWithEmailAndPassword(email, password)).user;
      localStorage.setItem('user', JSON.stringify(user));
      const userRef: AngularFirestoreDocument<User> = this.afs.doc(`users/${user.uid}`);

      const data = {
        uid: user.uid,
        email: user.email,
        displayName: name || user.displayName,
        photoURL: user.photoURL,
        emailVerified: user.emailVerified,
        phoneNumber: user.phoneNumber,
        createdAt: user.metadata.creationTime,
        lastLoginAt: user.metadata.lastSignInTime,
        roles: [Roles.CUSTOMER]
      };

      userRef.set(data, { merge: true });

      this.sendEmailVerification();

      this.router.navigate([FlowRoutes.DASHBOARD]);

      const successMessage = this.translocoService.translate('register.message.success');
      this.snackBar.open(successMessage, '', {
        duration: 15000,
        panelClass: 'success'
      });
    } catch (error) {
      const errorKey = FirebaseErrors.Parse(error.code);
      const errorMessage = this.translocoService.translate(errorKey);
      console.log(errorMessage);
      this.snackBar.open(errorMessage, '', {
        duration: 2000,
        panelClass: 'error'
      });
    }
  }

  async login(email: string, password: string) {
    try {
      const user = (await this.af.signInWithEmailAndPassword(email, password)).user;
      localStorage.setItem('user', JSON.stringify(user));
      this.updateUser(user);
      this.router.navigate([FlowRoutes.DASHBOARD]);
    } catch (error) {
      const errorKey = FirebaseErrors.Parse(error.code);
      const errorMessage = this.translocoService.translate(errorKey);
      this.snackBar.open(errorMessage, '', {
        duration: 2000,
        panelClass: 'error'
      });
    }
  }

  async deleteAccount(password: string) {
    // Refreshes the authentication
    try {
      await this.refresh(password);
      this.userFirebase.delete();
      this.deleteUserData(this.userFirebase.uid);
      localStorage.removeItem('user');
      this.router.navigate([FlowRoutes.LOGIN]);
      const successMessage = this.translocoService.translate('konto usuniete');
      this.snackBar.open(successMessage, '', {
        duration: 15000,
        panelClass: 'success'
      });
    } catch (error) {
      const errorKey = FirebaseErrors.Parse(error.code);
      const errorMessage = this.translocoService.translate(errorKey);
      this.snackBar.open(errorMessage, '', {
        duration: 2000,
        panelClass: 'error'
      });
    }
  }

  async refresh(password: string): Promise<firebase.User> {
    // Gets fresh credentials for the current user
    const { email } = this.userFirebase;
    const credential = firebase.auth.EmailAuthProvider.credential(email, password);
    // Re-authenticate the user with the fresh credentials
    const cred = await this.userFirebase.reauthenticateWithCredential(credential);
    return cred.user;
  }

  async updateEmail(password: string, email: string) {
    try {
      await this.userFirebase.updateEmail(email);
      const user = {
        ...this.userFirebase,
        email
      };
      this.updateUser(user);

      this.router.navigate([FlowRoutes.LOGIN]);
      const successMessage = this.translocoService.translate('email zapdejtowany');
      this.snackBar.open(successMessage, '', {
        duration: 15000,
        panelClass: 'success'
      });
    } catch (error) {
      const errorKey = FirebaseErrors.Parse(error.code);
      const errorMessage = this.translocoService.translate(errorKey);
      this.snackBar.open(errorMessage, '', {
        duration: 2000,
        panelClass: 'error'
      });
    }
  }

  async changePassword(password: string) {
    try {
      await this.userFirebase.updatePassword(password);

      const successMessage = this.translocoService.translate('haslo zapdejtowany');
      this.snackBar.open(successMessage, '', {
        duration: 15000,
        panelClass: 'success'
      });
    } catch (error) {
      const errorKey = FirebaseErrors.Parse(error.code);
      const errorMessage = this.translocoService.translate(errorKey);
      this.snackBar.open(errorMessage, '', {
        duration: 2000,
        panelClass: 'error'
      });
    }
  }

  async sendEmailVerification() {
    try {
      (await this.af.currentUser).sendEmailVerification();
    } catch (error) {
      const errorKey = FirebaseErrors.Parse(error.code);
      const errorMessage = this.translocoService.translate(errorKey);
      this.snackBar.open(errorMessage, '', {
        duration: 2000,
        panelClass: 'error'
      });
    }
  }

  async sendPasswordResetEmail(email: string) {
    try {
      await this.af.sendPasswordResetEmail(email);
      this.router.navigate([FlowRoutes.LOGIN]);

      const successMessage = this.translocoService.translate('forgot_password.message.success.send', { email });
      this.snackBar.open(successMessage, '', {
        duration: 15000,
        panelClass: 'success'
      });
    } catch (error) {
      const errorKey = FirebaseErrors.Parse(error.code);
      const errorMessage = this.translocoService.translate(errorKey);
      this.snackBar.open(errorMessage, '', {
        duration: 2000,
        panelClass: 'error'
      });
    }
  }

  async updatePassword(code: string, password: string) {
    try {
      await this.af.confirmPasswordReset(code, password);
      this.router.navigate([FlowRoutes.LOGIN]);
      const successMessage = this.translocoService.translate('forgot_password.message.success.update');
      this.snackBar.open(successMessage, '', {
        duration: 15000,
        panelClass: 'success'
      });
    } catch (error) {
      const errorKey = FirebaseErrors.Parse(error.code);
      const errorMessage = this.translocoService.translate(errorKey);
      this.snackBar.open(errorMessage, '', {
        duration: 2000,
        panelClass: 'error'
      });
    }
  }

  async confirmEmail(code: string) {
    try {
      await this.af.applyActionCode(code);
      setTimeout(() => {
        const successMessage = this.translocoService.translate('confirm_email.message.success');
        this.snackBar.open(successMessage, '', {
          duration: 2000,
          panelClass: 'success'
        });
      }, 100);
    } catch (error) {
      const errorKey = FirebaseErrors.Parse(error.code);
      setTimeout(() => {
        const errorMessage = this.translocoService.translate(errorKey);
        this.snackBar.open(errorMessage, '', {
          duration: 2000,
          panelClass: 'error'
        });
      }, 100);
    }
    this.router.navigate([FlowRoutes.DASHBOARD]);
  }

  async signOut() {
    this.af.signOut();
    localStorage.removeItem('user');
    this.router.navigate([FlowRoutes.LOGIN]);
  }

  public getUsersData() {
    return this.afs.collection(`users`).valueChanges();
  }

  public getUserData(uid: string) {
    return this.afs.collection('users').doc(uid).valueChanges();
  }

  public setUserData(user: User) {
    return this.afs.doc(`users/${user.uid}`).set(user);
  }

  public updateUserData(user: User) {
    return this.afs.doc(`users/${user.uid}`).update(user);
  }

  public deleteUserData(uid: string) {
    return this.afs.doc(`users/${uid}`).delete();
  }
}
