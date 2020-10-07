import { SubCommandDescription } from '@angular/cli/models/interface';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DataService } from '../../../core/service/data.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductDisplay } from './productDisplay';
import { sendfeedback } from './feedback';
@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.css']
})
export class FeedbackComponent implements OnInit {

  errorMessage: string;
  productId: any;
  userId: any;
  orderId: any;
  productdisplay: ProductDisplay;
  total: any;
  spinner = true;
  loading = false;
  userfeedback: sendfeedback;
  FeedBackForm = new FormGroup({
    review: new FormControl(''),
    star: new FormControl('', [Validators.maxLength(100), Validators.required]),
  });

  constructor(private service: DataService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    //  this.addFeedback(this.route.snapshot.paramMap.get("productId"+/"userid"));
    // this.route.params.subscribe((params) => {
    //   this.productId = params.productid;
    //   this.userId = params.userid;
    //   this.orderId = params.orderid;
    //   // console.log(this.productId,this.userId);
    // }, err => {
    //     console.log('error happened');
    //     const response = err;
    //     this.errorMessage = response.error.eror.message;
    //     this.spinner = false;
    //     this.loading = false;
    //   });
    const d = JSON.parse(localStorage.getItem('currentUserData'));
    this.userId = d.userId;
    this.productId = JSON.parse(localStorage.getItem('feedbackProductId'));
    this.orderId = JSON.parse(localStorage.getItem('feedbackOrderId'));
    if (this.userId == undefined || this.productId == undefined || this.orderId == undefined) {
      this.router.navigate(['/user/userDashboard']);
    }
    this.addFeedback(this.productId, this.userId, this.orderId);
  }
  addFeedback(productId: any, userId: any, orderId: any) {
    this.service.getProductDetail(productId).subscribe((response: any) => {
      // console.log(response);
      this.productdisplay = response.response;
      console.log(this.productdisplay);
      this.total =
        this.productdisplay.price - (this.productdisplay.price * this.productdisplay.discount) / 100;
      this.spinner = false;
    }, err => {
        console.log('error happened');
        const response = err;
        this.errorMessage = response.error.eror.message;
        this.spinner = false;
        this.loading = false;
      }
    );
  }

  onSubmit() {
    // this.spinner=true;
    this.loading = true;
    this.userfeedback = {
      ratingPoint: this.FeedBackForm.get('star').value,
      review: this.FeedBackForm.get('review').value,
      feedbackId: 0
    };
    this.service.addFeedbackDetail(this.productId, this.userId, this.orderId, this.userfeedback).subscribe(response => {
      console.log(response);
      this.loading = false;
      var modal = document.getElementById('myModal');
      modal.style.display = 'block';
      var btn = document.getElementById('myBtn');
      window.onclick = function (event) {
        if (event.target == modal) {

          modal.style.display = 'none';
        }
      };
      localStorage.removeItem('feedbackOrderId');
      localStorage.removeItem('feedbackProductId');
    }, err => {
      console.log('error happened');
      const response = err;
      this.errorMessage = response.error.eror.message;
      this.spinner = false;
      this.loading = false;
      localStorage.removeItem('feedbackOrderId');
      localStorage.removeItem('feedbackProductId');
    });
    // var modal = document.getElementById('myModal');
    //modal.style.display = 'block';
    //var btn = document.getElementById('myBtn');
    //window.onclick = function(event) {
    //if (event.target == modal) {

    //modal.style.display = 'none';
    //}
    //};
  }
  redirectToUserDashboard() {
    document.getElementById('myModal').style.display = 'none';
    this.router.navigate(['/user/userDashboard']);
  }
  closeModal() {
    let modal = document.getElementById('myModal');
    modal.style.display = 'none';
  }
}
