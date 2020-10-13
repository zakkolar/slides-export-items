import Slide = GoogleAppsScript.Slides.Slide;
import Presentation = GoogleAppsScript.Slides.Presentation;
import {Helpers} from "./Helpers";
import {Item} from "./Items/Item";
import {ImageItem} from "./Items/ImageItem";
import {BackgroundItem} from "./Items/BackgroundItem";
/// <reference path="Helpers.ts" />


export class Activity{
    slide:Slide;
    slideId: string;
    presentation:Presentation;
    itemInfo;

    constructor(presentation){
        this.presentation = presentation;
        this.slide = presentation.getSelection().getCurrentPage();
        this.slideId = this.slide.getObjectId();
        this.itemInfo = {};
    }

    saveOriginalItemPositions(){
        const items = this.slide.getPageElements();
        for (let i = 0; i < items.length; i++) {
            const item = items[i];
            const id = item.getObjectId();
            const top = item.getTop();
            const left = item.getLeft();
            const height = item.getHeight();
            this.itemInfo[id] = {
                top: top,
                left: left
            };
        }
    }

    restoreItems() {
        const items = this.slide.getPageElements();
        for (let i = 0; i < items.length; i++) {
            const item = items[i];
            if (this.itemInfo.hasOwnProperty(item.getObjectId())) {
                const top = this.itemInfo[item.getObjectId()].top;
                item.setTop(0);
                item.setTop(top);
            }
        }
    }

    closeSlide(){
        this.presentation.saveAndClose();
    }

    reopenSlide() {
        this.presentation = SlidesApp.openById(this.presentation.getId());
        this.slide = this.presentation.getSlideById(this.slideId);
    }

    exportSelection(options) {
        const selection = this.presentation.getSelection();
        const allData = [];
        if(options.background){
            allData.push(this.exportBackground());
        }
        if (selection.getSelectionType() === SlidesApp.SelectionType.PAGE_ELEMENT) {
            const pageElements = selection.getPageElementRange().getPageElements();
            for (let pageElement of pageElements) {
                const pageElementType = pageElement.getPageElementType();
                let item:Item;
                switch (pageElementType) {
                    case SlidesApp.PageElementType.IMAGE:
                        item = new ImageItem(pageElement);
                        break;
                }
                allData.push(item.serialize());
            }
        }
        return allData;
    }

    exportBackground() {
        this.saveOriginalItemPositions();
        this.moveItemsOffScreen();
        const image = this.downloadSlideImage();
        this.restoreItems();
        return new BackgroundItem(image).serialize();
    }

    downloadSlideImage() {
        this.closeSlide();
        const url = 'https://docs.google.com/presentation/d/' + this.presentation.getId() +
            '/export/png?id=' + this.presentation.getId() + '&pageid=' + this.slideId;
        const options = {
            headers: {
                Authorization: 'Bearer ' + ScriptApp.getOAuthToken()
            }
        };
        const response = UrlFetchApp.fetch(url, options);
        // @ts-ignore
        const image = response.getAs(MimeType.PNG);
        this.reopenSlide();
        return image;
    }



    moveItemsOffScreen() {
        const items = this.slide.getPageElements();
        for (let i = 0; i < items.length; i++) {
            const item = items[i];
            const id = item.getObjectId();
            const top = item.getTop();
            const height = item.getHeight();
            // @ts-ignore
            if (top > 0 - item.getHeight()) {
                // @ts-ignore
                item.setTop(0 - item.getHeight() - 5);
            }
        }
    }

}
