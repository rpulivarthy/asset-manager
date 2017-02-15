import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, LoadingController, Loading } from 'ionic-angular';
import { AssetDetail } from './asset-detail.model';
import { Chart } from 'chart.js';

@Component({
  selector: 'page-asset-detail',
  templateUrl: 'asset-detail.html'
})
export class AssetDetailPage {
  @ViewChild('lineCanvas') lineCanvas;

  assetName: string;
  assetDetail: Array<AssetDetail>;
  loading: Loading;
  lineChart: any;
  
  constructor(public navCtrl: NavController, public navParams: NavParams, private loadingCtrl: LoadingController) {
    this.assetName = navParams.get('assetSelected');
    this.assetDetail = new Array<AssetDetail>();
    for (var _i=0; _i<10; _i++) {
      var item = new AssetDetail();
      item.DAPrice = Math.random();
      item.Date ="12/01/2015";
      item.RTPrice = Math.random();
      item.Time = _i+10;
      this.assetDetail.push(item); 
    }
  }


  showLoading() {
    this.loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    this.loading.present();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AssetDetailPage');
    this.lineChart = new Chart(this.lineCanvas.nativeElement, {
 
            type: 'line',
            data: {
                labels: this.assetDetail.map(s=>s.Time),
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
                        data: this.assetDetail.map(s=>s.DAPrice),
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
                        data: this.assetDetail.map(s=>s.RTPrice),
                        spanGaps: false,
                    }
                ]
            }
 
        });
  }

  refresh(){
     this.showLoading();
     this.loading.dismiss();
  }

}
