import {Item} from "./Item";
import Image = GoogleAppsScript.Slides.Image;
import PageElement = GoogleAppsScript.Slides.PageElement;
import {Helpers} from "../Helpers";
import {PageItem} from "./PageItem";
import Blob = GoogleAppsScript.Base.Blob;

export class BackgroundItem extends Item {
    image:Blob;

    constructor(image:Blob) {
        super();
        this.image = image;
    }

    serialize():object {
        return Object.assign(
            {
                base64: Helpers.blobToBase64(this.image),
                mime: this.image.getContentType()
            }, super.serialize())
    }

    getType() {
        return 'background';
    }

    getId(){
        return 'background';
    }

}
