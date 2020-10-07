import { CoreModule } from './../../core/core.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddproductComponent } from './addproduct/addproduct.component';
import { UpdateproductComponent } from './updateproduct/updateproduct.component';
import { AdmindashboardComponent } from './admindashboard/admindashboard.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { AdminRoutingModule } from './admin-routing.module';
import {ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import { DataService } from 'src/app/core/service/data.service';
import { AdminSidebarComponent } from './admin-sidebar/admin-sidebar.component';
import { DisplayUsersComponent } from './display-users/display-users.component';
import { DisplayOrdersComponent } from './display-orders/display-orders.component';
import { AdminStatisticsComponent } from './admin-statistics/admin-statistics.component';



@NgModule({
  declarations: [AddproductComponent, UpdateproductComponent, AdmindashboardComponent, AdminSidebarComponent,
    DisplayUsersComponent, DisplayOrdersComponent, AdminStatisticsComponent],
  imports: [
    CoreModule,
    CommonModule,
    SharedModule,
    AdminRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [DataService]
})
export class AdminModule { }
