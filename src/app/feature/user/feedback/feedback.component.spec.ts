import { Route } from '@angular/compiler/src/core';
import { UserData } from '../../login/login/profile';
import { User } from '../User';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Provider } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { SubCommandDescription } from '@angular/cli/models/interface';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { DataService } from '../../../core/service/data.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductDisplay } from './productDisplay';
import { sendfeedback } from './feedback';
import { FeedbackComponent } from './feedback.component';
import { HttpClient } from "@angular/common/http";
import {of } from "rxjs";
// describe('FeedbackComponent', () => {
//   let component: FeedbackComponent;
//   let fixture: ComponentFixture<FeedbackComponent>;
//   let service: DataService;
//   let httpClient: HttpClient;
//   let route :ActivatedRoute;
//   let router: Router;
//    beforeEach(() => {
//     let data1 = {
//       response: {
//         userId: 1,
//         name: "ravi",
//         phoneNo: "9487636743",
//         email: "abc@yoyogift.com",
//         password: "Adsfaggfsgdafsdsagfdsa",
//         wallet: 1000,
//       },
//     };
//     service=new DataService(httpClient);
//     component=new FeedbackComponent(service,route,router);
//     localStorage.setItem('productId',JSON.stringify('1'));
//     localStorage.setItem('currentUserData',JSON.stringify('data1'));
//     localStorage.setItem('orderId',JSON.stringify('1'));
//   });
//   afterEach(() =>
//   {
// localStorage.clear();
//   });

//   it('should return feedback and print the display data ', () => {
//     let feedbackData=
//     {
//      ratingPoint: 2,
//      review:"ertyui",
//      feedbackId:0
//     }

//    let productData=
//    {
//     productId: 1,
//     productName: "Some",
//     category: "Gift Card",
//     price: 100,
//     description: "Some Description",
//     stock: 4,
//     discount: 10,
//     date: "Date",
//     vendor: "Market",
//     imageUrl: "url",
//     ratingAvg: 2,
//    }
//    spyOn(service,'getProductDetail').and.returnValue(of(productData))
//    spyOn(service,'addFeedbackDetail').and.returnValue(of(feedbackData))
//    component.ngOnInit();
//    component.onSubmit();
//    expect(component.productdisplay).toEqual(productData);
//    expect(component.userfeedback).toEqual(feedbackData);
//   });
// });
