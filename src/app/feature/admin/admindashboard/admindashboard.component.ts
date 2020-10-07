import { MatConfirmationModalComponent } from './../../../core/mat-confirmation-modal/mat-confirmation-modal.component';
import { Product } from './../../../core/models/product';
import { DataService } from 'src/app/core/service/data.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSnackBar, MatTableDataSource, MatPaginator, MatSort, MatDialog } from '@angular/material';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admindashboard',
  templateUrl: './admindashboard.component.html',
  styleUrls: ['./admindashboard.component.css']
})
export class AdmindashboardComponent implements OnInit {

  buttonDisable: boolean;
  response;
  dataSource: MatTableDataSource<Product>;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  products: Product[];
  errorMessage: string;
  pageLoading: boolean;
  categories: Set<string>;
  displayedColumns: string[] = ['productId', 'productName', 'category', 'price', 'stock', 'discount', 'vendor', 'actions'];

  constructor(public dialog: MatDialog, private service: DataService, private snackBar: MatSnackBar, private router: Router) { }

  ngOnInit() {
    this.getProducts();
  }

  getProducts() {
    this.pageLoading = true;
    this.buttonDisable = false;
    this.service.getProducts().subscribe(
      data => {
        this.response = data;
        this.products = this.response.response;
        this.filterProducts();
        this.setTableProperties();
        this.generateCategories();
        this.pageLoading = false;
        this.products = undefined;
      },
      err => {
        this.response = err;
        this.errorMessage = this.response.error.eror.message;
        this.response = undefined;
        this.pageLoading = false;
      }
    );
  }

  filterProducts() {
    this.products = this.products.filter(product => product.category != "Gift Card");
  }

  generateCategories() {
    let categorySet = new Set<string>();
    this.products.forEach(
      product => {
        categorySet.add(product.category);
      }
    );
    this.categories = categorySet;
  }

  setTableProperties() {
    this.dataSource = new MatTableDataSource(this.products);
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

  openDialog(id: number) {
    const dialogRef = this.dialog.open(MatConfirmationModalComponent, {
      width: '300px',
      data: `Are you sure you want to delete Product with ID${id}?`
    });
    dialogRef.afterClosed().subscribe(result => {
      if(result) {
        console.log(`Product being deleted with ID ${id}`);
        this.deleteProduct(id);
      }
    })
  }

  deleteProduct(id: number) {
    this.buttonDisable = true;
    
    this.snackBar.open(`Product of ID ${id} is being deleted, please wait..`, 'X', {
      duration: 10000,
    });
    console.log(id);
    this.pageLoading = true;
    this.service.deleteProduct(id).subscribe(data => {
      this.response = data;
      this.getProducts();
      this.pageLoading = false;
      this.snackBar.open(`${this.response.response.productName} with Product ID ${this.response.response.productId} Deleted`, 'X', {
        duration: 10000,
      });
      this.response = undefined;
    },
      err => {
        console.log(err);
        this.response = err;
        this.errorMessage = this.response.error.eror.message;
        this.response = undefined;
        this.pageLoading = false;
        this.snackBar.open(this.errorMessage, 'X', {
          duration: 10000,
        });
      }
    );
    this.buttonDisable = false;
  }

  redirectToUpdate(id: number) {
    // console.log(`Tried to Redirect to Update with ${id} but that has not been implemented yet.`);
    this.router.navigate(['/admin/updateProduct', id]);
  }

  redirectToAddProduct() {
    // console.log(`Tried to Redirect to Add Product Page but that has not been implemented yet.`);
    this.router.navigate(['/admin/addProduct']);
  }

}


