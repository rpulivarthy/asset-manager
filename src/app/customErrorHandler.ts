import { ErrorHandler, Inject } from '@angular/core';
import { IonicErrorHandler } from 'ionic-angular';
import { AuthService } from '../providers/auth-service';
import { ToastController } from 'ionic-angular';
import { Http, Response, URLSearchParams } from '@angular/http';
import { Component } from '@angular/core';



@Component({
    selector: 'toast-controller-errorhandler'
})
export class MyErrorHandler implements ErrorHandler {


    constructor( @Inject(AuthService) private auth: AuthService, @Inject(ToastController) private toast: ToastController) {

    }

    handleError(err: Response): void {
        sessionStorage.removeItem("access_token");
        this.auth.isUserAuthenticated = false;
        this.auth.loading.dismiss();
        var toasterMessage = err.statusText.toString();
        if (toasterMessage.toUpperCase() == "BAD REQUEST") {
            toasterMessage = "Invalid Credentials, login failed";
        }
        else if (toasterMessage.toUpperCase() == "UNAUTHORIZED") {
            toasterMessage = "Session Expired."
        }
        let toast = this.toast.create({
            message: toasterMessage,
            position: 'middle',
            cssClass: "toast-controller-errorhandler",
            showCloseButton: true,
            closeButtonText: "OK"
        });
        toast.onDidDismiss(() => {
            toast.dismiss();

        });
        toast.present();

    }
}
