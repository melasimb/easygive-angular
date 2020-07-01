import {Component} from '@angular/core';
import {MatDialog} from '@angular/material';
import {LoginDialogComponent} from './core/login/login-dialog.component';

@Component({
  templateUrl: 'welcome.component.html',
  styleUrls: ['welcome.component.css'],
})
export class WelcomeComponent {

  constructor(private dialog: MatDialog) {
  }

  login() {
    this.dialog.open(LoginDialogComponent,
      {
        data: {homeUrl: 'home/lots-list/food'}
      }
    );
  }
}
