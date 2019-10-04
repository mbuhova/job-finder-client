import { Component, OnInit } from '@angular/core';
import { OffersService } from '../services/offers.service';
import { Router, ActivatedRoute } from '@angular/router';
import { CredentialsStorage } from '../utils/credentials-storage';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-offers-search-details',
  templateUrl: './offers-search-details.component.html',
  styleUrls: ['./offers-search-details.component.scss']
})
export class OffersSearchDetailsComponent implements OnInit {
  offer: any;
  role: string;

  constructor(private offersService: OffersService, 
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService,    
    private credentialsStorage: CredentialsStorage) { }

  ngOnInit() {
    const offerId = this.route.snapshot.paramMap.get("id");
    this.offersService.getSearchOfferDetails(offerId).subscribe(response => {
      this.offer = response;
    });

    this.role = this.credentialsStorage.getUserInfo() ? this.credentialsStorage.getUserInfo().role : '';

    this.authenticationService.loggedInUser.subscribe(userInfo => {
      this.role = !!userInfo ? userInfo.role : '';
    });
  }

  applyForOffer() {

  }
}
