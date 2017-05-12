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
  popularNodesText:string;
  constructor(public navCtrl: NavController, public navParams: NavParams, public modalCtrl: ModalController, public authService: AuthService, public viewCtrl: ViewController) {
    this.misoAssets =
      [
        { "NY_NodeName": "OTP.ASHTA_FPLP", "NY_NodeID": "OTP.ASHTA_FPLP" },
        { "NY_NodeName": "OTP.ASHTAII", "NY_NodeID": "OTP.ASHTAII" },
        { "NY_NodeName": "OTP.ASHTAIII", "NY_NodeID": "OTP.ASHTAIII" },
        { "NY_NodeName": "ALTW.CRYSTAL1", "NY_NodeID": "ALTW.CRYSTAL1" },
        { "NY_NodeName": "ALTW.CRYSTAL2", "NY_NodeID": "ALTW.CRYSTAL2" },
        { "NY_NodeName": "ALTW.CRYSTAL3", "NY_NodeID": "ALTW.CRYSTAL3" },
        { "NY_NodeName": "ALTW.ENDV", "NY_NodeID": "ALTW.ENDV" },
        { "NY_NodeName": "ALTW.ENDV1", "NY_NodeID": "ALTW.ENDV1" },
        { "NY_NodeName": "ALTW.ENDV2", "NY_NodeID": "ALTW.ENDV2" },
        { "NY_NodeName": "ALTW.ENDV3", "NY_NodeID": "ALTW.ENDV3" },
        { "NY_NodeName": "ALTW.ENDV4", "NY_NodeID": "ALTW.ENDV4" },
        { "NY_NodeName": "ALTW.ENDVI", "NY_NodeID": "ALTW.ENDVI" },
        { "NY_NodeName": "OTP.LANGDN1", "NY_NodeID": "OTP.LANGDN1" },
        { "NY_NodeName": "OTP.LANGDN2", "NY_NodeID": "OTP.LANGDN2" },
        { "NY_NodeName": "ALTW.MOWERCO", "NY_NodeID": "ALTW.MOWERCO" },
        { "NY_NodeName": "ALTW.MOWERCO1", "NY_NodeID": "ALTW.MOWERCO1" },
        { "NY_NodeName": "MP.OLIVER12", "NY_NodeID": "MP.OLIVER12" },
        { "NY_NodeName": "MP.OLIVERC2", "NY_NodeID": "MP.OLIVERC2" },
        { "NY_NodeName": "MP.OLIVERCO", "NY_NodeID": "MP.OLIVERCO" },
        { "NY_NodeName": "ALTW.STORYCO", "NY_NodeID": "ALTW.STORYCO" },
        { "NY_NodeName": "ALTW.STORYCOII", "NY_NodeID": "ALTW.STORYCOII" },
        { "NY_NodeName": "CONS.TUSCOLA1", "NY_NodeID": "CONS.TUSCOLA1" },
        { "NY_NodeName": "DECO.TUSCOLA2", "NY_NodeID": "DECO.TUSCOLA2" }
      ];
      this.popularNodesText="";
  }
  loadAssets() {
    if (this.authService.currentUser.role == "Misoadmin") {
      this.popularNodesText="Popular Miso Nodes"
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
