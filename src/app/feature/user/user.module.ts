import { FeedbackComponent } from './feedback/feedback.component';
import { ProductFilterPipe } from './../../core/pipes/product-filter.pipe';
import { DiscountPipe } from './../../core/pipes/discount.pipe';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomepageComponent } from './homepage/homepage.component';
import { ProductdetailsComponent } from './productdetails/productdetails.component';
import { PaymentothersComponent } from './paymentothers/paymentothers.component';
import { PaymentgiftcardComponent } from './paymentgiftcard/paymentgiftcard.component';
import { UserdasboardComponent } from './userdasboard/userdasboard.component';
import { WalletComponent } from './wallet/wallet.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { UserGuardGuard } from 'src/app/core/guards/user-guard.guard';
import { RouterModule } from '@angular/router';
import { UserRoutingModule } from './user-routing.module';
import { LoginModule } from '../login/login.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { DisplayGiftCardsComponent } from './display-gift-cards/display-gift-cards.component';
import { UpdateprofileComponent } from './updateprofile/updateprofile.component';
import { ProfileComponent } from './profile/profile.component';
import { ReferralcodeComponent } from './referralcode/referralcode.component';

@NgModule({
  declarations: [
    HomepageComponent,
    ProductdetailsComponent,
    PaymentothersComponent,
    PaymentgiftcardComponent,
    UserdasboardComponent,
    WalletComponent,
    DiscountPipe,
    ProductFilterPipe,
    DisplayGiftCardsComponent,
    UpdateprofileComponent,
    ProfileComponent,
    FeedbackComponent,
    ReferralcodeComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule,
    UserRoutingModule,
    LoginModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  exports: [HomepageComponent],
  providers: [UserGuardGuard],
})
export class UserModule {}
