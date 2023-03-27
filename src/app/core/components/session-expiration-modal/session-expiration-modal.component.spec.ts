import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SessionTimeoutModalComponent } from './session-expiration-modal.component';

describe('SessionTimeoutModalComponent', () => {
  let component: SessionTimeoutModalComponent;
  let fixture: ComponentFixture<SessionTimeoutModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SessionTimeoutModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SessionTimeoutModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
