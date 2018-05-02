import { Component, OnInit } from '@angular/core';
import { StatePage } from '../utils/state.component';
import { CredentialsStorage } from '../utils/credentials-storage';
import { DoCheck, ViewChild } from '@angular/core';


@Component({
  selector: 'layout-footer',
  templateUrl: './layout-footer.component.html',
  styleUrls: ['./layout-footer.component.scss']
})
export class LayoutFooterComponent extends StatePage implements OnInit {
  errorMessage: string;
  towns: any[];
  businessSectors: any[];

  constructor(
    private credentialsStorage: CredentialsStorage) {
    super();
  }

  ngOnInit() {
    /*this.offersService.getSearchOffers()
    .subscribe((data) => {
      this.towns = data.towns;
      this.businessSectors = data.businessSectors;
    },
    (error: any) => {
      this.errorMessage = error.message;
      this.ready();
    });*/
  }
}

