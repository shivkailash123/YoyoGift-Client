import { Component, OnInit } from "@angular/core";
import { DataService } from "../service/data.service";

import { Router } from "@angular/router";
import {
  AuthService,
  GoogleLoginProvider,
  FacebookLoginProvider,
} from "angularx-social-login";
@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.css"],
})
export class HeaderComponent implements OnInit {
  constructor(
    public service: DataService,
    private router: Router,
    private authService: AuthService
  ) {}
  loggedIn: boolean;
  ngOnInit() {}

  signOut(): void {
    localStorage.clear();
    this.service.isSocialLoggedIn = false;
    this.authService.signOut();
    this.router.navigate(["/"]);
  }
  logOut() {
    if (this.service.isAdminloggedIn === true) {
      localStorage.clear();
      this.service.isAdminloggedIn = false;
      this.loggedIn = false;
      this.router.navigate(["/"]);
    }
    //  else if (this.service.isSocialLoggedIn === true) {
    //   this.authService.signOut();
    // }
    else {
      localStorage.clear();
      this.service.isUserLoggedIn = false;
      this.loggedIn = false;
      this.router.navigate(["/"]);
    }
  }

  loggedin() {
    if (
      JSON.parse(localStorage.getItem("user")) === true ||
      JSON.parse(localStorage.getItem("admin")) === true
    ) {
      return true;
    } else {
      return false;
    }
  }
  adminCheck() {
    if (JSON.parse(localStorage.getItem("admin")) === true) {
      return true;
    } else {
      return false;
    }
  }

  modalForm()
  {

      var modal = document.getElementById("headerModal");
      modal.style.display = "block";
      var btn = document.getElementById("headerBtn");
      window.onclick = function (event) {
        if (event.target == modal) {
          modal.style.display = "none";
        }
      }


  }
  closeModal() {
    var modal = document.getElementById("headerModal");
    modal.style.display = "none";

  }

}
