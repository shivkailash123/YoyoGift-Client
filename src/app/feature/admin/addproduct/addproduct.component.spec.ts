import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {DataService} from 'src/app/core/service/data.service';
import { HttpClient } from "@angular/common/http";
import { Router } from '@angular/router';
import { AddproductComponent } from './addproduct.component';
import {of } from "rxjs";

describe('AddproductComponent', () => {
  let component: AddproductComponent;
  let service: DataService;
  let httpClient: HttpClient;
  let router:Router;
  beforeEach(() => {
    service = new DataService(httpClient);
    component = new  AddproductComponent(service,router);
  });
  it("should save product to db", () => {
    let data = {
      response: {
        message: 'Data Sucessfully Updated'
      }
    };
    spyOn(service,'addProduct').and.returnValue(of(data));
    component.ngOnInit();
    component.onSubmit();
    expect(component.message).toEqual("Succesfully Added ");
  })
});
  // let fixture: ComponentFixture<AddproductComponent>;

  // beforeEach(async(() => {
  //   TestBed.configureTestingModule({
  //     declarations: [ AddproductComponent ]
  //   })
  //   .compileComponents();
  // }));

  // beforeEach(() => {
  //   fixture = TestBed.createComponent(AddproductComponent);
  //   component = fixture.componentInstance;
  //   fixture.detectChanges();
  // });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });

