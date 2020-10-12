/**
 * Test function
 */
function showSidebar(){
    const html = HtmlService.createHtmlOutputFromFile("ui/Sidebar")
        .setTitle('Sidebar')
        .setWidth(300)
    SpreadsheetApp.getUi().showSidebar(html);

}

// @ts-ignore
global.showSidebar = showSidebar;


function onOpen(){
    SpreadsheetApp.getUi().createMenu("test")
        .addItem("show sidebar", "showSidebar")
        .addToUi();
}
// @ts-ignore
global.onOpen = onOpen;
