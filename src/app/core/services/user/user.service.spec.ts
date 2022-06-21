import { TestBed } from '@angular/core/testing';
import { AngularFireModule } from '@angular/fire/compat';
import { environment } from 'src/environments/environment';
import { provideMockStore } from '@ngrx/store/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { TranslocoModule } from '@ngneat/transloco';
import { UserService } from './user.service';
import { MatSnackBarModule } from '@angular/material/snack-bar';

describe('UserService', () => {
  let service: UserService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ AngularFireModule.initializeApp(environment.firebase), RouterTestingModule, MatSnackBarModule, TranslocoModule ],
      providers: [ provideMockStore({}) ]
    });
    service = TestBed.inject(UserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
