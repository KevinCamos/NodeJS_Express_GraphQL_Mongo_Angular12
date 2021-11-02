export class Category {
    _id?: number;
    reference: number;
    icon: string;
    name_category: string;
    products: string[];
    slug: string;

    constructor(
        _id: number,
        reference: number,
        icon: string,
        name_category: string,
        products: string[],
        slug: string,
    ) {
        this._id = _id;
        this.reference = reference;
        this.icon = icon;
        this.name_category = name_category;
        this.products= products;
        this.slug=slug
    }
}
