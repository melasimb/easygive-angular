import {WelcomeComponent} from './welcome.component';
import {HomeComponent} from './home/home.component';
import {LotsCreationComponent} from './home/lots/lots-creation.component';
import {LotsListComponent} from './home/lots/lots-list.component';
import {LotsReadComponent} from './home/lots/lots-read.component';

export class AppComponents {
  static COMPONENTS = [
    WelcomeComponent,
    HomeComponent,
    LotsCreationComponent,
    LotsListComponent,
    LotsReadComponent
  ];
  static DIALOGS = [
  ];
}
