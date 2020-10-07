import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from '../../feature/login/login/login.component';
import {SignupComponent} from '../../feature/login/signup/signup.component';
import { LoggedInGuard } from './logged-in.guard';

const routes: Routes = [

{path: '', redirectTo: 'login', pathMatch: 'full'},
{path: 'signup' , component: SignupComponent,
canActivate: [LoggedInGuard]
},
{path: 'login', component: LoginComponent,
canActivate: [LoggedInGuard]
}
];

@NgModule({
  imports: [RouterModule.forChild(routes),
  ],
  exports: [RouterModule]
})
export class LoginRoutingModule { }
