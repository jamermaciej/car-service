import { User } from '../../../shared/models/user.model';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { auth } from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private af: AngularFireAuth, private router: Router) { }

  async signInWithGoogle() {
    const provider = new auth.GoogleAuthProvider();
    provider.addScope('profile');
    provider.addScope('email');
    const user = await this.af.signInWithPopup(provider);
    this.router.navigate(['']);
    console.log(user);
  }

  register(userData: User) {
    const { name, email, password } = userData;

    this.af.createUserWithEmailAndPassword(email, password).then((user) => {
      console.log(user);
      this.router.navigate(['/login']);
    });
  }
}
