import {PageItem} from "./PageItem";
const mime = require('mime-types');

export class ImageItem extends PageItem {

    constructor(data){
        super(data);
        this.base64 = data.base64;
        this.mime = data.mime;
    }

    getExtension() {
        return mime.extension(this.mime);
    }

}
