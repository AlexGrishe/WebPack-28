const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const isDev = process.env.NODE_ENV === 'development';
const isProd = !isDev;


module.exports = {
    context: path.resolve(__dirname, 'src'),
    mode: 'development',
entry: {
       main: './index.js',
stat: './statistics.js'
},
    output: {
        filename: "[name].[hash].bundle.js",
        path: path.resolve(__dirname, 'dist')
    },
    resolve: {
        extensions: ['.js', '.json', '.ts', '.jsx'],
        alias: {
            '@': path.resolve(__dirname, 'src'),
            '@model': path.resolve(__dirname, 'src/model'),
            '@css': path.resolve(__dirname, 'src/css'),
            '@assets': path.resolve(__dirname, 'src/assets')

        }
    },
    optimization: {
        splitChunks: {
            chunks: "all"
        }
    },
    devServer: {
            port: 4200,
        hot: isDev,
        contentBase: path.join(__dirname, 'src'),
        watchContentBase: true
    },
    plugins: [
        new HTMLWebpackPlugin({
            template: "./index.html"
        }),
        new CleanWebpackPlugin(),
        new CopyWebpackPlugin({
            patterns: [
                {
                    from: path.resolve(__dirname, 'src/assets/monitor.png'),
                    to: path.resolve(__dirname, 'dist')
                }
            ]
        }),
        new MiniCssExtractPlugin({
            filename: '[name].[hash].js'
        })
    ],
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [{
                    loader: MiniCssExtractPlugin.loader,
                options: {
                        publicPath: ''
                }
                }, 'css-loader']
            },
            {
                test: /\.(png|jpg|svg|gif)$/,
                use: ['file-loader']
            },
            {
                test: /\.(ttf|woff|woff2|eot|otf)$/,
                use: ['file-loader']
            },
            {
                test: /\.xml$/,
                use: ['xml-loader']
            },
            {
                test: /\.csv$/,
                use: ['csv-loader']
            }
        ]
    }
}