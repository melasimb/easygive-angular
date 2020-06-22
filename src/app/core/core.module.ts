import {NgModule} from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FlexLayoutModule} from '@angular/flex-layout';
import {BrowserModule} from '@angular/platform-browser';

import {MatButtonModule, MatDialogModule, MatInputModule} from '@angular/material';

import {HttpService} from './http.service';
import {TokensService} from './tokens.service';

import {LoginDialogComponent} from './login/login-dialog.component';
import {RegisterDialogComponent} from './register/register-dialog.component';

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    HttpClientModule,
    FormsModule,
    MatDialogModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule
  ],
  declarations: [
    LoginDialogComponent,
    RegisterDialogComponent
  ],
  exports: [
    LoginDialogComponent,
    RegisterDialogComponent
  ],
  entryComponents: [
    LoginDialogComponent,
    RegisterDialogComponent
  ],
  providers: [
    HttpService,
    TokensService
  ]
})
export class CoreModule {
}
