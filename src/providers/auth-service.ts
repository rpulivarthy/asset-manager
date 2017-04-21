import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { User } from '../shared/dataModel';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/retry';
import 'rxjs/add/operator/retrywhen';
import { Http, Response } from '@angular/http';
import { Headers, RequestOptions } from '@angular/http';
import { Configuration } from '../app/app.constants';

@Injectable()
export class AuthService {
  currentUser: User;
  isUserAuthenticated: boolean;
  constructor(private http: Http, private config: Configuration) {
    this.isUserAuthenticated = false;
  }
  public login(credentials) {
    if (credentials.email === null || credentials.password === null) {
      return Observable.throw("Please insert credentials");
    } else {
      return Observable.create(observer => {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        headers.append('Authorization', this.config.apiToken);
        headers.append('Access-Control-Allow-Origin', '*');
        let options = new RequestOptions({ headers: headers });
        this.http.get(this.config.apiBaseUrl + '/usercredentials?userid=' + credentials.email + '&password=' + credentials.password, options).retry(3).map((res: Response) => {
          if (res.status == 200) {
            this.currentUser = res.json();
            this.isUserAuthenticated=true;
          }
        })

      });
    }
  }

  public register(credentials) {
    if (credentials.email === null || credentials.password === null) {
      return Observable.throw("Please insert credentials");
    } else {
      // At this point store the credentials to your backend!
      return Observable.create(observer => {
        observer.next(true);
        observer.complete();
      });
    }
  }

  // public getUserInfo(email:string) : User {
  //   this.allusers.forEach(element => {
  //     if(element.email==email){
  //       this.currentUser=element;
  //     }
  //   });
  //   return this.currentUser;
  // }

  public logout() {
    return Observable.create(observer => {
      this.currentUser = null;
      this.isUserAuthenticated = false;
      observer.next(true);
      observer.complete();
    });
  }
}