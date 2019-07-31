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
    selectedBusinessSectors: any[];
    imageUrl: string;
    errorMessage: string;

    constructor(
        private offersService: OffersService,
        private credentialsStorage: CredentialsStorage,
        private route: ActivatedRoute,
        private router: Router,
        private authenticationService: AuthenticationService) { }

    ngOnInit() {
        // get return url from route parameters or default to '/'
        //this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';

        this.selectedBusinessSectors = [];
        this.offersService.getSearchCriteria()
            .subscribe((data: any) => {
                this.businessSectors = data.businessSectors;
            });

        this.userTypeUrl = this.route.snapshot.url[this.route.snapshot.url.length - 1].path;
    }

    registerUser() {
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

    public select(id, collectionToRemove, collectionToAdd) {
        var found = collectionToRemove.find(function (element) {
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
