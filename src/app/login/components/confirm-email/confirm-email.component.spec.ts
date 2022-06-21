import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ConfirmEmailComponent } from './confirm-email.component';
import { provideMockStore } from '@ngrx/store/testing';
import { TranslocoModule } from '@ngneat/transloco';
import { AngularFireModule } from '@angular/fire/compat';
import { environment } from 'src/environments/environment';
import { MatSnackBarModule } from '@angular/material/snack-bar';

describe('ConfirmEmailComponent', () => {
  let component: ConfirmEmailComponent;
  let fixture: ComponentFixture<ConfirmEmailComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfirmEmailComponent ],
      imports: [
        TranslocoModule,
        RouterTestingModule,
        AngularFireModule.initializeApp(environment.firebase),
        MatSnackBarModule
      ],
      providers: [ provideMockStore({}) ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmEmailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
