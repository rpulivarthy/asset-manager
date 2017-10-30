
export class Assets {
    Name: string;
    Region: string;
    PriceNode: string;
    PriceNodeId: string;
    ParticipantName: string;
    Location: string;
    constructor(Name: string, Region: string, PriceNode: string, PriceNodeId: string, ParticipantName: string, Location: string) {
        this.Name = Name;
        this.Region = Region;
        this.PriceNode = PriceNode;
        this.PriceNodeId = PriceNodeId;
        this.ParticipantName = ParticipantName;
        this.Location = Location;
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
    nameid: string;
}

export class User {
    name: string;
    email: string;
    role: string;
    privacypolicyflag: boolean;
}
export class AssetDetails {
    DATE: string;
    HE_Time: string;
    DA_PRICE: string;
    DA_PRICE_NA: string;
    DA_CONGESTION: string;
    DA_LOSS: string;
    PI_MW: string;
    PI_MW_NA: string;
    DA_AWARDS: string;
    DA_AWARDS_NA: string;
    RT_CONGESTION: string;
    RT_LOSS: string;
    RT_PRICE: string;
    RT_PRICE_NA: string;
    REVENUE: string;
    REVENUE_NA: string;
}
