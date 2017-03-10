import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { AssetsPage, AssetDetailPage, AlertsPage, LoginPage } from '../pages/pages';
import { TabsPage } from '../pages/tabs/tabs';
import { AuthService } from '../providers/auth-service';
import { DataService } from '../providers/data-service';
import { Configuration } from './app.constants';



@NgModule({
  declarations: [
    MyApp,
    AssetsPage,
    AssetDetailPage,
    AlertsPage,
    LoginPage,
    TabsPage
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
    TabsPage
  ],
  providers: [{provide: ErrorHandler, useClass: IonicErrorHandler}, AuthService,DataService,Configuration]
})
export class AppModule {}
