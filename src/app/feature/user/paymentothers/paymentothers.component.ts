import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Product } from '../Product';
import { DataService } from 'src/app/core/service/data.service';
import { User } from '../User';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-paymentothers',
  templateUrl: './paymentothers.component.html',
  styleUrls: ['./paymentothers.component.css']
})
export class PaymentothersComponent implements OnInit {
  productDataForm: FormGroup;
  productDetail: Product;
  id: number;
  email: string;
  userData: User;
  quantity: number;
   // tslint:disable-next-line: no-inferrable-types
  addMoneyButtonVar: boolean = false;
  // tslint:disable-next-line: no-inferrable-types
  spinner: boolean = false;
  errormessage: string;
  message: string;
  profile: any;
  // tslint:disable-next-line: no-inferrable-types
  buttonVar: boolean = false;

  constructor(private service: DataService, private route: ActivatedRoute, private router: Router) {}

  ngOnInit() {
    this.productDataForm = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.pattern('^[A-Za-z ]+$')]),
      address: new FormControl('', Validators.required)
    });
    const id = this.route.snapshot.paramMap.get('id');
    this.service.getUserData(JSON.parse(localStorage.getItem('email'))).subscribe(data => {
      this.userData = data.response;
      console.log(this.userData);
    });

    this.service.getProduct((id)).subscribe(data => {
      this.productDetail = data.response;
    });
  }
  addMoney(){

    this.router.navigateByUrl("/user/wallet");
  }

  redirectToHome() {
    document.getElementById("myModal").style.display = "none";
    this.router.navigate(['/user/home']);
  }

  closeModal() {
    var modal = document.getElementById("myModal");
    modal.style.display = "none";
  }


  onSubmit() {
    this.productDataForm.markAllAsTouched();
    if(this.productDataForm.valid){
    this.spinner = true;
    this.buttonVar = true;
    this.addMoneyButtonVar = true;
    this.service
      .productOrder(
        this.productDetail.productId,
        this.userData.userId,
        (this.quantity = 1)
      )
      .subscribe(
        response => {
          this.ngOnInit();
          this.spinner = false;
          this.buttonVar = false;
          this.addMoneyButtonVar = false;
          this.message = response.response;
          console.log(this.addMoneyButtonVar);
          var modal = document.getElementById("myModal");
          modal.style.display = "block";
          var btn = document.getElementById("myBtn");
          window.onclick = function (event) {
            if (event.target == modal) {
              modal.style.display = "none";
            }
          }

        },
        error => {
          this.spinner = false;
          console.log(this.addMoneyButtonVar);
          this.buttonVar = false;
          this.addMoneyButtonVar = false;
          this.errormessage = error.error.eror.message;
        }
      );
  }
}
}
