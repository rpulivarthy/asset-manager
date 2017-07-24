import { Component } from '@angular/core';
import { ViewController, ModalController } from 'ionic-angular';
import { ContactMember } from '../../shared/dataModel';

@Component({
  selector: 'contact-us',
  templateUrl: 'contactUs.html'
})
export class ContactUs {
  contactList: ContactMember[];
  constructor(private viewCtrl: ViewController, public modalCtrl: ModalController) {
    this.contactList = [
      { "NAME": "Scott Loder", "EMAIL": "Scott.Loder@nexteraenergy.com", "PHONE": "" },
      { "NAME": "David Brown", "EMAIL": "David.R.Brown@nexteraenergy.com", "PHONE": "" }
    ]
  }
  ionViewDidLoad() {

  }
  dismiss() {
    this.viewCtrl.dismiss();
  }

}
