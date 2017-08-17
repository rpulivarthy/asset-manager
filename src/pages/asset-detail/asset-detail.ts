import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, LoadingController, Loading } from 'ionic-angular';
import { Chart } from 'chart.js';
import { Assets, AssetDetails, AssetDetailRequest, AssetsWithTotals } from '../../shared/dataModel';
import { DataService } from '../../providers/data-service';
import { ToastController } from 'ionic-angular';
import { LoginPage } from '../pages';

@Component({
  selector: 'page-asset-detail',
  templateUrl: 'asset-detail.html'
})
export class AssetDetailPage {
  @ViewChild('lineCanvas') lineCanvas;
  asset: Assets;
  assetDetail: AssetDetails[];
  assetWithTotals: AssetsWithTotals;
  loading: Loading;
  lineChart: any;
  selectedDateString: string;
  selectedDateModel: string;
  selectedDate: Date;
  dummyAssetDetail: AssetDetails[];
  maxDate: string;
  showNoDataFound: boolean;
  dataFound: string;
  assetDetailRequestObj: AssetDetailRequest;
  DAAwards_Total: string;
  RT_MW_Total: string;
  Revenue_Total: string;
  TotalLabel:string;

  constructor(public navCtrl: NavController, public navParams: NavParams, private loadingCtrl: LoadingController, private dataService: DataService, private toast: ToastController) {
    this.asset = navParams.get('assetSelected');
    this.selectedDateModel = new Date().toISOString();
    this.selectedDate = new Date();
    var today = new Date();
    var newDate = new Date();
    newDate.setDate(today.getDate() + 1);
    this.maxDate = this.convertToDesiredDateString(newDate);
    this.dummyAssetDetail = new Array<AssetDetails>();
    this.showNoDataFound = false;
    this.getAssetDetails();
    this.dataFound = this.DAAwards_Total = this.Revenue_Total =this.TotalLabel= this.RT_MW_Total = "";
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
    this.showLoading();
    this.assetDetailRequestObj = new AssetDetailRequest("", "", "", "", "", null, "", "", "");

    this.assetDetailRequestObj.EndTime = this.assetDetailRequestObj.StartTime = this.selectedDateString;
    this.assetDetailRequestObj.NodeID = this.asset.NY_NodeID;
    this.assetDetailRequestObj.PIServerName = this.asset.NY_PIServer;
    this.assetDetailRequestObj.PIUserId = this.asset.NY_PIUserId;
    this.assetDetailRequestObj.TagName = this.asset.NY_PITagName;
    this.assetDetailRequestObj.ParticipantName = this.asset.NY_Participantname;
    this.assetDetailRequestObj.LocationName = this.asset.NY_LocationID;
    
    this.dataService.getAssetDetails(this.assetDetailRequestObj)
      .subscribe((assetdetailswithTotals: AssetsWithTotals) => {
        this.assetWithTotals = assetdetailswithTotals;
        this.assetDetail = this.assetWithTotals.DataValues;
        this.drawLineChart();
        this.DAAwards_Total = this.assetWithTotals.DA_AWRADS_TOTAL;
        this.RT_MW_Total = this.assetWithTotals.RT_MW_TOTAL;
        this.Revenue_Total = this.assetWithTotals.REV_TOTAL;
        this.TotalLabel="Total";
        if (this.assetDetail != null) {
          this.dataFound = "Graph";
          this.showNoDataFound = false;
          this.drawLineChart();
        }
        else {
          let toast = this.toast.create({
            message: 'Data not available for selected date',
            duration: 2000,
            position: 'bottom',
            cssClass: "toast-controller-assetdetails-warning"
          });
          toast.present();
          this.dataFound = "Data not available for selected date"
          this.showNoDataFound = true;
        }
       
        this.loading.dismiss();
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
  showLoading() {
    this.loading = this.loadingCtrl.create({
      content: 'Fetching data, please wait....'
    });
    this.loading.present();
  }
  drawLineChart() {
    if (this.assetDetail == null) {
      this.assetDetail = this.dummyAssetDetail;
    }
    this.lineChart = new Chart(this.lineCanvas.nativeElement, {

      type: 'bar',
      data: {
        labels: this.assetDetail.map(s => s.HE_Time),
        datasets: [
          {
            label: "DA Price",
            type: 'line',
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
            type: 'line',
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
          },
          {
            label: "RT MW",
            fill: false,
            lineTension: 0.1,
            backgroundColor: "#d3b610",
            borderColor: "#d3b610",
            borderCapStyle: 'butt',
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBorderColor: "#d3b610",
            pointBackgroundColor: "#d3b610",
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: "#d3b610",
            pointHoverBorderColor: "#d3b610",
            pointHoverBorderWidth: 2,
            pointRadius: 1,
            pointHitRadius: 10,
            data: this.assetDetail.map(s => s.PI_MW),
            spanGaps: false,
          },
          {
            label: "DA AWARDS",
            fill: false,
            lineTension: 0.1,
            backgroundColor: "#c41d3e",
            borderColor: "#c41d3e",
            borderCapStyle: 'butt',
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBorderColor: "#c41d3e",
            pointBackgroundColor: "#c41d3e",
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: "#c41d3e",
            pointHoverBorderColor: "#c41d3e",
            pointHoverBorderWidth: 2,
            pointRadius: 1,
            pointHitRadius: 10,
            data: this.assetDetail.map(s => s.DA_AWARDS),
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
    this.getAssetDetails();
  }

}
