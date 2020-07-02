import {Component} from '@angular/core';
import {Lot} from '../shared/lots/lot.model';
import {LotService} from '../shared/lots/lot.service';
import {ActivatedRoute} from '@angular/router';
import {TokensService} from '../../core/tokens.service';
import {MatDialog} from '@angular/material';
import {LotsDeleteDialogComponent} from './lots-delete-dialog.component';

@Component({
  templateUrl: 'lots-read.component.html',
  styleUrls: ['lots-read.component.css']
})
export class LotsReadComponent {
  lot: Lot = {
    id: null,
    image: null,
    title: null,
    description: null,
    schedule: null,
    wish: null,
    food: null,
    delivered: null,
    username: null,
    location: null
  };
  id: string = null;
  lotOfUser = false;

  constructor(private lotService: LotService, private tokenService: TokensService,
              private activatedRoute: ActivatedRoute, private dialog: MatDialog) {
    this.id = this.activatedRoute.snapshot.params.id;
    this.lotService.read(this.id).subscribe(
      lot => {
        this.lot = lot;
        if (this.lot.username === this.tokenService.getUsername()) {
          this.lotOfUser = true;
        }
      }
    );
  }

  delete() {
    this.dialog.open(LotsDeleteDialogComponent,
      {
        data: {id: this.lot.id}
      }
    );
  }
}
