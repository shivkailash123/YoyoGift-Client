import { Component, OnInit } from "@angular/core";
import { MatSnackBar } from "@angular/material";
import { DataService } from "src/app/core/service/data.service";
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
} from "@angular/forms";
import { passwordDoNotMatch } from "src/app/feature/user/updateprofile/validator";
import { UserData } from "../../login/login/profile";
@Component({
  selector: "app-updateprofile",
  templateUrl: "./updateprofile.component.html",
  styleUrls: ["./updateprofile.component.css"],
})
export class UpdateprofileComponent implements OnInit {
  constructor(private snackBar: MatSnackBar, private service: DataService) {}
  step = 0;
  previousProfileData: any;
  group: FormGroup;
  spinner = false;
  success = false;
  message = false;
  userdata: UserData;
  response: any;
  hidePassword = true;
  sucessMessage = "";
  errormessge = "";
  pwdPattern =
    "(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-zd$@$!%*?&].{7,}";
  user: string;
  setStep(index: number) {
    this.step = index;
  }
  nextStep() {
    this.step++;
  }
  prevStep() {
    this.step--;
  }
  ngOnInit() {
    this.step = 0;
    const userData = JSON.parse(localStorage.getItem("currentUserData"));
    if (userData) {
      this.service.setLoginData(userData);
    }
    this.service.newData.subscribe((data) => {
      console.log(data, userData);
      this.previousProfileData = data;
      this.user = this.previousProfileData.email.split("@")[0];
    });
    this.group = new FormGroup({
      name: new FormControl(this.previousProfileData.name, [
        Validators.required,
        Validators.pattern("^[a-zA-Z\\s]*"),
        Validators.maxLength(30),
      ]),
      userName: new FormControl(this.user, [
        Validators.required,
        Validators.maxLength(25),
        Validators.pattern("^[a-z]+([._]?[a-z0-9]+)*"),
      ]),
      phoneNo: new FormControl(this.previousProfileData.phoneNo, [
        Validators.required,
        Validators.pattern("[6-9]\\d{9}"),
      ]),
      password: new FormControl("", [
        Validators.required,
        Validators.pattern(this.pwdPattern),
      ]),
      confirmPassword: new FormControl("", [
        Validators.required,
        Validators.pattern(this.pwdPattern),
        passwordDoNotMatch,
      ]),
    });
  }

  submitUpdateData() {
    this.spinner = true;
    const user = JSON.parse(localStorage.getItem("currentUserData"));
    user.name = this.group.value.name;
    user.phoneNo = this.group.value.phoneNo;

    this.service.updateUserData(this.group).subscribe(
      (response: any) => {
        this.spinner = false;
        this.success = true;
        this.sucessMessage = "Data Sucessfully Updated";
        localStorage.setItem("currentUserData", JSON.stringify(user));
        this.service.setLoginData(user);
      },
      (error) => {
        this.errormessge = error.error.eror.message;
        this.spinner = false;
        this.message = true;
        setTimeout(() => {
          this.message = false;
        }, 5000);
      }
    );
  }
  checkDisable() {
    if (
      this.group.get("password").valid &&
      this.group.get("confirmPassword").valid
    ) {
      if (
        this.group.get("confirmPassword").value ===
        this.group.get("password").value
      ) {
        return true;
      }
    }
    return false;
  }
}
