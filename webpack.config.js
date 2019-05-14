const webpack = require('webpack');
const nodeExternals = require('webpack-node-externals');
const path = require('path');
const TerserPlugin = require('terser-webpack-plugin');
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");

module.exports = (env, cnf) => {
    const isDevBuild = !(env && env.prod);
    const config = {
        target: 'node',
        devtool: isDevBuild ? 'source-map' : 'source-map',
        mode: isDevBuild ? 'development' : 'production',
        watch: cnf.watch,
        // externals: [nodeExternals()],
        externals: [
            nodeExternals({
                whitelist: ['webpack/hot/poll?100'],
            }),
        ],
        node: {
            console: true,
            fs: 'empty',
            net: 'empty',
            tls: 'empty'
        },
        resolve: {
            extensions: ['.js', '.jsx', '.ts', '.tsx']
        },
        entry: {
            'main': ['webpack/hot/poll?100', './src/index.ts'],
        },
        module: {
            rules: [{
                test: /\.tsx?$/,
                include: [/src/],
                exclude: /node_modules/,
                use: [{
                    loader: 'awesome-typescript-loader',
                    options: {
                        silent: true,
                        configFileName: './tsconfig.json',
                        useBabel: true,
                        babelCore: "@babel/core",
                        babelOptions: {
                            babelrc: false,
                            presets: [
                                ["@babel/preset-env", {
                                    "targets": {
                                        "node": "current"
                                    },
                                    "modules": false
                                }]
                            ]
                        },
                    },
                }]
            }]
        },
        output: {
            publicPath: "/",
            path: path.join(__dirname, 'dist'),
            filename: 'main.js',
            hotUpdateChunkFilename: 'hot/[id].[hash].hot-update.js',
            hotUpdateMainFilename: 'hot/[hash].hot-update.json'
        },
        optimization: {
            minimizer: [].concat(isDevBuild ? [
                new TerserPlugin(),
                new OptimizeCSSAssetsPlugin({})
            ] : [])
        },
        plugins: [
                new webpack.DefinePlugin({
                    'process.env.NODE_ENV': isDevBuild ? '"development"' : '"production"',
                    'process.env.FLUENTFFMPEG_COV': false
                })
            ]
            .concat(cnf.watch ? [new webpack.HotModuleReplacementPlugin()] : [])
            .concat(isDevBuild ? [
                new webpack.LoaderOptionsPlugin({
                    debug: true,
                    options: {
                        debug: true,
                        cache: true
                    }
                })
            ] : [
                new webpack.LoaderOptionsPlugin({
                    debug: false,
                    options: {
                        debug: false,
                        cache: true
                    }
                })
            ])
    };
    return config;
}