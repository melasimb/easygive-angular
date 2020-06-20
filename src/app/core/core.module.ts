import {NgModule} from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule} from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import {MatButtonModule, MatDialogModule, MatInputModule} from '@angular/material';

import {HttpService} from './http.service';
import {TokensService} from './tokens.service';

import {LoginDialogComponent} from './login/login-dialog.component';

@NgModule({
  imports: [
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    MatDialogModule,
    MatInputModule,
    MatButtonModule
  ],
  declarations: [
    LoginDialogComponent
  ],
  exports: [
    LoginDialogComponent
  ],
  entryComponents: [
    LoginDialogComponent
  ],
  providers: [
    HttpService,
    TokensService
  ]
})
export class CoreModule {
}
