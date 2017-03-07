import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Headers, RequestOptions } from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/retry';
import 'rxjs/add/operator/retrywhen';
import { IAssets,IAssetDetails} from '../shared/interfaces';


@Injectable()
export class DataService {
  _baseUrl: string = 'http://hydralink-dev.fpl.com';
 assetSet:IAssets[];
 assetDetails:IAssetDetails[];
 constructor(private http:Http){}

 getAssets():Observable<IAssets[]>{
     let headers=new Headers({'Content-Type':'application/json'});
    // headers.append('Authorization', 'Bearer' + this._APItoken);
        headers.append('Access-Control-Allow-Origin', '*');
        let options = new RequestOptions({ headers: headers });
        return this.http.get(this._baseUrl + '/api/lmp/nodes', options).retry(3).map((res:Response) =>
        { 
            this.assetSet=res.json(); 
            return this.assetSet
        })
            .catch(this.handleError);
 }
  getAssetDetails(assetId: string):Observable<IAssetDetails[]>{
     let headers=new Headers({'Content-Type':'application/json'});
    // headers.append('Authorization', 'Bearer' + this._APItoken);
        headers.append('Access-Control-Allow-Origin', '*');
        let options = new RequestOptions({ headers: headers });
        return this.http.get(this._baseUrl + '/api/lmp/prices?nodeid='+assetId+'&startdate=01-01-2017&enddate=01-31-2017', options).retry(3).map((res:Response) =>
        { 
            this.assetDetails=res.json(); 
            return this.assetDetails
        })
            .catch(this.handleError);
 }
 
   private handleError(error: any) {
        console.error(error);
        return Observable.throw(error.json().error || 'Server error');
    }
}
