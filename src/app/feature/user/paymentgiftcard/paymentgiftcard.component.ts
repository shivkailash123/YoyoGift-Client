import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  FormGroupDirective,
  NgForm,
  Validators,
  ValidatorFn,
  AbstractControl
} from '@angular/forms';
import { GiftCardData } from '../GiftCardData';
import { ErrorStateMatcher } from '@angular/material/core';

import { DataService } from 'src/app/core/service/data.service';
import { User } from '../User';
import { Router } from '@angular/router';
import { stringify } from 'querystring';

@Component({
  selector: 'app-paymentgiftcard',
  templateUrl: './paymentgiftcard.component.html',
  styleUrls: ['./paymentgiftcard.component.css']
})
export class PaymentgiftcardComponent implements OnInit {
  giftCardDataForm: FormGroup;
  giftCardData: GiftCardData;

  userData: User;
  id: number;
  senderEmail: string;
  email: string;
  error: any;

  // tslint:disable-next-line: no-inferrable-types
  spinner: boolean = false;
  messageerror: string = null;
  message: string = null;
  // tslint:disable-next-line: no-inferrable-types
  buttonVar: boolean = false;
  buttonVarAddAmount: boolean = false;

  constructor(private service: DataService, private router: Router) {}

  ngOnInit() {
    this.giftCardDataForm = new FormGroup({
      remail: new FormControl('', [
        Validators.required,
        Validators.pattern('[a-zA-Z0-9._%+-]+@yoyogift.com')
      ]),
      message: new FormControl('', [Validators.required, spacecheck()]),
      vamount: new FormControl('', [
        Validators.required,
        Validators.pattern('^[1-9]+[0-9]*$')
      ]),
      wallet: new FormControl('')
    });
    console.log(JSON.parse(localStorage.getItem('email')));
    this.service.getUserData(JSON.parse(localStorage.getItem('email'))).subscribe(data => {


      this.userData = data.response;

    });
  }


  addMoney(){

    this.router.navigateByUrl("/user/wallet");
  }


  redirectToHome() {
    document.getElementById("myModal").style.display = "none";
    this.router.navigate(['/user/home']);
  }

  closeModal() {
    var modal = document.getElementById("myModal");
    modal.style.display = "none";
  }

  onSubmit() {
    this.giftCardDataForm.markAllAsTouched();
    if(this.giftCardDataForm.valid){
    this.giftCardData = {

      userId: this.userData.userId,
      voucherAmount: this.giftCardDataForm.value.vamount,
      reciverEmail: this.giftCardDataForm.value.remail,
      message: this.giftCardDataForm.value.message,
      productId: 1,
      productQuantity: 0
    };
    this.buttonVar = true;
    this.buttonVarAddAmount = true;
    console.log(this.giftCardData);
    this.spinner = true;
    this.buttonVar = true;

    this.service.addGiftCard(this.giftCardData).subscribe(
      data => {
        this.buttonVar = true;
        this.message = data.response;
        this.spinner = false;
        var modal = document.getElementById("myModal");
      modal.style.display = "block";
      var btn = document.getElementById("myBtn");
      window.onclick = function (event) {
        if (event.target == modal) {
          modal.style.display = "none";
        }
      }

      },
      error => {

        this.spinner = false;
        this.messageerror = error.error.eror.message;
        this.messageerror = error.error.eror.message;
        this.buttonVar = false;
        this.buttonVarAddAmount = false;
      }
    );
  }
}
}
function spacecheck(): ValidatorFn{
  // tslint:disable-next-line: no-unused-expression

  return (control: AbstractControl): { [key: string]: any } => {
    let isWhitespace = (control.value || '').trim().length === 0;
    let isValid = !isWhitespace;
    return isValid ? null : { 'whitespace': 'value is only whitespace' }
  };

}





