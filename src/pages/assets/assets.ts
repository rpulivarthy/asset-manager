import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, Loading, ModalController, ToastController } from 'ionic-angular';
import { AssetDetailPage } from '../pages';
import { LoginPage } from '../pages';
import { AuthService } from '../../providers/auth-service';
import { DataService } from '../../providers/data-service';
import { Assets } from '../../shared/dataModel';


@Component({
  selector: 'page-assets',
  templateUrl: 'assets.html'
})
export class AssetsPage {

  assets: Assets[] = []; // Issue with VirtualScroll
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
    if (this.authService.currentUser.role.toLowerCase() == "nonadmin") {
      this.showSearch = false;
      this.showLoading();
      this.assetsAPI(this.authService.currentUser.name, "NonAdmin");
    }
    else {
      this.showSearch = true;
      if (this.firstsearchtext != "") {
        if (this.authService.currentUser.role.toLowerCase() == "admin") {
          this.showNoNodesFound = false;
          this.showLoading();
          this.assetsAPI("", "Admin");
        }
      }
    }
  }
  assetsAPI(UserName: string, Role: string) {
    if (this.authService.isUserAuthenticated) {
      this.dataService.getAssets(UserName, Role, this.firstsearchtext).subscribe((assets: Assets[]) => {
        this.loading.dismiss();
        this.assets = assets;
        if (this.assets.length == 0) {
          this.assets =
            [
              {
                "Name": "No Nodes Found...", "Region": "", "PriceNode": "",
                "PriceNodeId": "", "ParticipantName": "", "Location": ""
              }
            ];
          let toast = this.toast.create({
            message: 'No nodes found',
            duration: 2000,
            position: 'bottom',
            cssClass: "toast-controller-assetdetails-warning"
          });
          toast.present();
          this.showNoNodesFound = true;
        }
        else {
          if (this.authService.currentUser.role.toLowerCase() == "nonadmin") {
            this.assets.forEach(e => {
              e.Name = e.Name + "(" + e.PriceNode + ")";
            })
          }
        }
      }, error => {
        this.loading.dismiss();
        let toast = this.toast.create({
          message: "Session expired, please login again",
          position: 'middle',
          cssClass: "toast-controller-asset-errorhandler",
          showCloseButton: true,
          closeButtonText: "OK"
        });
        toast.onDidDismiss(() => {
          this.navCtrl.push(LoginPage);
        });
        toast.present();
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
