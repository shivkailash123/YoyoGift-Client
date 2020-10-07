import { Component, OnInit } from '@angular/core';
import {FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from 'src/app/core/service/data.service';
import {ProductDetails} from './ProductDetail';

@Component({
  selector: 'app-addproduct',
  templateUrl: './addproduct.component.html',
  styleUrls: ['./addproduct.component.css']
})
export class AddproductComponent implements OnInit {
 myform: FormGroup;
 productname: FormControl;
 price: FormControl;
 category: FormControl;
 description: FormControl;
 discount: FormControl;
 stock: FormControl;
 url: FormControl;
 vendor: FormControl;
 product: ProductDetails;
 errorMessage:string;
 pageLoading:boolean = false;
 // tslint:disable-next-line: no-inferrable-types
 spinner: boolean = false;
 message: string;
 // tslint:disable-next-line: no-inferrable-types
 sucess: boolean = false;
constructor(private service: DataService, private router: Router) { }

  ngOnInit() {
    this.createFormControls();
    this.createForm();

  }
  onSubmit() {
    this.product = {
      productName: this.myform.value.productname,
      price: this.myform.value.price,
      category: this.myform.value.category,
      description: this.myform.value.description,
      discount: this.myform.value.discount,
      stock: this.myform.value.stock,
      imageUrl: this.myform.value.url,
      vendor: this.myform.value.vendor,
    };
    this.spinner = true;
    console.log(this.product);
    this.service.addProduct(this.product).subscribe((response: any) => {
      console.log(response);

      this.sucess = true;
      this.spinner = false;
      this.myform.reset();
      this.message = 'Succesfully Added ';
      setTimeout(() => {
      this.router.navigate(['/admin'] ); }, 1600);

    } ,
    error => {
      console.log(error.error.eror.message);
  }
  );
  }
  createFormControls() {
    this.productname = new FormControl('', [Validators.required, Validators.pattern('^[A-za-z]+([\\s]?[a-zA-Z]+)*')]);
    this.price = new FormControl('', [Validators.required, Validators.pattern('^[1-9]+([0-9])*')]);
    this.category = new FormControl('', [Validators.required, Validators.pattern('^[A-za-z]+([\\s]?[a-zA-Z]+)*')]);
    this.description = new FormControl('', [Validators.required, Validators.pattern('^[A-za-z]+([\\s]?[a-zA-Z\\s]+)*')]);
    this.discount = new FormControl('', [Validators.required, Validators.pattern('([0-9]|[1-8][0-9]|90)')]);
    this.stock = new FormControl('', [Validators.required, Validators.pattern('^[1-9]+[0-9]*')]);
    this.url = new FormControl('', [Validators.required,Validators.pattern('^.*\.(jpg|JPG|png|PNG)')]);
    this.vendor = new FormControl('', [Validators.required, Validators.pattern('^[A-za-z]+([\\s]?[a-zA-Z]+)*')]);
  }
  createForm() {
    this.myform = new FormGroup({
    productname: this.productname,
    price: this.price,
    category: this.category,
    description: this.description,
    discount: this.discount,
    stock: this.stock,
    url: this.url,
    vendor: this.vendor,
    });
  }

}
