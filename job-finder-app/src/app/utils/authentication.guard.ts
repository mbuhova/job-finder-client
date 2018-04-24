import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';
import { HttpClient } from './http-client'

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(private router: Router, private authService: AuthenticationService) { 
        HttpClient.unauthorized.subscribe((ev:any) => this.router.navigate(['/login']));
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {

        if (this.authService.isAuthenticated()) {
            // logged in so return true
            return true;
        }

        this.router.navigate(['/login'], { queryParams: { returnUrl: state.url }});
        return false;
    }
}