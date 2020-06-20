import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {EMPTY, Observable, throwError} from 'rxjs';
import {catchError, map} from 'rxjs/operators';
import {MatSnackBar} from '@angular/material';
import {Router} from '@angular/router';
import {JwtHelperService} from '@auth0/angular-jwt';

import {environment} from '../../environments/environment';
import {Token} from './token.model';
import {Error} from './error.model';

@Injectable()
export class HttpService {
  static API_END_POINT = environment.API;
  static UNAUTHORIZED = 401;
  static CONNECTION_REFUSE = 0;
  static NOT_FOUND = 404;

  private token: Token;
  private headers: HttpHeaders;
  private params: HttpParams;
  private responseType: string;
  private successfulNotification = undefined;

  constructor(private http: HttpClient, private snackBar: MatSnackBar, private router: Router) {
    this.resetOptions();
  }

  private resetOptions(): void {
    this.headers = new HttpHeaders();
    this.params = new HttpParams();
    this.responseType = 'json';
  }

  param(key: string, value: string): HttpService {
    this.params = this.params.append(key, value); // This class is immutable
    return this;
  }

  getToken(): Token {
    return this.token;
  }

  private handleError(response): any {
    let error: Error;
    if (response.status === HttpService.UNAUTHORIZED) {
      this.snackBar.open('Unauthorized', 'Error', {duration: 5000});
      this.logout();
      this.router.navigate(['']);
      return EMPTY;
    } else if (response.status === HttpService.CONNECTION_REFUSE) {
      this.snackBar.open('Connection Refuse', 'Error', {duration: 5000});
      return EMPTY;
    } else if (response.status === HttpService.NOT_FOUND) {
      error = {error: 'Not Found', message: '', path: ''};
      this.snackBar.open(error.error + ': ' + error.message, 'Info', {duration: 2000});
      return throwError(error);
    } else {
      try {
        error = response.error; // with 'text': JSON.parse(response.error);
        this.snackBar.open(error.error + ' (' + response.status + '): ' + error.message, 'Error', {duration: 10000});
        return throwError(error);
      } catch (e) {
        this.snackBar.open('Not response', 'Error', {duration: 10000});
        return throwError(response.error);
      }
    }
  }

  private extractData(response): any {
    if (this.successfulNotification) {
      this.snackBar.open(this.successfulNotification, '', {
        duration: 2000
      });
      this.successfulNotification = undefined;
    }
    const contentType = response.headers.get('content-type');
    if (contentType) {
      if (contentType.indexOf('application/json') !== -1) {
        return response.body; // with 'text': JSON.parse(response.body);
      }
    } else {
      return response;
    }
  }

  private createOptions(): any {
    if (this.token !== undefined) {
      this.header('Authorization', 'Bearer ' + this.token.token);
    }
    const options: any = {
      headers: this.headers,
      params: this.params,
      responseType: this.responseType,
      observe: 'response'
    };
    this.resetOptions();
    return options;
  }

  post(endpoint: string, body?: object): Observable<any> {
    return this.http.post(HttpService.API_END_POINT + endpoint, body, this.createOptions()).pipe(
      map(response => this.extractData(response)
      ), catchError(error => {
        return this.handleError(error);
      })
    );
  }

  put(endpoint: string, body?: object): Observable<any> {
    return this.http.put(HttpService.API_END_POINT + endpoint, body, this.createOptions()).pipe(
      map(response => this.extractData(response)
      ), catchError(error => {
        return this.handleError(error);
      })
    );
  }

  patch(endpoint: string, body?: object): Observable<any> {
    return this.http.patch(HttpService.API_END_POINT + endpoint, body, this.createOptions()).pipe(
      map(response => this.extractData(response)
      ), catchError(error => {
        return this.handleError(error);
      })
    );
  }

  delete(endpoint: string): Observable<any> {
    return this.http.delete(HttpService.API_END_POINT + endpoint, this.createOptions()).pipe(
      map(response => this.extractData(response)
      ), catchError(error => {
        return this.handleError(error);
      })
    );
  }

  private header(key: string, value: string): HttpService {
    this.headers = this.headers.append(key, value); // This class is immutable
    return this;
  }

  private authBasic(username: string, password: string): HttpService {
    return this.header('Authorization', 'Basic ' + btoa(username + ':' + password));
  }

  login(username: string, password: string, endPoint: string): Observable<any> {
    return this.authBasic(username, password).post(endPoint).pipe(
      map(token => {
        this.token = token;
        this.token.username = new JwtHelperService().decodeToken(token.token).user;
        this.token.roles = new JwtHelperService().decodeToken(token.token).roles;
      }), catchError( error => {
        return this.handleError(error);
      })
    );
  }

  logout() {
    this.token = undefined;
    this.router.navigate(['']);
  }
}
