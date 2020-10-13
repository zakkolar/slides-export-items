import {Item} from "./Item";

export class PageItem extends Item {


    constructor(data){
        super(data);

        if(new.target === PageItem){
            throw new TypeError("Cannot construct Item instances directly. Please choose an item type.");
        }

        this.title = data.title;
        this.id = data.id;
        this.height = data.height;
        this.width = data.width;
        this.transform = data.transform;
        this.rotation = data.rotation;
    }

    getExtension(){
        throw new Error(`No getExtension defined for this type`)
    }

    getFileName(){
        return `${this.title} ${this.id}`.trim();
    }

}
