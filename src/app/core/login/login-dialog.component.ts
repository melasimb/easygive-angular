import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog} from '@angular/material';
import {TokensService} from '../tokens.service';
import {Router} from '@angular/router';
import {RegisterDialogComponent} from '../register/register-dialog.component';

@Component({
  templateUrl: 'login-dialog.component.html',
  styleUrls: ['login-dialog.component.css']
})
export class LoginDialogComponent {
  username: string;
  password: string;
  homeUrl: string;

  constructor(@Inject(MAT_DIALOG_DATA) data: any, private tokensService: TokensService, private router: Router, private dialog: MatDialog) {
    this.homeUrl = data.homeUrl;
  }

  login() {
    this.tokensService.login(this.username, this.password).subscribe(
      () => {
        this.router.navigate([this.homeUrl]);
      }
    );
  }

  register() {
    this.dialog.open(RegisterDialogComponent,
      {
        data: {homeUrl: this.homeUrl}
      }
    );
  }
}
