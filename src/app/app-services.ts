import {LotService} from './home/shared/lots/lot.service';
import {UserService} from './home/shared/users/user.service';

export class AppServices {
  public static SERVICES = [
    LotService,
    UserService
  ];
}
