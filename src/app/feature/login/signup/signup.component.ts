import { Component, OnInit } from '@angular/core';
import { Form, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserDetails } from './UserDetails';
import { DataService } from 'src/app/core/service/data.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
myform: FormGroup;
name: FormControl;
useremail: FormControl;
userpassword: FormControl;
userphone: FormControl;
userreferralCode :FormControl;
pwdPattern = '(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{7,}';
user: UserDetails;
message = false;
success: true;
errormessge: string;
// tslint:disable-next-line: no-inferrable-types
spinner: boolean = false;
constructor(private service: DataService, private router: Router) {}

  ngOnInit() {
    this.createFormControls();
    this.createForm();
  }
  onSubmit() {
    this.user = {
      name: this.myform.value.name,
      email: this.myform.value.useremail,
      password: this.myform.value.userpassword,
      phoneNo: this.myform.value.userphone,
      referralCode: this.myform.value.userreferralCode,
    };
    console.log(this.user);
    this.spinner = true;
    this.service.addUser(this.user).subscribe((response: any) => {
        this.spinner = false;
        this.success = true;
        this.user=response.response;
        this.errormessge = 'Successfully Registered';
        console.log(response.response);
        this.myform.reset();
        setTimeout(() => {
        this.router.navigate(['/profile/login'] ); }, 1600);
      } ,
      error => {
        this.errormessge = error.error.eror.message;
        this.spinner = false;
        this.message = true;
        console.log(this.errormessge);
        this.myform.reset();
        setTimeout(() => {
        this.message = false; }, 2500);
       }
      );

  }

  createFormControls() {
    this.name = new FormControl('', [Validators.required, Validators.pattern('^[a-zA-Z\\s]*'), Validators.maxLength(30)]);
    this.userpassword = new FormControl('', [Validators.required, Validators.pattern(this.pwdPattern)]);
    this.useremail = new FormControl('', [
      Validators.required, Validators.maxLength(25),
      Validators.pattern('^[a-z]+([._]?[a-z0-9]+)*')
    ]);
    this.userphone = new FormControl('', [
      Validators.required,
      Validators.minLength(10),
      Validators.pattern('[6-9]\\d{9}')
]);
this.userreferralCode=new FormControl('');
     }
     createForm() {
      this.myform = new FormGroup({
      name: this.name,
      useremail: this.useremail,
      userphone: this.userphone,
       userpassword: this.userpassword,
       userreferralCode: this.userreferralCode,
      });
    }

    refresh() {
      window.location.reload();
    }
  }
