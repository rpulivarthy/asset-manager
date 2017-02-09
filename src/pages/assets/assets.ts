import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AssetDetailPage } from '../pages';
import { AuthService } from '../../providers/auth-service';
import { LoginPage } from '../pages';

/*
  Generated class for the Assets page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-assets',
  templateUrl: 'assets.html'
})
export class AssetsPage {

  assets: string[];
  constructor(public navCtrl: NavController, private auth: AuthService, public navParams: NavParams) {
    this.assets = ['Callahan', 'SummerHaven', 'Crystal Lake', 'StoryCounty']
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AssetsPage');
  }
  goToAssetDetail(assetSelected:string){
    this.navCtrl.push(AssetDetailPage, {assetSelected});
  }
  logOut(){
    this.auth.logout();
    console.log(this.navCtrl.parent);
    this.navCtrl.parent.parent.setRoot(LoginPage);
  }
}
