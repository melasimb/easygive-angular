import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';

import {HttpService} from './http.service';
import {User} from './user.model';

@Injectable()
export class TokensService {

  static USER = '/users';
  static TOKEN = '/token';

  constructor(private httpService: HttpService) {
  }

  login(username: string, password: string): Observable<any> {
    return this.httpService.login(username, password, TokensService.USER + TokensService.TOKEN);
  }

  register(user: User): Observable<any> {
    return this.httpService.post(TokensService.USER, user);
  }

  logout() {
    return this.httpService.logout();
  }

  getUsername(): string {
    return this.httpService.getToken() ? this.httpService.getToken().username : undefined;
  }

  setUsername(username: string) {
    this.httpService.getToken().username = username;
  }
}
