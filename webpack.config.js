const path = require('path');
const ExtractTextPlugin = require("extract-text-webpack-plugin");

const extractSass = new ExtractTextPlugin({
    filename: "[name].css",
    disable: false//process.env.NODE_ENV === "development"
});
const BUILD_DIR = path.resolve(__dirname, 'dist');
const SRC_DIR = path.resolve(__dirname, 'src');
const STYLE_DIR = path.resolve(__dirname, 'src/styles');
const APP_DIR = path.resolve(__dirname, 'src/component');
const FOUNDATION_DIR = path.resolve(__dirname, 'node_modules/foundation-sites');



const config = {
    devServer: { inline: true },
    entry: [
        // 'webpack-dev-server/client?http://localhost:8080/',
        path.resolve(__dirname, 'src/styles/main.scss'),
        './main.js'
    ],
    output: {
        path: path.resolve(__dirname, './'),
        filename: 'index.js',
        library: 'react-reusable-select',
        libraryTarget: 'umd',
        // umdNamedDefine: true
    },
    module: {
        rules: [
            {
                test: /\.jsx?/,
                include: [
                    APP_DIR,
                    path.resolve(SRC_DIR, "imports")
                ],
                loader: 'babel-loader'
            },
            {
                test: /\.scss$/,
                include: path.resolve(__dirname, 'src/styles'),
                use: extractSass.extract({
                    use: [{
                        loader: "css-loader"
                    }, {
                        loader: "sass-loader",
                        options: {}
                    }],
                    // use style-loader in development
                    fallback: "style-loader",
                    publicPath: '/css'
                })
            }
        ]
    },
    resolve: {
        extensions: ['.js', '.jsx']
    },
    plugins: [
        extractSass
    ],
    externals: {
        'react': true,
        'react/addons': true,
        'react/lib/ExecutionEnvironment': true,
        'react/lib/ReactContext': true
    }
};

module.exports = config;