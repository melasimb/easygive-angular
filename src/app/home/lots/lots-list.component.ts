import {Component, OnInit} from '@angular/core';
import {LotService} from '../shared/lots/lot.service';
import {ActivatedRoute} from '@angular/router';
import {TokensService} from '../../core/tokens.service';
import {Lot} from '../shared/lots/lot.model';

@Component({
  templateUrl: 'lots-list.component.html',
  styleUrls: ['lots-list.component.css']
})

export class LotsListComponent implements OnInit {

  lots: Lot[] = null;
  title: string = null;
  messageLotsEmpty: string = null;
  lotsEmpty = false;

  constructor(private lotService: LotService, private tokensService: TokensService, private activatedRoute: ActivatedRoute) {
  }

  ngOnInit() {
    this.activatedRoute.params.subscribe(
      routeParams => {
        this.loadLots(routeParams.category);
      }
    );
  }

  loadLots(category: string) {
    if (category === 'food') {
      this.lotService.searchByFoodAndDelivered(true, false).subscribe(
        lots => {
          this.lots = lots;
          this.lotsEmpty = false;
          this.title = 'FOOD LOTS';
        },
        () => {
          this.messageLotsEmpty = 'There aren´t food-lots available yet.';
          this.lots = null;
          this.lotsEmpty = true;
        }
      );
    }
    if (category === 'non-food') {
      this.lotService.searchByFoodAndDelivered(false, false).subscribe(
        lots => {
          this.lots = lots;
          this.lotsEmpty = false;
          this.title = 'NON-FOOD LOTS';
        },
        () => {
          this.messageLotsEmpty = 'There aren´t food available yet.';
          this.lots = null;
          this.lotsEmpty = true;
        }
      );
    }
    if (category === 'my-lots') {
      this.lotService.searchByUser(this.tokensService.getUsername()).subscribe(
        lots => {
          this.lots = lots;
          this.lotsEmpty = false;
          this.title = 'MY LOTS';
        },
        () => {
          this.messageLotsEmpty = 'You haven´t added lots yet.';
          this.lots = null;
          this.lotsEmpty = true;
        }
      );
    }
  }
}
