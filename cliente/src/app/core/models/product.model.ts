export class Product {
  // _id?: number;
  // name: string;
  // description: string;
  // id_category: number;
  // location: string;
  // price: number;
  // view?: number;
  // id_user?: string;
  // updateDate?:Date;
  // creationDate?:Date;
  // slug?: string;
  _id?: number;
  name?: string;
  description?: string;
  id_category?: number;
  location?: string;
  price?: number;
  view?: number;
  id_user?: string;
  updateDate?:Date;
  creationDate?:Date;
  slug?: string;

  constructor(
    _id: number,
    name: string,
    description: string,
    id_category: number,
    location: string,
    price: number,
    view?: number,
    id_user?: string,
    creationDate?:Date,
    updateDate?:Date,
    slug?: string,

  ) {
    this.name = name;
    this.description = description;
    this.id_category = id_category;
    this.location = location;
    this.price = price;
    this.view = view ? view : 0;
    this.id_user = id_user ? id_user : 'undefined';
    this.creationDate = creationDate
    this.updateDate = updateDate

    this.slug = slug;
  }
}
