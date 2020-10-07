import { Component, OnInit } from "@angular/core";
import { User } from "../User";
import { DataService } from "src/app/core/service/data.service";
import { ActivatedRoute, Router } from "@angular/router";
import {
  FormGroup,
  FormControl,
  Validators,
  AbstractControl,
  ValidationErrors,
  ValidatorFn,
} from "@angular/forms";
import { Location } from "@angular/common";
@Component({
  selector: "app-wallet",
  templateUrl: "./wallet.component.html",
  styleUrls: ["./wallet.component.css"],
})
export class WalletComponent implements OnInit {
  userData: User;
  id: number;
  walletDataForm: FormGroup;
  varButton: boolean = false;
  spinner: boolean = false;
  message: string;
  errormessage: string;

  constructor(
    private service: DataService,
    private route: ActivatedRoute,
    private router: Router,
    private _location: Location
  ) {}

  ngOnInit() {
    this.walletDataForm = new FormGroup({
      amount: new FormControl("", [
        Validators.required,
        Validators.pattern("[1-9][0-9]|[5-9]"),
        amountCheck(),
      ]),
    });

    this.service
      .getUserData(JSON.parse(localStorage.getItem("email")))
      .subscribe((data) => {
        this.userData = data.response;
        console.log(this.userData);
      });
  }

  back() {
    this._location.back();
  }
  onSubmit() {
    this.walletDataForm.markAllAsTouched();

    if (this.walletDataForm.valid) {
      this.varButton = true;
      this.spinner = true;
      this.service
        .addAmount(this.userData.userId, this.walletDataForm.value.amount)
        .subscribe(
          (response) => {
            this.ngOnInit();
            this.message = response.response;

            console.log(this.message);
            this.spinner = false;
            this.varButton = false;
          },
          (error) => {
            this.errormessage = error.error.eror.message;
            console.log(this.errormessage);
            this.spinner = false;
            this.varButton = false;
          }
        );
    }
  }
}
function amountCheck(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: boolean } | null => {
    if (control.value % 5 === 0) {
      return null;
    }
    return { amountCheck1: true };
  };
}
