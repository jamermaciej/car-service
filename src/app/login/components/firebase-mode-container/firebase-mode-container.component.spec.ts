import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { FirebaseModeContainerComponent } from './firebase-mode-container.component';

describe('FirebaseModeContainerComponent', () => {
  let component: FirebaseModeContainerComponent;
  let fixture: ComponentFixture<FirebaseModeContainerComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ FirebaseModeContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FirebaseModeContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
