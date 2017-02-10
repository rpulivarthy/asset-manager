import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, Loading } from 'ionic-angular';
import { AssetDetail } from './asset-detail.model';

@Component({
  selector: 'page-asset-detail',
  templateUrl: 'asset-detail.html'
})
export class AssetDetailPage {

  assetName: string;
  assetDetail: Array<AssetDetail>;
  loading: Loading;
  
  constructor(public navCtrl: NavController, public navParams: NavParams, private loadingCtrl: LoadingController) {
    this.assetName = navParams.get('assetSelected');
    this.assetDetail = new Array<AssetDetail>();
    for (var _i=0; _i<10; _i++) {
      var item = new AssetDetail();
      item.DAPrice = _i+33;
      item.Date ="12/01/2015";
      item.RTPrice = _i+122;
      item.Time = _i+10;
      this.assetDetail.push(item); 
    }
  }

  showLoading() {
    this.loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    this.loading.present();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AssetDetailPage');
  }

  refresh(){
     this.showLoading();
     this.loading.dismiss();
  }

}
