import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';
import { CredentialsStorage } from '../utils/credentials-storage';
import { OffersService } from '../services/offers.service';

export enum UserType {
    Person = 'person',
    Company = 'company'
}

@Component({
    selector: 'register-person',
    templateUrl: './register-person.component.html',
    styleUrls: ['./register-person.component.scss']
})

export class RegisterPersonComponent implements OnInit {
    model: any = {};
    userTypeUrl: string;
    public UserType = UserType;
    businessSectors: any[];
    towns: any[];
    imageUrl: string;
    errorMessage: string;

    constructor(
        private offersService: OffersService,
        private credentialsStorage: CredentialsStorage,
        private route: ActivatedRoute,
        private router: Router,
        private authenticationService: AuthenticationService) { }

    ngOnInit() {
        this.offersService.getSearchCriteria()
            .subscribe((data: any) => {
                this.towns = data.towns;
                this.businessSectors = data.businessSectors;
            });

        this.userTypeUrl = this.route.snapshot.url[this.route.snapshot.url.length - 1].path;
    }

    public isNumber(evt) {
        var iKeyCode = (evt.which) ? evt.which : evt.keyCode
        if (iKeyCode != 46 && iKeyCode > 31 && (iKeyCode < 48 || iKeyCode > 57))
            return false;

        return true;
    }   

    public registerUser() {
        this.authenticationService.registerUser(this.model.email, this.model.password, this.model.confirmPassword)
            .subscribe(
                (data: any) => {
                    let userInfo = data;
                    if (userInfo) {
                        this.credentialsStorage.setUserInfo(userInfo);
                    }
                    this.router.navigate(['/searchOffers']);
                },
                (error: any) => {
                    this.errorMessage = error.message;
                });
    }

    public registerCompany() {
        this.authenticationService.registerCompany(this.model)
        .subscribe(
            (data: any) => {
                 let userInfo = data;
                // if (userInfo) {
                //     this.credentialsStorage.setUserInfo(userInfo);
                // }
                // this.router.navigate(['/searchOffers']);
            },
            (error: any) => {
                this.errorMessage = error.message;
            });
    }
}
