import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { provideMockStore } from '@ngrx/store/testing';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { StatusesComponent } from './statuses.component';
import { TranslocoModule } from '@ngneat/transloco';

describe('StatusesComponent', () => {
  let component: StatusesComponent;
  let fixture: ComponentFixture<StatusesComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ StatusesComponent ],
      imports: [ ReactiveFormsModule, FormsModule, MatDialogModule, TranslocoModule ],
      providers: [ provideMockStore({}),  { provide: MatDialogRef, useValue: {} } ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StatusesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
