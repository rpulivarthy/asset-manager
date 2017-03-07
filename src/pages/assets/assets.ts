import { Component } from '@angular/core';
import { NavController, NavParams,VirtualScroll } from 'ionic-angular';
import { AssetDetailPage } from '../pages';
import { AuthService } from '../../providers/auth-service';
import { DataService } from '../../providers/data-service';
import { LoginPage } from '../pages';
import { IAssets, IAssetDetails } from '../../shared/interfaces';
//import { PaginationComponent } from './src/pagination.component';

@Component({
  selector: 'page-assets',
  templateUrl: 'assets.html'
})
export class AssetsPage {

  assets: IAssets[];
  filteredAssets:IAssets[];
  constructor(public navCtrl: NavController, private auth: AuthService, private dataService: DataService, public navParams: NavParams, ) {
    //TODO :: Get the nodes through the service. May not be constructor. On ngLoad

  }
  loadAssets() {
    this.dataService.getAssets().subscribe((asset: IAssets[]) => {

      this.assets =this.filteredAssets=asset;
    //  alert(this.assets);

    });

  }
  loadMoreData() {
    if (this.assets.length == 5) {
     
    }
  }
  ionViewDidLoad() {
    this.loadAssets();
    console.log('ionViewDidLoad AssetsPage');
  }

  goToAssetDetail(assetSelected: IAssets) {
    this.navCtrl.push(AssetDetailPage, { assetSelected });
  }
  logOut() {
    this.auth.logout();
    console.log(this.navCtrl.parent);
    this.navCtrl.parent.parent.setRoot(LoginPage);
  }
  filterChanged(data: string) {
    if (data && this.assets) {
      data = data.toUpperCase();
      let props = ['NY_NodeName'];
      let filtered = this.assets.filter(item => {
        let match = false;
        for (var i in props) {
          var prop = props[i];
          var filterString = item[prop];
          if (filterString != null) {
            if (filterString.toString().toUpperCase().indexOf(data) > -1) {
              match = true;
              break;
            }
          }
        };
        return match;
      });
      this.filteredAssets = filtered;
    }
    else {
      this.filteredAssets = this.assets;
    }
  }
}
