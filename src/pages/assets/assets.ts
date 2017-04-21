import { Component } from '@angular/core';
import { NavController, NavParams, VirtualScroll } from 'ionic-angular';
import { AssetDetailPage } from '../pages';
import { AuthService } from '../../providers/auth-service';
import { DataService } from '../../providers/data-service';
import { LoginPage } from '../pages';
import { Assets, AssetDetails, AssetWithNodes } from '../../shared/dataModel';
//import { PaginationComponent } from './src/pagination.component';

@Component({
  selector: 'page-assets',
  templateUrl: 'assets.html'
})
export class AssetsPage {

  assets: Assets[];
  filteredAssets: Assets[];
  assetNodes: Assets[];
  assetwithNodes: AssetWithNodes[];
  constructor(public navCtrl: NavController, private authService: AuthService, private dataService: DataService, public navParams: NavParams, ) {


  }
  loadAssets() {
    var Nodes: Assets[] = new Array<Assets>();
    this.assetwithNodes = [
      { "NY_NodeName": "932ROCK12KVRR-1", "NY_AssetName": "Rocky Road 1" },
      { "NY_NodeName": "932ROCK12KVRR-2", "NY_AssetName": "Rocky Road 2" },
      { "NY_NodeName": "932ROCK12KVRR-3", "NY_AssetName": "Rocky Road 3" },
      { "NY_NodeName": "932ROCK12KVRR-4", "NY_AssetName": "Rocky Road 4" },
      { "NY_NodeName": "960ELGI13.5KVEE-1", "NY_AssetName": "Elgin 1" },
      { "NY_NodeName": "960ELGI13.5KVEE-2", "NY_AssetName": "Elgin 2" },
      { "NY_NodeName": "960ELGI13.5KVEE-3", "NY_AssetName": "Elgin 3" },
      { "NY_NodeName": "960ELGI13.5KVEE-4", "NY_AssetName": "Elgin 4" }
    ]
    if (this.authService.isUserAuthenticated) {
      this.dataService.getAssets().subscribe((assets: Assets[]) => {

        this.assets = assets;
        this.assets.forEach(element => {
          this.assetwithNodes.forEach(e => {
            if (this.authService.currentUser.role != "Admin") {
              if (element.NY_NodeName == e.NY_NodeName) {
                var singleassetNode = new Assets("", "");
                singleassetNode.NY_NodeID = element.NY_NodeID;
                singleassetNode.NY_NodeName = e.NY_AssetName + "(" + element.NY_NodeName + ")";
                Nodes.push(singleassetNode);
              }
              this.filteredAssets = this.assetNodes = Nodes;
            }
            else {
              this.filteredAssets = this.assetNodes = this.assets;
            }
          })
        });
      });
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
  filterChanged(data: string) {
    if (data && this.assets) {
      data = data.toUpperCase();
      let props = ['NY_NodeName', 'NY_AssetName'];
      let filtered = this.assetNodes.filter(item => {
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
      this.filteredAssets = this.assetNodes;
    }
  }
}
