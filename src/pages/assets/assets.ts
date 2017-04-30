import { Component } from '@angular/core';
import { NavController, NavParams,LoadingController,Loading } from 'ionic-angular';
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

  constructor(public navCtrl: NavController,private loadingCtrl: LoadingController, private authService: AuthService, private dataService: DataService, public navParams: NavParams, ) {
    this.showSearch = false;
    this.firstsearchtext = "";
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
    if (this.authService.currentUser.role != "Admin") {
      this.showSearch = false;
      this.assets = this.nonAdminNodes;
    }
    else {
      this.showSearch = true;
      if (this.firstsearchtext != "") {
        this.showLoading();
        if (this.authService.isUserAuthenticated) {
          this.dataService.getAssets(this.firstsearchtext).subscribe((assets: Assets[]) => {
            this.loading.dismiss();
            this.assets = assets;
          });
        }
      }
    }

  }
  showLoading() {
    this.loading = this.loadingCtrl.create({
      content: 'Fetching Nodes, please wait....'
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
