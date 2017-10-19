import { Component, ViewChild, OnInit } from '@angular/core';
import { NavController, NavParams, LoadingController, Loading } from 'ionic-angular';
import { DataService } from '../../providers/data-service';
import { AuthService } from '../../providers/auth-service';
import { TabsPage } from '../tabs/tabs';
import { LoginPage } from '../pages';

@Component({
    selector: 'privacy-policy',
    templateUrl: 'privacy-policy.html'
})
export class PrivacyPolicyPage implements OnInit {
    privacyPolicyAccepted: string;
    showNext: boolean;
    constructor(public navCtrl: NavController, public navParams: NavParams, private loadingCtrl: LoadingController,
        private authService: AuthService, private dataService: DataService) { this.showNext = false; }
    ngOnInit() { }
    setPrivacyPolicy() {
        if (this.privacyPolicyAccepted == "true") {
            this.dataService.setPrivacyPolicy(this.authService.currentUser.name).subscribe((ifPrivacyPolicyPassed: boolean) => {
                if (ifPrivacyPolicyPassed) {
                    this.navCtrl.setRoot(TabsPage);
                } else {
                    this.privacyPolicyRejected();
                }
            });
        }
        else {
            this.privacyPolicyRejected();
        }
    }
    showNextBtn(){
        this.showNext=true;
    }
    privacyPolicyRejected() {
        this.authService.currentUser = null;
        sessionStorage.removeItem("access_token");
        this.authService.isUserAuthenticated = false;
        this.navCtrl.setRoot(LoginPage);
    }
}
