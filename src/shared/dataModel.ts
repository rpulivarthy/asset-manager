
export class Assets {
    NY_NodeName: string;
    NY_NodeID: string;
    NY_PITagName: string;
    NY_LocationID: number;
    NY_Participantname: string;
    NY_Region: string;
    constructor(NY_NodeName: string, NY_NodeID: string, NY_PITagName: string, NY_LocationID: number, NY_Participantname: string, NY_Region: string) {
        this.NY_NodeID = NY_NodeID;
        this.NY_NodeName = NY_NodeName;
        this.NY_PITagName = NY_PITagName;
        this.NY_LocationID = NY_LocationID;
        this.NY_Participantname = NY_Participantname;
        this.NY_Region = NY_Region;
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
export class DecodeToken {
    aud: string;
    exp: number;
    iss: string;
    nbf: number;
    role: string;
    unique_name: string;
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
    RT_PRICE_NA: string;
    DA_CONGESTION: string;
    DA_LOSS: string;
    DA_PRICE: string;
    DA_PRICE_NA: string;
    PI_MW: string;
    PI_MW_NA: string;
    DA_AWARDS: string;
    DA_AWARDS_NA: string;
    REVENUE: string;
    REVENUE_NA: string;
}
export class AssetsWithTotals {
    DataValues: AssetDetails[];
    DA_AWRADS_TOTAL: string;
    RT_MW_TOTAL: string;
    REV_TOTAL: string;
}
export class ContactMember {
    NAME: string;
    EMAIL: string;
    PHONE: string;
}
export class AssetDetailRequest {
    PIServerName: string;
    TagName: string;
    StartTime: string;
    EndTime: string;
    NodeID: string;
    LocationName: number;
    Duration: string;
    ParticipantName: string;
    PIUserId: string;
    constructor(PIServerName: string, TagName: string, StartTime: string, EndTime: string, NodeID: string, LocationName: number, Duration: string, ParticipantName: string, PIUserId: string) {
        this.PIServerName = PIServerName;
        this.TagName = TagName;
        this.StartTime = StartTime;
        this.EndTime = EndTime;
        this.NodeID = NodeID;
        this.LocationName = LocationName;
        this.Duration = Duration;
        this.ParticipantName = ParticipantName;
        this.PIUserId = PIUserId;
    }
}