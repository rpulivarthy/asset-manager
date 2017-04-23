
import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Configuration } from '../app/app.constants';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/retry';
import 'rxjs/add/operator/retrywhen';
import { Assets, AssetDetails, User } from '../shared/dataModel';


@Injectable()
export class DataService {
    //  _baseUrl: string = 'http://hydralink-dev.fpl.com';
    assetSet: Assets[];
    assetDetails: AssetDetails[];
    validatedUser: User;
    constructor(private http: Http, private config: Configuration) { }

    authenticateUser(userid: string, password: string) {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        headers.append('Authorization', this.config.apiToken);
        headers.append('Access-Control-Allow-Origin', '*');
        let options = new RequestOptions({ headers: headers });
        return this.http.get(this.config.apiBaseUrl + '/usercredentials?userid=' + userid + '&password=' + password, options).retry(3).map((res: Response) => {
            if (res.status == 200) {
                this.validatedUser = res.json();
            }
            return this.validatedUser;
        })
        //return new User();
    }
    getAssets(): Observable<Assets[]> {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        headers.append('Authorization', this.config.apiToken);
        headers.append('Access-Control-Allow-Origin', '*');
        let options = new RequestOptions({ headers: headers });
        return this.http.get(this.config.apiBaseUrl + '/lmp/nodes', options).retry(3).map((res: Response) => {
            this.assetSet = res.json();
            return this.assetSet;
        })

    }
    getAssetDetails(assetId: string, startdateinput: string, enddateinput: string): Observable<AssetDetails[]> {

        let headers = new Headers({ 'Content-Type': 'application/json' });
        headers.append('Authorization', this.config.apiToken);
        headers.append('Access-Control-Allow-Origin', '*');
        let options = new RequestOptions({ headers: headers, withCredentials: true });
        return this.http.get(this.config.apiBaseUrl + '/lmp/prices?nodeid=' + assetId + '&startdate=' + startdateinput + '&enddate=' + enddateinput, options).retry(3).map((res: Response) => {
            this.assetDetails = res.json();
            return this.assetDetails;
        })
    }
}