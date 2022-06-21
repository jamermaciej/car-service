import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { AngularFireModule } from '@angular/fire/compat';
import { SidebarComponent } from './sidebar.component';
import { environment } from 'src/environments/environment';
import { provideMockStore } from '@ngrx/store/testing';
import { TranslocoModule } from '@ngneat/transloco';
import { RouterTestingModule } from '@angular/router/testing';
import { MatSnackBarModule } from '@angular/material/snack-bar';

describe('SidebarComponent', () => {
  let component: SidebarComponent;
  let fixture: ComponentFixture<SidebarComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ SidebarComponent ],
      imports: [ AngularFireModule.initializeApp(environment.firebase), RouterTestingModule, TranslocoModule, MatSnackBarModule ],
      providers: [ provideMockStore({}) ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
