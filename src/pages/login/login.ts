import { Component } from '@angular/core';
import { NavController, ToastController, ModalController } from 'ionic-angular';
import { AuthService } from '../../providers/auth-service';
import { TabsPage } from '../tabs/tabs';
import { ContactUs,PrivacyPolicyPage,PrivacyPolicyModal } from '../pages';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'

})
export class LoginPage {

  registerCredentials = { email: '', password: '' };

  constructor(private nav: NavController, private auth: AuthService, private toast: ToastController, public modalCtrl: ModalController) { }

  public login() {
    this.auth.login(this.registerCredentials).subscribe(allowed => {
      if (allowed) {
        setTimeout(() => {
          if(this.auth.currentUser.privacypolicyflag){
            this.nav.setRoot(TabsPage);
          }
         else{
           this.nav.setRoot(PrivacyPolicyPage);
         }
        });
      } else {
        this.showError("Access Denied");
      }
    },
      error => {
        this.showError(error);
      });
  }
  showError(text) {
    let toast = this.toast.create({
      message: text,
      duration: 3000,
      position: 'top',
      cssClass: "toast-controller-login-error"
    });
    toast.present();
  }

  openContactUsModal() {
    let modal = this.modalCtrl.create(ContactUs);
    modal.present();
  }
  openPrivacyPolicyModal() {
    let modal = this.modalCtrl.create(PrivacyPolicyModal);
    modal.present();
  }
}