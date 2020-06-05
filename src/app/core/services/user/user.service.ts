import { User } from '../../../shared/models/user.model';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private af: AngularFireAuth, private router: Router) { }

  register(userData: User) {
    const { name, email, password } = userData;

    this.af.createUserWithEmailAndPassword(email, password).then((user) => {
      console.log(user);
      this.router.navigate(['/login']);
    }
    );
  }
}
