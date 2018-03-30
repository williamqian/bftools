const webpack = require('webpack')
const path = require('path')
//const fs = require('fs')
const pkg = require('../package.json')

const rootPath = path.resolve(__dirname, '../')
const srcPath = path.resolve(rootPath, 'src');

/*
let entryObj = {};
let srcList = fs.readdirSync(srcPath);
let libraryFile = '';
srcList.forEach((item, index) => {
    let itemPath = path.resolve(srcPath, item);
    let info = fs.statSync(itemPath);
    if (info.isDirectory()) {
        let fileList = fs.readdirSync(itemPath);
        fileList.forEach((ele, idx) => {
            let elePath = path.resolve(itemPath, ele);
            entryObj[ele.substring(0, ele.lastIndexOf('.'))] = elePath;
        });

    } else {
        entryObj[`${pkg.name}.min`] = itemPath;
    }
});
*/


const config = {
    entry: path.resolve(srcPath, 'index.js'),
    output: {
        filename: `${pkg.name}.min.js`,
        path: path.resolve(rootPath, 'dist'),
        library: `${pkg.name}`,
        libraryTarget: "umd"
    },
    externals: {
        wx: {
            commonjs: "wx",
            commonjs2: "wx",
            amd: "wx",
            root: "wx"
        }
    },
    module: {
        rules: [{
            test: /\.js$/,
            exclude: /node_modules/,
            loader: "babel-loader"
        }]
    },
    plugins: [
        new webpack.optimize.UglifyJsPlugin()
    ]
}

module.exports = config