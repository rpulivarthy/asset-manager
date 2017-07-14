import { Component } from '@angular/core';
import { NavController, ToastController } from 'ionic-angular';
import { AuthService } from '../../providers/auth-service';
import { TabsPage } from '../tabs/tabs';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'

})
export class LoginPage {

  registerCredentials = { email: '', password: '' };

  constructor(private nav: NavController, private auth: AuthService, private toast: ToastController) { }

  public login() {
    this.auth.login(this.registerCredentials).subscribe(allowed => {
      if (allowed) {
        setTimeout(() => {
          this.nav.setRoot(TabsPage);
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
}