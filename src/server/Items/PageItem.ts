import PageElement = GoogleAppsScript.Slides.PageElement;
import {Item} from "./Item";

export abstract class PageItem extends Item{

    genericItem: PageElement;

    protected constructor(item) {
        super();
        this.genericItem = item;
    }


    getTransform(){
        let transform = this.genericItem.getTransform();
        return {
            scaleX: transform.getScaleX(),
            scaleY: transform.getScaleY(),
            shearX: transform.getShearX(),
            shearY: transform.getShearY(),
            translateX: transform.getTranslateX(),
            translateY: transform.getTranslateY()
        }
    }

    serialize():object{
        let data = Object.assign({
            title: this.getTitle(),
            height: this.genericItem.getHeight(),
            width: this.genericItem.getWidth(),
            transform: this.getTransform(),
            rotation: this.genericItem.getRotation(),
        }, super.serialize());

        return data;
    }

    getTitle(){
        return this.genericItem.getTitle();
    }

    getId():string{
        return this.genericItem.getObjectId();
    }

}
