import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {DataService} from 'src/app/core/service/data.service';
import { HttpClient } from "@angular/common/http";
import { Router } from '@angular/router';
import {of } from "rxjs";
import { UserdasboardComponent } from './userdasboard.component';
import { OrderDetail } from './OrderDetails';

describe('UserdasboardComponent', () => {
  let component: UserdasboardComponent;
  let service: DataService;
  let httpClient: HttpClient;
  let router:Router;

  beforeEach(() => {
    service = new DataService(httpClient);
    component = new  UserdasboardComponent(service,router);
    localStorage.setItem('email',JSON.stringify('ravi@yoyogift.com'));

  });
  afterEach(() => {
    localStorage.clear();
  });
  it("should return list of orders", () => {
    let data1:OrderDetail[] = [
       {
        amount: 80,
        feedback: true,
        productId:1,
        orderId:123,
        productName:"Watch",
        productQuantity:1,
        userDate:"06-04-2020",
        vendor:"GameSpot"
      },
      {
        amount: 290,
        feedback: false,
        productId:1,
        orderId:124,
        productName:"Mug",
        productQuantity:1,
        userDate:"06-04-2020",
        vendor:"Walmart"
      },
    ];
    spyOn(service,'getOrders').and.returnValue(of(data1))
    component.ngOnInit();
    expect(component.order).toEqual(data1);
  });

  // let fixture: ComponentFixture<UserdasboardComponent>;



  // beforeEach(async(() => {
  //   TestBed.configureTestingModule({
  //     declarations: [ UserdasboardComponent ]
  //   })
  //   .compileComponents();
  // }));

  // beforeEach(() => {
  //   fixture = TestBed.createComponent(UserdasboardComponent);
  //   component = fixture.componentInstance;
  //   fixture.detectChanges();
  // });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});
