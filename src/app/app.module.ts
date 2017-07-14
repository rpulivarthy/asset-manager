import { NgModule, ErrorHandler } from '@angular/core';
import { Toast } from '@ionic-native/toast'
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { AssetsPage, AssetDetailPage, AlertsPage, LoginPage,PopularNodes } from '../pages/pages';
import { TabsPage } from '../pages/tabs/tabs';
import { AuthService } from '../providers/auth-service';
import { DataService } from '../providers/data-service';
import { Configuration } from './app.constants';
import { DecimalRestrictSize } from '../pages/asset-detail/decimalRestrictPipe';
import { HttpModule } from '@angular/http';
import { BrowserModule } from "@angular/platform-browser";


@NgModule({
  declarations: [
    MyApp,
    AssetsPage,
    AssetDetailPage,
    AlertsPage,
    LoginPage,
    TabsPage,
    DecimalRestrictSize,
    PopularNodes
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
    AlertsPage,
    LoginPage,
    TabsPage,
    PopularNodes
  ],
  providers: [Toast, {provide: ErrorHandler, useClass: IonicErrorHandler},AuthService,DataService,Configuration,DecimalRestrictSize]
})
export class AppModule {}
