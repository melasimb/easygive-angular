import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatSnackBar} from '@angular/material';
import {TokensService} from '../tokens.service';
import {Router} from '@angular/router';
import {User} from '../user.model';
import {map} from 'rxjs/operators';
import {FormControl, Validators} from '@angular/forms';

@Component({
  templateUrl: 'register-dialog.component.html',
  styleUrls: ['register-dialog.component.css']
})
export class RegisterDialogComponent {
  user: User = {
    username: null,
    location: null,
    email: null,
    password: null
  };
  repeatPassword = null;
  errorPassword = false;
  homeUrl: string;
  usernameFormControl = new FormControl('', [Validators.required]);
  locationFormControl = new FormControl('', [Validators.required]);
  emailFormControl = new FormControl('', [Validators.email]);

  constructor(@Inject(MAT_DIALOG_DATA) data: any, private tokensService: TokensService, private snackBar: MatSnackBar,
              private router: Router, private dialog: MatDialog) {
    this.homeUrl = data.homeUrl;
  }

  register() {
    if (this.differentPassword() === false) {
      this.tokensService.register(this.user).pipe(
        map(() => {
          this.tokensService.login(this.user.username, this.user.password).subscribe(
            () => {
              this.router.navigate([this.homeUrl]);
              this.dialog.closeAll();
            }
          );
        })
      ).subscribe();
    }
  }

  getErrorMessageUsername() {
    return this.usernameFormControl.hasError('required') ? 'You must enter a value' : '';
  }

  getErrorMessageLocation() {
    return this.locationFormControl.hasError('required') ? 'You must enter a value' : '';
  }

  getErrorMessageEmail() {
    return this.emailFormControl.hasError('email') ? 'Not a valid email' : '';
  }

  differentPassword(): boolean {
    if (this.user.password !== this.repeatPassword) {
      this.errorPassword = true;
    } else {
      this.errorPassword = false;
    }
    return this.errorPassword;
  }

  invalidUser(): boolean {
    return this.usernameFormControl.hasError('required') || this.locationFormControl.hasError('required') ||
      this.emailFormControl.hasError('email');
  }
}
