import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  model: any = {};
  returnUrl: string;
  imageUrl: string;
  errorMessage: string;

  constructor(
      private route: ActivatedRoute,
      private router: Router,
      private authenticationService: AuthenticationService) { }

  ngOnInit() {
      // get return url from route parameters or default to '/'
      this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
      /*this.configurationService.getImageUrl('loginPicture')
      .subscribe((imageName) => {
        this.imageUrl = imageName;
      },
      (error: any) => {
          this.errorMessage = error.message;
      });*/
  }

  login() {
      this.errorMessage = '';
      this.authenticationService.login(this.model.userId, this.model.constructionId, this.model.password)
          .subscribe(
              (data: any) => {
                  this.router.navigate([this.returnUrl || '/dashboard']);
              },
              (error: any) => {
                  this.errorMessage = error.message;
              });
  }
}
