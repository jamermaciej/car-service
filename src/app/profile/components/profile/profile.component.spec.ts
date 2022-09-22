import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { ProfileComponent } from './profile.component';
import { ReactiveFormsModule } from '@angular/forms';
import { TranslocoModule } from '@ngneat/transloco';
import { AngularFireModule } from '@angular/fire/compat';
import { environment } from 'src/environments/environment';
import { RouterTestingModule } from '@angular/router/testing';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { DebugElement } from '@angular/core';
import { UserService } from 'src/app/core/services/user/user.service';
import { of } from 'rxjs';

const dummyUser = {
  createdAt: "Sun, 28 Feb 2021 16:07:50 GMT",
  displayName: "Maciej Jamer",
  email: "maciek77jamer@gmail.com",
  emailVerified: true,
  lastLoginAt: "Tue, 02 Aug 2022 12:24:19 GMT",
  phoneNumber: "512183547",
  photoURL: "https://firebasestorage.googleapis.com/v0/b/car-service-59cb1.appspot.com/o/uploads%2FBez%20nazwy-1.jpg?alt=media&token=bea88ea4-3fc0-4828-9b29-e1cac1151f7a",
  roles: [ "Admin" ],
  uid: "4i2fpRIdlVUXw14D1SExhDgmX8F3"
}

const dummyUsers = [{
  createdAt: "Sun, 28 Feb 2021 16:07:50 GMT",
  displayName: "Maciej Jamer",
  email: "maciek77jamer@gmail.com",
  emailVerified: true,
  lastLoginAt: "Tue, 02 Aug 2022 12:24:19 GMT",
  phoneNumber: "512183547",
  photoURL: "https://firebasestorage.googleapis.com/v0/b/car-service-59cb1.appspot.com/o/uploads%2FBez%20nazwy-1.jpg?alt=media&token=bea88ea4-3fc0-4828-9b29-e1cac1151f7a",
  roles: [ "Admin" ],
  uid: "4i2fpRIdlVUXw14D1SExhDgmX8F3"
}]

describe('ProfileComponent', () => {
  let component: ProfileComponent;
  let fixture: ComponentFixture<ProfileComponent>;
  let el: DebugElement;
  let userService: UserService;

  beforeEach(waitForAsync(() => {
    const userServiceSpy = jasmine.createSpyObj<UserService>('UserService', ['getUsersData']);
    userServiceSpy.getUsersData.and.returnValue(of(dummyUsers))

    TestBed.configureTestingModule({
      declarations: [ ProfileComponent ],
      imports: [
        TranslocoModule,
        RouterTestingModule,
        ReactiveFormsModule,
        AngularFireModule.initializeApp(environment.firebase),
        MatSnackBarModule,
        MatDialogModule
      ],
      providers: [ { provide: UserService, useValue: userServiceSpy }, provideMockStore({}), { provide: MatDialogRef, useValue: {} } ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileComponent);
    component = fixture.componentInstance;
    el = fixture.debugElement;
    userService = TestBed.inject(UserService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have users', () => {
    expect(component.users.length).toBe(1);
  });

});
