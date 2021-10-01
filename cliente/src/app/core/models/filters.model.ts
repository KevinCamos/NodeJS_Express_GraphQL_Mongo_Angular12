
export class Filters {
  name?: string;
  location?: string;
  priceMin?: number;
  priceMax?: number;

  constructor(
    name?: string,
    location?: string,
    priceMin?: number,
    priceMax?: number
  ) {
    this.name = name;
    this.location = location;
    this.priceMin = priceMin;
    this.priceMax = priceMax;
  }

  public length(): number {
    let count: number = 0;
    if (this.name) count++;
    if (this.location) count++;
    if (this.priceMin)count++;
    if (this.priceMax) count++;
    console.log(count);
    console.log(this.name);
    console.log(this.location);
    console.log(this.priceMin);
    console.log(this.priceMax);

    return count;
  }
}

//   constructor(
//     _id: number,
//     img: string,
//     description: string,

//   ) {
//     this.img = img;
//     this.description = description;

//   }
// }
