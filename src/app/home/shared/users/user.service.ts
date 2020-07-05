import {Injectable} from '@angular/core';
import {HttpService} from '../../../core/http.service';
import {Observable} from 'rxjs';
import {User} from '../../../core/user.model';
import {AppEndpoints} from '../../../app-endpoints';
import {UserCredential} from './user-credential.model';

@Injectable()
export class UserService {

  constructor(private httpService: HttpService) {
  }

  read(username: string): Observable<User> {
    return this.httpService.get(AppEndpoints.USERS + '/' + username);
  }

  update(username: string, user: User): Observable<User> {
    return this.httpService.put(AppEndpoints.USERS + '/' + username, user);
  }

  updatePassword(username: string, userCredential: UserCredential): Observable<User> {
    return this.httpService.patch(AppEndpoints.USERS + '/' + 'password' + '/' + username, userCredential);
  }
}
