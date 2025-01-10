
/**
 * Represents a category.
 */
export type CategoryRaw = {
  id: number;
  name: string;
  image: string;
};


export class Category {
    private _id: number;
    private _name: string;
    private _image: string;
    
    static default(): Category {
        return new Category({
        id: 0,
        name: "",
        image: "",
        });
    }
    
    constructor(category: CategoryRaw) {
        this._id = category.id;
        this._name = category.name;
        this._image = category.image;
        console.log({image: category.image})
    }
    
    get id() {
        return this._id;
    }
    
    get name() {
        return this._name;
    }
    
    get image() {
        return this._image;
    }
}