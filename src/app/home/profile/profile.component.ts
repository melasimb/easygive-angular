import {Component} from '@angular/core';
import {User} from '../../core/user.model';
import {TokensService} from '../../core/tokens.service';
import {UserService} from '../shared/users/user.service';
import {FormControl, Validators} from '@angular/forms';
import {MatDialog, MatSnackBar} from '@angular/material';
import {ProfileDialogComponent} from './profile-dialog.component';

@Component({
  templateUrl: 'profile.component.html',
  styleUrls: ['profile.component.css']
})

export class ProfileComponent {
  user: User = null;
  username: string = null;
  usernameFormControl = new FormControl('', [Validators.required]);
  locationFormControl = new FormControl('', [Validators.required]);
  mobileFormControl = new FormControl('', [Validators.required]);
  emailFormControl = new FormControl('', [Validators.email]);

  constructor(private userService: UserService, private tokensService: TokensService, private dialog: MatDialog,
              private message: MatSnackBar) {
    this.username = this.tokensService.getUsername();
    this.userService.read(this.username).subscribe(
      user => this.user = user
    );
  }

  getErrorMessageUsername() {
    return this.usernameFormControl.hasError('required') ? 'Please, enter a username' : '';
  }

  getErrorMessageLocation() {
    return this.locationFormControl.hasError('required') ? 'Please, enter a message' : '';
  }

  getErrorMessageMobile() {
    return this.mobileFormControl.hasError('required') ? 'Please, enter a mobile' : '';
  }

  getErrorMessageEmail() {
    return this.emailFormControl.hasError('email') ? 'Not a valid email' : '';
  }

  invalidUser(): boolean {
    return this.usernameFormControl.hasError('required') || this.locationFormControl.hasError('required') ||
      this.mobileFormControl.hasError('required') || this.emailFormControl.hasError('email');
  }

  update() {
    this.userService.update(this.username, this.user).subscribe(
      () => this.tokensService.setUsername(this.user.username)
      , () => {}
      , () => this.message.open('Personal information has been updated correctly', null, {duration: 4000})
    );
  }

  updatePassword() {
    this.dialog.open(ProfileDialogComponent,
      {
        data: {username: this.username}
      }
    );
  }
}
