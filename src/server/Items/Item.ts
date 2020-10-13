import PageElement = GoogleAppsScript.Slides.PageElement;

export abstract class Item {

    protected constructor() {

    }


    serialize():object{
        return {
            type: this.getType(),
            id: this.getId()
        };
    }

    abstract getType():string;

    abstract getId():string;

}


