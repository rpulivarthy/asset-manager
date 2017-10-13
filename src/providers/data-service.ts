
import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { Configuration } from '../app/app.constants';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/retry';
import 'rxjs/add/operator/retrywhen';
import 'rxjs/add/observable/throw';
import { Assets, AssetDetailRequest, AssetsWithTotals } from '../shared/dataModel';

@Injectable()
export class DataService {
    assetSet: Assets[];
    assetDetails: AssetsWithTotals;
    constructor(private http: Http, private config: Configuration) {
    }


    getAssets(UserName: string, role: string, searchText: string): Observable<Assets[]> {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        headers.append('Authorization', 'Bearer ' + sessionStorage.getItem("access_token"));
        let options = new RequestOptions({ headers: headers });

        return this.http.get(this.config.apiBaseUrl + '/lmp/nodes?userName=' + UserName + '&role=' + role + '&searchText=' + searchText, options).retry(3).map((res: Response) => {
            this.assetSet = res.json();
            return this.assetSet;
        })
    }

    getAssetDetails(inputAssetDetailsRequest: AssetDetailRequest): Observable<AssetsWithTotals> {
        let body = JSON.stringify({
            "PIServerName": inputAssetDetailsRequest.PIServerName,
            "TagName": inputAssetDetailsRequest.TagName,
            "StartTime": inputAssetDetailsRequest.StartTime,
            "EndTime": inputAssetDetailsRequest.EndTime,
            "NodeID": inputAssetDetailsRequest.NodeID,
            "Duration": "1h",
            "PIUserId": inputAssetDetailsRequest.PIUserId,
            "ParticipantName": inputAssetDetailsRequest.ParticipantName,
            "LocationName": inputAssetDetailsRequest.LocationName

        });
        let headers = new Headers({ 'Content-Type': 'application/json' });
        headers.append('Authorization', 'Bearer ' + sessionStorage.getItem("access_token"));
        let options = new RequestOptions({ headers: headers, withCredentials: true });
        return this.http.post(this.config.apiBaseUrl + '/lmp/assetdetails', body, options).retry(3).map((res: Response) => {
            this.assetDetails = res.json();
            return this.assetDetails;
        })
    }
    setPrivacyPolicy(userName: string): Observable<boolean> {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        headers.append('Authorization', 'Bearer ' + sessionStorage.getItem("access_token"));
        let options = new RequestOptions({ headers: headers });
        return this.http.get(this.config.apiBaseUrl + '/LMP/SetPrivacyPolicy?userName=' + userName, options).retry(3).map((res: Response) => {
            if (res.status == 200) {
                return true;
            }
            else {
                return false;
            }
        })
    }
}