import { ErrorHandler,Inject  } from '@angular/core';
import { IonicErrorHandler } from 'ionic-angular';
import { AuthService } from '../providers/auth-service';
import { ToastController } from 'ionic-angular';
import { Http, Response, URLSearchParams } from '@angular/http';

export class MyErrorHandler implements ErrorHandler {


    constructor(@Inject(AuthService) private auth:AuthService,@Inject(ToastController) private toast:ToastController) {

    }

    handleError(err: Response): void {
        let toast = this.toast.create({
            message:err.statusText.toString(),
            duration: 30000,
            position: 'top',
            cssClass:"toast-controller-error"
          });
          toast.present();
       this.auth.logout();
    }
}
