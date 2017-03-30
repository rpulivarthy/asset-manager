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
        headers.append('Authorization', this.config.apiToken);
        headers.append('Access-Control-Allow-Origin', '*');
        let options = new RequestOptions({ headers: headers});
        return this.http.get(this.config.apiBaseUrl + '/lmp/nodes', options).retry(3).map((res: Response) => {
            this.assetSet = res.json();
            return this.assetSet
        })

    }
    getAssetDetails(assetId: string, startdateinput: string, enddateinput: string): Observable<AssetDetails[]> {

        let headers = new Headers({ 'Content-Type': 'application/json' });
        headers.append('Authorization', this.config.apiToken);
        headers.append('Access-Control-Allow-Origin', '*');
        let options = new RequestOptions({ headers: headers });
        return this.http.get(this.config.apiBaseUrl + '/lmp/prices?nodeid=' + assetId + '&startdate=' + startdateinput + '&enddate=' + enddateinput, options).retry(3).map((res: Response) => {
            this.assetDetails = res.json();
            return this.assetDetails
        })
    }


}
