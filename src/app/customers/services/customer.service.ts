import { Store } from '@ngrx/store';
import { TranslocoService } from '@ngneat/transloco';
import { AngularFirestoreDocument, AngularFirestore } from '@angular/fire/firestore';
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
export class CustomerService {
  customer$: Observable<any>;

  constructor(private af: AngularFireAuth,
              private afs: AngularFirestore,
              private router: Router,
              private snackBar: MatSnackBar,
              private translocoService: TranslocoService) {

  }

  public addCustomer(data) {
    return this.afs.collection(`customers`).add(data);
  }

//   public getUsersData() {
//     return this.afs.collection<User>(`users`).valueChanges();
//   }

//   public getUserData(uid: string) {
//     return this.afs.collection<User>('users').doc(uid).valueChanges();
//   }

//   public setUserData(user: User) {
//     return this.afs.doc(`users/${user.uid}`).set(user);
//   }

//   public async updateUserData(user: User) {
//     try {
//       await this.afs.doc(`users/${user.uid}`).update(user);
//     } catch (error) {
//       throw error;
//     }
//   }

//   public deleteUserData(uid: string) {
//     return this.afs.doc(`users/${uid}`).delete();
//   }
}
