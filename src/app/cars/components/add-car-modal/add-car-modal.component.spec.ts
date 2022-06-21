import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { AddCarModalComponent } from './add-car-modal.component';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TranslocoTestingModule } from '@ngneat/transloco';

describe('AddCarModalComponent', () => {
  let component: AddCarModalComponent;
  let fixture: ComponentFixture<AddCarModalComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AddCarModalComponent ],
      imports: [ MatDialogModule, TranslocoTestingModule ],
      providers: [ provideMockStore({}), { provide: MAT_DIALOG_DATA, useValue: {}}, { provide: MatDialogRef, useValue: {} } ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddCarModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
