import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AssetDetail } from './asset-detail.model';

@Component({
  selector: 'page-asset-detail',
  templateUrl: 'asset-detail.html'
})
export class AssetDetailPage {

  assetName: string;
  assetDetail: Array<AssetDetail>;
  
  constructor(public navCtrl: NavController, public navParams: NavParams) {
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

  ionViewDidLoad() {
    console.log('ionViewDidLoad AssetDetailPage');
  }

}
