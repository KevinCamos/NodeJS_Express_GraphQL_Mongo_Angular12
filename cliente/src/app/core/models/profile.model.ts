export interface Profile {
  username: string;
  bio: string;
  image: string;
  valoration:number;
  following: Profile[];
  followers: Profile[];
  isFollow: any;
  karma: number;
}
