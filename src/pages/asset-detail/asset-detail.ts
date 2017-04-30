import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, LoadingController, Loading } from 'ionic-angular';
import { Chart } from 'chart.js';
import { Assets, AssetDetails } from '../../shared/dataModel';
import { DataService } from '../../providers/data-service';


@Component({
  selector: 'page-asset-detail',
  templateUrl: 'asset-detail.html'
})
export class AssetDetailPage {
  @ViewChild('lineCanvas') lineCanvas;
  asset: Assets;
  assetDetail: AssetDetails[];
  loading: Loading;
  lineChart: any;
  selectedDateString: string;
  selectedDateModel: string;
  selectedDate: Date;
  dummyAssetDetail: AssetDetails[];

  constructor(public navCtrl: NavController, public navParams: NavParams, private loadingCtrl: LoadingController, private dataService: DataService) {
    this.asset = navParams.get('assetSelected');
    this.selectedDateModel = new Date().toISOString();
    this.selectedDate = new Date();
    this.dummyAssetDetail = new Array<AssetDetails>();// [{ "DATE": "", "HE_Time": "", "RT_CONGESTION": "", "RT_LOSS": "", "RT_PRICE": "", "DA_CONGESTION": "", "DA_LOSS": "", "DA_PRICE": "" }];
    this.getAssetDetails();
  }
  convertToDesiredDateString(convertableDate: Date): string {
    var dd = convertableDate.getDate();
    var mm = convertableDate.getMonth() + 1; //January is 0!
    var mmString = "";
    var ddString = "";
    if (mm < 10) {
      mmString = '0' + mm.toString();
    } else {
      mmString = mm.toString();
    }
    if (dd < 10) {
      ddString = '0' + dd.toString()
    } else {
      ddString = dd.toString();
    }
    var yyyy = convertableDate.getFullYear();
    this.selectedDateString = yyyy.toString() + '-' + mmString + '-' + ddString;
    return this.selectedDateString;
  }
  getAssetDetails() {
    this.selectedDate = new Date(this.selectedDateModel);
    this.selectedDateString = this.convertToDesiredDateString(this.selectedDate);
    this.selectedDateString = this.selectedDateString.replace('-', '');
    this.selectedDateString = this.selectedDateString.replace('-', '');
    this.dataService.getAssetDetails(this.asset.NY_NodeID, this.selectedDateString, this.selectedDateString).subscribe((assetdetail: AssetDetails[]) => {
      this.assetDetail = assetdetail;
      this.drawLineChart();
    });
  }
  showLoading() {
    this.loading = this.loadingCtrl.create({
      content: 'Fetching Nodes, please wait....'
    });
    this.loading.present();
  }
  drawLineChart() {
    if (this.assetDetail == null) {
      this.assetDetail = this.dummyAssetDetail;
    }
    this.lineChart = new Chart(this.lineCanvas.nativeElement, {

      type: 'line',
      data: {
        labels: this.assetDetail.map(s => s.HE_Time),
        datasets: [
          {
            label: "DA Price",
            fill: false,
            lineTension: 0.1,
            backgroundColor: "#38c",
            borderColor: "#38c",
            borderCapStyle: 'butt',
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBorderColor: "#38c",
            pointBackgroundColor: "#38c",
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: "#38c",
            pointHoverBorderColor: "red",
            pointHoverBorderWidth: 2,
            pointRadius: 1,
            pointHitRadius: 10,
            data: this.assetDetail.map(s => s.DA_PRICE),
            spanGaps: false,
          },
          {
            label: "RT Price",
            fill: false,
            lineTension: 0.1,
            backgroundColor: "#7DBF43",
            borderColor: "#7DBF43",
            borderCapStyle: 'butt',
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBorderColor: "#7DBF43",
            pointBackgroundColor: "#7DBF43",
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: "#7DBF43",
            pointHoverBorderColor: "#7DBF43",
            pointHoverBorderWidth: 2,
            pointRadius: 1,
            pointHitRadius: 10,
            data: this.assetDetail.map(s => s.RT_PRICE),
            spanGaps: false,
          }
        ]
      }

    });


  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad AssetDetailPage');
  }

  refresh() {
    this.showLoading();
    this.loading.dismiss();
  }

}
