
export class Filters {
  limit?: number;
  offset?: number;
  name?: string;
  location?: string;
  priceMin?: number;
  priceMax?: number;

  constructor(
    limit?: number,
    offset?: number,
    name?: string,
    location?: string,
    priceMin?: number,
    priceMax?: number
  ) {
    this.limit = limit;
    this.offset = offset;
    this.name = name;
    this.location = location;
    this.priceMin = priceMin;
    this.priceMax = priceMax;
  }

  public length(): number {
    let count: number = 0;
    if (this.name) count++;
    if (this.location) count++;
    if (this.priceMin) count++;
    if (this.priceMax) count++;
    console.log(count);
    console.log(this.name);
    console.log(this.location);
    console.log(this.priceMin);
    console.log(this.priceMax);
    return count;
  }
}
