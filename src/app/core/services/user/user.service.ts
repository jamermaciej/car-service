import { RegisterData } from './../../../shared/models/register-data.model';
import { AngularFirestoreDocument, AngularFirestore } from '@angular/fire/firestore';
import { User } from '../../../shared/models/user.model';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { auth } from 'firebase';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  user$: Observable<User>;

  constructor(private af: AngularFireAuth, private afs: AngularFirestore, private router: Router) {
    this.user$ = this.af.authState.pipe(
      switchMap(user => {
        if (user) {
          return this.afs.doc<User>(`users/${user.uid}`).valueChanges();
        } else {
          return of(null);
        }
    }));
  }

  async signInWithGoogle() {
    const provider = new auth.GoogleAuthProvider();
    provider.addScope('profile');
    provider.addScope('email');
    const user = await this.af.signInWithPopup(provider);
    this.router.navigate(['/dashboard']);
    console.log(user);
  }

  async register(registerData: RegisterData) {
    const { name, email, password } = registerData;
    const user = (await this.af.createUserWithEmailAndPassword(email, password)).user;
    const userRef: AngularFirestoreDocument<User> = this.afs.doc(`users/${user.uid}`);

    const data = {
      uid: user.uid,
      email: user.email,
      displayName: name || user.displayName,
      photoURL: user.photoURL,
      emailVerified: user.emailVerified,
      phoneNumber: user.photoURL,
      createdAt: user.metadata.creationTime,
      lastLoginAt: user.metadata.lastSignInTime
    };

    userRef.set(data, { merge: true });

    this.sendEmailVerification();

    this.router.navigate(['/dashboard']);
  }

  async login(email: string, password: string) {
    const user = await this.af.signInWithEmailAndPassword(email, password);
    this.router.navigate(['/dashboard']);
  }

  async sendEmailVerification() {
    (await this.af.currentUser).sendEmailVerification();
  }

  async sendPasswordResetEmail(email: string) {
    await this.af.sendPasswordResetEmail(email);
    this.router.navigate(['login']);
  }

  async updatePassword(code: string, password: string) {
    await this.af.confirmPasswordReset(code, password);
    this.router.navigate(['login']);
  }

  async confirmEmail(code: string) {
    try {
      await this.af.applyActionCode(code);
    } catch (error) {
      console.error(error.message);
    }
  }

  async signOut() {
    this.af.signOut();
    this.router.navigate(['login']);
  }
}
