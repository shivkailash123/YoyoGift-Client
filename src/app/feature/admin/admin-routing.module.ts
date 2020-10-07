import { AdminStatisticsComponent } from './admin-statistics/admin-statistics.component';
import { DisplayOrdersComponent } from './display-orders/display-orders.component';
import { DisplayUsersComponent } from './display-users/display-users.component';
import { AdminSidebarComponent } from './admin-sidebar/admin-sidebar.component';
import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddproductComponent } from './addproduct/addproduct.component';
import { UpdateproductComponent } from './updateproduct/updateproduct.component';
import { AdmindashboardComponent } from './admindashboard/admindashboard.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'adminDashboard',
    pathMatch: 'full'
  },
  {
    path: 'addProduct',
    component: AddproductComponent
  },
  {
    path: 'updateProduct/:id',
    component: UpdateproductComponent
  },
  {
    path: 'adminDashboard',
    component: AdmindashboardComponent
  },
  {
    path: 'displayUsers',
    component: DisplayUsersComponent
  },
  {
    path: 'displayOrders',
    component: DisplayOrdersComponent
  },
  {
    path: 'displayStatistics',
    component: AdminStatisticsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule {}
