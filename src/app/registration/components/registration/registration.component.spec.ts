import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { AngularFireModule } from '@angular/fire/compat';
import { ReactiveFormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { RouterTestingModule } from '@angular/router/testing';
import { TranslocoModule } from '@ngneat/transloco';
import { provideMockStore } from '@ngrx/store/testing';
import { LocalizeRouterModule } from '@penleychan/ngx-transloco-router';
import { environment } from 'src/environments/environment';

import { RegistrationComponent } from './registration.component';

describe('RegistrationComponent', () => {
  let component: RegistrationComponent;
  let fixture: ComponentFixture<RegistrationComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ RegistrationComponent ],
      imports: [
        TranslocoModule,
        ReactiveFormsModule,
        AngularFireModule.initializeApp(environment.firebase),
        RouterTestingModule,
        MatSnackBarModule,
        LocalizeRouterModule,
        MatCheckboxModule
      ],
      providers: [ provideMockStore({}) ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
