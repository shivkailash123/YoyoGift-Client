import { MatSnackBar, MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { AdminOrderDTO } from './../../../core/models/adminOrderDTO';
import { DataService } from 'src/app/core/service/data.service';
import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-display-orders',
  templateUrl: './display-orders.component.html',
  styleUrls: ['./display-orders.component.css']
})
export class DisplayOrdersComponent implements OnInit {

  displayedColumns: string[] = ['orderId', 'orderQuantity', 'amount', 'orderDate', 'userEmail', 'productId'];
  dataSource: MatTableDataSource<AdminOrderDTO>;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  pageLoading: boolean;
  errorMessage: string;
  response: any;

  constructor(private service: DataService, private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.getAllOrders();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  getAllOrders() {
    this.pageLoading = true;
    this.service.getAllOrders().subscribe(
      data => {
        this.response = data;
        let items: AdminOrderDTO[] = this.response.response;
        items.forEach(item => {
          item.amount = Number.parseFloat(item.amount.toFixed(2));
        });
        this.dataSource = new MatTableDataSource(items);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.pageLoading = false;
      },
      err => {
        console.log(err);
        this.response = err;
        this.errorMessage = this.response.error.eror.message;
        this.response = undefined;
        this.snackBar.open(this.errorMessage, 'X', {
          duration: 10000,
        });
        this.pageLoading = false;
      }
    );
  }

}
