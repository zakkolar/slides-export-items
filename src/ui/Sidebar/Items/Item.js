export class Item {


    constructor(data){

        if(new.target === Item){
            throw new TypeError("Cannot construct Item instances directly. Please choose an item type.");
        }

        this.type = data.type;
    }

    getExtension(){
        throw new Error(`No getExtension defined for this item type`)
    }

    getFileName(){
        throw new Error(`No getFileName defined for this item type`)
    }

    getFileNameWithExtension(){
        return `${this.getFileName()}.${this.getExtension()}`;
    }

}
