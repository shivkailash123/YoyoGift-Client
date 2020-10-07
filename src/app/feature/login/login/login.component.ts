import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import {
  FacebookLoginProvider,
  GoogleLoginProvider,
  AuthService,
} from 'angularx-social-login';
import { Router } from '@angular/router';
import { Socialusers } from './socialuser';
import { DataService } from 'src/app/core/service/data.service';
import { Location } from '@angular/common';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  emailId: string;
  password: string;
  formdata: FormGroup;
  result: any;
  response: any;
  errorMessages: string;
  errorEnabled = false;
  successMessage: string;
  successEnabled = false;
  loading = false;
  Gloading = false;
  Floading = false;
  userData: any;
  varEmail: string;
  error: any;
  submitted = false;
  val: string[];
  pwdPattern = '(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{7,}';
  socialEmail: string;
  socialLoginUser: any = [];
  socailusers = new Socialusers();
  loggedIn: boolean;
  currentUserSubject: any;
  constructor(
    private service: DataService,
    private router: Router,
    private authService: AuthService,
    private location: Location
  ) {}

  ngOnInit() {
    this.formdata = new FormGroup({
      emailId: new FormControl('', Validators.required),
      password: new FormControl('', [Validators.required, Validators.pattern(this.pwdPattern)]),
    });
    if (this.service.isSocialLoggedIn === false) {
    this.authService.authState.subscribe(
      (user) => {
        this.socailusers = user;
        this.Floading = false;
        this.Gloading = false;
        this.loggedIn = (user != null);
        if (this.socailusers != null) {
          this.service.compareSocialMediaData(this.socailusers).subscribe(
            (data) => {
              this.userData = data;
              this.Floading = false;
              this.Gloading = false;
              localStorage.setItem('user' , JSON.stringify(true));
              this.socialEmail = this.socailusers.email;
              this.val = this.socialEmail.split('@');
              this.varEmail = this.val[0] + '@yoyogift.com';
              localStorage.setItem('email' , JSON.stringify(this.varEmail));
              this.socialMediaProfile(this.userData);
            },
            (error) => {
              this.response = error;
              this.errorMessages = this.response.error.eror.message;
              this.response = undefined;
              this.Floading = false;
              this.Gloading = false;
              this.errorEnabled = true;
            }
          );
        }
      },
      (error) => {
        this.response = error;
        this.errorMessages = this.response.error.eror.message;
        this.response = undefined;
        this.Floading = false;
        this.Gloading = false;
        this.loading = false;
        this.errorEnabled = true;
      }
    );
  }}
  signInWithGoogle(): void {
    this.Gloading = true;
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID).then( (success) => {
      this.socailusers = success;
      console.log(this.socailusers);
      this.successEnabled = true;
      this.successMessage = 'successFully loggedIn';
    }).catch(
      (err) => {
      this.Gloading = false;
      this.errorEnabled = true;
      this.errorMessages = err;
    });
      }
  signInWithFB(): void {
    this.Floading = true;
    this.authService.signIn(FacebookLoginProvider.PROVIDER_ID).then( (success) => {
      this.socailusers = success;
      console.log(this.socailusers);
      this.successEnabled = true;
      this.successMessage = 'successFully loggedIn';
    }).catch(
      (err) => {
      this.Floading = false;
      this.errorEnabled = true;
      this.errorMessages = err;
    });
      }
  signOut(): void {
    localStorage.clear();
    this.service.isSocialLoggedIn = false;
    this.authService.signOut();
    this.router.navigate(['/']);
  }
  socialMediaProfile(userProfileData: any) {
    this.service.profileData = userProfileData.response;
    if (this.service.isSocialLoggedIn === true) {
      localStorage.setItem('currentUserData', JSON.stringify(userProfileData.response));
      this.location.back();
    }
  }
  get f() { return this.formdata.controls; }
  onClickSubmit() {
this.submitted = true;

  // stop here if form is invalid
if (this.formdata.invalid) {
      return;
  }
this.loading = true;
this.service.check(this.formdata).subscribe(
      (response: any) => {
        this.userData = response.response;
        this.service.setLoginData(this.userData);
        localStorage.setItem('currentUserData', JSON.stringify(response.response));
        if (this.userData != null) {
          this.service.typeOfUser(this.userData);
          if (this.service.isAdminloggedIn === true) {
            this.router.navigateByUrl('/admin');
            // this.location.back();
          } else if (this.service.isUserLoggedIn === true) {
            this.location.back();
          }
          return true;
        } else {
          this.location.back();
          return false;
        }
      },
      (error) => {
        this.response = error;
        this.errorMessages = this.response.error.eror.message;
        this.response = undefined;
        this.loading = false;
        this.errorEnabled = true;
      }
    );
  }
}
