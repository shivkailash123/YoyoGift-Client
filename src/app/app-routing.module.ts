import { AdminRestrictionsGuard } from './core/guards/admin-restrictions.guard';
import { UserGuardGuard } from 'src/app/core/guards/user-guard.guard';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';
import { AdminGuard } from './core/guards/admin.guard';


const routes: Routes = [

{
  path: '',
  redirectTo: 'user',
  pathMatch: 'full'
},

{
  path: 'user',
  loadChildren: () => import('./feature/user/user.module').then(m => m.UserModule),
},
{
  path: 'admin',
  loadChildren: () => import('./feature/admin/admin.module').then(m => m.AdminModule),
  canActivate: [AdminGuard]
},
{
  path: 'profile',
  loadChildren: () => import('./feature/login/login.module').then(m => m.LoginModule),
  canActivate: [AdminRestrictionsGuard]
},

{
  path: '**',
  redirectTo: ''
}

];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true}),

  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
