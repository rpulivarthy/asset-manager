
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
import { Assets, AssetDetails, AssetDetailRequest } from '../shared/dataModel';

@Injectable()
export class DataService {
    assetSet: Assets[];
    assetDetails: AssetDetails[];
    constructor(private http: Http, private config: Configuration ) {
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
    getAssetDetails(inputAssetDetailsRequest: AssetDetailRequest): Observable<AssetDetails[]> {
        let body = JSON.stringify({
            "PIServerName": inputAssetDetailsRequest.PIServerName,
            "TagName":inputAssetDetailsRequest.TagName,
            "StartTime": inputAssetDetailsRequest.StartTime,
            "EndTime":inputAssetDetailsRequest.EndTime,
            "NodeID":inputAssetDetailsRequest.NodeID,
            "Duration":"1h"
        });
        let headers = new Headers({ 'Content-Type': 'application/json' });
        headers.append('Authorization', 'Bearer ' + sessionStorage.getItem("access_token"));


        let options = new RequestOptions({ headers: headers, withCredentials: true });
        return this.http.post(this.config.apiBaseUrl + '/lmp/assetdetails', body, options).retry(3).map((res: Response) => {
            this.assetDetails = res.json();
            return this.assetDetails;
        })
    }
}