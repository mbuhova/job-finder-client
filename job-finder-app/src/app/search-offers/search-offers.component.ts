import { Component, OnInit } from '@angular/core';
import { StatePage } from '../utils/state.component';
import { CredentialsStorage } from '../utils/credentials-storage';
import { DoCheck, ViewChild } from '@angular/core';
import { OffersService } from '../services/offers.service';


declare var google: any;

@Component({
  selector: 'app-search-offers',
  templateUrl: './search-offers.component.html',
  styleUrls: ['./search-offers.component.scss']
})
export class SearchOffersComponent extends StatePage implements OnInit {
  errorMessage: string;
  towns: any[];
  businessSectors: any[];

  constructor(
    private credentialsStorage: CredentialsStorage,
    private offersService: OffersService) {
    super();
  }

  ngOnInit() {
    this.offersService.getSearchOffers()
    .subscribe((data) => {
      this.towns = data.towns;
      this.businessSectors = data.businessSectors;
    },
    (error: any) => {
      this.errorMessage = error.message;
      this.ready();
    });
  }
}
