import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { TranslocoModule } from '@ngneat/transloco';
import { AngularFireModule } from '@angular/fire/compat';
import { environment } from 'src/environments/environment';
import { RouterTestingModule } from '@angular/router/testing';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { LocalizeRouterModule } from '@penleychan/ngx-transloco-router';
import { DashboardComponent } from './dashboard.component';
import { provideMockStore } from '@ngrx/store/testing';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ DashboardComponent ],
      imports: [
        TranslocoModule,
        ReactiveFormsModule,
        AngularFireModule.initializeApp(environment.firebase),
        RouterTestingModule,
        MatSnackBarModule,
        LocalizeRouterModule
      ],
      providers: [ provideMockStore({}) ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
