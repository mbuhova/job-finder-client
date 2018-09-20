import { Component, OnInit } from '@angular/core';
import { StatePage } from '../utils/state.component';
import { CredentialsStorage } from '../utils/credentials-storage';
import { OffersService } from '../services/offers.service';
import { Router } from '@angular/router';


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
  keyword = '';
  isPermanent = false;
  isTemporary = false;
  isFullTime = false;
  isPartTime = false;

  constructor(
    private router: Router,
    private credentialsStorage: CredentialsStorage,
    private offersService: OffersService) {
    super();
  }

  searchOffers(){
    let searchCriteria = {
      selectedTowns: this.selectedTowns.map(x => { return x.id; }),
      selectedBusinessSectors: this.selectedBusinessSectors.map(x => { return x.id; }),
      isPermanent: this.isPermanent,
      isTemporary: this.isTemporary,
      isFullTime: this.isFullTime,
      isPartTime: this.isPartTime,
      keyword: this.keyword
    }

    this.offersService.searchOffers(searchCriteria)
    .subscribe((data: any) => {
      if(data){
        this.offersService.saveData(data);
        this.router.navigate(['/searchOffers/result']);
      }
      else {
        //TODO - show message no data found.
      }
    },
    (error: any) => {
      this.errorMessage = error.message;
      this.ready();
    });
  }

  ngOnInit() {
  this.selectedTowns = [];
  this.selectedBusinessSectors = [];

    this.offersService.getSearchCriteria()
    .subscribe((data: any) => {
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

