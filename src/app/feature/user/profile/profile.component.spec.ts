import { ProfileComponent } from "./profile.component";
import { DataService } from "src/app/core/service/data.service";
import {of } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { async } from '@angular/core/testing';

describe("ProfileComponent", () => {
  let component: ProfileComponent;
  let service: DataService;
  let httpClient: HttpClient;

  beforeEach(() => {
    service = new DataService(httpClient);
    component = new ProfileComponent(service);
    localStorage.setItem('email',JSON.stringify('ravi@yoyogift.com'));

  });
  afterEach(() => {
    localStorage.clear();
  });
  it("should return profile data", () => {
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
    spyOn(service,'getUserData').and.returnValue(of(data1))
    component.ngOnInit();
    expect(component.data).toEqual(data1.response);
  });
});
