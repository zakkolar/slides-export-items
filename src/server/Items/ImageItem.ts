import {Item} from "./Item";
import Image = GoogleAppsScript.Slides.Image;
import PageElement = GoogleAppsScript.Slides.PageElement;
import {Helpers} from "../Helpers";
import {PageItem} from "./PageItem";

export class ImageItem extends PageItem {
    image:Image;


    constructor(item:PageElement) {
        super(item);
        this.image = item.asImage();
    }

    serialize() {
        return Object.assign({
            base64: Helpers.blobToBase64(this.image.getBlob()),
            mime: this.image.getBlob().getContentType()
        }, super.serialize());
    }

    getType(){
        return 'image';
    }

}
