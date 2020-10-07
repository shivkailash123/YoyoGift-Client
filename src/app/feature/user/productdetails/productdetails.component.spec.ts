import { Product } from '../../../core/models/product';
import { feedBackDisplay } from '../../../core/models/feedBackDisplay';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ProductdetailsComponent } from './productdetails.component';
import { Route } from '@angular/compiler/src/core';
import { UserData } from '../../login/login/profile';
import { User } from '../User';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Provider } from '@angular/core';
import { SubCommandDescription } from '@angular/cli/models/interface';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { DataService } from '../../../core/service/data.service';
import { ActivatedRoute, convertToParamMap, ParamMap, Router } from '@angular/router';
import { of } from "rxjs";
import { HttpClient, HttpClientModule } from '@angular/common/http';

let data = {
  response: {
    productId: 1,
    productName: "Some",
    category: "Gift Card",
    price: 100,
    description: "Some Description",
    stock: 4,
    discount: 10,
    date: "Date",
    vendor: "Market",
    imageUrl: "url",
    ratingAvg: 2
  }

}
let feedbackDisplayData = {
  response: [
    {
      ratingPoint: 4,
      review: "Good",
      name: "priyank"
    },
    {
      ratingPoint: 3,
      review: "Nice",
      name: "priyank"
    }]
};

let data1 = {
  response: {
    userId: 1,
    name: "ravi",
    phoneNo: "9487636743",
    email: "abc@yoyogift.com",
    password: "Adsfaggfsgdafsdsagfdsa",
    wallet: 1000,
  },
};
let service: DataService,
  mockUsers = {
    getProductDetail: jasmine.createSpy('getProductDetail').and.returnValue(of(data)),
    getReviewsRating: jasmine.createSpy('getReviewsRating').and.returnValue(of(feedbackDisplayData))
  };

  let router: ActivatedRoute,
  mockRouter = {
    params: jasmine.createSpy('params').and.returnValue(of(1))
  }

describe('ProductdetailsComponent', () => {
  let component: ProductdetailsComponent;
  let fixture: ComponentFixture<ProductdetailsComponent>;
  let Router: Router;
  let route: ActivatedRoute;
  let http: HttpClient;
  service = new DataService(http);
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ProductdetailsComponent],
      imports: [
        HttpClientModule,
        RouterTestingModule
      ],
      providers: [
        {
          provide: DataService,
          useValue: mockUsers,
        },
        {
          provide: route,
          useValue: mockRouter
        }
      ]
    }).compileComponents();
  }));
  beforeEach(() => {
    fixture = TestBed.createComponent(ProductdetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    localStorage.setItem('productId', JSON.stringify(1));
    localStorage.setItem('currentUserData', JSON.stringify('data1'));
    localStorage.setItem('user', JSON.stringify('true'));
  });

  it('should print the product details', async(() => {
    component.viewDetail('1');
    component.buyOption('1');
    expect(component.product).toEqual(data.response);
    expect(component.feedbackDisplay).toEqual(feedbackDisplayData.response);
    // expect(router.navigate).toHaveBeenCalledWith(['/profile/login']);
  }));
});
