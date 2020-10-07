import { of } from 'rxjs';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { DataService } from './../../../core/service/data.service';
import { ComponentFixture } from '@angular/core/testing';

import { HomepageComponent } from './homepage.component';

describe('HomepageComponent', () => {
  // let component: HomepageComponent;
  // let service: DataService;
  // let router: Router;
  // let fb: FormBuilder;
  // let http: HttpClient;
  // let fixture: ComponentFixture<HomepageComponent>;

  // beforeEach(() => {
  //   service = new DataService(http);
  //   component = new HomepageComponent(service, router, fb);
  // })

  // it('should load all products from service', () => {
  //   let data = {
  //     response: [
  //       {
  //         productId: 1,
  //         productName: "Some",
  //         category: "Gift Card",
  //         price: 100,
  //         description: "Some Description",
  //         stock: 4,
  //         discount: 10,
  //         date: "Date",
  //         vendor: "Market",
  //         imageUrl: "url",
  //         ratingAvg: 2,
  //       },
  //       {
  //         productId: 2,
  //         productName: "Some",
  //         category: "Hello",
  //         price: 500,
  //         description: "Some Description",
  //         stock: 4,
  //         discount: 10,
  //         date: "Date",
  //         vendor: "Market",
  //         imageUrl: "url",
  //         ratingAvg: 2,
  //       },
  //       {
  //         productId: 1,
  //         productName: "Some",
  //         category: "Something Else",
  //         price: 600,
  //         description: "Some Description",
  //         stock: 4,
  //         discount: 10,
  //         date: "Date",
  //         vendor: "Market",
  //         imageUrl: "url",
  //         ratingAvg: 2,
  //       }
  //     ]
  //   };
  //   spyOn(service, 'getProducts').and.returnValue(of(data));
  //   component.ngOnInit();
  //   expect(component.products).toBeDefined();
  // });

});
