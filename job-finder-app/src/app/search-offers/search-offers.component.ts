import { Component, OnInit } from '@angular/core';
import { StatePage } from '../utils/state.component';
import { CredentialsStorage } from '../utils/credentials-storage';
import { DoCheck, ViewChild } from '@angular/core';
import { OffersService } from '../services/offers.service';
import { FindValueSubscriber } from 'rxjs/operators/find';


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
  selectedTowns: any[];
  selectedBusinessSectors: any[];
  keyword: string;
  isPermanent: boolean;
  isTemporary: boolean;
  isFullTime: boolean;
  isPartTime: boolean;

  constructor(
    private credentialsStorage: CredentialsStorage,
    private offersService: OffersService) {
    super();
  }

  searchOffers(){
  }

  ngOnInit() {
  this.selectedTowns = [];
  this.selectedBusinessSectors = [];

    this.offersService.getSearchCriteria()
    .subscribe((data) => {
      this.towns = data.towns;
      this.businessSectors = data.businessSectors;
    },
    (error: any) => {
      this.errorMessage = error.message;
      this.ready();
    });
  }

  select(id, collectionToRemove, collectionToAdd){
    var found = collectionToRemove.find(function(element) {
      return element.id === id;
    });

    var index = collectionToRemove.indexOf(found);
    if (index !== -1) {
      collectionToRemove.splice(index, 1);
    }
    collectionToAdd.push(found);
    collectionToAdd.sort(function (a, b) {
      return a.name > b.name;
    });
  }
}

