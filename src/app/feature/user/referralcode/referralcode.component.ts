import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { MatDialog } from "@angular/material";
import { DataService } from "src/app/core/service/data.service";
@Component({
  selector: "app-referralcode",
  templateUrl: "./referralcode.component.html",
  styleUrls: ["./referralcode.component.css"],
})
export class ReferralcodeComponent implements OnInit {
  group: FormGroup;
  constructor(private service: DataService) {}
  redeemedBalance: 0;
  pageLoading: false;
  sucess: boolean = false;
  message = "";
  errorMessage = "";
  response: any;
  emessage = false;
  spinner = false;
  isButtonEnabled = true;
  emailPattern = "^[a-zA-Z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$";
  ngOnInit() {
    this.group = new FormGroup({
      code: new FormControl("", [
        Validators.required,
        Validators.email,
        Validators.pattern(this.emailPattern),
      ]),
    });
  }
  submitEmail() {
    this.group.markAllAsTouched();
    if (this.group.valid) {
      this.spinner = true;

      this.service.sendEmail(this.group).subscribe((result: any) => {
        this.response = result.response;
        this.message = 'message send';
        this.spinner = false;
        this.sucess = true;
        this.isButtonEnabled = false;
      }),
        (error) => {
          this.errorMessage = error.error.eror.message;
          this.spinner = false;
          this.emessage = true;
        };
    }
  }
}
