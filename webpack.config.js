const components = require('./pages.js');

const HtmlWebpackPlugin = require("html-webpack-plugin");
const HtmlWebpackInlineSourcePlugin = require('html-webpack-inline-source-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const WebpackCleanPlugin = require('webpack-clean');
const CopyPlugin = require('copy-webpack-plugin');

const VueLoaderPlugin = require('vue-loader/lib/plugin')


const GasPlugin = require("gas-webpack-plugin");

var WebpackOnBuildPlugin = require('on-build-webpack');

const path = require('path');

const baseOutputPath = path.resolve(__dirname, 'dist');

const UiOutputPath = `${baseOutputPath}/ui`;
const ServerOutputPath = `${baseOutputPath}/server`;


const { exec } = require('child_process');


const ClaspPush = new WebpackOnBuildPlugin(function(stats){

    exec("clasp push")
});


const HtmlPlugins = components.map((component)=>{
    return new HtmlWebpackPlugin({

        filename: path.basename(component.html),
        template: component.html,
        chunks: [component.id],
        inlineSource: '.(js|css)$',
    })
});

const entry = {};

components.forEach((component)=>{
    entry[component.id] = component.js;
})

const clientConfig = (mode)=> {
    const plugins = [
        new VueLoaderPlugin(),
        new CleanWebpackPlugin()
    ].concat(HtmlPlugins).concat([
        new HtmlWebpackInlineSourcePlugin(),
        new WebpackCleanPlugin(components.map((component) => {
            return path.basename(component.js)
        }), {basePath: UiOutputPath}),
    ])

    if(mode === 'development'){
        plugins.push(ClaspPush);
    }
    return {
        entry: entry,
        watch: mode === 'development',
        devtool: false,
        output: {
            path: UiOutputPath
        },
        module: {
            rules: [
                {
                    test: /\.vue$/,
                    loader: 'vue-loader'
                },
                {
                    test: /\.css$/,
                    use: [
                        'vue-style-loader',
                        'style-loader',
                        'css-loader',
                    ],
                },
                {
                    test: /\.js$/,
                    exclude: /node_modules/,
                    use: {
                        loader: 'babel-loader',
                        options: {
                            presets: ['@babel/preset-env']
                        }
                    }
                },
                {
                    test: /\.scss$/,
                    use: [
                        'vue-style-loader',
                        "style-loader", // creates style nodes from JS strings
                        "css-loader", // translates CSS into CommonJS
                        "sass-loader" // compiles Sass to CSS, using Node Sass by default
                    ]
                }
            ],
        },
        plugins: plugins,
    }
};

const serverConfig =(mode) => {
    const plugins = [
        new CopyPlugin([
            {from: './src/appsscript.json', to: baseOutputPath}
        ]),
        new CleanWebpackPlugin(),
        new GasPlugin(),
    ];
    if(mode === 'development'){
        plugins.push(ClaspPush);
    }
    return {
        entry: './src/server/Main.ts',
        watch: mode === 'development',
        devtool: false,
        module: {
            rules: [
                {
                    test: /\.tsx?$/,
                    use: 'ts-loader',
                    exclude: /node_modules/
                }
            ]
        },
        resolve: {
            extensions: ['.tsx', '.ts', '.js']
        },
        output: {
            filename: 'Main.js',
            path: ServerOutputPath,

        },
        plugins: plugins,
        optimization: {
            // We no not want to minimize our code.
            minimize: false
        },
    }
}


module.exports = (env, argv) => {
    return [clientConfig(argv.mode), serverConfig(argv.mode)];
}
