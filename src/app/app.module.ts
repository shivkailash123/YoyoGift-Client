import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { CoreModule } from './core/core.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { SocialLoginModule, AuthServiceConfig } from 'angularx-social-login';
import { GoogleLoginProvider, FacebookLoginProvider } from 'angularx-social-login';

const ids = {
  devFbId: '218932812548216',
  localFbId: '262497914916046',
  qaFbId: '509718976573387'
};
const googleIds = {
  devGoogleId:   '332917477713-cpk6p7puik74dq3j194iqlocgt7mctuu.apps.googleusercontent.com',
  localGoogleId: '124552719629-rrf3hse5rmpm1ui7qhjtf2ab68jievp7.apps.googleusercontent.com',
  qaGoogleId: '25965615827-gb3lbpb5je6jpcfr9ln8ni8flis41drn.apps.googleusercontent.com'
};
const config = new AuthServiceConfig([
  {
    id: GoogleLoginProvider.PROVIDER_ID,
    provider: new GoogleLoginProvider(googleIds.qaGoogleId)
  },
  {
    id: FacebookLoginProvider.PROVIDER_ID,
    provider: new FacebookLoginProvider(ids.qaFbId)
  }
]);
export function provideConfig() {
  return config;
}

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    SharedModule,
    CoreModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    SocialLoginModule,
  ],
  providers: [ {
    provide: AuthServiceConfig,
    useFactory: provideConfig
  } ],
  bootstrap: [AppComponent],
})
export class AppModule { }
