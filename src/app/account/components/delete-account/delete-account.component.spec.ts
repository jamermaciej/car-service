import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { provideMockStore } from '@ngrx/store/testing';
import { DeleteAccountComponent } from './delete-account.component';
import { AngularFireModule } from '@angular/fire/compat';
import { environment } from 'src/environments/environment';
import { RouterTestingModule } from '@angular/router/testing';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { TranslocoModule } from '@ngneat/transloco';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';

describe('DeleteAccountComponent', () => {
  let component: DeleteAccountComponent;
  let fixture: ComponentFixture<DeleteAccountComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ DeleteAccountComponent ],
      imports: [
        ReactiveFormsModule,
        FormsModule,
        AngularFireModule.initializeApp(environment.firebase),
        RouterTestingModule,
        MatSnackBarModule,
        TranslocoModule,
        MatDialogModule
      ],
      providers: [ provideMockStore({}), { provide: MatDialogRef, useValue: {} } ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteAccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
