import {Component} from '@angular/core';
import {LotService} from '../shared/lots/lot.service';
import {TokensService} from '../../core/tokens.service';
import {Lot} from '../shared/lots/lot.model';
import {FormControl, Validators} from '@angular/forms';
import {Router} from '@angular/router';

@Component({
  templateUrl: 'lots-creation.component.html',
  styleUrls: ['lots-creation.component.css']
})
export class LotsCreationComponent {
  lot: Lot = {
    image: null,
    title: null,
    description: null,
    schedule: null,
    wish: false,
    food: true,
    delivered: false,
    username: null
  };
  image: File = null;
  previewUrl: any = null;
  imageFormControl = new FormControl('', [Validators.required]);
  titleFormControl = new FormControl('', [Validators.required]);
  descriptionFormControl = new FormControl('', [Validators.required]);
  scheduleFormControl = new FormControl('', [Validators.required]);

  constructor(private lotService: LotService, private  tokensService: TokensService, private router: Router) {
  }

  getErrorMessageImage() {
    return this.imageFormControl.hasError('required') ? 'Please, select an image' : '';
  }

  getErrorMessageTitle() {
    return this.titleFormControl.hasError('required') ? 'Please, enter a title' : '';
  }

  getErrorMessageDescription() {
    return this.descriptionFormControl.hasError('required') ? 'Please, enter a description' : '';
  }

  getErrorMessageSchedule() {
    return this.scheduleFormControl.hasError('required') ? 'Please, enter a schedule' : '';
  }

  processFile(imageInput: any) {
    this.image = imageInput.files[0];
    this.preview();
  }

  preview() {
    const reader = new FileReader();
    reader.readAsDataURL(this.image);
    reader.onload = () => {
      this.previewUrl = reader.result;
    };
  }

  create() {
    this.lot.image = this.previewUrl.split(',')[1];
    this.lot.username = this.tokensService.getUsername();
    this.lotService.create(this.lot).subscribe(
      () => this.router.navigate(['/home/lots-list', 'my-lots'])
    );
  }

  invalidLot(): boolean {
    return this.imageFormControl.hasError('required') || this.titleFormControl.hasError('required') ||
      this.descriptionFormControl.hasError('required') || this.scheduleFormControl.hasError('required');
  }
}
