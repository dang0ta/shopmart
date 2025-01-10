
// TODO: add placeholder as the default image
const DEFAULT_IMAGE_URL = 'no-image';

/**
 * Represents a product.
 */
export type ProductRaw = {
    id: number;
    title: string;
    images: string[];
    description: string;
    price: number;
    category: string;
  };

export class Product {
    private _id: number;
    private _title: string;
    private _images: string[];
    private _description: string;
    private _price: number;
    private _category: string;
    private _mainImage: string;

    static default(): Product {
        return new Product({
            id: 0,
            title: "",
            images: [],
            description: "",
            price: 0,
            category: "",
        })
    }

    constructor(product: ProductRaw) {
        this._id = product.id;
        this._title = product.title;
        this._images = product.images.map(cleanImageURL);
        this._description = product.description;
        this._price = product.price;
        this._category = product.category;
        this._mainImage = this._images.length ? this._images[0] : DEFAULT_IMAGE_URL;
    }

    get id() {
        return this._id;
    }

    get title() {
        return this._title;
    }

    get images() {
        return this._images;
    }

    get description() {
        return this._description;
    }

    get price() {
        return this._price;
    }

    get category() {
        return this._category;
    }

    get mainImage() {
        return this._mainImage;
    }
}

const cleanImageURL = (images: string): string => {
    try {
        const stringified = JSON.parse(images);
        if (Array.isArray(stringified)) {
            return stringified[0];
        }

        return stringified;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch(e:unknown) {
        return images
    }
}