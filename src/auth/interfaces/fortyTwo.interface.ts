export interface FortyTwoProfile {
  username: string;
  name: {
    familyName: string;
    givenName: string;
  };
  _json: { image: any };
  emails: { value: string }[];
}
