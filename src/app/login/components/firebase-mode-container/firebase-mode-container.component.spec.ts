import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FirebaseModeContainerComponent } from './firebase-mode-container.component';

describe('FirebaseModeContainerComponent', () => {
  let component: FirebaseModeContainerComponent;
  let fixture: ComponentFixture<FirebaseModeContainerComponent>;

  beforeEach(async(() => {
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
