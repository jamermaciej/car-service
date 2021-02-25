import { Store } from '@ngrx/store';
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

  async updateUser(user: firebase.User) {
    const userRef: AngularFirestoreDocument<User> = this.afs.doc(`users/${user.uid}`);
    const userData = await userRef.ref.get();

    let data: User;

    if (userData.exists) {
      data = {
        uid: user.uid,
        email: user.email,
        displayName: user.displayName || userData.get('displayName'),
        photoURL: user.photoURL,
        emailVerified: user.emailVerified,
        phoneNumber: user.phoneNumber || userData.get('phoneNumber'),
        createdAt: user.metadata.creationTime,
        lastLoginAt: user.metadata.lastSignInTime,
        roles: userData.get('roles')
      };
    }

    this.updateUserData(data);

    return data;
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

      return data;
    } catch (error) {
      throw error;
    }
  }

  async login(email: string, password: string) {
    try {
      const user = (await this.af.signInWithEmailAndPassword(email, password)).user;
      const userData = await this.updateUser(user);
      return userData;
    } catch (error) {
      throw error;
    }
  }

  async deleteAccount(password: string) {
    // Refreshes the authentication
    try {
      await this.refresh(password);
      this.userFirebase.delete();
      this.deleteUserData(this.userFirebase.uid);
    } catch (error) {
      throw error;
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
      await this.refresh(password);
      await this.userFirebase.updateEmail(email);
      const user = {
        ...this.userFirebase,
        email
      };
      const newUser = await this.updateUser(user);

      return newUser;
    } catch (error) {
      throw error;
    }
  }

  async changePassword(oldPassword: string, newPassword: string) {
    try {
      await this.refresh(oldPassword);
      await this.userFirebase.updatePassword(newPassword);
    } catch (error) {
      throw error;
    }
  }

  async sendEmailVerification() {
    try {
      (await this.af.currentUser).sendEmailVerification();
    } catch (error) {
      throw error;
    }
  }

  async sendPasswordResetEmail(email: string) {
    try {
      await this.af.sendPasswordResetEmail(email);
    } catch (error) {
      throw error;
    }
  }

  async updatePassword(code: string, password: string) {
    try {
      await this.af.confirmPasswordReset(code, password);
    } catch (error) {
      throw error;
    }
  }

  async confirmEmail(code: string) {
    try {
      await this.af.applyActionCode(code);
    } catch (error) {
      throw error;
    }
  }

  async signOut() {
    await this.af.signOut();
  }

  public getUsersData() {
    return this.afs.collection<User>(`users`).valueChanges();
  }

  public getUserData(uid: string) {
    return this.afs.collection<User>('users').doc(uid).valueChanges();
  }

  public setUserData(user: User) {
    return this.afs.doc(`users/${user.uid}`).set(user);
  }

  public async updateUserData(user: User) {
    try {
      await this.afs.doc(`users/${user.uid}`).update(user);
    } catch (error) {
      throw error;
    }
  }

  public deleteUserData(uid: string) {
    return this.afs.doc(`users/${uid}`).delete();
  }
}
