import { Profile } from "./profile.model";

export class Product {

  _id?: number;
  name?: string;
  description?: string;
  id_category?: number;
  location?: string;
  price?: number;
  view?: number;
  favorited?: boolean;
  favorites?: number;
  id_user?: string;
  updateDate?: Date;
  creationDate?: Date;
  slug?: string;
  images?: string[];
  author?: Profile;


  constructor(
    _id: number,
    name: string,
    description: string,
    id_category: number,
    location: string,
    price: number,
    favorited: boolean,
    favorites: number,
    view?: number,
    id_user?: string,
    creationDate?: Date,
    updateDate?: Date,
    slug?: string,
    images?: string[],
    author?: Profile

  ) {
    this.name = name;
    this.description = description;
    this.id_category = id_category;
    this.location = location;
    this.price = price;
    this.view = view ? view : 0;
    this.favorited = favorited ? favorited : false;
    this.favorites = favorites ? favorites : 0;
    this.id_user = id_user ? id_user : 'undefined';
    this.creationDate = creationDate;
    this.updateDate = updateDate;

    this.slug = slug;
    this.images = images;

    this.author = author;
  }
}
