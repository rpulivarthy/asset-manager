import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import { User, TokenResponse, DecodeToken } from '../shared/dataModel';
import * as JWT from 'jwt-decode';
import { Http, Response } from '@angular/http';
import { Headers, RequestOptions } from '@angular/http';
import { Configuration } from '../app/app.constants';
import { LoadingController, Loading } from 'ionic-angular';
import 'rxjs/add/observable/throw';

@Injectable()
export class AuthService {
  currentUser: User;
  tokenResponse: TokenResponse;
  validatedUser: TokenResponse;
  isUserAuthenticated: boolean;
  decodedTokenResponse: DecodeToken;
  loading: Loading;

  constructor(private http: Http, private config: Configuration, private loadingCtrl: LoadingController) {
    this.currentUser = new User();
    this.isUserAuthenticated = false;
  }

  private authenticateUser(userid: string, password: string) {
    let body = 'userName=' + userid + '&password=' + password + '&grant_type=password';
    let headers = new Headers();
    headers.append('Accept', 'application/json');
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    let options = new RequestOptions({ headers: headers });
    return this.http.post(this.config.apiBaseUrl + '/token', body, options).map((res: Response) => {
      if (res.status == 200) {
        this.validatedUser = res.json();
        if (sessionStorage.getItem("access_token") != "") {
          sessionStorage.removeItem("access_token");
        }
        sessionStorage.setItem("access_token", this.validatedUser.access_token);
      }
      return this.validatedUser;
    })
  }

  public login(credentials) {
    if (credentials.email === null || credentials.password === null) {
      return Observable.throw("Please insert credentials");
    } else {
      this.showLoading();
      return Observable.create(observer => {
        this.authenticateUser(credentials.email, credentials.password).subscribe((tokenObj: TokenResponse) => {
          this.tokenResponse = tokenObj;
          if (this.tokenResponse.access_token != "") {
            this.decodedTokenResponse = JWT(this.tokenResponse.access_token);
            this.isUserAuthenticated = true;
            this.currentUser = new User();
            this.currentUser.role = this.decodedTokenResponse.role;
            this.currentUser.email = this.currentUser.name = this.decodedTokenResponse.unique_name;
            this.loading.dismiss();
          }
          observer.next(this.isUserAuthenticated);
          observer.complete();
        })
      })
    }
  }
  private showLoading() {
    this.loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    this.loading.present();
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

  public logout() {
    return Observable.create(observer => {
      this.currentUser = null;
      sessionStorage.removeItem("access_token");
      this.isUserAuthenticated = false;
      observer.next(true);
      observer.complete();
    });
  }
}