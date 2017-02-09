import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AuthService } from '../../providers/auth-service';
import { LoginPage } from '../pages';

/*
  Generated class for the Alerts page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-alerts',
  templateUrl: 'alerts.html'
})
export class AlertsPage {

  constructor(public navCtrl: NavController, private auth: AuthService, public navParams: NavParams) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad AlertsPage');
  }

   logOut(){
    this.auth.logout();
    this.navCtrl.parent.parent.setRoot(LoginPage);
  }

}
