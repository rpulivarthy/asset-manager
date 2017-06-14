import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, ViewController, Loading, ModalController, ToastController } from 'ionic-angular';
import { AssetDetailPage } from '../pages';
import { PopularNodes,LoginPage } from '../pages';
import { AuthService } from '../../providers/auth-service';
import { DataService } from '../../providers/data-service';
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
  popularNodesText: string;
  constructor(public navCtrl: NavController, private loadingCtrl: LoadingController, private authService: AuthService,
    private dataService: DataService, public navParams: NavParams, public modalCtrl: ModalController, private toast: ToastController) {
    this.showSearch = false;
    this.firstsearchtext = this.popularNodesText = "";
    this.showNoNodesFound = false;
  }
  loadAssets() {
    this.nonAdminNodes = [
      { "NY_NodeName": "Elgin 1(960ELGI13.5KVEE-1)", "NY_NodeID": "32417791" },
      { "NY_NodeName": "Elgin 2(960ELGI13.5KVEE-2)", "NY_NodeID": "32417793" },
      { "NY_NodeName": "Elgin 3(960ELGI13.5KVEE-3)", "NY_NodeID": "32417795" },
      { "NY_NodeName": "Elgin 4(960ELGI13.5KVEE-4)", "NY_NodeID": "32417797" },
      { "NY_NodeName": "Rocky Road 1(932ROCK12KVRR-1)", "NY_NodeID": "32417665" },
      { "NY_NodeName": "Rocky Road 2(932ROCK12KVRR-2)", "NY_NodeID": "32417667" },
      { "NY_NodeName": "Rocky Road 3(932ROCK12KVRR-3)", "NY_NodeID": "32417669" },
      { "NY_NodeName": "Rocky Road 4(932ROCK12KVRR-4)", "NY_NodeID": "32417671" }
    ]
    if (this.authService.currentUser.role.toLowerCase() == "nonadmin") {
      this.showSearch = false;
      this.assets = this.nonAdminNodes;
    }
    else {
      this.showSearch = true;
      if (this.firstsearchtext != "") {

        if (this.authService.currentUser.role.toLowerCase() == "admin") {
          this.showNoNodesFound = false;
          this.showLoading();
          this.assetsAPI(null);
        }
        else if (this.authService.currentUser.role.toLowerCase() == "misouser") {
          this.showNoNodesFound = false;
          this.showLoading();
          this.assetsAPI("miso");
          this.popularNodesText = "Popular Miso Nodes";
        }
      }
    }

  }
  openPopularNodesModal() {
    let modal = this.modalCtrl.create(PopularNodes);
    modal.present();
  }
  assetsAPI(region: string) {
    if (this.authService.isUserAuthenticated) {
      this.dataService.getAssets(this.firstsearchtext, region).subscribe((assets: Assets[]) => {
        this.loading.dismiss();
        if (assets.length == 0) {
          let toast = this.toast.create({
            message: 'No nodes found',
            duration: 2000,
            position: 'bottom',
            cssClass: "toast-controller-assetdetails-warning"
          });
          toast.present();
          this.showNoNodesFound = true;
        }
        this.assets = assets;
      }, error => {
        let toast = this.toast.create({
          message: "Session Expired",
          duration: 2500,
          position: 'middle',
          cssClass: "toast-controller-asset-errorhandler"
        });
        toast.present();
        this.loading.dismiss();
        this.navCtrl.push(LoginPage);
      });
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
