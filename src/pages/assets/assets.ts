import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, Loading } from 'ionic-angular';
import { AssetDetailPage } from '../pages';
import { AuthService } from '../../providers/auth-service';
import { DataService } from '../../providers/data-service';
import { LoginPage } from '../pages';
import { Assets } from '../../shared/dataModel';


@Component({
  selector: 'page-assets',
  templateUrl: 'assets.html'
})
export class AssetsPage {

  assets: Assets[];
  loading: Loading;
  nonAdminNodes: Assets[];
  showSearch: boolean;
  firstsearchtext: string;
  showNoNodesFound: boolean;
  constructor(public navCtrl: NavController, private loadingCtrl: LoadingController, private authService: AuthService, private dataService: DataService, public navParams: NavParams, ) {
    this.showSearch = false;
    this.firstsearchtext = "";
    this.showNoNodesFound = false;
  }
  loadAssets() {
    this.nonAdminNodes = [
      { "NY_NodeName": "Rocky Road 1(932ROCK12KVRR-1)", "NY_NodeID": "32417665" },
      { "NY_NodeName": "Rocky Road 2(932ROCK12KVRR-2)", "NY_NodeID": "32417667" },
      { "NY_NodeName": "Rocky Road 3(932ROCK12KVRR-3)", "NY_NodeID": "32417669" },
      { "NY_NodeName": "Rocky Road 4(932ROCK12KVRR-4)", "NY_NodeID": "32417671" },
      { "NY_NodeName": "Elgin 1(960ELGI13.5KVEE-1)", "NY_NodeID": "32417791" },
      { "NY_NodeName": "Elgin 2(960ELGI13.5KVEE-2)", "NY_NodeID": "32417793" },
      { "NY_NodeName": "Elgin 3(960ELGI13.5KVEE-3)", "NY_NodeID": "32417795" },
      { "NY_NodeName": "Elgin 4(960ELGI13.5KVEE-4)", "NY_NodeID": "32417797" }
    ]
    if (this.authService.currentUser.role == "Nonadmin") {
      this.showSearch = false;
      this.assets = this.nonAdminNodes;
    }
    else {
      this.showSearch = true;
      if (this.firstsearchtext != "") {

        if (this.authService.currentUser.role == "Admin") {
          this.showNoNodesFound = false;
          this.showLoading();
          this.assetsAPI(null);
        }
      }
        else if (this.authService.currentUser.role == "Misoadmin") {
          this.assets =
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

            ]
        }

      
    }

  }
  assetsAPI(region: string) {
    if (this.authService.isUserAuthenticated) {
      this.dataService.getAssets(this.firstsearchtext, region).subscribe((assets: Assets[]) => {
        this.loading.dismiss();
        if (assets.length == 0) {
          this.showNoNodesFound = true;
        }
        this.assets = assets;
      });
    }
  }
  showLoading() {
    this.loading = this.loadingCtrl.create({
      content: 'Fetching Nodes....'
    });
    this.loading.present();
  }
  showSearchbutton() {
    if (this.firstsearchtext.length >= 3) {
      return true;
    }
    else {
      return false;
    }

  }
  ionViewDidLoad() {
    this.loadAssets();
    console.log('ionViewDidLoad AssetsPage');
  }

  goToAssetDetail(assetSelected: Assets) {
    this.navCtrl.push(AssetDetailPage, { assetSelected });
  }
  logOut() {
    this.authService.logout();
    console.log(this.navCtrl.parent);
    this.navCtrl.parent.parent.setRoot(LoginPage);
  }
  // filterChanged(data: string) {
  //   if (data && this.assets) {
  //     data = data.toUpperCase();
  //     let props = ['NY_NodeName'];
  //     let filtered = this.assets.filter(item => {
  //       let match = false;
  //       for (var i in props) {
  //         var prop = props[i];
  //         var filterString = item[prop];
  //         if (filterString != null) {
  //           if (filterString.toString().toUpperCase().indexOf(data) > -1) {
  //             match = true;
  //             break;
  //           }
  //         }
  //       };
  //       return match;
  //     });
  //     this.assets = filtered;
  //   }
  //   else {
  //     this.assets = this.assets;
  //   }
  // }
}
