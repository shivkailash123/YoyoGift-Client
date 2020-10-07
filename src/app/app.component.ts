import { Component, OnInit } from '@angular/core';
import { DataService } from './core/service/data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  mess: any;
  constructor(private dataService: DataService) {}

  ngOnInit() {
    this.getdata();
  }

  getdata() {
    this.dataService.display().subscribe(data => {
      this.mess = {
        message: data
      };
    },
    err => console.log(err)
    );
  }
}
