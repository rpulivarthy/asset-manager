
import { Injectable } from '@angular/core';
import { Http, Response, URLSearchParams } from '@angular/http';
import { Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { Configuration } from '../app/app.constants';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/retry';
import 'rxjs/add/operator/retrywhen';
import 'rxjs/add/observable/throw';
import { AuthService } from '../providers/auth-service';
import { Assets, AssetDetails, User, TokenResponse } from '../shared/dataModel';

@Injectable()
export class DataService {
    assetSet: Assets[];
    assetDetails: AssetDetails[];
    constructor(private http: Http, private config: Configuration, private authService: AuthService) {
    }


    getAssets(searchText: string, region: string): Observable<Assets[]> {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        headers.append('Authorization', 'Bearer ' + sessionStorage.getItem("access_token"));
        //      headers.append('Access-Control-Allow-Origin', '*');
        let options = new RequestOptions({ headers: headers });
        if (region == null) {
            return this.http.get(this.config.apiBaseUrl + '/lmp/nodes?searchText=' + searchText + '&region=', options).retry(3).map((res: Response) => {
                this.assetSet = res.json();
                return this.assetSet;
            })
        }
        else {
            return this.http.get(this.config.apiBaseUrl + '/lmp/nodes?searchText=' + searchText + '&region=' + region, options).retry(3).map((res: Response) => {
                this.assetSet = res.json();
                return this.assetSet;
            })
        }
    }
    getAssetDetails(assetId: string, startdateinput: string, enddateinput: string): Observable<AssetDetails[]> {

        let headers = new Headers({ 'Content-Type': 'application/json' });
        headers.append('Authorization', 'Bearer ' + sessionStorage.getItem("access_token"));
        //  headers.append('Access-Control-Allow-Origin', '*');
        let options = new RequestOptions({ headers: headers, withCredentials: true });
        return this.http.get(this.config.apiBaseUrl + '/lmp/prices?nodeid=' + assetId + '&startdate=' + startdateinput + '&enddate=' + enddateinput, options).retry(3).map((res: Response) => {
            this.assetDetails = res.json();
            return this.assetDetails;
        })
    }
}