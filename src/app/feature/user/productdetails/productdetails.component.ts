import { feedBackDisplay } from '../../../core/models/feedBackDisplay';
import { ActivatedRoute, Router } from "@angular/router";
import { ProductDto } from "./ProductDto";
import { DataService } from "../../../core/service/data.service";
import { Component, OnInit } from "@angular/core";
import { Error } from "../../../core/models/error";
@Component({
  selector: 'app-productdetails',
  templateUrl: "./productdetails.component.html",
  styleUrls: ["./productdetails.component.css"]
})
export class ProductdetailsComponent implements OnInit {
  product: ProductDto;
  feedbackDisplay: feedBackDisplay[] = [];
  total: any;
  error: Error;
  errorMessage: string;
  spinner: boolean = true;
  constructor(private service: DataService, private route: ActivatedRoute, private router: Router) { }
  ngOnInit() {
    this.route.params.subscribe(values => {
      this.viewDetail(values.id);
    })
  }
  viewDetail(productId: string) {
    this.service.getProductDetail(productId).subscribe((response: any) => {
      console.log('view detail', response);
      this.product = response.response;
      this.total = Math.round(
        this.product.price - (this.product.price * this.product.discount) / 100);
      //console.log(response.response);
      this.spinner = false;
    },
    err => {
      const response = err;
      this.errorMessage = response.error.eror.message;
      this.spinner = false;
    });
    this.service.getReviewsRating(productId).subscribe((response: any) => {
      this.feedbackDisplay = response.response;
      console.log('review', this.feedbackDisplay);
    });
  }
  buyOption(productId) {
    if (localStorage.getItem('user') === 'true') {
      this.router.navigate(['/user/payOther', productId]);
      this.spinner = false;
    } else {
      this.spinner = false;
      // alert('You Need Login First');
      // this.router.navigate(['/profile/login']);
      var modal = document.getElementById("myModal");
      if (modal) {
        modal.style.display = "block";
      }
      var btn = document.getElementById("myBtn");
      window.onclick = function (event) {
        if (modal && event.target == modal) {
          modal.style.display = "none";
        }
      }
    }
  }
  redirectToLogin() {
    localStorage.clear();
    document.getElementById("myModal").style.display = "none";
    this.router.navigate(['/profile/login']);
  }
  closeModal() {
    var modal = document.getElementById("myModal");
    modal.style.display = "none";
  }

}
