import { NgModule, ErrorHandler } from '@angular/core';
import { Toast } from '@ionic-native/toast'
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { AssetsPage, AssetDetailPage,PrivacyPolicyPage, LoginPage,ContactUs,PrivacyPolicyModal} from '../pages/pages';
import { TabsPage } from '../pages/tabs/tabs';
import { AuthService } from '../providers/auth-service';
import { DataService } from '../providers/data-service';
import { Configuration } from './app.constants';
import { DecimalRestrictSize } from '../pages/asset-detail/decimalRestrictPipe';
import { CustomCurrencyPipe } from '../pages/asset-detail/customCurrencyPipe';
import { HttpModule } from '@angular/http';
import { BrowserModule } from "@angular/platform-browser";


@NgModule({
  declarations: [
    MyApp,
    AssetsPage,
    AssetDetailPage,
    PrivacyPolicyPage,
    LoginPage,
    TabsPage,
    DecimalRestrictSize,
    CustomCurrencyPipe,
    ContactUs,
    PrivacyPolicyModal
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AssetsPage,
    AssetDetailPage,
    PrivacyPolicyPage,
    LoginPage,
    TabsPage,
    ContactUs,
    PrivacyPolicyModal
  ],
  providers: [Toast, {provide: ErrorHandler, useClass: IonicErrorHandler},AuthService,DataService,Configuration,DecimalRestrictSize,CustomCurrencyPipe]
})
export class AppModule {}
