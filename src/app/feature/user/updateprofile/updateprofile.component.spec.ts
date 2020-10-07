import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateprofileComponent } from './updateprofile.component';
import { MatSnackBar } from '@angular/material';
import { DataService } from 'src/app/core/service/data.service';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';
import { UserData } from '../../login/login/profile';
import { FormGroup, FormControl } from '@angular/forms';

describe('UpdateprofileComponent', () => {
  let component: UpdateprofileComponent;
  let fixture: ComponentFixture<UpdateprofileComponent>;
  let snackBar: MatSnackBar;
  let service: DataService;
  let httpClient: HttpClient;

  beforeEach(() => {
    service = new DataService(httpClient);
    component = new UpdateprofileComponent(snackBar, service);
    const dummyProfileData: UserData[] = [
      {
        userId: 1,
        name: "ravi",
        phoneNo: "9487636743",
        email: "abc@yoyogift.com",
        password: "Adsfaggfsgdafsdsagfdsa",
        wallet: 1000,
      },]
    localStorage.setItem('currentUserData',JSON.stringify(dummyProfileData))
  });
  afterEach(() =>{
localStorage.clear();
  });

  it('should return a sucess message', () =>{
          let data = {
            response: {
              message: 'Data Sucessfully Updated'
            }
          }
    spyOn(service, 'updateUserData').and.returnValue(of(data));
    component.ngOnInit();
    component.submitUpdateData();
    expect(component.sucessMessage).toEqual('Data Sucessfully Updated');
    })
  });
