import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { TranslocoModule } from '@ngneat/transloco';
import { LangComponent } from './lang.component';
import { LocalizeRouterModule } from '@penleychan/ngx-transloco-router';
import { RouterTestingModule } from '@angular/router/testing';

describe('LangComponent', () => {
  let component: LangComponent;
  let fixture: ComponentFixture<LangComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ LangComponent ],
      imports: [ LocalizeRouterModule, TranslocoModule, RouterTestingModule ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LangComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
