import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Output,
} from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material';
import { Router } from '@angular/router';
import { DateTimeAdapter } from '@busacca/ng-pick-datetime';
import { TranslateService } from '@ngx-translate/core';
import { AuthService } from '../core/authentication/auth.service';
import { ConfigService } from '../core/config/config.service';
import { WindowService } from '../core/window/window.service';
import { SidenavService } from '../sidenav/services/sidenav.service';
import * as fromRoot from '../store';
import { PasswordDialogComponent } from '../user-area/components/password-dialog/password-dialog.component';
import { QrCodeDialogComponent } from '../user-area/components/qr-code-dialog/qr-code-dialog.component';
import { TwitterDialogComponent } from '../user-area/components/twitter-dialog/twitter-dialog.component';
import { UserAreaService } from '../user-area/services/user-area.service';
import { Store } from '@ngrx/store';

@Component({
  selector: 'public-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {
  selectableLangs: any[];
  flag: string;

  @Output() openCloseSidenavMobile = new EventEmitter<any>();

  constructor(
    public window: WindowService,
    public translate: TranslateService,
    public router: Router,
    public sidenav: SidenavService,
    public dialog: MatDialog,
    public dateTimeAdapter: DateTimeAdapter<any>,
    public userAreaService: UserAreaService,
    public auth: AuthService,
    private configService: ConfigService,
    private store: Store<fromRoot.State>,
  ) {
    this.selectableLangs = this.configService.getValues().langs;
    this.getFlag(this.translate.currentLang);
    this.dateTimeAdapter.setLocale(this.translate.currentLang);
  }

  openCloseSideNav(sidenavOpened: boolean): void {
    sidenavOpened ? this.sidenav.closeSideNav() : this.sidenav.openSideNav();
  }

  openCloseNavigationSideNav(): void {
    this.openCloseSidenavMobile.emit();
  }

  navigateTo(route: string): void {
    this.store.dispatch(fromRoot.go({ path: [route] }));
    this.openCloseSidenavMobile.emit();
  }

  changeLanguage(lang: string): void {
    this.translate.use(lang);
    this.dateTimeAdapter.setLocale(lang);
    this.getFlag(lang);
  }

  getFlag(lang: string): void {
    switch (lang) {
      case 'ca':
        this.flag = 'es';
        break;
      case 'en':
        this.flag = 'gb';
        break;
      case 'hi':
        this.flag = 'in';
        break;

      default:
        this.flag = lang;
        break;
    }
  }

  openLoginDialog(): void {
    this.userAreaService.openLoginDialog();
  }

  openResetDialog(): void {
    const dialogRef: MatDialogRef<PasswordDialogComponent> = this.dialog.open(
      PasswordDialogComponent,
      {
        width: this.window.responsiveWidth(),
      },
    );
    dialogRef.afterClosed().subscribe((content: any) => {
      // TODO: manage user input
    });
  }

  openTwitterDialog(): void {
    const dialogRef: MatDialogRef<TwitterDialogComponent> = this.dialog.open(
      TwitterDialogComponent,
      {
        width: this.window.responsiveWidth(),
      },
    );
    dialogRef.afterClosed().subscribe((content: any) => {
      // TODO: manage user input
    });
  }

  logout(): void {
    this.userAreaService.logout();
  }

  getQRCode(): void {
    const dialogRef: MatDialogRef<QrCodeDialogComponent> = this.dialog.open(
      QrCodeDialogComponent,
      {},
    );
  }
}
