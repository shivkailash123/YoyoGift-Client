import { of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { DataService } from './../../../core/service/data.service';
import { Router } from '@angular/router';
import { MatDialog, MatSnackBar } from '@angular/material';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdmindashboardComponent } from './admindashboard.component';
import { Overlay } from '@angular/cdk/overlay';

describe('AdmindashboardComponent', () => {
  let component: AdmindashboardComponent;
  let fixture: ComponentFixture<AdmindashboardComponent>;
  let dialog: MatDialog;
  let snackBar: MatSnackBar;
  let router: Router;
  let service: DataService;
  let httpClient: HttpClient
  let data;

  beforeEach(() => {
    service = new DataService(httpClient);
    component = new AdmindashboardComponent(dialog, service, snackBar, router);
    data = {
      response: [
        {
          productId: 5,
          productName: "Bat",
          quantity: 5,
          category: 'Cricket'
        },
        {
          productId: 6,
          productName: "Ball",
          quantity: 6,
          category: 'Cricket'
        }
      ]
    }
    spyOn(service, 'getProducts').and.callFake(() => {
      return of(data);
    })
  });

  it('should get products from service', () => {
    component.ngOnInit();
    let cat = ['Cricket'];
    let categories = new Set(cat);
    expect(component.categories).toBeDefined();
    expect(component.categories).toEqual(categories);
  });

  // it('should delete a product', () => {
  //   service = new DataService(httpClient);
  //   spyOn(service, 'deleteProduct').and.callFake(() => {
  //     return of(data);
  //   })
  //   spyOnProperty(snackBar, 'open').and.callFake(() => {
  //     ``
  //   });
  //   component.ngOnInit();
  //   component.deleteProduct(5);
  //   let cat = ['Cricket'];
  //   let categories = new Set(cat);
  //   expect(component.categories).toBeDefined();
  //   expect(component.categories).toEqual(categories);
  // });

  // beforeEach(async(() => {
  //   TestBed.configureTestingModule({
  //     declarations: [ AdmindashboardComponent ]
  //   })
  //   .compileComponents();
  // }));

  // beforeEach(() => {
  //   fixture = TestBed.createComponent(AdmindashboardComponent);
  //   component = fixture.componentInstance;
  //   fixture.detectChanges();
  // });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});
