import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatSnackBar} from '@angular/material';
import {LotService} from '../shared/lots/lot.service';
import {Router} from '@angular/router';

@Component({
  templateUrl: 'lots-delete-dialog.component.html',
  styleUrls: ['lots-delete-dialog.component.css']
})
export class LotsDeleteDialogComponent {

  id: string = null;

  constructor(@Inject(MAT_DIALOG_DATA) data: any, private lotService: LotService, private router: Router,
              private message: MatSnackBar) {
    this.id = data.id;
  }

  delete() {
    this.lotService.delete(this.id).subscribe(
      () => this.router.navigate(['/home/lots-list', 'my-lots'])
      , () => {}
      , () => this.message.open('Lot deleted successfully', null, {duration: 2000})
    );
  }
}
