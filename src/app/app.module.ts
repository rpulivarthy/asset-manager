import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { AssetsPage, AssetDetailPage, AlertsPage, LoginPage,PopularNodes } from '../pages/pages';
import { TabsPage } from '../pages/tabs/tabs';
import { AuthService } from '../providers/auth-service';
import { DataService } from '../providers/data-service';
import { Configuration } from './app.constants';
import {DecimalRestrictSize} from '../pages/asset-detail/decimalRestrictPipe';
import { MyErrorHandler } from './customErrorHandler';


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
  providers: [{provide: ErrorHandler, useClass: MyErrorHandler}, AuthService,DataService,Configuration,DecimalRestrictSize]
})
export class AppModule {}
