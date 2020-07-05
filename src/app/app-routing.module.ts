import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {WelcomeComponent} from './welcome.component';
import {HomeComponent} from './home/home.component';
import {LotsCreationComponent} from './home/lots/lots-creation.component';
import {LotsListComponent} from './home/lots/lots-list.component';
import {LotsReadComponent} from './home/lots/lots-read.component';
import {ProfileComponent} from './home/profile/profile.component';


const routes: Routes = [
  {path: '', pathMatch: 'full', redirectTo: 'welcome'},
  {path: 'welcome', component: WelcomeComponent},
  {
    path: 'home', component: HomeComponent,
    children: [
      {path: 'lots-creation', component: LotsCreationComponent},
      {path: 'lots-list/:category', component: LotsListComponent},
      {path: 'lots-read/:id', component: LotsReadComponent},
      {path: 'profile', component: ProfileComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
