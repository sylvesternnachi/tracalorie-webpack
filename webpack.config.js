console.log('CONFIG LOADED');


const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");


module.exports = {
    
    mode: 'development',
    entry: './src/app.js',
    output: {
         filename: 'bundle.js',
        path: path.resolve(__dirname,'dist')
       
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use:[MiniCssExtractPlugin.loader,'css-loader']
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader:'babel-loader',
                    options: {
                        presets:['@babel/preset-env'],
                    },
                }
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'Webpack App',
            filename: 'index.html',
            template: './src/index.html'
        }),
         new MiniCssExtractPlugin()
    ],
}