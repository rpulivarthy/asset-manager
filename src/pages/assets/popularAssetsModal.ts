import { Component } from '@angular/core';
import { NavController, NavParams, ModalController, ViewController } from 'ionic-angular';
import { AssetDetailPage } from '../pages';
import { Assets } from '../../shared/dataModel';
import { AuthService } from '../../providers/auth-service';


@Component({
  selector: 'popular-nodes',
  templateUrl: 'popularNodes.html'
})
export class PopularNodes {
  assets: Assets[];
  misoAssets: Assets[];
  popularNodesText: string;
  constructor(public navCtrl: NavController, public navParams: NavParams, public modalCtrl: ModalController, public authService: AuthService, public viewCtrl: ViewController) {
    // 
    this.misoAssets = null;
    this.popularNodesText = "";
  }
  loadAssets() {
    if (this.authService.currentUser.role == "Misouser") {
      this.popularNodesText = "Popular Miso Nodes"
      this.assets = this.misoAssets;
    }
  }
  ionViewDidLoad() {
    this.loadAssets();
  }
  dismiss() {
    this.viewCtrl.dismiss();
  }
  goToAssetDetail(assetSelected: Assets) {
    this.navCtrl.push(AssetDetailPage, { assetSelected });
  }
}
