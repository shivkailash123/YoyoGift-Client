import { of } from 'rxjs';
import { AdminUserDTO } from './../../../core/models/adminUserDTO';
import { MatSnackBar } from '@angular/material';
import { HttpClient } from '@angular/common/http';
import { DataService } from './../../../core/service/data.service';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayUsersComponent } from './display-users.component';

describe('DisplayUsersComponent', () => {
  let component: DisplayUsersComponent;
  let service: DataService;
  let httpClient: HttpClient;
  let snackbar: MatSnackBar;
  let response: AdminUserDTO[];

  // let fixture: ComponentFixture<DisplayUsersComponent>;
  beforeEach(() => {
    service = new DataService(httpClient);
    component = new DisplayUsersComponent(service, snackbar);
  });

  it('should get all users from service', () => {
    let data = {
      response: [
        {
          userId: 1,
          name: "Someone",
          email: "something@abc.com",
          password: "somePassword",
          phoneNo: "7490832",
          date: "15-12-2020",
          wallet: 555,
        },
        {
          userId: 2,
          name: "Someone",
          email: "something@abc.com",
          password: "somePassword",
          phoneNo: "7490832",
          date: "15-12-2020",
          wallet: 555,
        },
        {
          userId: 2,
          name: "Someone",
          email: "something@abc.com",
          password: "somePassword",
          phoneNo: "7490832",
          date: "15-12-2020",
          wallet: 555,
        }
      ]
    }
    spyOn(service, 'getAllUsers').and.returnValue(of(data));
    component.ngOnInit();
    expect(component.dataSource).toBeDefined();
  });

  // beforeEach(async(() => {
  //   TestBed.configureTestingModule({
  //     declarations: [ DisplayUsersComponent ]
  //   })
  //   .compileComponents();
  // }));

  // beforeEach(() => {
  //   fixture = TestBed.createComponent(DisplayUsersComponent);
  //   component = fixture.componentInstance;
  //   fixture.detectChanges();
  // });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});
