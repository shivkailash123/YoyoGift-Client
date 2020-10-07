import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { OrderDetail } from './OrderDetails';
import { Router } from '@angular/router';
import { DataService } from 'src/app/core/service/data.service';
@Component({
  selector: 'app-userdasboard',
  templateUrl: './userdasboard.component.html',
  styleUrls: ['./userdasboard.component.css'],
})
export class UserdasboardComponent implements OnInit {
  displayedColumns: string[] = ['orderId', 'userDate', 'productId', 'productQuantity', 'productName', 'vendor', 'amount', 'actions'];
  dataSource = new MatTableDataSource<OrderDetail>();
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  order: OrderDetail[];
  spinner = true;
  user: any;
  constructor(private service: DataService, private router: Router) {
  }
  ngOnInit() {
    localStorage.removeItem('feedbackOrderId');
    localStorage.removeItem('feedbackProductId');
    this.service.getOrders(JSON.parse(localStorage.getItem('email'))).subscribe((response: any) => {
      this.order = response;
      console.log(this.order);
      this.spinner = false;
      this.dataSource = new MatTableDataSource<OrderDetail>(response);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    },
      error => {
        console.log(error);
        console.log(error.error.eror.message);
      }
    );
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  redirectFeedback(order1: number, product1: number) {
    localStorage.setItem('feedbackOrderId', JSON.stringify(order1));
    localStorage.setItem('feedbackProductId', JSON.stringify(product1));
    this.router.navigate(['/user/feedback']);
  }
}
