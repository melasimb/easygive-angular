import {Component} from '@angular/core';
import {TokensService} from '../core/tokens.service';

@Component({
  templateUrl: 'home.component.html',
  styleUrls: ['home.component.css'],

})
export class HomeComponent {
  username: string;

  constructor(public tokensService: TokensService) {
    this.username = tokensService.getUsername();
  }

  logout() {
    this.tokensService.logout();
  }
}
