import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { WalletComponent } from "./wallet.component";
import { DataService } from "src/app/core/service/data.service";
import { HttpClient, HttpClientModule } from "@angular/common/http";
import { of } from "rxjs";
import {Location} from '@angular/common';
import {
  FormGroup,
  FormControl,
  Validators,
  ReactiveFormsModule,
} from "@angular/forms";
import { User } from "../User";
import { Data, RouterModule, ActivatedRoute, Router } from "@angular/router";
import { RouterTestingModule } from '@angular/router/testing';

let data1 = {
  userId: 1,
  name: "shiv",
  email: "shiv@yoyogift.com",
  password: "asdfasdfasewr",
  phoneNo: "9845476831",
  date: "22-10-2020",
  wallet: 10,

};

let data = {
  response: {
    message: "Hi shiv 10 Yo Yo Point added to your account",
  }
};

let service: DataService,
  mockUsers = {
    getUserData: jasmine.createSpy('getUserData').and.returnValue(of({response: data1})),
    addAmount: jasmine.createSpy('addAmount').and.returnValue(of(data.response.message))
  };
  describe('WalletComponent', () => {
    let component: WalletComponent;
    let fixture: ComponentFixture<WalletComponent>;
    let Router: Router;
    let route: ActivatedRoute;
    let http: HttpClient;
    let location : Location;
    service = new DataService(http);
    beforeEach(async(() => {
      TestBed.configureTestingModule({
        declarations: [WalletComponent],
        imports: [
          HttpClientModule,
          RouterTestingModule,
          RouterModule.forRoot([]),
          ReactiveFormsModule,
         // Location,
        ],
        providers: [
          {
            provide: DataService,
            useValue: mockUsers,
          },
          {
            provide: route,
          },
          // {
          //   provide: location,
          // }
        ]
      }).compileComponents();
    }));

    beforeEach(() => {
      fixture = TestBed.createComponent(WalletComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
      localStorage.setItem('email', JSON.stringify('shiv@yoyogift.com'));
    });

    it('should print the product details', async(() => {

      component.ngOnInit();
      component.walletDataForm = new FormGroup({
        amount: new FormControl('10')});
      component.onSubmit();
     // component.buyOption('1');
     console.log(component.userData);
    expect(component.userData).toEqual(data1);
    }));
  });


// describe("WalletComponent", () => {
//   let component: WalletComponent;
//   let fixture: ComponentFixture<WalletComponent>;
//   let service: DataService;
//   let httpClient: HttpClient;

//    let route: ActivatedRoute;
//   let router: Router;
//  let _location: Location;



//   beforeEach(async(() => {
//     TestBed.configureTestingModule({
//       declarations: [WalletComponent],
//       imports: [
//         ReactiveFormsModule,
//         HttpClientModule,
//         RouterModule.forRoot([]),
//       ],
//     }).compileComponents();
//   }));

//   beforeEach(() => {
//     fixture = TestBed.createComponent(WalletComponent);
//     component = fixture.componentInstance;
//     fixture.detectChanges();
//     service = new DataService(httpClient);
//     component = new WalletComponent(service, route, router,_location)
//     localStorage.setItem("email", JSON.stringify("shiv@yoyogift.com"));
//   });

//   afterEach(() => {
//     localStorage.clear();
//   });

//   it("should return wallet data", () => {
//     let data = {
//       response: {
//         message: "Hi shiv 10 Yo Yo Point added to your account",
//       },
//     };
//     spyOn(service, "getUserData").and.returnValue(of(data1));
//     spyOn(service, "addAmount").and.returnValue(of(data.response));

//      component.ngOnInit();
//      component.onSubmit();
//      console.log(data.response);

//     expect(component.message).toEqual(
//       "Hi shiv 10 Yo Yo Point added to your account"
//     );
//     //  expect(component.message).toEqual(data1.response);
//   });
// });
