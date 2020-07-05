import {Component, Inject} from '@angular/core';
import {UserCredential} from '../shared/users/user-credential.model';
import {MAT_DIALOG_DATA, MatSnackBar} from '@angular/material';
import {UserService} from '../shared/users/user.service';
import {TokensService} from '../../core/tokens.service';
import {FormControl, Validators} from '@angular/forms';

@Component({
  templateUrl: 'profile-dialog.component.html',
  styleUrls: ['profile-dialog.component.css']
})
export class ProfileDialogComponent {
  userCredential: UserCredential = {
    password: null
  };
  repeatPassword: string = null;
  username: string = null;
  passwordFormControl = new FormControl('', [Validators.required]);

  constructor(@Inject(MAT_DIALOG_DATA) data: any, private userService: UserService, private tokensService: TokensService,
              private message: MatSnackBar) {
    this.username = data.username;
  }

  updatePassword() {
    this.userService.updatePassword(this.username, this.userCredential).subscribe(
      () => this.tokensService.logout()
      , () => {}
      , () => this.message.open('Password has been updated correctly. Please log in again', null, {duration: 4000})
    );
  }

  differentPassword(): boolean {
    return this.userCredential.password !== this.repeatPassword || this.passwordFormControl.hasError('required');
  }
}
