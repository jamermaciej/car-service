import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { MenuListItemComponent } from './menu-list-item.component';
import { TranslocoModule } from '@ngneat/transloco';
import { RouterTestingModule } from '@angular/router/testing';
import { LocalizeRouterModule } from '@penleychan/ngx-transloco-router';
import { SidenavService } from '../../services/sidenav/sidenav.service';

describe('MenuListItemComponent', () => {
  let component: MenuListItemComponent;
  let fixture: ComponentFixture<MenuListItemComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ MenuListItemComponent ],
      imports: [
        TranslocoModule,
        RouterTestingModule,
        LocalizeRouterModule
      ],
      providers: [ provideMockStore({}), SidenavService ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuListItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
