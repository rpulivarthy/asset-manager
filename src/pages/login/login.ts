import { Component } from '@angular/core';
import { NavController, AlertController, LoadingController, Loading, ToastController } from 'ionic-angular';
import { AuthService } from '../../providers/auth-service';
import { RegisterPage } from '../register/register';
import { TabsPage } from '../tabs/tabs';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'

})
export class LoginPage {

  registerCredentials = { email: '', password: '' };

  constructor(private nav: NavController, private auth: AuthService, private alertCtrl: AlertController, private toast: ToastController) { }

  public createAccount() {
    this.nav.push(RegisterPage);
  }

  public login() {
    this.auth.login(this.registerCredentials).subscribe(allowed => {
      if (allowed) {
        setTimeout(() => {
          let toast = this.toast.create({
            message: "Login successful.Welcome",
            duration: 2000,
            position: 'middle',
            cssClass: "toast-controller-login-success"
          });
          toast.present();
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