export interface FortyTwoProfile {
    username: String;
    name: {
        familyName: String;
        givenName: String;
    };
    emails: {value: string}[];
}