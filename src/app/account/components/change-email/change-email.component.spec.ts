import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { TranslocoTestingModule } from '@ngneat/transloco';
import { provideMockStore } from '@ngrx/store/testing';

import { ChangeEmailComponent } from './change-email.component';

describe('ChangeEmailComponent', () => {
  let component: ChangeEmailComponent;
  let fixture: ComponentFixture<ChangeEmailComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ChangeEmailComponent ],
      imports: [ ReactiveFormsModule, MatDialogModule, TranslocoTestingModule ],
      providers: [ provideMockStore({}), {provide: MatDialogRef, useValue: {}} ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangeEmailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
