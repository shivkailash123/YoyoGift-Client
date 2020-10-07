import { Component, OnInit, Input } from "@angular/core";
import { DataService } from "src/app/core/service/data.service";

@Component({
  selector: "app-profile",
  templateUrl: "./profile.component.html",
  styleUrls: ["./profile.component.css"],
})
export class ProfileComponent implements OnInit {

@Input()
  walletBalance: any;

  pageLoading: false;
  data: any;
  constructor(private service: DataService) {}
  ngOnInit() {
      this.service.getUserData(JSON.parse(localStorage.getItem('email'))).subscribe(data => {
      this.data = data.response;
      console.log(this.data);
      this.service.myData.next(this.data);
    });
  }
}
