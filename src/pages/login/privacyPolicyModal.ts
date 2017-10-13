import { Component } from '@angular/core';
import { ViewController, ModalController } from 'ionic-angular';

@Component({
  selector: 'contact-us',
  templateUrl: 'privacyPolicyModal.html'
})
export class PrivacyPolicyModal {
  constructor(private viewCtrl: ViewController, public modalCtrl: ModalController) {
  }
  ionViewDidLoad() {

  }
  dismiss() {
    this.viewCtrl.dismiss();
  }

}
