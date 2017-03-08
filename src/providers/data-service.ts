import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Configuration } from '../app/app.constants';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/retry';
import 'rxjs/add/operator/retrywhen';
import { Assets, AssetDetails } from '../shared/dataModel';


@Injectable()
export class DataService {
    //  _baseUrl: string = 'http://hydralink-dev.fpl.com';
    assetSet: Assets[];
    assetDetails: AssetDetails[];
    constructor(private http: Http, private config: Configuration) { }

    getAssets(): Observable<Assets[]> {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        // headers.append('Authorization', 'Bearer' + this._APItoken);
        headers.append('Access-Control-Allow-Origin', '*');
        let options = new RequestOptions({ headers: headers });
        return this.http.get(this.config.apiBaseUrl + '/lmp/nodes', options).retry(3).map((res: Response) => {
            this.assetSet = res.json();
            return this.assetSet
        })
            .catch(this.handleError);
    }
    getAssetDetails(assetId: string): Observable<AssetDetails[]> {
        var today = new Date();
        var dd = today.getDate();
        var mm = today.getMonth() + 1; //January is 0!
        var yyyy = today.getFullYear();
       
        var inputDay = mm.toString() + '-' +dd.toString() + '-' + yyyy.toString();
        let headers = new Headers({ 'Content-Type': 'application/json' });
        // headers.append('Authorization', 'Bearer' + this._APItoken);
        headers.append('Access-Control-Allow-Origin', '*');
        let options = new RequestOptions({ headers: headers });
        return this.http.get(this.config.apiBaseUrl + '/lmp/prices?nodeid=' + assetId + '&startdate=' + inputDay + '&enddate=' + inputDay, options).retry(3).map((res: Response) => {
            this.assetDetails = res.json();
            return this.assetDetails
        })
            .catch(this.handleError);
    }

    private handleError(error: any) {
        console.error(error);
        return Observable.throw(error.json().error || 'Server error');
    }
}
