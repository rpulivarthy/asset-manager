import { Component } from '@angular/core';
import {  ViewController,ModalController} from 'ionic-angular';


@Component({
  selector: 'contact-us',
  templateUrl: 'contactUs.html'
})
export class ContactUs {
  
  constructor(private viewCtrl:ViewController,public modalCtrl: ModalController) {

  }
  ionViewDidLoad() {
    
  }
  dismiss() {
    this.viewCtrl.dismiss();
  }
 
}
