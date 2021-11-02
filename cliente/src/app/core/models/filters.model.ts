export class Filters {
  limit?: number;
  offset?: number;
  name?: string;
  location?: string;
  priceMin?: number;
  priceMax?: number;
  category?: number;
  favorited?: string;
  author?: string;
  
  constructor(
    limit?: number,
    offset?: number,
    name?: string,
    location?: string,
    priceMin?: number,
    priceMax?: number,
    category?: number,
    favorited?: string,
    author?: string
  ) {
    this.limit = limit || 1;
    this.offset = offset || 0;
    this.name = name;
    this.location = location;
    this.priceMin = priceMin;
    this.priceMax = priceMax;
    this.category = category;
    this.favorited = favorited;
    this.author = author;
  }

  public length(): number {
    let count: number = 0;
    if (this.name) count++;
    if (this.location) count++;
    if (this.priceMin) count++;
    if (this.priceMax) count++;
    if (this.category) count++;
    if (this.favorited) count++;
    if (this.author) count++;
    console.log(count);
    console.log(this.name);
    console.log(this.location);
    console.log(this.priceMin);
    console.log(this.priceMax);
    return count;
  }
}
