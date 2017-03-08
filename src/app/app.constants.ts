import { Injectable } from '@angular/core';

const client =require('./clientsettings.json');

@Injectable()
export class Configuration {
    
    public apiBaseUrl: string =client.apiBaseUrl; 

    constructor(){
        console.log(client);
    }
}