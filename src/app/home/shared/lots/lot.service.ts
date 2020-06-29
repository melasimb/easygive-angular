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
}
