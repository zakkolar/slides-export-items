# Google Apps Script Starter

This is a set of templates to create a Google Apps Script project using Vue, Webpack, and [Clasp](https://github.com/google/clasp) to make it easy to bundle and deploy. 

## Prerequisites

### Set up `clasp`

1. [Install `clasp`](https://github.com/google/clasp)
2. Run `clasp login` and follow the prompts to authorize access to your Google account

## Getting started

1. Clone this repo

2. `npm install`

3. Make a copy of `.clasp.json.sample` called `.clasp.json` and fill in the script ID (you can find this by going to File > Project Settings in the Google Apps Script editor)

4. `npm run dev` to watch for changes and automatically push them back to your Apps Script project

## Directory layout

All project-related files reside in the `src` folder. `src/server` contains files that are meant to run on the Apps Script server. `src/ui` contains files for side bars, modals, and other user-facing pages.

## Server development

`src/server/Main.ts` is the entry point for the server-side files. Typescript is transpiled to Apps Script via Babel and Webpack, so feel free to use `imports`, class declarations, and other things not typically usable within Apps Script.

This starter pack includes TypeScript definitions for Google Apps Script to allow autocomplete in compatible IDEs.

JavaScript is allowed in TypeScript, so you can stick to plain Apps Script/JavaScript if you prefer. However, you must keep the `.ts` ending at the end of `Main.ts` for Webpack to find it.

### Exposing functions globally

One quirk of using Webpack for Apps Script projects is that no functions are exposed globally. This means that you'll run into difficulties when you try to run functions from the client side (e.g. `google.script.run`) or hook into events (e.g. `onOpen()`).

To get around this, Webpack is configured to use [`gas-webpack-plugin`](https://www.npmjs.com/package/gas-webpack-plugin) to expose functions globally. If you want to be able to access a function externally, assign it to the global object:

    function onOpen(e){
        const menu = SpreadsheetApp.getUi().createMenu("My addon");
        ...
    }
    // @ts-ignore
    global.onOpen = onOpen
    
When `gas-webpack-plugin` detects this global assignment, it will automatically generate a top level function declaration so that this function is accessible externally.

**Note**: `gas-webpack-plugin` parses files as plain text when looking for items attached to the `global` object rather than evaluating them as JavaScript. This means that you cannot programmatically attach functions to the global object.

## Client development

By default, the `ui` folder is organized by HTML pages for sidebars, modals, and other places. Each is put into a folder with its corresponding HTML, JavaScript, and other files. 

Webpack looks in the `pages.js` file for a list of HTML pages to render. For each page you need, you must specify an ID (just used internally to identify pages - must be unique), the HTML file, and the JavaScript entry point:
    
    module.exports = [
            {
                id: 'Sidebar',
                html: './src/ui/Sidebar/Sidebar.html',
                js: './src/ui/Sidebar/Sidebar.js'
            },
        ]


The JS file is used as an entry point, so anything that's `import`ed is included. All of the compiled JS is embedded within the HTML page by Webpack.

This starter comes with Vue by default, but you can also use plain JavaScript and HTML if you prefer. Each HTML page requires a corresponding .js page, but you can use an empty .js page if you only want to display HTML in a particular view.
