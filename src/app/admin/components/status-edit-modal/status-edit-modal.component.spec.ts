import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StatusEditModalComponent } from './status-edit-modal.component';

describe('StatusEditModalComponent', () => {
  let component: StatusEditModalComponent;
  let fixture: ComponentFixture<StatusEditModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StatusEditModalComponent ]
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
