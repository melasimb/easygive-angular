import {Component, OnInit} from '@angular/core';
import {LotService} from '../shared/lots/lot.service';
import {TokensService} from '../../core/tokens.service';
import {Lot} from '../shared/lots/lot.model';
import {FormControl, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  templateUrl: 'lots-creation.component.html',
  styleUrls: ['lots-creation.component.css']
})
export class LotsCreationComponent implements OnInit {
  id: string = null;
  isUpdate = false;
  lot: Lot = null;
  lotCreate: Lot = {
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
  titleFormControl = new FormControl('', [Validators.required]);
  descriptionFormControl = new FormControl('', [Validators.required]);
  scheduleFormControl = new FormControl('', [Validators.required]);

  constructor(private lotService: LotService, private  tokensService: TokensService,
              private router: Router, private activatedRoute: ActivatedRoute) {
  }

  ngOnInit() {
    this.activatedRoute.queryParamMap.subscribe(
      queryParamMap => {
        this.id = queryParamMap.get('id');
        if (this.id === null) {
          this.isUpdate = false;
          this.lot = this.lotCreate;
          this.previewUrl = null;
        } else {
          this.isUpdate = true;
          this.read();
        }
      }
    );
  }

  getErrorMessageImage() {
    return 'Please, select an image';
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
      this.lot.image = this.previewUrl.split(',')[1];
    };
  }

  read() {
    this.lotService.read(this.id).subscribe(
      lot => {
        this.lot = lot;
        this.previewUrl = 'data:image/jpeg;base64,' + this.lot.image;
      }
    );
  }

  create() {
    this.lot.username = this.tokensService.getUsername();
    this.lotService.create(this.lot).subscribe(
      () => this.router.navigate(['/home/lots-list', 'my-lots'])
    );
  }

  update() {
    this.lotService.update(this.id, this.lot).subscribe(
      () => this.router.navigate(['/home/lots-list', 'my-lots'])
    );
  }

  invalidLot(): boolean {
    return !this.previewUrl || this.titleFormControl.hasError('required') ||
      this.descriptionFormControl.hasError('required') || this.scheduleFormControl.hasError('required');
  }
}
