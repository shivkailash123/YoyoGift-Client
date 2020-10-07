import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {DataService} from 'src/app/core/service/data.service';
import { HttpClient } from "@angular/common/http";
import { Router } from '@angular/router';
import {of } from "rxjs";
import { SignupComponent } from './signup.component';
import { UserDetails } from './UserDetails';

describe('SignupComponent', () => {
  let component: SignupComponent;
  let service: DataService;
  let httpClient: HttpClient;
  let router:Router;
  beforeEach(() => {
    service = new DataService(httpClient);
    component = new  SignupComponent(service,router);
  });
  it("should save user data", () => {
    let data = {
      response: {
        message: 'Data Sucessfully Updated'
      }
    };
    spyOn(service,'addUser').and.returnValue(of(data));
    component.ngOnInit();
    component.onSubmit();
    expect(component.errormessge).toEqual("Successfully Registered");
  })
});


  // let fixture: ComponentFixture<SignupComponent>;

  // beforeEach(async(() => {
  //   TestBed.configureTestingModule({
  //     declarations: [ SignupComponent ]
  //   })
  //   .compileComponents();
  // }));

  // beforeEach(() => {
  //   fixture = TestBed.createComponent(SignupComponent);
  //   component = fixture.componentInstance;
  //   fixture.detectChanges();
  // });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });

