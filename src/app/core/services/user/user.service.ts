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

@Injectable({
  providedIn: 'root'
})
export class UserService {
  user$: Observable<User>;

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
          phoneNumber: user.photoURL,
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
        phoneNumber: user.photoURL,
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

      const successMessage = this.translocoService.translate('forgot_password.message.succes.send', { email });
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
      const successMessage = this.translocoService.translate('forgot_password.message.succes.update');
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
      const successMessage = this.translocoService.translate('confirm_email.message.success');
      this.snackBar.open(successMessage, '', {
        duration: 2000,
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
