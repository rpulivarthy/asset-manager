
export class Assets {
    NY_NodeName: string;
    NY_NodeID: string;
    NY_PITagName:string;
    constructor(NY_NodeName: string, NY_NodeID: string, NY_PITagName:string) {
        this.NY_NodeID = NY_NodeID;
        this.NY_NodeName = NY_NodeName;
        this.NY_PITagName=NY_PITagName;
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
    PI_MW:string;
    PI_MW_NA:string;
    DA_AWARDS:string;
    REVENUE:string;
}
export class AssetDetailRequest {
    PIServerName: string;
    TagName: string;
    StartTime: string;
    EndTime: string;
    NodeID: string;
     constructor(PIServerName: string, TagName: string, StartTime:string,EndTime:string,NodeID:string) {
        this.PIServerName = PIServerName;
        this.TagName = TagName;
        this.StartTime=StartTime;
        this.EndTime=EndTime;
        this.NodeID=NodeID;
    }
}