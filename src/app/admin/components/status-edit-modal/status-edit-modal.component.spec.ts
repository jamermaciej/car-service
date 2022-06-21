import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TranslocoTestingModule } from '@ngneat/transloco';
import { provideMockStore } from '@ngrx/store/testing';
import { StatusEditModalComponent } from './status-edit-modal.component';

describe('StatusEditModalComponent', () => {
  let component: StatusEditModalComponent;
  let fixture: ComponentFixture<StatusEditModalComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ StatusEditModalComponent ],
      imports: [ MatDialogModule, TranslocoTestingModule ],
      providers: [ provideMockStore({}), { provide: MAT_DIALOG_DATA, useValue: {}}, { provide: MatDialogRef, useValue: {} } ]
    })
    .compileComponents();
  }));
 
  beforeEach(() => {
    fixture = TestBed.createComponent(StatusEditModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
