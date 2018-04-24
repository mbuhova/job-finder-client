import { Component, OnInit } from '@angular/core';
import { StatePage } from '../utils/state.component';
import { CredentialsStorage } from '../utils/credentials-storage';
import { DoCheck, ViewChild } from '@angular/core';

declare var google: any;

@Component({
  selector: 'app-search-offers',
  templateUrl: './search-offers.component.html',
  styleUrls: ['./search-offers.component.scss']
})
export class SearchOffersComponent extends StatePage implements OnInit {

  constructor(
    private credentialsStorage: CredentialsStorage) {
    super();
  }

  ngOnInit() {
    
  }
}

