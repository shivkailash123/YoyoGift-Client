import { MatSnackBar } from '@angular/material';
import { ActivatedRoute } from '@angular/router';
import { GiftCard } from './../../../core/models/giftCard';
import { DataService } from 'src/app/core/service/data.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-display-gift-cards',
  templateUrl: './display-gift-cards.component.html',
  styleUrls: ['./display-gift-cards.component.css']
})
export class DisplayGiftCardsComponent implements OnInit {

  userId: any;
  pageLoadingVar = false;
  response: any;
  errorMessage: string;
  giftCards: GiftCard[];
  panelOpenState = false;
  redeemedBalance = 0;

  constructor(private service: DataService, private route: ActivatedRoute, private snackBar: MatSnackBar) { }

  ngOnInit() {
    // this.userId = this.route.snapshot.paramMap.get('id');
    const d = JSON.parse(localStorage.getItem('currentUserData'));
    this.userId = d.userId;
    this.getGiftCards(this.userId);
  }

  getGiftCards(id) {
    this.pageLoadingVar = true;
    this.service.getGiftCards(id).subscribe(
      data => {
        this.response = data;
        this.giftCards = this.response.response;
        this.response = undefined;
        this.pageLoadingVar = false;
        console.log(this.giftCards);
      },
      err => {
        this.pageLoadingVar = true;
        this.response = err;
        this.errorMessage = this.response.error.eror.message;
        this.response = undefined;
        this.pageLoadingVar = false;
        console.log(err);
        console.log(this.errorMessage);
      }
    );
  }

  redeemGiftCard(giftCard: any) {
    this.pageLoadingVar = true;
    this.snackBar.open(`Processing Gift Card`, 'X', {
      duration: 10000,
      horizontalPosition: 'center',
      verticalPosition: 'top',
    });
    this.service.redeemGiftCard(this.userId, giftCard.id).subscribe(
      data => {
        this.response = data;
        this.redeemedBalance += giftCard.amount;
        this.giftCards = this.response.response;
        this.response = undefined;
        this.pageLoadingVar = false;
        this.snackBar.open(`Gift card with ID ${giftCard.id} redeemed.`, 'X', {
          duration: 10000,
          horizontalPosition: 'center',
          verticalPosition: 'top',
        });
      },
      err => {
        this.pageLoadingVar = true;
        this.response = err;
        this.errorMessage = this.response.error.eror.message;
        this.response = undefined;
        this.pageLoadingVar = false;
        this.snackBar.open(this.errorMessage, 'X', {
          duration: 10000,
          horizontalPosition: 'center',
          verticalPosition: 'top',
        });
      }
    );
    this.pageLoadingVar = false;
  }

}
