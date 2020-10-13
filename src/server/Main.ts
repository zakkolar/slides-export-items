import {Activity} from "./Activity";

function showSidebar() {
    var html = HtmlService.createHtmlOutputFromFile("ui/Sidebar")
        .setTitle('Export Items')
        .setWidth(300);
    SlidesApp.getUi().showSidebar(html);
}
// @ts-ignore
global.showSidebar = showSidebar;
function onOpen() {
    SlidesApp.getUi().createMenu("Export Items")
        .addItem("Start", "showSidebar")
        .addItem("Export background", "exportBackground")
        .addToUi();
}
// @ts-ignore
global.onOpen = onOpen;


var itemInfo = {};


function makeActivity(){
    return new Activity(SlidesApp.getActivePresentation());
}

function exportItems(options) {

    const activity = makeActivity();
    const selection = activity.exportSelection(options);

    if(selection.length === 0){
        SlidesApp.getUi().alert('Please select at least one item on the page');
    }

    return selection;
}
// @ts-ignore
global.exportItems = exportItems;

function exportBackground(){
    const activity = makeActivity();
    return activity.exportBackground();
}
// @ts-ignore
global.exportBackground = exportBackground;


// function exportSelection() {
//     var items = slide.getPageElements();
//     var rectangle = slide.insertShape(SlidesApp.ShapeType.RECTANGLE);
//     var rectangleId = rectangle.getObjectId();
//     rectangle.setTop(0);
//     rectangle.setLeft(0);
//     rectangle.getFill().setSolidFill(255, 255, 255);
//     rectangle.getBorder().setTransparent();
//     rectangle.setWidth(presentation.getPageWidth());
//     rectangle.setHeight(presentation.getPageHeight());
//     for (var i = 0; i < items.length; i++) {
//         var item = items[i];
//         rectangle.bringToFront();
//         item.bringToFront();
//         Logger.log(slide.getPageElements().length);
//         var image = downloadSlideImage();
//         rectangle = slide.getPageElementById(rectangleId).asShape();
//     }
// }




