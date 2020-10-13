import {PageItem} from "./PageItem";
import {Item} from "./Item";
const mime = require('mime-types');

export class BackgroundItem extends Item {

    constructor(data){
        super(data);
        this.base64 = data.base64;
        this.mime = data.mime;
    }

    getExtension() {
        return mime.extension(this.mime);
    }

    getFileName(){
        return 'background';
    }

}
