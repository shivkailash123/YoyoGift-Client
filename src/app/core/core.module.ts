import { SharedModule } from './../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { RouterModule } from '@angular/router';
import { MatConfirmationModalComponent } from './mat-confirmation-modal/mat-confirmation-modal.component';

@NgModule({
  declarations: [HeaderComponent, FooterComponent, MatConfirmationModalComponent],
  imports: [
    CommonModule,
    RouterModule,
    SharedModule
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    MatConfirmationModalComponent
  ],
  entryComponents: [MatConfirmationModalComponent]
})
export class CoreModule { }
