import { AdminUserDTO } from './../../../core/models/adminUserDTO';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort, MatSnackBar } from '@angular/material';
import { DataService } from 'src/app/core/service/data.service';

@Component({
  selector: 'app-display-users',
  templateUrl: './display-users.component.html',
  styleUrls: ['./display-users.component.css']
})
export class DisplayUsersComponent implements OnInit {

  pageLoading: boolean;
  displayedColumns: string[] = ['userId', 'name', 'email', 'phoneNo', 'date', 'wallet'];
  dataSource: MatTableDataSource<AdminUserDTO>;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  errorMessage: string;
  response: any;

  constructor(private service: DataService, private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.getAllUsers();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  getAllUsers() {
    this.pageLoading = true;
    this.service.getAllUsers().subscribe(
      data => {
        this.response = data;
        let items: AdminUserDTO[] = this.response.response;
        items.forEach(item => {
          item.wallet = Number.parseFloat(item.wallet.toFixed(2));
        });
        this.dataSource = new MatTableDataSource(this.response.response);
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
