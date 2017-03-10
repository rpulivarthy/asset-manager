import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, LoadingController, Loading } from 'ionic-angular';
import { AssetDetail } from './asset-detail.model';
import { Chart } from 'chart.js';
import { Assets, AssetDetails } from '../../shared/dataModel';
import { DataService } from '../../providers/data-service';
import {DecimalRestrictSize} from './decimalRestrictPipe';


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
  //selectedDate: Date;
  //endDate: Date;
  selectedDateString: string;
  // endDateString: string;
  dummyAssetDetail: AssetDetails[];


  constructor(public navCtrl: NavController, public navParams: NavParams, private loadingCtrl: LoadingController, private dataService: DataService) {
    this.asset = navParams.get('assetSelected');

    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth() + 1; //January is 0!
    var yyyy = today.getFullYear();
    this.selectedDateString = yyyy.toString() + '-' + mm.toString() + '-' + dd.toString();
    this.dummyAssetDetail = [{ "DATE": "", "HE_Time": "", "RT_CONGESTION": "", "RT_LOSS": "", "RT_PRICE": "", "DA_CONGESTION": "", "DA_LOSS": "", "DA_PRICE": "" }];
    this.getAssetDetails();
  }

  getAssetDetails() {
    // if (this.selectedDate != null) {
    //   this.selectedDateString = this.selectedDate.toString();
    // }

    this.dataService.getAssetDetails(this.asset.NY_NodeID, this.selectedDateString, this.selectedDateString).subscribe((assetdetail: AssetDetails[]) => {
      this.assetDetail = assetdetail;
      this.drawLineChart();
    });
  }
  showLoading() {
    this.loading = this.loadingCtrl.create({
      content: 'Please wait...'
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
            backgroundColor: "rgba(75,192,192,0.4)",
            borderColor: "rgba(75,192,192,1)",
            borderCapStyle: 'butt',
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBorderColor: "rgba(75,192,192,1)",
            pointBackgroundColor: "#fff",
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: "rgba(75,192,192,1)",
            pointHoverBorderColor: "rgba(220,220,220,1)",
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
            backgroundColor: "rgba(75,192,192,0.4)",
            borderColor: "rgba(75,192,192,1)",
            borderCapStyle: 'butt',
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBorderColor: "rgba(75,192,192,1)",
            pointBackgroundColor: "#fff",
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: "rgba(75,192,192,1)",
            pointHoverBorderColor: "rgba(220,220,220,1)",
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
