import { Component, OnInit } from '@angular/core';
import {FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { DataService } from 'src/app/core/service/data.service';
import {ProductDetail} from './ProductDet';



@Component({
  selector: 'app-updateproduct',
  templateUrl: './updateproduct.component.html',
  styleUrls: ['./updateproduct.component.css']
})
export class UpdateproductComponent implements OnInit {
  myform: FormGroup;
  productName: FormControl;
  price: FormControl;
  category: FormControl;
  description: FormControl;
  discount: FormControl;
  stock: FormControl;
  url: FormControl;
  vendor: FormControl;
  product: ProductDetail;
  // tslint:disable-next-line: no-inferrable-types
 spinner: boolean = false;
 // tslint:disable-next-line: no-inferrable-types
 spinner1: boolean = true;
 message: string;
 // tslint:disable-next-line: no-inferrable-types
 sucess: boolean = false;
 errorMessage:string;
 pageLoading:boolean = false;
  constructor(private service: DataService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.createFormControls();
    this.createForm();
    this.setForm();
    this.pageLoading=true;
  }

  onSubmit() {
    this.product = {
      productId: Number.parseInt(this.route.snapshot.paramMap.get("id")),
      productName: this.myform.value.productName,
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
    this.service.updateProduct(this.product).subscribe((response: any) => {
      console.log(response);
      this.spinner = false;
      this.sucess = true;
      this.message = 'Sucessfully Updated';
      setTimeout(() => {
        this.router.navigate(['/admin'] ); }, 1600);

    } ,
    error => {
      console.log(error.error.eror.message);
  }
  );
  }
  createFormControls() {
    this.productName = new FormControl('', [Validators.required, Validators.pattern('^[A-za-z]+([\\s]?[a-zA-Z]+)*')]);
    this.price = new FormControl('', [Validators.required, Validators.pattern('^[1-9]+([0-9])*')]);
    this.category = new FormControl('', [Validators.required, Validators.pattern('^[A-za-z]+([\\s]?[a-zA-Z]+)*')]);
    this.description = new FormControl('', [Validators.required, Validators.pattern('^[A-za-z]+([\\s]?[a-zA-Z\\s]+)*')]);
    this.discount = new FormControl('', [Validators.required, Validators.pattern('([0-9]|[1-8][0-9]|90)')]);
    this.stock = new FormControl('', [Validators.required, Validators.pattern('^[0-9]+[0-9]*')]);
    this.url = new FormControl('', [Validators.required,Validators.pattern('^.*\.(jpg|JPG|png|PNG)')]);
    this.vendor = new FormControl('', [Validators.required, Validators.pattern('^[A-za-z]+([\\s]?[a-zA-Z]+)*')]);
  }
  createForm() {
    this.myform = new FormGroup({
    productName: this.productName,
    price: this.price,
    category: this.category,
    description: this.description,
    discount: this.discount,
    stock: this.stock,
    url: this.url,
    vendor: this.vendor,
    });
    }
    setForm() {
      this.service.getProductDetail(this.route.snapshot.paramMap.get("id")).subscribe((response: any) => {
        this.product = response.response;

        this.myform.setValue({
          productName: this.product.productName,
          price: this.product.price,
          category: this.product.category,
          description: this.product.description,
          discount: this.product.discount,
          stock: this.product.stock,
          url: this.product.imageUrl,
          vendor: this.product.vendor,
        });
       this.pageLoading=false;
        });


    }


}
