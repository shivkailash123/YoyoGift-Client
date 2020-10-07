import { FeedbackComponent } from './feedback/feedback.component';
import { DisplayGiftCardsComponent } from './display-gift-cards/display-gift-cards.component';
import { ProductdetailsComponent } from './productdetails/productdetails.component';
import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserGuardGuard } from 'src/app/core/guards/user-guard.guard';
import { PaymentgiftcardComponent } from './paymentgiftcard/paymentgiftcard.component';
import { PaymentothersComponent } from './paymentothers/paymentothers.component';
import { WalletComponent } from './wallet/wallet.component';
import { UserdasboardComponent } from './userdasboard/userdasboard.component';
import { HomepageComponent } from './homepage/homepage.component';
import { SignupComponent } from '../login/signup/signup.component';
import { UpdateprofileComponent } from './updateprofile/updateprofile.component';
import { AdminRestrictionsGuard } from 'src/app/core/guards/admin-restrictions.guard';
import { ReferralcodeComponent } from './referralcode/referralcode.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {
    path: 'home',
    component: HomepageComponent
  },
  {
    path: 'payGift',
    component: PaymentgiftcardComponent,
    canActivate: [UserGuardGuard]
  },
  {
    path: 'payOther/:id',
    component: PaymentothersComponent,
    canActivate: [UserGuardGuard]
  },
  {
    path: 'wallet',
    component: WalletComponent,
    canActivate: [UserGuardGuard]
  },
  {
    path: 'userDashboard',
    component: UserdasboardComponent,
    canActivate: [UserGuardGuard]
  },
  {
    path: 'product/:id',
    component: ProductdetailsComponent
  },
  {
    path: 'feedback',
    component: FeedbackComponent,
    canActivate: [UserGuardGuard]
  },
  {
    path: 'signup',
    component: SignupComponent,
    canActivate: [UserGuardGuard]
  },
  {
    path: 'updateProfile',
    component: UpdateprofileComponent,
    canActivate: [UserGuardGuard]
  },
  {
    path: 'giftCards',
    component: DisplayGiftCardsComponent,
    canActivate: [AdminRestrictionsGuard]
  },
  {
    path: 'referalcode',
    component: ReferralcodeComponent,
    canActivate: [UserGuardGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule {}
