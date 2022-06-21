import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { AngularFireModule } from '@angular/fire/compat';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { RouterTestingModule } from '@angular/router/testing';
import { TranslocoModule } from '@ngneat/transloco';
import { provideMockStore } from '@ngrx/store/testing';
import { environment } from 'src/environments/environment';

import { EditPhotoComponent } from './edit-photo.component';

describe('EditPhotoComponent', () => {
  let component: EditPhotoComponent;
  let fixture: ComponentFixture<EditPhotoComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ EditPhotoComponent ],
      imports: [
        // ReactiveFormsModule,
        // FormsModule,
        AngularFireModule.initializeApp(environment.firebase),
        RouterTestingModule,
        MatSnackBarModule,
        TranslocoModule,
        MatDialogModule
      ],
      providers: [ provideMockStore({ }), { provide: MAT_DIALOG_DATA, useValue: {}}, { provide: MatDialogRef, useValue: {} }]

    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditPhotoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
