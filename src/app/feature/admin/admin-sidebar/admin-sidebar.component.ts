import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-sidebar',
  templateUrl: './admin-sidebar.component.html',
  styleUrls: ['./admin-sidebar.component.css']
})
export class AdminSidebarComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  redirectToProducts() {
    this.router.navigate(['/admin']);
  }

  redirectToOrders() {
    this.router.navigate(['/admin/displayOrders']);
  }

  redirectToUsers() {
    this.router.navigate(['/admin/displayUsers']);
  }
  
  redirectToStatistics() {
    this.router.navigate(['/admin/displayStatistics']);
  }

}
