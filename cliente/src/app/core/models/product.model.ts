import { Profile } from "./profile.model";

export class Product {
  _id?: number;
  name?: string;
  description?: string;
  status?: boolean; /* De moment deixem que es opcional fins que estiga la web i refem la BBDD */
  id_category?: number;
  location?: string;
  price?: number;
  favorited?: boolean;
  favorites?: number;
  updateDate?: Date;
  creationDate?: Date;
  slug?: string;
  images?: string[];
  author?: Profile;

  constructor(
    _id: number,
    name: string,
    description: string,
    status: boolean,
    id_category: number,
    location: string,
    price: number,
    favorited: boolean,
    favorites: number,
    creationDate?: Date,
    updateDate?: Date,
    slug?: string,
    images?: string[],
    author?: Profile
  ) {
    this.name = name;
    this.description = description;
    this.status= status;
    this.id_category = id_category;
    this.location = location;
    this.price = price;
    this.favorited = favorited ? favorited : false;
    this.favorites = favorites ? favorites : 0;
    this.creationDate = creationDate;
    this.updateDate = updateDate;
    this.slug = slug;
    this.images = images? images: ["error"];
    this.author = author;
  }
}
