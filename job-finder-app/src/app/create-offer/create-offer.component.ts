import { Component, OnInit } from '@angular/core';
import { OffersService } from '../services/offers.service';

@Component({
  selector: 'app-create-offer',
  templateUrl: './create-offer.component.html',
  styleUrls: ['./create-offer.component.scss']
})
export class CreateOfferComponent implements OnInit {
  model: any = {};
  businessSectors: any[];
  towns: any[];
  errorMessage: string;
  successMessage: string;

  constructor(private offersService: OffersService) { }

  ngOnInit() {
    this.offersService.getSearchCriteria()
            .subscribe((data: any) => {
                this.towns = data.towns;
                this.businessSectors = data.businessSectors;
            });
  }

  resetMessage() {
    this.successMessage = undefined;
  }

  createOffer() {
    this.model.townId = parseInt(this.model.townId);
    this.model.businessSectorId = parseInt(this.model.businessSectorId);
    this.model.isPermanent = this.model.isPermanent || false;
    this.model.isTemporary = this.model.isTemporary || false;
    this.model.isFullTime = this.model.isFullTime || false;
    this.model.isPartTime = this.model.isPartTime || false;
    this.offersService.createOffer(this.model).subscribe((response: any) => {
        this.successMessage = response;
    },
    (error: any) => {
      this.errorMessage = error.message;
  });
  }
}