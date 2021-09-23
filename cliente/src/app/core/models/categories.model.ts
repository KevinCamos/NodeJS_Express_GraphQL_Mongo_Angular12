export class Category {
    _id?: number;
    reference: number;
    name_category: string;

    constructor(
        _id: number,
        reference: number,
        name_category: string,
    ) {
        this._id = _id;
        this.reference = reference;
        this.name_category = name_category;
    }
}
