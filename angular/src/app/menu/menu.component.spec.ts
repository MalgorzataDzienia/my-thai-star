import { HttpClient, HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SidenavService } from '../sidenav/shared/sidenav.service';
import { MenuService } from './shared/menu.service';
import { SnackBarService } from '../core/snackService/snackService.service';
import { AuthService } from '../core/authentication/auth.service';
import { MenuComponent } from './menu.component';
import { MenuCardComponent } from './menu-card/menu-card.component';
import { CoreModule } from '../core/core.module';
import { FormsModule } from '@angular/forms';

describe('MenuComponent', () => {
  let component: MenuComponent;
  let fixture: ComponentFixture<MenuComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        MenuComponent,
        MenuCardComponent,
      ],
      providers: [
        SidenavService,
        MenuService,
        SnackBarService,
        AuthService,
        HttpClient,
      ],
      imports: [
        BrowserAnimationsModule,
        CoreModule,
        HttpClientModule,
        FormsModule,
      ],
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
