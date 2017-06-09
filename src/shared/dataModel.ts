
export class Assets {
    NY_NodeName: string;
    NY_NodeID: string;
    constructor(NY_NodeName: string, NY_NodeID: string) {
        this.NY_NodeID = NY_NodeID;
        this.NY_NodeName = NY_NodeName;
    }
}
export class AssetWithNodes {
    NY_NodeName: string;
    NY_AssetName: string;
}
export class TokenResponse {
    access_token: string;
    token_type: string;
    expires_in: string;
}
export class DecodeToken{
    aud:string;
    exp:number;
    iss:string;
    nbf:number;
    role:string;
    unique_name:string;
}

export class User {
    name: string;
    email: string;
    role: string;
    //   constructor(name: string, email: string,role:string) {
    //     this.name = name;
    //     this.email = email;
    //     this.role=role;
    //   }
}
export class AssetDetails {
    DATE: string;
    HE_Time: string;
    RT_CONGESTION: string;
    RT_LOSS: string;
    RT_PRICE: string;
    DA_CONGESTION: string;
    DA_LOSS: string;
    DA_PRICE: string;
}