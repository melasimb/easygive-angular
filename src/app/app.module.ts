import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {AppComponents} from './app-components';
import {AppMaterialModule} from './app-material.module';
import {AppServices} from './app-services';
import {CoreModule} from './core/core.module';
import {FlexLayoutModule} from '@angular/flex-layout';

@NgModule({
  imports: [
    FlexLayoutModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AppMaterialModule,
    CoreModule
  ],
  declarations: [
    AppComponent,
    AppComponents.COMPONENTS,
    AppComponents.DIALOGS
  ],
  entryComponents: [
    AppComponents.DIALOGS
  ],
  providers: [
    AppServices.SERVICES
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
