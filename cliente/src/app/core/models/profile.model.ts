export interface Profile {
  username: string;
  bio: string;
  image: string;
  following: Profile[] ;
  followers: Profile[] ;
  isFollow: any ;
}
