import { AppModule } from './../../../app.module';
import { SharedModule } from './../../../shared/shared.module';
import { AdminSidebarComponent } from './../admin-sidebar/admin-sidebar.component';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';
import { DataService } from './../../../core/service/data.service';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminStatisticsComponent } from './admin-statistics.component';

const response = {
  response: {
    productCategories: ['Mugs', 'Sporting Items', 'Something Else', 'Gift Card'],
    productCountByCategory: [2, 3, 3, 1],
    purchaseTimes: ['Some date', 'Some other Date'],
    purchaseTimesCount: [2, 3],
    topSellingProducts: ['Some', 'Other'],
    topSellingProductsCount: [10, 12],
    usersJoiningDate: ['Hello', 'Bye'],
    usersJoiningDateCount: [5, 10]
  }
}

describe('AdminStatisticsComponent', () => {

  // let component: AdminStatisticsComponent;
  // let fixture: ComponentFixture<AdminStatisticsComponent>;
  // let http: HttpClient;
  // let service: DataService;

  // beforeEach(async(() => {
  //   TestBed.configureTestingModule({
  //     declarations: [AdminStatisticsComponent, AdminSidebarComponent],
  //     imports: [AppModule, SharedModule]
  //   });
  // }));

  // beforeEach(() => {
  //   service = new DataService(http);
  //   fixture = TestBed.createComponent(AdminStatisticsComponent);
  // });

  // it('should get statistics data', () => {
  //   spyOn(service, 'getStatisticsData').and.returnValue(of(response));
  //   component.ngOnInit();
  // })

  // let component: AdminStatisticsComponent;
  // // let fixture: ComponentFixture<AdminStatisticsComponent>;
  // let service: DataService;
  // let httpClient: HttpClient;

  // beforeEach(async(() => {
  //   TestBed.configureTestingModule({
  //     declarations: [AdminStatisticsComponent, AdminSidebarComponent],
  //     imports: [AppModule, SharedModule, CoreModule],
  //   }).compileComponents();
  // }));

  // it('should get statistics data', () => {
  //   service = new DataService(httpClient);
  //   component = new AdminStatisticsComponent(service);
  //   let data = {
  //     response: {
  //       productCategories: ['Mugs', 'Sporting Items', 'Something Else', 'Gift Card'],
  //       productCountByCategory: [2, 3, 3, 1],
  //       purchaseTimes: ['Some date', 'Some other Date'],
  //       purchaseTimesCount: [2, 3],
  //       topSellingProducts: ['Some', 'Other'],
  //       topSellingProductsCount: [10, 12],
  //       usersJoiningDate: ['Hello', 'Bye'],
  //       usersJoiningDateCount: [5, 10]
  //     }
  //   };
  //   spyOn(service, 'getStatisticsData').and.callFake(() => {
  //     return of(data);
  //   });
  //   component.ngOnInit();
  //   expect(component.statistics.productCategories.length).toEqual(3);
  // });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});
