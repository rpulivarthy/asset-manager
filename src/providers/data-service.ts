
import { Injectable } from '@angular/core';
import { Http, Response,URLSearchParams } from '@angular/http';
import { Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Configuration } from '../app/app.constants';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/retry';
import 'rxjs/add/operator/retrywhen';
import { Assets, AssetDetails, User, TokenResponse } from '../shared/dataModel';

@Injectable()
export class DataService {
    assetSet: Assets[];
    assetDetails: AssetDetails[];
    validatedUser: TokenResponse;
    constructor(private http: Http, private config: Configuration) { }

    authenticateUser(userid: string, password: string) {

        let body = new URLSearchParams();
        body.append('username', userid);
        body.append('password', password);
        body.append('grant_type', 'password');

        let headers = new Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        headers.append('Access-Control-Allow-Origin', '*');
        headers.append('Accept', 'application/json');
        headers.append('Audience', 'NEMOD');
        let options = new RequestOptions({ headers: headers });

        return this.http.post(this.config.apiBaseUrl + '/token', body.toString(), options).retry(3).map((res: Response) => {
            if (res.status == 200) {
                this.validatedUser = res.json();
                localStorage.setItem("access_token", this.validatedUser.access_token);
            }
            return this.validatedUser;
        })
    }
    getAssets(searchText: string, region: string): Observable<Assets[]> {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        headers.append('Authorization', 'Bearer ' + localStorage.getItem("access_token"));
        headers.append('Access-Control-Allow-Origin', '*');
        let options = new RequestOptions({ headers: headers });
        if (region == null) {
            return this.http.get(this.config.apiBaseUrl + '/lmp/nodes?searchNodeText=' + searchText + '&region=', options).retry(3).map((res: Response) => {
                this.assetSet = res.json();
                return this.assetSet;
            })
        }
        else {
            return this.http.get(this.config.apiBaseUrl + '/lmp/nodes?searchNodeText=' + searchText + '&region=' + region, options).retry(3).map((res: Response) => {
                this.assetSet = res.json();
                return this.assetSet;
            })
        }
    }
    getAssetDetails(assetId: string, startdateinput: string, enddateinput: string): Observable<AssetDetails[]> {

        let headers = new Headers({ 'Content-Type': 'application/json' });
        headers.append('Authorization', 'Bearer ' + localStorage.getItem("access_token"));
        headers.append('Access-Control-Allow-Origin', '*');
        let options = new RequestOptions({ headers: headers, withCredentials: true });
        return this.http.get(this.config.apiBaseUrl + '/lmp/prices?nodeid=' + assetId + '&startdate=' + startdateinput + '&enddate=' + enddateinput, options).retry(3).map((res: Response) => {
            this.assetDetails = res.json();
            return this.assetDetails;
        })
    }
}