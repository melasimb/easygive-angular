import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';

import {HttpService} from './http.service';

@Injectable()
export class TokensService {

  static END_POINT = '/users/token';

  constructor(private httpService: HttpService) {
  }

  login(username: string, password: string): Observable<any> {
    return this.httpService.login(username, password, TokensService.END_POINT);
  }

  logout() {
    return this.httpService.logout();
  }

  getUsername(): string {
    return this.httpService.getToken() ? this.httpService.getToken().username : undefined;
  }
}
