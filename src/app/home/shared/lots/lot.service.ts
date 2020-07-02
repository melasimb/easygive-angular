import {HttpService} from '../../../core/http.service';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {AppEndpoints} from '../../../app-endpoints';
import {Lot} from './lot.model';

@Injectable()
export class LotService {

  constructor(private httpService: HttpService) {
  }

  create(lot: Lot): Observable<Lot> {
    return this.httpService.post(AppEndpoints.LOTS, lot);
  }

  read(id: string): Observable<Lot> {
    return this.httpService.get(AppEndpoints.LOTS + '/' + id);
  }

  update(id: string, lot: Lot): Observable<Lot> {
    return this.httpService.put(AppEndpoints.LOTS + '/' + id, lot);
  }

  delete(id: string): Observable<void> {
    return this.httpService.delete(AppEndpoints.LOTS + '/' + id);
  }

  searchByFoodAndDelivered(food: boolean, delivered: boolean): Observable<Lot[]> {
    this.httpService.param('food', food.toString());
    this.httpService.param('delivered', delivered.toString());
    return this.httpService.get(AppEndpoints.LOTS + '/' + 'searchFoodDelivered');
  }

  searchByUser(username: string): Observable<Lot[]> {
    this.httpService.param('username', username);
    return this.httpService.get(AppEndpoints.LOTS + '/' + 'searchUser');
  }
}
