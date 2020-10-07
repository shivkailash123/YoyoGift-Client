import { of, Observable } from 'rxjs';
import { MatSnackBar } from '@angular/material';
import { HttpClient } from '@angular/common/http';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayOrdersComponent } from './display-orders.component';
import { DataService } from 'src/app/core/service/data.service';

describe('DisplayOrdersComponent', () => {
  let component: DisplayOrdersComponent;
  let service: DataService;
  let httpClient: HttpClient;
  let snackbar: MatSnackBar;

  beforeEach(() => {
    service = new DataService(httpClient);
    component = new DisplayOrdersComponent(service, snackbar);
  })

  it('should get all orders', () => {
    let data = {
      response: [
        {
          orderId: 1,
          orderQuantity: 1,
          amount: 1,
          orderDate: "Some date",
          userEmail: "Some Email",
          productId: 1,
        },
        {
          orderId: 2,
          orderQuantity: 2,
          amount: 2,
          orderDate: "Some date 2",
          userEmail: "Some Email 2",
          productId: 2,
        },
        {
          orderId: 3,
          orderQuantity: 3,
          amount: 3,
          orderDate: "Some date 3",
          userEmail: "Some Email 3",
          productId: 3,
        }
      ]
    };
    spyOn(service, 'getAllOrders').and.returnValue(of(data));
    component.ngOnInit();
    expect(component.dataSource).toBeDefined();
  });

  // it('should throw error while fetching all orders', () => {
  //   let data = {
  //     error: {
  //       error: {
  //         message: 'Some Error Message'
  //       }
  //     }
  //   };
  //   spyOn(service, 'getAllOrders').and.callFake(() => {
  //     return Observable.throw(new Error(JSON.stringify(data)));
  //   });
  //   component.ngOnInit();
  //   expect(component.errorMessage).toEqual(data.error.error.message);
  // });

  // orderId: number;
  // orderQuantity: number;
  // amount: number;
  // orderDate: string;
  // userEmail: string;
  // productId: number;
  // let fixture: ComponentFixture<DisplayOrdersComponent>;

  // beforeEach(async(() => {
  //   TestBed.configureTestingModule({
  //     declarations: [ DisplayOrdersComponent ]
  //   })
  //   .compileComponents();
  // }));

  // beforeEach(() => {
  //   fixture = TestBed.createComponent(DisplayOrdersComponent);
  //   component = fixture.componentInstance;
  //   fixture.detectChanges();
  // });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});
